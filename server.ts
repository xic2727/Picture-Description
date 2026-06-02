import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy GoogleGenAI client initialization
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY 环境变量未配置。请在 AI Studio 的 Settings > Secrets 中进行配置。");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. AI Grading for Look-and-Write (看图写话自动评分评估接口)
app.post('/api/grade', async (req, res) => {
  try {
    const { sceneId, sceneTitle, sceneDesc, childText } = req.body;

    if (!childText || childText.trim().length === 0) {
      return res.status(400).json({ error: "内容不能为空哦，写一句话试试吧！" });
    }

    const ai = getGenAI();

    const systemInstruction = `你是一位非常有爱心、温柔的低年级小学语文老师（比如小熊猫贝贝老师）。你的任务是批改一年级或二年级低段小学生的“看图写话”。
他们的词汇量和表达能力有限，正处于学习写作的起步阶段。因此，要以极其夸奖、鼓励、呵护的语气进行评价。
评价标准：
1. 观察是否认真 (是否写到了画面中的关键人或物)。
2. 基本要素是否完整：时间、地点、人物、做了什么、心情/天气。如果欠缺，应通过温和的引导来提醒。
3. 语句是否通顺，有无写错别字（如果有可爱的指出并改正）。
4. 对优美句子或生动的拟声词、叠词要大加赞赏（挑出作为“闪光金句”）。

请提供极其生动、温馨、充满童趣的评语。`;

    const userPrompt = `【看图写话场景】：${sceneTitle}
【画面内容描述】：${sceneDesc}
【孩子的写话内容】："${childText}"

请根据上面的内容，结合低段语文教学大纲（温和鼓励为主），反馈评估结果。必须以JSON形式返回。`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stars: { 
              type: Type.INTEGER, 
              description: "评分星级，在 3 到 5 之间给孩子打分（以鼓励为主，只要写了就至少给3星，句子通顺有亮点可给4-5星）" 
            },
            badge: { 
              type: Type.STRING, 
              description: "适合孩子的荣誉称号，例如：'想象力金勋章 🎖️'、'词汇小魔法师 🧙‍♂️'、'观察力小超人 🦸‍♂️'、'金句小作家 ✍️'、'语句通顺小明星 ⭐'" 
            },
            summary: { 
              type: Type.STRING, 
              description: "充满鼓励、童趣和赞美的小熊猫贝贝老师温柔评语（50-120字），多用语气助词如'呀'、'啦'、'哦'，可以赞美他/她的观察仔细或用语认真" 
            },
            goldSentences: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "从孩子文章中挑出的、夸张肯定的小闪光句子。如果全篇很短，也可以夸他把某个词（如'高高兴兴'、'红扑扑'）用得特别妙！"
            },
            missingElements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "温和的写作建议或缺失要素的引导，例如：'如果加上【时间】（如：星期天的早晨），故事就更完整啦！'、'如果能描述一下【天气】（比如：阳光灿烂），就更完美啦！'"
            },
            rework: { 
              type: Type.STRING, 
              description: "老师精心帮孩子润色的改写范文。要在孩子原有句子的基础上优化，不要太长（50-100字），用简单生动的词汇，语言优美，让孩子觉得'我也能写得这么棒！'。" 
            }
          },
          required: ["stars", "badge", "summary", "goldSentences", "missingElements", "rework"]
        }
      }
    });

    const resultText = response.text || "{}";
    const gradeData = JSON.parse(resultText.trim());
    return res.json(gradeData);

  } catch (error: any) {
    console.error("AI grading error:", error);
    return res.status(500).json({ 
      error: "批改失败，请检查是否在 Settings > Secrets 中正确配置了 GEMINI_API_KEY，或稍后再试。",
      details: error.message 
    });
  }
});

// 2. AI Prompt Hints Generator (根据选中的探索词和场景生成启发灵感的写话脚手架)
app.post('/api/hints', async (req, res) => {
  try {
    const { sceneTitle, sceneDesc, exploredWords } = req.body;

    const ai = getGenAI();

    const systemInstruction = `你是一位小学低年级语文老师，擅长用巧妙的提问和半句引导，帮助小孩子们克服“执笔无言”的困难。
你要为某个看图写话场景生成 3 条启发性的提示句，每条提示句包含：
1. 一个启发思考的童趣提问。
2. 一个可以填空或接着写的“半句脚手架/魔法句式”（使用括号或横线留出空白给孩子自己填）。
3. 推荐使用的一到两个好词（来自孩子刚刚在画中探索到的词，或新想的高质动词形容词）。

请务必使用 JSON 格式回答。`;

    const userPrompt = `【看图写话场景】：${sceneTitle}
【大体画面】：${sceneDesc}
【孩子已经探索到的词汇】：${JSON.stringify(exploredWords || [])}

请针对这个情况生成 3 条灵感魔法提示。`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "童趣盎然的启发提问，比如：'一抬头，天空中正飘着什么呢？'" },
              template: { type: Type.STRING, description: "写话魔法句式（半自动脚手架），比如：'蔚蓝的天空中，一朵朵白云好像______。'" },
              suggestedWords: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }, 
                description: "推荐搭配的好词，比如 ['软绵绵', '棉花糖']" 
              }
            },
            required: ["question", "template", "suggestedWords"]
          }
        }
      }
    });

    const resultText = response.text || "[]";
    const hintsData = JSON.parse(resultText.trim());
    return res.json(hintsData);

  } catch (error: any) {
    console.error("AI hints generation error:", error);
    return res.status(500).json({ 
      error: "魔法灵感生成失败了。", 
      details: error.message 
    });
  }
});

// Serve assets and fallback to SPA (Vite / Express integration)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();

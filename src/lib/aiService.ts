import { Scene, AIFeedback, MagicHint } from '../types';

export interface AISettings {
  apiKey: string;
  baseUrl: string;
  model: string;
  preset: 'openai' | 'deepseek' | 'gemini' | 'moonshot' | 'siliconflow' | 'custom';
}

const LOCAL_STORAGE_KEY = 'look_and_write_ai_settings';

export const PRESETS: Record<string, { name: string; baseUrl: string; model: string }> = {
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
  },
  deepseek: {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
  },
  gemini: {
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    model: 'gemini-2.5-flash',
  },
  moonshot: {
    name: 'Moonshot KImi',
    baseUrl: 'https://api.moonshot.cn/v1',
    model: 'moonshot-v1-8k',
  },
  siliconflow: {
    name: 'SiliconFlow (硅基流动)',
    baseUrl: 'https://api.siliconflow.cn/v1',
    model: 'deepseek-ai/DeepSeek-V3',
  },
  custom: {
    name: '自定义 API',
    baseUrl: '',
    model: '',
  },
};

export function getAISettings(): AISettings {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as AISettings;
    }
  } catch (e) {
    console.error('Failed to parse AI settings:', e);
  }

  // Default to Gemini or deepseek
  return {
    apiKey: '',
    baseUrl: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
    preset: 'deepseek',
  };
}

export function saveAISettings(settings: AISettings) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save AI settings:', e);
  }
}

function extractJson(text: string): any {
  try {
    return JSON.parse(text.trim());
  } catch (e) {
    // Attempt block extraction
    const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch (inner) {
        throw new Error("模型返回的 JSON 格式不规范，请重新试一次哇！");
      }
    }
    // Attempt brute force brace finding
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      try {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1));
      } catch (inner) {
        // Continue
      }
    }
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1) {
      try {
        return JSON.parse(text.substring(firstBracket, lastBracket + 1));
      } catch (inner) {
        // Continue
      }
    }
    throw new Error("模型无法生成正确的 JSON 格式数据。详细内容：" + text);
  }
}

// 1. Client-side AI Grading for Look-and-Write
export async function gradeSubmission(
  settings: AISettings,
  scene: Scene,
  childText: string
): Promise<AIFeedback> {
  if (!settings.apiKey) {
    throw new Error('请先在顶部的【⚙️ AI 助手设置】中配置您的 API Key 密钥哦！');
  }

  const systemInstruction = `你是一位非常有爱心、温柔的低年级小学语文老师（比如小熊猫贝贝老师）。你的任务是批改一年级或二年级低段小学生的“看图写话”。
他们的词汇量和表达能力有限，正处于学习写作的起步阶段。因此，要以极其夸奖、鼓励、呵护的语气进行评价。
评价标准：
1. 观察是否认真 (是否写到了画面中的关键人或物)。
2. 基本要素是否完整：时间、地点、人物、做了什么、心情/天气。如果欠缺，应通过温和的引导来提醒。
3. 语句是否通顺，有无写错别字（如果有可爱的指出并改正）。
4. 对优美句子或生动的拟声词、叠词要大加赞赏（挑出作为“闪光金句”）。

请提供极其生动、温馨、充满童趣的评语。
你的回答必须严格遵循以下 JSON 数据结构，不要包含任何额外的对话文字：
{
  "stars": 4, // 评分星级，在 3 到 5 之间的整数（极力鼓励为主，只要写了就至少给3星，句子通顺有亮点可给4-5三星）
  "badge": "适合孩子的荣誉称号，如：'想象力金勋章 🎖️'、'词汇小魔法师 🧙‍♂️'、'观察力小超人 🦸‍♂️'、'金句小作家 ✍️'",
  "summary": "给孩子的充满鼓励和童趣的熊猫老师评语（50-120字），多用语气词'呀'、'啦'、'哦'，可以赞美观察很仔细",
  "goldSentences": ["从孩子文章中挑出的、夸张肯定的小闪光原句。如果篇幅短，可以赞赏他把某个好词用得好！"],
  "missingElements": ["温和的写作建议或缺失要素的引导，例如：'如果加上【时间】（如：星期天的早晨），故事就更完整啦！'"],
  "rework": "老师精心帮孩子润色的改写范文。要在孩子原有句子的基础上优化，不要太长（50-100字），用简单生动的词汇，让孩子觉得'我也能写得这么棒！'。"
}`;

  const userPrompt = `【看图写话场景名称】：${scene.title}
【画面内容描述】：${scene.description}
【孩子的写话内容】："${childText}"

请根据上面的内容，结合低段语文教学大纲，提供温柔鼓励的 JSON 结果。`;

  const baseUrlClean = settings.baseUrl.trim().replace(/\/$/, "");
  const response = await fetch(`${baseUrlClean}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey.trim()}`
    },
    body: JSON.stringify({
      model: settings.model.trim(),
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    let parsedErr;
    try {
      parsedErr = JSON.parse(errorText);
    } catch {
      // Ignored
    }
    throw new Error(parsedErr?.error?.message || parsedErr?.error || `API 报错啦: ${response.status} ${response.statusText}`);
  }

  const resJson = await response.json();
  const rawText = resJson.choices?.[0]?.message?.content || "";
  const feedback: AIFeedback = extractJson(rawText);

  // Validate properties
  if (typeof feedback.stars !== 'number') feedback.stars = 4;
  if (!feedback.badge) feedback.badge = "写作小能手 ⭐";
  if (!feedback.summary) feedback.summary = "宝贝写得真棒！继续加油哦！";
  if (!Array.isArray(feedback.goldSentences)) feedback.goldSentences = [];
  if (!Array.isArray(feedback.missingElements)) feedback.missingElements = [];
  if (!feedback.rework) feedback.rework = childText;

  return feedback;
}

// 2. Client-side Prompt Hints Generator
export async function generateHints(
  settings: AISettings,
  scene: Scene,
  exploredWords: string[]
): Promise<MagicHint[]> {
  if (!settings.apiKey) {
    throw new Error('请先在顶部的【⚙️ AI 助手设置】中配置您的 API Key 密钥哦！');
  }

  const systemInstruction = `你是一位小学低年级语文老师，擅长用巧妙的提问和半句引导，帮助小孩子们克服“执笔无言”的困难。
你要为某个看图写话场景生成 3 条启发性的提示句。
你的回答必须严格符合以下 JSON 数组格式，不要有任何 Markdown 或代码之外的对话：
[
  {
    "question": "童趣盎然的启发提问，比如：'一抬头，天空中正飘着什么呢？'",
    "template": "写话魔法句式（半自动脚手架，挖空给孩子填），比如：'蔚蓝的天空中，一朵朵白云好像______。'",
    "suggestedWords": ["推荐搭配的好词数组，如：'软绵绵', '棉花糖'"]
  }
]`;

  const userPrompt = `【看图写话场景】：${scene.title}
【大体画面】：${scene.description}
【孩子已经探索到的词汇】：${JSON.stringify(exploredWords || [])}

请根据孩子探索到的词汇为基础，针对性地推荐好词，生成3条充满童趣的写话魔法句式 JSON 数组。`;

  const baseUrlClean = settings.baseUrl.trim().replace(/\/$/, "");
  const response = await fetch(`${baseUrlClean}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey.trim()}`
    },
    body: JSON.stringify({
      model: settings.model.trim(),
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    let parsedErr;
    try {
      parsedErr = JSON.parse(errorText);
    } catch {
      // Ignored
    }
    throw new Error(parsedErr?.error?.message || parsedErr?.error || `API 报错啦: ${response.status} ${response.statusText}`);
  }

  const resJson = await response.json();
  const rawText = resJson.choices?.[0]?.message?.content || "";
  const hints: MagicHint[] = extractJson(rawText);

  if (!Array.isArray(hints)) {
    throw new Error("模型没有返回正规的数组格式数据，请再试一次！");
  }

  return hints.slice(0, 3);
}

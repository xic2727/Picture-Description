var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getGenAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY \u73AF\u5883\u53D8\u91CF\u672A\u914D\u7F6E\u3002\u8BF7\u5728 AI Studio \u7684 Settings > Secrets \u4E2D\u8FDB\u884C\u914D\u7F6E\u3002");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.post("/api/grade", async (req, res) => {
  try {
    const { sceneId, sceneTitle, sceneDesc, childText } = req.body;
    if (!childText || childText.trim().length === 0) {
      return res.status(400).json({ error: "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\u54E6\uFF0C\u5199\u4E00\u53E5\u8BDD\u8BD5\u8BD5\u5427\uFF01" });
    }
    const ai = getGenAI();
    const systemInstruction = `\u4F60\u662F\u4E00\u4F4D\u975E\u5E38\u6709\u7231\u5FC3\u3001\u6E29\u67D4\u7684\u4F4E\u5E74\u7EA7\u5C0F\u5B66\u8BED\u6587\u8001\u5E08\uFF08\u6BD4\u5982\u5C0F\u718A\u732B\u8D1D\u8D1D\u8001\u5E08\uFF09\u3002\u4F60\u7684\u4EFB\u52A1\u662F\u6279\u6539\u4E00\u5E74\u7EA7\u6216\u4E8C\u5E74\u7EA7\u4F4E\u6BB5\u5C0F\u5B66\u751F\u7684\u201C\u770B\u56FE\u5199\u8BDD\u201D\u3002
\u4ED6\u4EEC\u7684\u8BCD\u6C47\u91CF\u548C\u8868\u8FBE\u80FD\u529B\u6709\u9650\uFF0C\u6B63\u5904\u4E8E\u5B66\u4E60\u5199\u4F5C\u7684\u8D77\u6B65\u9636\u6BB5\u3002\u56E0\u6B64\uFF0C\u8981\u4EE5\u6781\u5176\u5938\u5956\u3001\u9F13\u52B1\u3001\u5475\u62A4\u7684\u8BED\u6C14\u8FDB\u884C\u8BC4\u4EF7\u3002
\u8BC4\u4EF7\u6807\u51C6\uFF1A
1. \u89C2\u5BDF\u662F\u5426\u8BA4\u771F (\u662F\u5426\u5199\u5230\u4E86\u753B\u9762\u4E2D\u7684\u5173\u952E\u4EBA\u6216\u7269)\u3002
2. \u57FA\u672C\u8981\u7D20\u662F\u5426\u5B8C\u6574\uFF1A\u65F6\u95F4\u3001\u5730\u70B9\u3001\u4EBA\u7269\u3001\u505A\u4E86\u4EC0\u4E48\u3001\u5FC3\u60C5/\u5929\u6C14\u3002\u5982\u679C\u6B20\u7F3A\uFF0C\u5E94\u901A\u8FC7\u6E29\u548C\u7684\u5F15\u5BFC\u6765\u63D0\u9192\u3002
3. \u8BED\u53E5\u662F\u5426\u901A\u987A\uFF0C\u6709\u65E0\u5199\u9519\u522B\u5B57\uFF08\u5982\u679C\u6709\u53EF\u7231\u7684\u6307\u51FA\u5E76\u6539\u6B63\uFF09\u3002
4. \u5BF9\u4F18\u7F8E\u53E5\u5B50\u6216\u751F\u52A8\u7684\u62DF\u58F0\u8BCD\u3001\u53E0\u8BCD\u8981\u5927\u52A0\u8D5E\u8D4F\uFF08\u6311\u51FA\u4F5C\u4E3A\u201C\u95EA\u5149\u91D1\u53E5\u201D\uFF09\u3002

\u8BF7\u63D0\u4F9B\u6781\u5176\u751F\u52A8\u3001\u6E29\u99A8\u3001\u5145\u6EE1\u7AE5\u8DA3\u7684\u8BC4\u8BED\u3002`;
    const userPrompt = `\u3010\u770B\u56FE\u5199\u8BDD\u573A\u666F\u3011\uFF1A${sceneTitle}
\u3010\u753B\u9762\u5185\u5BB9\u63CF\u8FF0\u3011\uFF1A${sceneDesc}
\u3010\u5B69\u5B50\u7684\u5199\u8BDD\u5185\u5BB9\u3011\uFF1A"${childText}"

\u8BF7\u6839\u636E\u4E0A\u9762\u7684\u5185\u5BB9\uFF0C\u7ED3\u5408\u4F4E\u6BB5\u8BED\u6587\u6559\u5B66\u5927\u7EB2\uFF08\u6E29\u548C\u9F13\u52B1\u4E3A\u4E3B\uFF09\uFF0C\u53CD\u9988\u8BC4\u4F30\u7ED3\u679C\u3002\u5FC5\u987B\u4EE5JSON\u5F62\u5F0F\u8FD4\u56DE\u3002`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            stars: {
              type: import_genai.Type.INTEGER,
              description: "\u8BC4\u5206\u661F\u7EA7\uFF0C\u5728 3 \u5230 5 \u4E4B\u95F4\u7ED9\u5B69\u5B50\u6253\u5206\uFF08\u4EE5\u9F13\u52B1\u4E3A\u4E3B\uFF0C\u53EA\u8981\u5199\u4E86\u5C31\u81F3\u5C11\u7ED93\u661F\uFF0C\u53E5\u5B50\u901A\u987A\u6709\u4EAE\u70B9\u53EF\u7ED94-5\u661F\uFF09"
            },
            badge: {
              type: import_genai.Type.STRING,
              description: "\u9002\u5408\u5B69\u5B50\u7684\u8363\u8A89\u79F0\u53F7\uFF0C\u4F8B\u5982\uFF1A'\u60F3\u8C61\u529B\u91D1\u52CB\u7AE0 \u{1F396}\uFE0F'\u3001'\u8BCD\u6C47\u5C0F\u9B54\u6CD5\u5E08 \u{1F9D9}\u200D\u2642\uFE0F'\u3001'\u89C2\u5BDF\u529B\u5C0F\u8D85\u4EBA \u{1F9B8}\u200D\u2642\uFE0F'\u3001'\u91D1\u53E5\u5C0F\u4F5C\u5BB6 \u270D\uFE0F'\u3001'\u8BED\u53E5\u901A\u987A\u5C0F\u660E\u661F \u2B50'"
            },
            summary: {
              type: import_genai.Type.STRING,
              description: "\u5145\u6EE1\u9F13\u52B1\u3001\u7AE5\u8DA3\u548C\u8D5E\u7F8E\u7684\u5C0F\u718A\u732B\u8D1D\u8D1D\u8001\u5E08\u6E29\u67D4\u8BC4\u8BED\uFF0850-120\u5B57\uFF09\uFF0C\u591A\u7528\u8BED\u6C14\u52A9\u8BCD\u5982'\u5440'\u3001'\u5566'\u3001'\u54E6'\uFF0C\u53EF\u4EE5\u8D5E\u7F8E\u4ED6/\u5979\u7684\u89C2\u5BDF\u4ED4\u7EC6\u6216\u7528\u8BED\u8BA4\u771F"
            },
            goldSentences: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "\u4ECE\u5B69\u5B50\u6587\u7AE0\u4E2D\u6311\u51FA\u7684\u3001\u5938\u5F20\u80AF\u5B9A\u7684\u5C0F\u95EA\u5149\u53E5\u5B50\u3002\u5982\u679C\u5168\u7BC7\u5F88\u77ED\uFF0C\u4E5F\u53EF\u4EE5\u5938\u4ED6\u628A\u67D0\u4E2A\u8BCD\uFF08\u5982'\u9AD8\u9AD8\u5174\u5174'\u3001'\u7EA2\u6251\u6251'\uFF09\u7528\u5F97\u7279\u522B\u5999\uFF01"
            },
            missingElements: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "\u6E29\u548C\u7684\u5199\u4F5C\u5EFA\u8BAE\u6216\u7F3A\u5931\u8981\u7D20\u7684\u5F15\u5BFC\uFF0C\u4F8B\u5982\uFF1A'\u5982\u679C\u52A0\u4E0A\u3010\u65F6\u95F4\u3011\uFF08\u5982\uFF1A\u661F\u671F\u5929\u7684\u65E9\u6668\uFF09\uFF0C\u6545\u4E8B\u5C31\u66F4\u5B8C\u6574\u5566\uFF01'\u3001'\u5982\u679C\u80FD\u63CF\u8FF0\u4E00\u4E0B\u3010\u5929\u6C14\u3011\uFF08\u6BD4\u5982\uFF1A\u9633\u5149\u707F\u70C2\uFF09\uFF0C\u5C31\u66F4\u5B8C\u7F8E\u5566\uFF01'"
            },
            rework: {
              type: import_genai.Type.STRING,
              description: "\u8001\u5E08\u7CBE\u5FC3\u5E2E\u5B69\u5B50\u6DA6\u8272\u7684\u6539\u5199\u8303\u6587\u3002\u8981\u5728\u5B69\u5B50\u539F\u6709\u53E5\u5B50\u7684\u57FA\u7840\u4E0A\u4F18\u5316\uFF0C\u4E0D\u8981\u592A\u957F\uFF0850-100\u5B57\uFF09\uFF0C\u7528\u7B80\u5355\u751F\u52A8\u7684\u8BCD\u6C47\uFF0C\u8BED\u8A00\u4F18\u7F8E\uFF0C\u8BA9\u5B69\u5B50\u89C9\u5F97'\u6211\u4E5F\u80FD\u5199\u5F97\u8FD9\u4E48\u68D2\uFF01'\u3002"
            }
          },
          required: ["stars", "badge", "summary", "goldSentences", "missingElements", "rework"]
        }
      }
    });
    const resultText = response.text || "{}";
    const gradeData = JSON.parse(resultText.trim());
    return res.json(gradeData);
  } catch (error) {
    console.error("AI grading error:", error);
    return res.status(500).json({
      error: "\u6279\u6539\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u5728 Settings > Secrets \u4E2D\u6B63\u786E\u914D\u7F6E\u4E86 GEMINI_API_KEY\uFF0C\u6216\u7A0D\u540E\u518D\u8BD5\u3002",
      details: error.message
    });
  }
});
app.post("/api/hints", async (req, res) => {
  try {
    const { sceneTitle, sceneDesc, exploredWords } = req.body;
    const ai = getGenAI();
    const systemInstruction = `\u4F60\u662F\u4E00\u4F4D\u5C0F\u5B66\u4F4E\u5E74\u7EA7\u8BED\u6587\u8001\u5E08\uFF0C\u64C5\u957F\u7528\u5DE7\u5999\u7684\u63D0\u95EE\u548C\u534A\u53E5\u5F15\u5BFC\uFF0C\u5E2E\u52A9\u5C0F\u5B69\u5B50\u4EEC\u514B\u670D\u201C\u6267\u7B14\u65E0\u8A00\u201D\u7684\u56F0\u96BE\u3002
\u4F60\u8981\u4E3A\u67D0\u4E2A\u770B\u56FE\u5199\u8BDD\u573A\u666F\u751F\u6210 3 \u6761\u542F\u53D1\u6027\u7684\u63D0\u793A\u53E5\uFF0C\u6BCF\u6761\u63D0\u793A\u53E5\u5305\u542B\uFF1A
1. \u4E00\u4E2A\u542F\u53D1\u601D\u8003\u7684\u7AE5\u8DA3\u63D0\u95EE\u3002
2. \u4E00\u4E2A\u53EF\u4EE5\u586B\u7A7A\u6216\u63A5\u7740\u5199\u7684\u201C\u534A\u53E5\u811A\u624B\u67B6/\u9B54\u6CD5\u53E5\u5F0F\u201D\uFF08\u4F7F\u7528\u62EC\u53F7\u6216\u6A2A\u7EBF\u7559\u51FA\u7A7A\u767D\u7ED9\u5B69\u5B50\u81EA\u5DF1\u586B\uFF09\u3002
3. \u63A8\u8350\u4F7F\u7528\u7684\u4E00\u5230\u4E24\u4E2A\u597D\u8BCD\uFF08\u6765\u81EA\u5B69\u5B50\u521A\u521A\u5728\u753B\u4E2D\u63A2\u7D22\u5230\u7684\u8BCD\uFF0C\u6216\u65B0\u60F3\u7684\u9AD8\u8D28\u52A8\u8BCD\u5F62\u5BB9\u8BCD\uFF09\u3002

\u8BF7\u52A1\u5FC5\u4F7F\u7528 JSON \u683C\u5F0F\u56DE\u7B54\u3002`;
    const userPrompt = `\u3010\u770B\u56FE\u5199\u8BDD\u573A\u666F\u3011\uFF1A${sceneTitle}
\u3010\u5927\u4F53\u753B\u9762\u3011\uFF1A${sceneDesc}
\u3010\u5B69\u5B50\u5DF2\u7ECF\u63A2\u7D22\u5230\u7684\u8BCD\u6C47\u3011\uFF1A${JSON.stringify(exploredWords || [])}

\u8BF7\u9488\u5BF9\u8FD9\u4E2A\u60C5\u51B5\u751F\u6210 3 \u6761\u7075\u611F\u9B54\u6CD5\u63D0\u793A\u3002`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              question: { type: import_genai.Type.STRING, description: "\u7AE5\u8DA3\u76CE\u7136\u7684\u542F\u53D1\u63D0\u95EE\uFF0C\u6BD4\u5982\uFF1A'\u4E00\u62AC\u5934\uFF0C\u5929\u7A7A\u4E2D\u6B63\u98D8\u7740\u4EC0\u4E48\u5462\uFF1F'" },
              template: { type: import_genai.Type.STRING, description: "\u5199\u8BDD\u9B54\u6CD5\u53E5\u5F0F\uFF08\u534A\u81EA\u52A8\u811A\u624B\u67B6\uFF09\uFF0C\u6BD4\u5982\uFF1A'\u851A\u84DD\u7684\u5929\u7A7A\u4E2D\uFF0C\u4E00\u6735\u6735\u767D\u4E91\u597D\u50CF______\u3002'" },
              suggestedWords: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING },
                description: "\u63A8\u8350\u642D\u914D\u7684\u597D\u8BCD\uFF0C\u6BD4\u5982 ['\u8F6F\u7EF5\u7EF5', '\u68C9\u82B1\u7CD6']"
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
  } catch (error) {
    console.error("AI hints generation error:", error);
    return res.status(500).json({
      error: "\u9B54\u6CD5\u7075\u611F\u751F\u6210\u5931\u8D25\u4E86\u3002",
      details: error.message
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map

import { Scene, MagicHint } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Lightbulb, HelpCircle, Check, Loader2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { AISettings, generateHints } from '../lib/aiService';

// Static scaffolding guidelines tailored for each scene
const STATIC_SCAFFOLD: Record<string, Array<{ label: string; element: string; examples: string[] }>> = {
  spring_kite: [
    { label: '🕒 什么时候', element: '时间', examples: ['阳春三月的一天', '星期天的早晨', '春光明媚的下午'] },
    { label: '📍 在什么地方', element: '地点', examples: ['绿油油的草地上', '热闹的公园里', '松软的草坪上'] },
    { label: '👤 都有哪些人', element: '人物', examples: ['活泼可爱的小朋友们', '小明、小刚和豆豆', '我和好朋友'] },
    { label: '✨ 怎么做的呢', element: '事物/动作', examples: ['快活地放风筝', '扯着风筝线拼命跑', '抬头看五颜六色的风筝'] },
    { label: '❤️ 感觉怎么样', element: '心情/感受', examples: ['笑声传得很远很远', '心里像吃了蜜一样甜', '乐得合不拢嘴'] },
  ],
  rainy_umbrella: [
    { label: '🕒 什么时候', element: '时间', examples: ['放学的时候', '下着毛毛雨的傍晚', '一个雨天下午'] },
    { label: '📍 在什么地方', element: '地点', examples: ['放学回家的路上', '湿漉漉的花坛旁', '斑马线人行道上'] },
    { label: '👤 都有哪些人', element: '人物', examples: ['懂事的小明和小红', '合撑一把大红伞的同学们', '有爱心的小帮手'] },
    { label: '✨ 怎么做的呢', element: '事物/动作', examples: ['发现淋雨的可怜小猫', '把伞轻轻地歪向它', '踩着雨靴和水坑'] },
    { label: '❤️ 感觉怎么样', element: '心情/感受', examples: ['心里觉得超级暖洋洋', '高兴得哼着小曲儿', '一起撑伞回家真快乐'] },
  ],
  winter_snowman: [
    { label: '🕒 什么时候', element: '时间', examples: ['寒风呼呼的冬天', '大雪过后的清晨', '星期天的上午'] },
    { label: '📍 在什么地方', element: '地点', examples: ['厚粉堆里的雪地上', '铺满大雪的小区院子里', '冬日的空地上'] },
    { label: '👤 都有哪些人', element: '人物', examples: ['欢蹦乱跳的小朋友们', '小华和小胖', '我们大家伙'] },
    { label: '✨ 怎么做的呢', element: '事物/动作', examples: ['热火朝天地堆起雪人', '用胡萝卜插在脸上做鼻子', '给雪人系上红围巾'] },
    { label: '❤️ 感觉怎么样', element: '心情/感受', examples: ['身上热烘烘的', '拍着手哈哈大笑', '觉得冬天真有趣呀'] },
  ],
  summer_beach: [
    { label: '🕒 什么时候', element: '时间', examples: ['暑期的夏日清晨', '夏日炎炎的下午', '金灿灿的落日时刻'] },
    { label: '📍 在什么地方', element: '地点', examples: ['辽阔的金黄沙滩上', '高大的椰树下', '凉爽的海浪拍打处'] },
    { label: '👤 都有哪些人', element: '人物', examples: ['快乐的小亮和小丽', '放暑假回来的孩子们', '我们一家人'] },
    { label: '✨ 怎么做的呢', element: '事物/动作', examples: ['筑起宏伟的城堡', '弯着腰捡五彩斑斓的贝壳', '逗弄横着爬的小沙蟹'] },
    { label: '❤️ 感觉怎么样', element: '心情/感受', examples: ['像自由的小海鸥一样快乐', '玩得满头大汗却很开怀', '沙滩上都是欢歌笑语'] },
  ]
};

interface DraftScaffoldProps {
  scene: Scene;
  exploredWords: string[];
  onAddText: (text: string) => void;
  draftText: string;
  aiSettings: AISettings;
  onOpenSettings: () => void;
}

export default function DraftScaffold({ scene, exploredWords, onAddText, draftText, aiSettings, onOpenSettings }: DraftScaffoldProps) {
  const [activeTab, setActiveTab] = useState<'tips' | 'magic'>('tips');
  const [magicHints, setMagicHints] = useState<MagicHint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tipsList = STATIC_SCAFFOLD[scene.id] || STATIC_SCAFFOLD.spring_kite;

  // Determine if child has matched elements in their text
  const checkMatched = (examples: string[]) => {
    return examples.some(ex => draftText.includes(ex.slice(0, 4)) || draftText.includes(ex.slice(-4)));
  };

  const getMagicHints = async () => {
    if (!aiSettings.apiKey) {
      setError("请先配置您的 API Key 密钥以启动定制故事和启发式练习！");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await generateHints(aiSettings, scene, exploredWords);
      setMagicHints(data);
      setActiveTab('magic');
    } catch (err: any) {
      console.error(err);
      setError(err.message || '魔法生成故障了。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="draft-scaffold-root" className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden shadow-inner p-5 space-y-4">
      
      {/* Tab Select Header */}
      <div className="flex border-b border-slate-100 pb-2 gap-4">
        <button
          id="tab-static-tips"
          onClick={() => setActiveTab('tips')}
          className={`pb-2 px-1 text-sm font-bold font-sans tracking-tight border-b-2 transition duration-200 ${
            activeTab === 'tips' ? 'border-amber-500 text-amber-600 font-extrabold' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          📝 5大写作魔法支架
        </button>
        
        <button
          id="tab-magic-spark"
          onClick={() => {
            if (magicHints.length > 0) {
              setActiveTab('magic');
            } else {
              getMagicHints();
            }
          }}
          className={`pb-2 px-1 text-sm font-bold font-sans tracking-tight border-b-2 flex items-center gap-1.5 transition duration-200 ${
            activeTab === 'magic' ? 'border-indigo-500 text-indigo-600 font-extrabold' : 'border-transparent text-slate-400 hover:text-indigo-500'
          }`}
        >
          <Sparkles className="w-4 h-4 animate-pulse" /> AI 创意魔法句式 ({magicHints.length > 0 ? '已就绪' : '获取'})
        </button>
      </div>

      {activeTab === 'tips' ? (
        /* Traditional step scaffolding list */
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          <p className="text-xs text-slate-500 leading-normal mb-1 font-sans">
            💡 看图写话秘籍：依次回答这5个小问题，就能拼出一个最棒的长故事啦！点击绿色词条可以直接放进写话本哦！
          </p>
          
          <div className="space-y-3">
            {tipsList.map((step, idx) => {
              const matched = checkMatched(step.examples);
              return (
                <div key={idx} className="bg-slate-50 border border-slate-100/50 rounded-2xl p-3 relative">
                  {/* Step index */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-slate-700">{step.label}</span>
                    {matched ? (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> 已写到
                      </span>
                    ) : (
                      <span className="text-xs text-slate-450 uppercase font-mono font-bold">待解锁</span>
                    )}
                  </div>
                  
                  {/* Selectable Words Tag */}
                  <div className="flex flex-wrap gap-1.5">
                    {step.examples.map((ex, exIdx) => (
                      <button
                        key={exIdx}
                        id={`btn-add-scaffold-example-${idx}-${exIdx}`}
                        onClick={() => onAddText(ex)}
                        className="text-sm bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-850 border border-slate-200 hover:border-emerald-300 rounded-xl px-3 py-1.5 transition duration-150 active:scale-95 shadow-sm text-left truncate max-w-[200px]"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Gemini AI generated magic prompt templates */
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-500 font-sans leading-tight">
              贝贝老师分析你选中的词，为你定制了故事开头和句式！
            </span>
            <button
              id="btn-re-generate-hints"
              onClick={getMagicHints}
              disabled={loading}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-extrabold flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              🔄 换一换
            </button>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-sm text-slate-550 animate-pulse font-sans">
                  小熊猫比划着仙女棒，正在酝酿魔法词句...
                </p>
              </div>
            ) : error ? (
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-center text-sm text-indigo-800 space-y-3">
                <p className="font-medium leading-relaxed">{error}</p>
                {!aiSettings.apiKey ? (
                  <button
                    id="btn-go-settings-from-scaffold"
                    onClick={onOpenSettings}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-1.5 font-bold transition mx-auto block text-xs active:scale-95"
                  >
                    ⚙️ 点我配置 AI 助手密钥
                  </button>
                ) : (
                  <button
                    id="btn-retry-hints"
                    onClick={getMagicHints}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-1.5 font-bold transition mx-auto block text-xs active:scale-95"
                  >
                    重试魔法生成 🔮
                  </button>
                )}
              </div>
            ) : magicHints.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3.5"
              >
                {magicHints.map((hint, idx) => (
                  <div key={idx} className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-3.5 space-y-2.5 relative">
                    <div className="flex items-start gap-1">
                      <span className="text-indigo-500 font-sans text-sm">💡</span>
                      <h5 className="text-sm font-black text-indigo-950 pr-4">{hint.question}</h5>
                    </div>

                    {/* Template container */}
                    <div className="bg-white rounded-xl p-2.5 border border-indigo-100 flex justify-between items-center gap-2 shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed pl-1 flex-1 font-sans">
                        “ {hint.template} ”
                      </p>
                      <button
                        id={`btn-add-hint-template-${idx}`}
                        onClick={() => onAddText(hint.template)}
                        type="button"
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold shrink-0 px-2.5 py-1.5 rounded-lg flex items-center gap-0.5"
                      >
                        学写 <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Word recommendations */}
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="text-xs font-black text-indigo-600 tracking-wider">好词推荐:</span>
                      <div className="flex flex-wrap gap-1">
                        {hint.suggestedWords.map((word, wIdx) => (
                          <button
                            key={wIdx}
                            id={`btn-add-hint-word-${idx}-${wIdx}`}
                            onClick={() => onAddText(word)}
                            className="bg-white border border-indigo-100 text-xs font-medium text-slate-700 hover:text-indigo-800 hover:bg-indigo-50 px-2.5 py-1.5 rounded-full"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-sm space-y-3">
                <p>点击下方“换一换”或进入此页面，召唤贝贝老师为您定制专属灵感句式哦！✨</p>
                {!aiSettings.apiKey && (
                  <button
                    id="btn-init-settings-from-scaffold"
                    onClick={onOpenSettings}
                    className="bg-indigo-55 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-xl px-4 py-2 font-bold transition mx-auto flex items-center justify-center gap-1.5 text-xs active:scale-95"
                  >
                    ⚙️ 极速配置 API Key
                  </button>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

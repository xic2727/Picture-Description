import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCENES_DATA } from './scenesData';
import { Scene, ExplorePoint, AIFeedback, GradeHistoryItem } from './types';
import SceneVisualizer from './components/SceneVisualizer';
import DraftScaffold from './components/DraftScaffold';
import GradeReport from './components/GradeReport';
import { getAISettings, saveAISettings, gradeSubmission, AISettings, PRESETS } from './lib/aiService';
import { 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Eraser, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  Star, 
  ChevronRight, 
  Eye, 
  MessageCircle,
  Lightbulb,
  Menu,
  ChevronLeft,
  Settings
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'look_and_write_history';

export default function App() {
  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  
  // Application State
  const [currentScene, setCurrentScene] = useState<Scene>(SCENES_DATA[0]);
  const [exploredIds, setExploredIds] = useState<string[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<ExplorePoint | null>(null);
  const [draftText, setDraftText] = useState<string>('');
  const [isPinyinMode, setIsPinyinMode] = useState<boolean>(true);
  
  // AI States
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('🐼 正在酝酿魔法能量...');
  
  // AI Settings
  const [aiSettings, setAiSettings] = useState<AISettings>(getAISettings());
  const [showAiSettings, setShowAiSettings] = useState<boolean>(false);
  
  // History & Rewards
  const [history, setHistory] = useState<GradeHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [totalStars, setTotalStars] = useState<number>(0);

  // Automatically adjust sidebar on mobile/tablet vs desktop
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as GradeHistoryItem[];
        setHistory(parsed);
        // compute total stars
        const sum = parsed.reduce((acc, h) => acc + h.stars, 0);
        setTotalStars(sum);
      }
    } catch (e) {
      console.error("Failed to load history:", e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (newRecord: GradeHistoryItem) => {
    const updated = [newRecord, ...history];
    setHistory(updated);
    setTotalStars(prev => prev + newRecord.stars);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };

  // Helper: append exemplary text or vocabulary to the draft box smoothly
  const appendTextToDraft = (phrase: string) => {
    setDraftText((prev) => {
      const trimmed = prev.trim();
      if (trimmed.length === 0) return phrase;
      
      // Smart punctuation separator
      const lastChar = trimmed[trimmed.length - 1];
      const punctuation = ['。', '！', '？', '，', ',', '.'];
      if (punctuation.includes(lastChar)) {
        return `${trimmed}${phrase}`;
      } else {
        return `${trimmed}，${phrase}`;
      }
    });
  };

  const handleExplore = (point: ExplorePoint) => {
    if (!exploredIds.includes(point.id)) {
      setExploredIds(prev => [...prev, point.id]);
    }
  };

  const handleSceneChange = (scene: Scene) => {
    setCurrentScene(scene);
    setExploredIds([]);
    setSelectedPoint(null);
    setDraftText('');
    setGradeError(null);
    setAiFeedback(null);
  };

  // Clear workspace
  const handleClearDraft = () => {
    if (confirm("要擦干净小本子，重新写吗？")) {
      setDraftText('');
    }
  };

  // Immersive AI Grading Flow Submit Handler
  const handleGradeSubmission = async () => {
    if (!draftText || draftText.trim().length < 5) {
      alert("写话内容太少啦，多写几个字吧（至少5个字）！贝贝老师相信你！");
      return;
    }

    if (!aiSettings.apiKey) {
      setGradeError("请先点击右上角的【⚙️ AI 助手设置】按钮配置 API Key 密钥，才能召唤熊猫贝贝批改作业哦！");
      setShowAiSettings(true);
      return;
    }

    setIsGrading(true);
    setGradeError(null);
    setAiFeedback(null);

    // Dynamic loading texts sequence to make delay delightfully gamified for kids
    const steps = [
      '🐼 贝贝老师正戴上放大镜，仔细看图画...',
      '🎨 正在对比你找齐磁汇秘籍...',
      '✍️ 正在用红色粉笔圈画你的闪光金句...',
      '🍬 正在为您撰写甜甜的评语和奖金星级...',
      '🏅 呼！大奖章正在抛光，马上送达拉！'
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        setLoadingStep(steps[currentStepIdx]);
      }
    }, 1800);

    try {
      const reportData = await gradeSubmission(aiSettings, currentScene, draftText);

      clearInterval(interval);

      setAiFeedback(reportData);

      // Save record in local history
      const historyItem: GradeHistoryItem = {
        id: Date.now().toString(),
        sceneId: currentScene.id,
        sceneTitle: currentScene.title,
        childText: draftText,
        stars: reportData.stars,
        badge: reportData.badge,
        summary: reportData.summary,
        timestamp: new Date().toLocaleDateString('zh-CN', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      saveToHistory(historyItem);

    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setGradeError(err.message || "贝贝老师太忙了，网络打了个小呼噜，请稍后再试。");
    } finally {
      setIsGrading(false);
    }
  };

  // Recover custom history item writeup draft
  const handleRecoverHistory = (item: GradeHistoryItem) => {
    const sceneMatch = SCENES_DATA.find(s => s.id === item.sceneId);
    if (sceneMatch) {
      setCurrentScene(sceneMatch);
    }
    setDraftText(item.childText);
    setAiFeedback({
      stars: item.stars,
      badge: item.badge,
      summary: item.summary,
      goldSentences: [],
      missingElements: [],
      rework: item.childText // Fallback display
    });
    setShowHistory(false);
  };

  const isAllExplored = exploredIds.length === currentScene.explorePoints.length;

  return (
    <div id="main-root" className="min-h-screen bg-[#f3f4f6]" style={{ backgroundImage: "radial-gradient(#e5e7eb 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}>
      
      {/* Visual Navigation Top Header */}
      <header className="bg-white border-b-4 border-amber-300 sticky top-0 z-40 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          
          {/* Logo Brand / Avatar */}
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 p-2 rounded-2xl shadow-inner border-2 border-white animate-bounce-slow text-2xl">
              🐼
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center justify-center sm:justify-start gap-1">
                儿童看图写话乐园 
                <span className="text-xs bg-rose-500 text-white font-sans px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider scale-95">
                  AI 语文精灵
                </span>
              </h1>
              
              {/* Slogan */}
              <div className="text-slate-500 text-sm font-semibold font-sans flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <span>🌟 拼音拼写伴读</span>
                <span>•</span>
                <span>🎨 互动趣味图像</span>
                <span>•</span>
                <span>💖 鼓励性无压批改</span>
              </div>
            </div>
          </div>

          {/* User Achievement Panel */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-center sm:justify-end">
            
            {/* Sidebar Toggle Button */}
            <button
              id="btn-toggle-sidebar"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`border-2 px-3.5 py-1.5 rounded-2xl font-black font-sans text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95 ${
                isSidebarOpen
                  ? 'bg-amber-100 border-amber-300 text-amber-805'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Menu className="w-4 h-4" />
              <span>{isSidebarOpen ? '收起画册' : `看画册 (${SCENES_DATA.length})`}</span>
            </button>

            {/* Total progress medal */}
            <div className="bg-amber-50 border-2 border-amber-200/50 rounded-2xl px-3.5 py-1.5 flex items-center gap-2 shadow-sm">
              <Trophy className="w-5 h-5 text-amber-500 fill-current animate-pulse" />
              <div>
                <span className="text-[11px] text-amber-600 font-bold block leading-none">荣誉大奖章星数</span>
                <span className="text-lg font-black text-slate-850 tracking-tight">
                  ⭐ {totalStars} 个能量星
                </span>
              </div>
            </div>

            {/* History Toggle Button */}
            <button
              id="btn-toggle-history"
              onClick={() => setShowHistory(!showHistory)}
              className="bg-indigo-50 border-2 border-indigo-100 hover:bg-indigo-100/60 text-indigo-700 px-4 py-2 rounded-2xl font-bold font-sans text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              我的写话册
            </button>

            {/* AI Settings Button */}
            <button
              id="btn-open-ai-settings"
              onClick={() => setShowAiSettings(true)}
              className="bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-700 px-4 py-2 rounded-2xl font-bold font-sans text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Settings className="w-4 h-4" />
              AI 助手设置
            </button>
          </div>

        </div>
      </header>

      {/* Main Body workspace container with responsive collapsible sidebar */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-start relative">
        
        {/* Mobile/Tablet Drawer Backdrop Overlay */}
        {isSidebarOpen && (
          <div 
            id="sidebar-backdrop-mobile"
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Dynamic Collapsible Left Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              id="sidebar-panel"
              initial={{ x: -280, opacity: 0, width: 0 }}
              animate={{ x: 0, opacity: 1, width: 280 }}
              exit={{ x: -280, opacity: 0, width: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 bg-white border-r-4 border-amber-200 z-50 shadow-2xl overflow-hidden lg:static lg:block lg:z-10 lg:shadow-none lg:border-r-0 shrink-0 self-stretch"
            >
              <div className="w-[280px] p-4 h-full box-border flex flex-col space-y-4">
                
                {/* Visual Header Box */}
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-4 text-slate-800 shadow-inner border-2 border-white relative overflow-hidden shrink-0">
                  <div className="absolute -right-6 -bottom-6 text-6xl opacity-15">🎨</div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] bg-white text-amber-800 px-2 py-0.5 rounded-full font-black">
                      今日推送 📚
                    </span>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="text-amber-950 font-black text-xs hover:bg-white/20 px-2 py-0.5 rounded-lg transition"
                      title="收起画册"
                    >
                      收起 ✕
                    </button>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-800 tracking-tight">
                    🖼️ 魔法看图画册
                  </h3>
                  <p className="text-[10px] text-amber-950/70 font-sans tracking-wide leading-relaxed mt-1">
                    点击下方挑选好看的水墨画纸！每天早晚都会推送趣味多选主题！
                  </p>
                </div>

                {/* Subtitle / Counter indicators */}
                <div className="flex justify-between items-center px-1 shrink-0">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">
                    画册主题 ({SCENES_DATA.length}幅)
                  </span>
                  
                  <span className="text-[11px] text-rose-500 font-black flex items-center gap-0.5">
                    🎖️ 已挑战: {SCENES_DATA.filter(s => history.some(h => h.sceneId === s.id)).length} / {SCENES_DATA.length}
                  </span>
                </div>

                {/* List of Scenes with finished star medals */}
                <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
                  {SCENES_DATA.map((scene) => {
                    const isActive = currentScene.id === scene.id;
                    const isCompleted = history.some(item => item.sceneId === scene.id);
                    const matchingRecords = history.filter(item => item.sceneId === scene.id);
                    const bestStars = matchingRecords.length > 0 ? Math.max(...matchingRecords.map(r => r.stars)) : 1;

                    return (
                      <button
                        key={scene.id}
                        id={`sidebar-scene-${scene.id}`}
                        onClick={() => {
                          handleSceneChange(scene);
                          if (window.innerWidth < 1024) {
                            setIsSidebarOpen(false);
                          }
                        }}
                        className={`w-full p-3 rounded-2xl text-left border-b-4 transition duration-200 relative group overflow-hidden flex items-center gap-3 ${
                          isActive
                            ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-indigo-950 shadow-md scale-[1.01]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300 shadow-sm'
                        }`}
                      >
                        {/* Interactive decorative emoji */}
                        <span className="absolute -right-2 -bottom-2 text-3xl opacity-5 group-hover:scale-125 transition duration-300">
                          {scene.emoji}
                        </span>

                        <span className="text-2xl shrink-0 p-1 bg-white/90 rounded-xl shadow-inner border border-slate-100/50">
                          {scene.emoji}
                        </span>

                        <div className="min-w-0 flex-1">
                          <span className={`text-[10px] uppercase font-bold block leading-none truncate ${isActive ? 'text-indigo-300' : 'text-slate-400'}`}>
                            {scene.pinyin}
                          </span>
                          <h4 className={`text-base font-black truncate mt-1.5 ${isActive ? 'text-white' : 'text-slate-800'}`}>
                            {scene.title}
                          </h4>

                          {/* Completed info label */}
                          {isCompleted && (
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-bold">
                                已写过
                              </span>
                              <div className="flex text-amber-400">
                                {Array.from({ length: bestStars }).map((_, idx) => (
                                  <span key={idx} className="text-[11px] -ml-0.5">⭐</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping absolute top-2 right-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Info Card hint footer in sidebar */}
                <div className="bg-amber-50/50 border border-amber-100/50 rounded-2xl p-2.5 text-center text-xs text-amber-805 font-bold shrink-0">
                  💡 每天早晨 8 点和傍晚 6 点<br/>获取今日推送的写话秘籍！
                </div>

              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* MAIN WORKING AREA WORKSPACE (Slides or scales smoothly) */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Quick Collapse Toggler Indicator inside core workflow area as helpful guide */}
          {!isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🎨</span>
                <span className="text-xs text-amber-800 font-bold">
                  为了让你能够专注地写话，画册已经收起啦！
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-xs bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-3 py-1 rounded-xl transition shadow-sm active:scale-95"
              >
                展开画册 🗺️
              </button>
            </motion.div>
          )}

          {/* Workspace Layout Columns (Left: interactive scene; Right: editor & wizard) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: 3/2 Aspect Vector Illustration Card (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 space-y-4">
              
              {/* Scene instructions Header */}
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-sm bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md shrink-0">
                    🔍 探索词汇
                  </span>
                  
                  <div className="truncate">
                    <span className="text-xs text-slate-400 font-bold block leading-none truncate font-sans">{currentScene.pinyin}</span>
                    <h2 className="text-lg font-black text-slate-800 truncate leading-none mt-1.5">
                      看图大发现：点击画中闪光点探索词汇
                    </h2>
                  </div>
                </div>

                {/* Explorer stars progress bubble */}
                <div className={`px-3 py-1 rounded-full font-bold text-sm shrink-0 flex items-center gap-1.5 ${
                  isAllExplored 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  <span>🕵️‍♂️ 已收获:</span>
                  <span className="font-extrabold text-base">{exploredIds.length}</span>
                  <span>/</span>
                  <span>{currentScene.explorePoints.length} 词</span>
                  {isAllExplored && <span className="animate-bounce">🌟</span>}
                </div>
              </div>

              {/* Vector Core Illustrator */}
              <SceneVisualizer 
                scene={currentScene} 
                exploredIds={exploredIds}
                onExplorePointClick={(pt) => handleExplore(pt)}
                onAddTextToDraft={appendTextToDraft}
                selectedPoint={selectedPoint}
                setSelectedPoint={setSelectedPoint}
              />

              {/* Explored Words Cloud */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-400 flex items-center gap-0.5">
                    🍭 已发现的好词行李箱 ({exploredIds.length} / {currentScene.explorePoints.length})
                  </span>
                  {isAllExplored && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs text-emerald-600 font-extrabold"
                    >
                      🎉 观察力太秀啦！全部探索完成！
                    </motion.span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 min-h-11 p-3 bg-slate-50 border border-slate-100 shadow-inner rounded-2xl items-center">
                  {exploredIds.length > 0 ? (
                    currentScene.explorePoints
                      .filter(pt => exploredIds.includes(pt.id))
                      .map((pt) => (
                        <motion.button
                          id={`collected-tag-${pt.id}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={pt.id}
                          onClick={() => appendTextToDraft(pt.label)}
                          className="bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-900 px-3 py-1.5 rounded-xl shadow-sm text-sm font-bold text-left cursor-pointer transition flex flex-col"
                        >
                          <span className="text-[10px] font-mono opacity-50 block leading-none">{pt.pinyin}</span>
                          <span className="text-base font-black leading-tight mt-1">{pt.label}</span>
                        </motion.button>
                      ))
                  ) : (
                    <p className="text-sm text-slate-400 w-full text-center leading-normal">
                      这里空空如也，请快快点击图画中的✨黄色闪亮小星星✨，找出隐藏的水墨故事好词吧！
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* General Description Context helpful card */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex gap-3.5 items-start">
              <span className="text-2xl mt-0.5 shrink-0">🎒</span>
              <div>
                <h4 className="text-base font-black text-slate-800 leading-tight">画幅大意背景知识</h4>
                <p className="text-sm text-slate-400 font-mono mt-0.5">Understanding Scene Framework</p>
                <p className="text-sm text-slate-650 mt-2 leading-relaxed">
                  {currentScene.description}
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Editor, Scaffoldings, Draft-box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Scaffolding Checklist / Step wizard tabs */}
            <DraftScaffold 
              scene={currentScene} 
              exploredWords={currentScene.explorePoints.filter(p => exploredIds.includes(p.id)).map(p => p.label)}
              onAddText={appendTextToDraft}
              draftText={draftText}
              aiSettings={aiSettings}
              onOpenSettings={() => setShowAiSettings(true)}
            />

            {/* Core Writing Workbook */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
              
              {/* Toolbar Section header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📓</span>
                  <div>
                    <h3 className="text-base font-black text-slate-800 leading-none">看图写话练习本</h3>
                    <p className="text-xs text-slate-400 mt-0.5">My Creative Writing Grid</p>
                  </div>
                </div>

                {/* Toolbar buttons */}
                <div className="flex gap-2.5">
                  <button
                    id="btn-toggle-pinyin-grid"
                    onClick={() => setIsPinyinMode(!isPinyinMode)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-black transition ${
                      isPinyinMode 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                    title="开启拼音格子线辅助"
                  >
                    {isPinyinMode ? '🟢 拼音田字格' : '⚪ 纯文本框'}
                  </button>

                  <button
                    id="btn-erase-draft"
                    onClick={handleClearDraft}
                    className="text-sm text-slate-400 hover:text-rose-500 flex items-center gap-1 transition active:scale-90"
                    title="擦掉小本子"
                  >
                    <Eraser className="w-4 h-4" /> 擦除
                  </button>
                </div>
              </div>

              {/* Real Classroom school style workbook background textbox */}
              <div className="relative">
                <textarea
                  id="child-writing-textarea"
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="星期天，天气真晴朗呀！小朋友们在绿油油的草坪上面放风筝...

(可以用手指点击左边的“词汇行李箱”，或者选择上面的“写作魔法支架”，好词句就会一键飞进写话本里哦！)"
                  rows={7}
                  className={`w-full p-4 text-slate-705 placeholder-slate-400 outline-none rounded-2xl text-lg tracking-wide transition border-2 ${
                    isPinyinMode 
                      ? 'bg-[#faf8f5] dark:placeholder-slate-400 font-sans border-rose-100/70 shadow-inner' 
                      : 'bg-slate-50 font-serif border-slate-100'
                  }`}
                  style={isPinyinMode ? {
                    backgroundImage: 'linear-gradient(#fecdd3 1px, transparent 1px), linear-gradient(90deg, #fecdd3 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                    lineHeight: '36px'
                  } : {}}
                />

                {/* Character Counter watermark */}
                <div className="absolute right-3.5 bottom-3 text-xs font-bold text-slate-400 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-100 font-mono">
                  写了: <span className="text-slate-700">{draftText.length}</span> / 建议: 20-150字
                </div>
              </div>

              {/* Grading Submission Trigger Area */}
              <div className="space-y-3">
                <button
                  id="btn-trigger-grading"
                  onClick={handleGradeSubmission}
                  disabled={isGrading || draftText.trim().length === 0}
                  className="w-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] disabled:from-slate-200 disabled:to-slate-300 transform active:scale-98 disabled:pointer-events-none text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 text-lg"
                >
                  <Sparkles className="w-5.5 h-5.5 text-yellow-300 animate-pulse" />
                  写好啦！召唤熊猫贝贝批改 ✨
                </button>

                <p className="text-xs text-slate-400 text-center leading-normal font-medium">
                  💡 贝贝老师的批改超级温柔哦，不仅给你大奖章，还会帮你找出错别字，教你把短句变成更美丽的成语文章！
                </p>
              </div>

              {/* Submission active spinner */}
              {isGrading && (
                <div id="grading-loader" className="p-5 border-2 border-indigo-100 rounded-3xl bg-indigo-50/50 flex flex-col items-center gap-3">
                  <motion.div
                    className="text-4xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    🐼
                  </motion.div>
                  <h4 className="text-sm font-black text-indigo-750 animate-pulse">{loadingStep}</h4>
                  <p className="text-xs text-slate-400 font-sans">请耐心等待片刻，大奖章打磨中...</p>
                </div>
              )}

              {/* Error messages if API fails */}
              {gradeError && (
                <div id="error-alert-banner" className="bg-rose-50 border-2 border-rose-100 rounded-2xl p-4 text-center">
                  <p className="text-xs text-rose-800 font-medium">
                    ⚠️ {gradeError}
                  </p>
                  
                  <button
                    id="btn-grade-retry"
                    onClick={handleGradeSubmission}
                    className="mt-2.5 text-xs bg-rose-600 active:scale-95 text-white font-bold px-4 py-1.5 rounded-full"
                  >
                    重新提交批改
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* AI GRADING REPORT BOARD OVERLAY (Display when feedback is generated) */}
        <AnimatePresence>
          {aiFeedback && (
            <motion.section
              id="report-section-overlay"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="mt-6 scroll-mt-24 z-30"
            >
              <GradeReport 
                report={aiFeedback} 
                onClose={() => setAiFeedback(null)}
                childText={draftText} 
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* STUDY HISTORICAL LOGS - WRITING JOURNAL INDEX (滑出或展示) */}
        {showHistory && (
          <section id="history-section" className="bg-white rounded-3xl p-5 border border-slate-100 shadow-md">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <h2 className="text-sm font-black text-slate-800 leading-none">我的看图写话成长日志</h2>
                  <p className="text-[9px] text-slate-400 mt-0.5">My Writing Milestone Portfolio</p>
                </div>
              </div>

              <button
                id="btn-close-history-ledger"
                onClick={() => setShowHistory(false)}
                className="text-xs text-indigo-600 hover:text-indigo-850 font-black cursor-pointer"
              >
                收起日志
              </button>
            </div>

            {history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((record) => (
                  <div
                    key={record.id}
                    id={`history-card-${record.id}`}
                    className="border border-slate-100 bg-slate-50/50 rounded-2xl p-4 relative hover:shadow-md transition duration-200"
                  >
                    <div className="flex justify-between items-start gap-1 mb-2">
                      <div>
                        <span className="text-[9px] bg-slate-250/70 text-slate-400 font-bold block leading-none font-mono mb-1">
                          {record.timestamp}
                        </span>
                        
                        <h3 className="font-extrabold text-sm text-slate-800">{record.sceneTitle}</h3>
                      </div>

                      <div className="flex text-amber-400 shrink-0 select-none">
                        {Array.from({ length: record.stars }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 font-mono line-clamp-2 max-h-8 mb-3 whitespace-pre-wrap leading-normal">
                      “ {record.childText} ”
                    </p>

                    <div className="flex justify-between items-center border-t border-slate-100/60 pt-2 text-[11px]">
                      <span className="text-xs text-rose-600 font-black truncate max-w-[140px]" title={record.badge}>
                        🎖️ {record.badge}
                      </span>

                      <button
                        id={`btn-load-history-${record.id}`}
                        onClick={() => handleRecoverHistory(record)}
                        className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center shrink-0 cursor-pointer"
                      >
                        温习批改 <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs text-sans">
                你还没有写过小习作呢，赶快完成上面其中一幅画，把荣誉勋章填满这本写话册吧！💪
              </div>
            )}

          </section>
        )}

        </div> {/* Close flex-1 w-full space-y-6 workspace wrapper */}
      </main>

      {/* Sweet Footer attribution */}
      <footer className="bg-white border-t border-slate-200 text-slate-400 text-xs py-6 mt-12 text-center select-none font-sans leading-relaxed">
        <p>🍭 儿童看图写话趣味乐园 • 专为低年级语文兴趣开发设计</p>
        <p className="text-[10px] text-slate-350 mt-1">
          Powered by Gemini 3.5 AI Super Teaching Assistant & React Motion Suite
        </p>
      </footer>

      {/* AI Settings Modal */}
      <AnimatePresence>
        {showAiSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full border-4 border-emerald-400 shadow-2xl relative overflow-hidden"
            >
              {/* Sparkle background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-60 -z-10" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 leading-tight">⚙️ AI 助手配置中心</h2>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">让可爱的 AI 老师（贝贝老师）为您一对一批改和提供灵感！</p>
                  </div>
                </div>
                
                <button
                  id="btn-close-settings-modal"
                  onClick={() => setShowAiSettings(false)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full w-8 h-8 flex items-center justify-center transition active:scale-95 border border-slate-200"
                >
                  ✕
                </button>
              </div>

              {/* Form container */}
              <div className="space-y-4">
                
                {/* Provider Selector Preset */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                    <span>1. 选择 AI 服务提供商</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">极速预设</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(PRESETS).map(([key, value]) => {
                      const isSelected = aiSettings.preset === key;
                      return (
                        <button
                          key={key}
                          id={`preset-btn-${key}`}
                          onClick={() => {
                            const updated: AISettings = {
                              apiKey: aiSettings.apiKey,
                              preset: key as any,
                              baseUrl: value.baseUrl,
                              model: value.model,
                            };
                            setAiSettings(updated);
                          }}
                          className={`px-3 py-2.5 rounded-2xl text-xs font-bold font-sans transition-all active:scale-95 border-2 text-center flex flex-col items-center justify-center gap-1 ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-850 shadow-inner'
                              : 'bg-white border-slate-150 text-slate-550 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-md">
                            {key === 'openai' ? '🇺🇸' : 
                             key === 'deepseek' ? '🇨🇳' : 
                             key === 'gemini' ? '🪐' : 
                             key === 'moonshot' ? '🌙' : 
                             key === 'siliconflow' ? '⚡' : '⚙️'}
                          </span>
                          <span>{value.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* API Key Input */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex justify-between items-center">
                    <span>2. AI 接口密钥 (API Key)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="input-api-key"
                      type="text"
                      placeholder="例如: sk-..."
                      value={aiSettings.apiKey}
                      onChange={(e) => setAiSettings({ ...aiSettings, apiKey: e.target.value })}
                      className="w-full text-sm bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white rounded-2xl px-3.5 py-2.5 outline-none font-mono transition"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-1">
                    🔒 您的密钥仅保存在用户浏览器本地缓存中（localStorage），绝对不会上传到任何中间服务器，请放心使用。
                  </p>
                </div>

                {/* API Base URL */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">
                    3. 接口基础链接 (API Base URL)
                  </label>
                  <input
                    id="input-base-url"
                    type="text"
                    placeholder="https://..."
                    value={aiSettings.baseUrl}
                    onChange={(e) => setAiSettings({ ...aiSettings, baseUrl: e.target.value })}
                    className="w-full text-sm bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white rounded-2xl px-3.5 py-2.5 outline-none font-mono transition"
                  />
                </div>

                {/* Model Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">
                    4. 模型名称 (Model Name)
                  </label>
                  <input
                    id="input-model-name"
                    type="text"
                    placeholder="例如: gpt-4o-mini 或 deepseek-chat"
                    value={aiSettings.model}
                    onChange={(e) => setAiSettings({ ...aiSettings, model: e.target.value })}
                    className="w-full text-sm bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white rounded-2xl px-3.5 py-2.5 outline-none font-mono transition"
                  />
                </div>

              </div>

              {/* Action buttons footer inside modal */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  id="btn-save-ai-settings"
                  onClick={() => {
                    saveAISettings(aiSettings);
                    setShowAiSettings(false);
                    alert("🎉 恭喜！AI 助手接口设置及保存成功！现在可开启全景批改和魔法创意啦！");
                  }}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm py-3 px-6 rounded-2xl transition active:scale-95 shadow-md flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 fill-current text-white/80" />
                  保存并关闭配置
                </button>

                <button
                  id="btn-cancel-ai-settings"
                  onClick={() => {
                    setAiSettings(getAISettings());
                    setShowAiSettings(false);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm py-3 px-5 rounded-2xl transition active:scale-95"
                >
                  取消
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

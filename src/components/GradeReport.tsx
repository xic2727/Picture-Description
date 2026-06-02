import { AIFeedback } from '../types';
import { motion } from 'motion/react';
import { Trophy, Award, Sparkles, Copy, X, Star, Volume2, Highlighter } from 'lucide-react';
import { useState } from 'react';

interface GradeReportProps {
  report: AIFeedback;
  onClose: () => void;
  childText: string;
}

export default function GradeReport({ report, onClose, childText }: GradeReportProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(report.rework);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakReworkText = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(report.rework);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85; // comforting reading pace
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakTeacherReview = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(report.summary);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div id="grade-report-root" className="bg-white rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl relative">
      {/* Top Banner Accent */}
      <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 h-4 w-full" />

      {/* Main content wrapper */}
      <div className="p-6 md:p-8">
        
        {/* Header Action Row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐼</span>
            <div>
              <h2 className="text-2xl font-black text-slate-850 leading-none">贝贝老师的批改报告</h2>
              <p className="text-xs text-slate-400 mt-1 font-sans">Look-and-Write AI Evaluation Portfolio</p>
            </div>
          </div>
          <button
            id="btn-close-report"
            onClick={onClose}
            className="hover:bg-slate-100 active:scale-95 text-slate-400 hover:text-slate-600 p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Big Badge & Star Rating Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-amber-50/50 rounded-3xl p-6 border-2 border-amber-100/70 mb-8 items-center">
          
          {/* Stars visualizer column (4 cols on wide) */}
          <div className="md:col-span-4 text-center md:border-r border-amber-200/50 md:pr-4">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full uppercase tracking-wider block w-max mx-auto mb-2.5">
              写作星级系数
            </span>
            
            {/* Stars animation */}
            <div className="flex justify-center items-center gap-1.5 mb-1.5">
              {Array.from({ length: 5 }).map((_, index) => {
                const filled = index < report.stars;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Star className={`w-9 h-9 ${filled ? 'fill-amber-400 text-amber-400 drop-shadow' : 'text-slate-200 fill-slate-100'}`} />
                  </motion.div>
                );
              })}
            </div>
            <p className="text-base font-bold text-slate-600 font-mono mt-1">
              满星收获: <span className="text-amber-500 text-xl font-black">{report.stars}</span> / 5
            </p>
          </div>

          {/* Badge Visualiser column (8 cols) */}
          <div className="md:col-span-8 flex flex-col md:flex-row items-center gap-4 pl-0 md:pl-2">
            <div className="bg-gradient-to-tr from-rose-400 to-amber-300 p-3.5 rounded-2xl text-white shadow-md animate-bounce-slow shrink-0">
              <Trophy className="w-12 h-12" />
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-sm font-extrabold text-rose-500 uppercase tracking-widest leading-none mb-1.5">
                恭喜你！解锁了特殊荣誉勋章
              </h3>
              <p className="text-3xl font-black text-slate-800 tracking-tight drop-shadow-sm">
                {report.badge}
              </p>
              <p className="text-sm text-slate-500 mt-1 max-w-sm leading-relaxed">
                太棒了！贝贝老师已经把这枚荣誉写在你的专属成长日志里啦，继续加油哦！
              </p>
            </div>
          </div>

        </div>

        {/* Content Details: Review, Gold Words, Tips, Exemplar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (7 cols): Feedback & Gems */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mascot Voice bubble */}
            <div id="mascot-review-card" className="relative bg-slate-50 border border-slate-100 rounded-3xl p-5 pl-14 shadow-sm hover:shadow-md transition">
              {/* Floating avatar mascot inside */}
              <div className="absolute top-5 left-4 text-3xl">🐼</div>
              
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-base font-black text-indigo-955 flex items-center gap-1.5">
                  贝贝老师的评语
                </h4>
                <button
                  id="btn-speak-teacher-review"
                  onClick={speakTeacherReview}
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 active:scale-95 transition"
                >
                  <Volume2 className="w-4.5 h-4.5" /> 听老师语音
                </button>
              </div>

              <p className="text-base text-slate-650 leading-relaxed font-sans">
                {report.summary}
              </p>
            </div>

            {/* Glowing Golden Sentence Highlights */}
            <div id="gold-sentences-container" className="bg-emerald-50/40 border border-emerald-100 rounded-3xl p-5">
              <h4 className="text-base font-black text-emerald-850 mb-3.5 flex items-center gap-1.5">
                <Highlighter className="w-5 h-5 text-emerald-600" /> 闪光金句高能时刻
              </h4>

              {report.goldSentences && report.goldSentences.length > 0 ? (
                <div className="space-y-3">
                  {report.goldSentences.map((sentence, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className="p-3 bg-white rounded-2xl border-l-4 border-emerald-400 shadow-sm relative overflow-hidden group"
                    >
                      {/* background marker pen effect highlight */}
                      <span className="absolute left-0 top-0 bottom-0 right-0 bg-yellow-100/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <p className="text-base font-semibold text-slate-750 leading-relaxed relative z-10">
                        ✨ “ {sentence} ”
                      </p>
                      <span className="text-xs text-emerald-600 font-extrabold block mt-1 relative z-10">
                        👍 这里用字超级生动！贝贝老师给你点赞！
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-slate-400 text-sm">
                  你的字句很完整，下一次如果加上精彩的比喻或叠词（比如：红通通、圆滚滚），会有更多金句被选上哦！
                </div>
              )}
            </div>

            {/* Kids Draft Showroom (readability reference) */}
            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
              <h5 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-1.5">孩子的原文小档案</h5>
              <p className="text-sm text-slate-500 whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto font-mono">
                {childText}
              </p>
            </div>

          </div>

          {/* Right Column (5 cols): Tips & Exemplar */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Checklist Tips */}
            <div id="missing-tips-card" className="bg-purple-50/50 border border-purple-100 rounded-3xl p-5">
              <h4 className="text-base font-black text-purple-950 mb-3.5 flex items-center gap-1.5">
                🍭 写话升级小妙招
              </h4>
              
              <ul className="space-y-3">
                {report.missingElements.map((tip, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-2 text-sm text-purple-950 font-medium leading-relaxed bg-white p-2 rounded-xl border border-purple-200/50"
                  >
                    <span className="text-purple-500 text-sm mt-0.5">🌟</span>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Rework Exemplar */}
            <div id="exemplar-card" className="bg-indigo-50/60 border border-indigo-100 rounded-3xl p-5 relative overflow-hidden">
              {/* Glitter sparkle icon */}
              <div className="absolute -right-3 -top-3 text-emerald-300 opacity-20">
                <Sparkles className="w-16 h-16" />
              </div>

              <div className="flex justify-between items-center mb-3">
                <h4 className="text-base font-black text-indigo-955 flex items-center gap-1.5">
                  📚 贝贝老师的改写范文
                </h4>
                
                <div className="flex items-center gap-2">
                  <button
                    id="btn-speak-rework"
                    onClick={speakReworkText}
                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition active:scale-90"
                    title="高音质辅导朗读"
                  >
                    <Volume2 className="w-4.5 h-4.5" /> 听范文
                  </button>
                  
                  <button
                    id="btn-copy-rework"
                    onClick={handleCopyCode}
                    className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 transition active:scale-90"
                    title="把范文复制下来去本子练习"
                  >
                    <Copy className="w-3.5 h-3.5" /> {copied ? '已复制' : '复制'}
                  </button>
                </div>
              </div>

              <div className="bg-white/80 border border-indigo-100 rounded-2xl p-4 shadow-inner">
                <p className="text-base text-slate-800 font-sans leading-loose tracking-wide font-medium">
                  {report.rework}
                </p>
              </div>

              <p className="text-xs text-slate-400 mt-2.5 text-center leading-normal">
                💡 多多大声朗读，可以帮助句子变得更神奇哦！
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Call to Action */}
        <div className="flex justify-center mt-8 gap-3 border-t border-slate-100 pt-6">
          <button
            id="btn-re-attempt"
            onClick={onClose}
            className="text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-800 px-6 py-2.5 rounded-full font-bold text-sm transition"
          >
            继续修改我的小短文
          </button>
          
          <button
            id="btn-finish-grade"
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-lg hvr-bounce-to-right shadow-indigo-100 transition duration-150"
          >
            确定，去写其他图画啦！
          </button>
        </div>

      </div>
    </div>
  );
}

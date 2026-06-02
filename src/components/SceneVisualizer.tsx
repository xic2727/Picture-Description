import { ExplorePoint, Scene } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Star, Sparkles, Plus } from 'lucide-react';
import { useState } from 'react';

// Help trigger speech synthesis (simulated child pronunciation reading)
const readAloud = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85; // slightly slower for children
    window.speechSynthesis.speak(utterance);
  }
};

interface SceneVisualizerProps {
  scene: Scene;
  exploredIds: string[];
  onExplorePointClick: (point: ExplorePoint) => void;
  onAddTextToDraft: (phrase: string) => void;
  selectedPoint: ExplorePoint | null;
  setSelectedPoint: (point: ExplorePoint | null) => void;
}

export default function SceneVisualizer({
  scene,
  exploredIds,
  onExplorePointClick,
  onAddTextToDraft,
  selectedPoint,
  setSelectedPoint
}: SceneVisualizerProps) {
  
  // Custom SVG layouts based on scene ID to make it visually adorable
  const renderSceneSVG = () => {
    switch (scene.id) {
      case 'spring_kite':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            {/* Background Sky */}
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="60%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#f0fdf4" />
              </linearGradient>
              <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#skyGrad)" />

            {/* Sun */}
            <circle cx="50" cy="50" r="28" fill="#fef08a" opacity="0.6" />
            <circle cx="50" cy="50" r="20" fill="#facc15" />

            {/* Clouds */}
            <path d="M 120 70 Q 140 50 160 70 Q 180 70 170 90 Q 150 100 130 90 Q 110 90 120 70" fill="white" opacity="0.9" />
            <path d="M 380 50 Q 400 35 415 50 Q 430 50 425 65 Q 410 75 395 65 Q 375 65 380 50" fill="white" opacity="0.9" />

            {/* Rolling green hills */}
            <path d="M -20 410 Q 150 250 350 330 T 620 280 L 620 410 Z" fill="url(#grassGrad)" />
            <path d="M -50 410 Q 80 200 220 290 T 650 240 L 650 410 Z" fill="#22c55e" opacity="0.5" />

            {/* Peach Tree on Right */}
            <path d="M 500 240 Q 520 280 520 330" stroke="#7c2d12" strokeWidth="12" strokeLinecap="round" fill="none" />
            {/* Pink Blossoms */}
            <circle cx="490" cy="220" r="25" fill="#fca5a5" />
            <circle cx="525" cy="215" r="30" fill="#fca5a5" />
            <circle cx="505" cy="245" r="25" fill="#fca5a5" />
            <circle cx="530" cy="240" r="20" fill="#fecdd3" />
            <circle cx="475" cy="235" r="20" fill="#fecdd3" />

            {/* Willow Tree on Left */}
            <path d="M 80 230 Q 70 290 60 350" stroke="#78350f" strokeWidth="16" strokeLinecap="round" fill="none" />
            <ellipse cx="80" cy="190" rx="45" ry="35" fill="#166534" />
            <path d="M 50 200 Q 40 280 35 340" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 70 210 Q 65 290 60 360" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 90 208 Q 95 285 105 350" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 115 195 Q 125 260 135 330" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />

            {/* Cute swallow kite in the sky */}
            <g transform="translate(290, 80)">
              {/* Wind String */}
              <path d="M -150 180 Q -10 140 0 10" stroke="#cbd5e1" strokeDasharray="3,3" fill="none" strokeWidth="1.5" />
              {/* Swallow Wings */}
              <path d="M -40 -15 L 0 -35 L 40 -15 L 20 15 L 35 45 L 10 30 L 0 15 L -10 30 L -35 45 L -20 15 Z" fill="#e11d48" />
              {/* Inner yellow wing details */}
              <path d="M -25 -10 L 0 -22 L 25 -10 L 10 10 L 0 5 L -10 10 Z" fill="#facc15" />
              {/* Streamer tails */}
              <path d="M -15 35 Q -30 75 -25 95" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Streamer tails 2 */}
              <path d="M 15 35 Q 30 75 25 95" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            {/* Kids running (simulated silhouettes / cartoon paths) */}
            <g transform="translate(390, 240)">
              {/* Child 1 */}
              <circle cx="0" cy="0" r="14" fill="#fb923c" />
              <path d="M -10 12 Q 0 16 10 12 L 15 45 L 2 45 L 0 25 L -5 45 L -15 43 Z" fill="#3b82f6" />
              {/* Arms holding line */}
              <path d="M -8 15 Q -25 5 -45 5" stroke="#fb923c" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );
      case 'rainy_umbrella':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rainSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#rainSky)" />

            {/* Raindrops background */}
            <g stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" opacity="0.3">
              <line x1="100" y1="20" x2="80" y2="70" />
              <line x1="250" y1="30" x2="230" y2="80" />
              <line x1="400" y1="15" x2="380" y2="65" />
              <line x1="550" y1="40" x2="530" y2="90" />
              
              <line x1="50" y1="120" x2="30" y2="170" />
              <line x1="180" y1="140" x2="160" y2="190" />
              <line x1="330" y1="110" x2="310" y2="160" />
              <line x1="480" y1="130" x2="460" y2="180" />

              <line x1="120" y1="230" x2="100" y2="280" />
              <line x1="290" y1="220" x2="270" y2="270" />
              <line x1="450" y1="240" x2="430" y2="290" />
              <line x1="570" y1="210" x2="550" y2="260" />
            </g>

            {/* Dark Storm Clouds */}
            <path d="M 50 40 Q 90 10 130 40 Q 170 30 180 60 Q 150 90 120 80 Q 70 85 50 40" fill="#475569" opacity="0.8" />
            <path d="M 400 35 Q 430 10 465 35 Q 500 25 510 50 Q 480 80 440 75 Q 390 75 400 35" fill="#475569" opacity="0.9" />

            {/* The Road ground */}
            <rect x="0" y="280" width="600" height="120" fill="#64748b" />
            {/* Puddles with ripples */}
            <ellipse cx="150" cy="320" rx="55" ry="15" fill="#38bdf8" opacity="0.4" />
            <ellipse cx="150" cy="320" rx="35" ry="8" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.7" />
            <ellipse cx="150" cy="320" rx="15" ry="4" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.9" />

            {/* Another puddle */}
            <ellipse cx="440" cy="350" rx="70" ry="18" fill="#38bdf8" opacity="0.3" />
            <ellipse cx="430" cy="351" rx="40" ry="10" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.6" />

            {/* Giant Red Umbrella on Road */}
            <g transform="translate(300, 160)">
              {/* Umbrella Handle Stick */}
              <line x1="0" y1="20" x2="0" y2="135" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <path d="M 0 135 C 0 148 -15 148 -15 135" stroke="#475569" strokeWidth="6" fill="none" strokeLinecap="round" />
              
              {/* Umbrella dome */}
              <path d="M -110 30 C -110 -50 110 -50 110 30 Q 55 18 0 30 Q -55 18 -110 30 Z" fill="#ef4444" />
              {/* Shiny Stripes */}
              <path d="M -60 21 Q  0 -35  60 21" stroke="#fca5a5" strokeWidth="2.5" fill="none" opacity="0.6" />
              <path d="M -30 26 Q  0 -38  30 26" stroke="#fca5a5" strokeWidth="2.5" fill="none" opacity="0.6" />
              
              {/* Little tip on top */}
              <line x1="0" y1="-30" x2="0" y2="-45" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
              <circle cx="0" cy="-45" r="4" fill="#facc15" />
            </g>

            {/* Small flower bed with a leaf where the snail rests */}
            <g transform="translate(80, 260)">
              {/* Tall leaf */}
              <path d="M 0 30 Q 40 10 50 -30 Q 30 -15 0 30" fill="#22c55e" />
              <path d="M 10 25 Q 30 5 45 -25" stroke="#15803d" strokeWidth="1.5" fill="none" />
              {/* Snail resting on it */}
              <circle cx="35" cy="-10" r="7" fill="#fbbf24" />
            </g>

            {/* Kitten on right under some plants */}
            <g transform="translate(450, 240)">
              {/* Green shrub providing poor shelter */}
              <ellipse cx="20" cy="0" rx="35" ry="25" fill="#15803d" />
              <ellipse cx="-10" cy="15" rx="30" ry="20" fill="#166534" />
              {/* Tiny cat outline */}
              <ellipse cx="10" cy="30" rx="14" ry="11" fill="#f97316" />
              <circle cx="21" cy="20" r="8" fill="#f97316" />
              <polygon points="17,14 15,6 23,13" fill="#f97316" />
              <polygon points="23,14 26,6 28,13" fill="#f97316" />
              {/* Cat tail */}
              <path d="M 0 35 Q -10 40 -8 30" stroke="#f97316" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        );
      case 'winter_snowman':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="winterSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="60%" stopColor="#312e81" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#winterSky)" />

            {/* Snow falling dots */}
            <circle cx="50" cy="60" r="3.5" fill="white" opacity="0.8" />
            <circle cx="120" cy="150" r="2.5" fill="white" opacity="0.7" />
            <circle cx="180" cy="80" r="4" fill="white" opacity="0.9" />
            <circle cx="290" cy="120" r="3" fill="white" opacity="0.8" />
            <circle cx="340" cy="40" r="5" fill="white" opacity="0.9" />
            <circle cx="420" cy="160" r="2.5" fill="white" opacity="0.7" />
            <circle cx="490" cy="90" r="4.5" fill="white" opacity="0.8" />
            <circle cx="560" cy="140" r="3" fill="white" opacity="0.8" />
            
            <circle cx="80" cy="240" r="2.5" fill="white" opacity="0.7" />
            <circle cx="220" cy="220" r="3" fill="white" opacity="0.8" />
            <circle cx="380" cy="250" r="4" fill="white" opacity="0.9" />
            <circle cx="520" cy="230" r="2" fill="white" opacity="0.7" />

            {/* Snow mounds on ground */}
            <path d="M -50 410 Q 150 280 320 330 T 650 310 L 650 410 Z" fill="#f1f5f9" />
            <path d="M -20 410 Q 100 240 280 310 T 630 270 L 630 410 Z" fill="#e2e8f0" opacity="0.6" />

            {/* Evergreen Pine Tree on Right */}
            <g transform="translate(480, 100)">
              <polygon points="40,240 0,165 80,165" fill="#047857" />
              <polygon points="40,175 10,110 70,110" fill="#065f46" />
              <polygon points="40,120 18,65 62,65" fill="#064e3b" />
              {/* Trunk */}
              <rect x="32" y="240" width="16" height="40" fill="#78350f" />
              {/* Snow on branches */}
              <ellipse cx="40" cy="165" rx="30" ry="8" fill="#f1f5f9" opacity="0.9" />
              <ellipse cx="40" cy="110" rx="22" ry="6" fill="#f1f5f9" opacity="0.9" />
              <ellipse cx="40" cy="65" rx="14" ry="4" fill="#f1f5f9" opacity="0.9" />
            </g>

            {/* Giant Fat Snowman */}
            <g transform="translate(310, 175)">
              {/* Bottom Ball */}
              <circle cx="0" cy="85" r="55" fill="white" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="15" cy="70" r="45" fill="#f8fafc" /> {/* Highlight shading */}
              {/* Coal Button on tummy */}
              <circle cx="0" cy="65" r="5" fill="#1e293b" />
              <circle cx="0" cy="85" r="5" fill="#1e293b" />
              <circle cx="0" cy="105" r="5" fill="#1e293b" />

              {/* Head Ball */}
              <circle cx="0" cy="15" r="35" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* Charcoal Eyes */}
              <circle cx="-12" cy="8" r="4.5" fill="#1e293b" />
              <circle cx="12" cy="8" r="4.5" fill="#1e293b" />
              
              {/* Smiling lips made of dots */}
              <circle cx="-10" cy="24" r="2" fill="#1e293b" />
              <circle cx="-5" cy="26" r="2" fill="#1e293b" />
              <circle cx="0" cy="27" r="2" fill="#1e293b" />
              <circle cx="5" cy="26" r="2" fill="#1e293b" />
              <circle cx="10" cy="24" r="2" fill="#1e293b" />

              {/* Red Top Hat */}
              <ellipse cx="0" cy="-18" rx="32" ry="6" fill="#be123c" />
              <rect x="-18" y="-48" width="36" height="30" fill="#be123c" />
              <rect x="-18" y="-24" width="36" height="6" fill="#facc15" /> {/* yellow stripe */}
              
              {/* Carrot Orange Nose */}
              <polygon points="0,11 32,15 0,20" fill="#ea580c" />

              {/* Warm Red Scarf */}
              <path d="M -26 26 Q 0 35 26 26 Q 20 45 35 75 Q 18 78 12 40 Q -10 35 -26 26 Z" fill="#e11d48" />

              {/* Wooden Twig Arms */}
              <line x1="-48" y1="50" x2="-85" y2="25" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="-70" y1="36" x2="-80" y2="48" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              
              <line x1="48" y1="50" x2="85" y2="30" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="68" y1="39" x2="80" y2="52" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        );
      case 'summer_beach':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="beachSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#f0f9ff" />
              </linearGradient>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#beachSky)" />

            {/* Big smiling tropical Sun */}
            <circle cx="80" cy="70" r="32" fill="#fffbeb" opacity="0.5" />
            <circle cx="80" cy="70" r="24" fill="#facc15" />

            {/* Rolling Blue Ocean Waves */}
            <path d="M -50 200 C 120 180 180 230 350 200 C 480 170 520 210 650 190 L 650 300 L -50 300 Z" fill="url(#oceanGrad)" />
            <path d="M -10 220 Q 150 245 280 220 T 620 215" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.6" />

            {/* Golden Sandbank */}
            <path d="M -50 250 C 150 220 220 280 390 250 C 500 230 520 270 650 240 L 650 420 L -50 420 Z" fill="url(#sandGrad)" />

            {/* Dream Sandcastle in Middle */}
            <g transform="translate(290, 240)">
              {/* Center Tower Base */}
              <rect x="-30" y="5" width="60" height="45" fill="#f59e0b" rx="2" />
              {/* Castle Teeth */}
              <rect x="-30" y="-5" width="12" height="12" fill="#d97706" />
              <rect x="-6" y="-5" width="12" height="12" fill="#d97706" />
              <rect x="18" y="-5" width="12" height="12" fill="#d97706" />
              
              {/* Arched Door */}
              <path d="M -10 50 C -10 35 10 35 10 50 Z" fill="#78350f" />

              {/* Side Tower Left */}
              <rect x="-55" y="15" width="20" height="35" fill="#f59e0b" />
              <polygon points="-55,15 -45,0 -35,15" fill="#d97706" />

              {/* Side Tower Right */}
              <rect x="35" y="15" width="20" height="35" fill="#f59e0b" />
              <polygon points="35,15 45,0 55,15" fill="#d97706" />

              {/* Small red flag on top of castle cone */}
              <line x1="45" y1="0" x2="45" y2="-12" stroke="#475569" strokeWidth="2" />
              <polygon points="45,-12 30,-7 45,-2" fill="#ef4444" />
            </g>

            {/* Giant Palm Tree on Right with Coconuts */}
            <g transform="translate(500, 80)">
              {/* Curved trunk */}
              <path d="M 12 300 Q -15 180 -10 60" stroke="#78350f" strokeWidth="15" strokeLinecap="round" fill="none" />
              {/* Rings on trunk */}
              <path d="M 8 260 Q -10 240 -8 220" stroke="#92400e" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M 2 180 Q -13 160 -10 140" stroke="#92400e" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M -6 100 Q -16 80 -11 60" stroke="#92400e" strokeWidth="2" fill="none" opacity="0.6" />

              {/* Palm Fronds */}
              <path d="M -10 60 Q -70 30 -120 70" stroke="#16a34a" strokeWidth="10" strokeLinecap="round" fill="none" />
              <path d="M -10 60 Q -90 90 -105 140" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" fill="none" />
              <path d="M -10 60 Q -20 10 30 5" stroke="#15803d" strokeWidth="9" strokeLinecap="round" fill="none" />
              <path d="M -10 60 Q 50 40 70 95" stroke="#15803d" strokeWidth="9" strokeLinecap="round" fill="none" />
              <path d="M -10 60 Q -60 -15 -10 -40" stroke="#16a34a" strokeWidth="10" strokeLinecap="round" fill="none" />
              
              {/* Brown Coconuts hanging */}
              <circle cx="-16" cy="74" r="9" fill="#7c2d12" />
              <circle cx="-4" cy="78" r="8" fill="#7c2d12" />
            </g>
          </svg>
        );
      case 'autumn_harvest':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="autumnSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="60%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
              <linearGradient id="goldenField" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#autumnSky)" />

            {/* Sun */}
            <circle cx="530" cy="70" r="30" fill="#f97316" opacity="0.3" />
            <circle cx="530" cy="70" r="22" fill="#ea580c" />

            {/* Clouds */}
            <path d="M 120 60 Q 140 45 155 60 Q 170 60 165 75 Q 150 85 135 75 Q 115 75 120 60" fill="white" opacity="0.8" />
            <path d="M 300 80 Q 320 65 335 80 Q 350 80 345 95 Q 330 105 315 95 L 300 80" fill="white" opacity="0.7" />

            {/* Golden harvest rolling hills */}
            <path d="M -50 410 Q 120 250 280 330 T 650 280 L 650 410 Z" fill="url(#goldenField)" />
            <path d="M -20 410 Q 180 200 380 290 T 670 240 L 670 410 Z" fill="#eab308" opacity="0.5" />

            {/* Apple Tree on right */}
            <path d="M 500 240 Q 510 280 500 350" stroke="#78350f" strokeWidth="12" strokeLinecap="round" fill="none" />
            <ellipse cx="500" cy="200" rx="45" ry="40" fill="#ca8a04" />
            <ellipse cx="480" cy="210" rx="35" ry="30" fill="#a16207" opacity="0.8" />
            {/* Red apples */}
            <circle cx="475" cy="190" r="9" fill="#dc2626" />
            <circle cx="525" cy="185" r="9" fill="#dc2626" />
            <circle cx="500" cy="225" r="9" fill="#dc2626" />
            <circle cx="515" cy="200" r="8" fill="#ef4444" />
            <circle cx="490" cy="175" r="8" fill="#ef4444" />

            {/* Scarecrow in middle */}
            <g transform="translate(300, 210)">
              {/* Pole */}
              <line x1="0" y1="0" x2="0" y2="100" stroke="#78350f" strokeWidth="5" />
              <line x1="-40" y1="20" x2="40" y2="20" stroke="#78350f" strokeWidth="5" />
              {/* Straw shirt */}
              <path d="M -25 20 L 25 20 L 20 60 L -20 60 Z" fill="#3b82f6" />
              {/* Patchwork pocket */}
              <rect x="-10" y="32" width="12" height="12" fill="#ef4444" rx="2" />
              {/* Straw head */}
              <circle cx="0" cy="-5" r="15" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              {/* Broken wizard straw hat */}
              <ellipse cx="0" cy="-15" rx="22" ry="5" fill="#ca8a04" />
              <polygon points="-12,-15 12,-15 0,-32" fill="#ca8a04" />
              {/* Straw sleeves */}
              <path d="M -40 20 L -25 15 L -25 22 Z" fill="#eab308" />
              <path d="M 40 20 L 25 15 L 25 22 Z" fill="#eab308" />
            </g>

            {/* Little Squirrel on Left */}
            <g transform="translate(110, 290)">
              {/* Tail */}
              <path d="M -10 25 Q -32 -5 -8 -15 Q 12 -5 0 25 Z" fill="#ea580c" />
              {/* Body */}
              <ellipse cx="0" cy="20" rx="14" ry="18" fill="#d97706" />
              {/* Head */}
              <circle cx="6" cy="5" r="10" fill="#d97706" />
              <circle cx="9" cy="4" r="2.5" fill="white" />
              <circle cx="9.5" cy="4" r="1" fill="black" />
              {/* Cute cheek */}
              <circle cx="5" cy="8" r="2" fill="#f43f5e" />
              {/* Holding pinecone */}
              <circle cx="14" cy="18" r="5" fill="#78350f" />
            </g>
          </svg>
        );
      case 'birthday_party':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="partyBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fdf2f8" />
                <stop offset="100%" stopColor="#fbeec1" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#partyBg)" />

            {/* Colorful Banners on top */}
            <path d="M 0 30 Q 150 70 300 30 Q 450 70 600 30" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="1,2" />
            <polygon points="30,38 60,38 45,68" fill="#ef4444" />
            <polygon points="120,44 150,44 135,74" fill="#3b82f6" />
            <polygon points="210,43 240,43 225,73" fill="#10b981" />
            <polygon points="300,30 330,30 315,60" fill="#f59e0b" />
            <polygon points="390,43 420,43 405,73" fill="#8b5cf6" />
            <polygon points="480,44 510,44 495,74" fill="#ec4899" />
            <polygon points="540,36 570,36 555,66" fill="#06b6d4" />

            {/* Festive wall dots/stars */}
            <circle cx="70" cy="120" r="3" fill="#f43f5e" opacity="0.3" />
            <circle cx="180" cy="140" r="4" fill="#3b82f6" opacity="0.2" />
            <circle cx="510" cy="110" r="3.5" fill="#eab308" opacity="0.4" />
            <circle cx="420" cy="160" r="2.5" fill="#10b981" opacity="0.3" />

            {/* Playful Floating Balloons */}
            <g transform="translate(150, 110)">
              {/* String */}
              <path d="M 0 25 Q -10 50 0 100" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <ellipse cx="0" cy="0" rx="20" ry="26" fill="#3b82f6" />
              {/* Balloon knot */}
              <polygon points="-4,26 4,26 0,31" fill="#2563eb" />
              {/* Shine */}
              <ellipse cx="-7" cy="-8" rx="5" ry="8" fill="white" opacity="0.3" transform="rotate(-15)" />
            </g>
            <g transform="translate(480, 130)">
              {/* String */}
              <path d="M 0 25 Q 10 60 -5 110" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <ellipse cx="0" cy="0" rx="18" ry="24" fill="#ec4899" />
              <polygon points="-4,24 4,24 0,29" fill="#db2777" />
              <ellipse cx="-6" cy="-8" rx="4" ry="7" fill="white" opacity="0.3" transform="rotate(-15)" />
            </g>

            {/* Rounded Wooden Table base */}
            <ellipse cx="300" cy="330" rx="220" ry="80" fill="#a16207" stroke="#78350f" strokeWidth="3" />
            <ellipse cx="300" cy="326" rx="212" ry="74" fill="#ca8a04" />
            <ellipse cx="300" cy="320" rx="190" ry="60" fill="#fef08a" opacity="0.3" />

            {/* Giant Birthday Cake */}
            <g transform="translate(300, 240)">
              {/* Platter */}
              <ellipse cx="0" cy="45" rx="75" ry="16" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
              <ellipse cx="0" cy="42" rx="72" ry="13" fill="#f1f5f9" />

              {/* Cake Layer Bottom */}
              <rect x="-55" y="-5" width="110" height="42" fill="#fecdd3" stroke="#f43f5e" strokeWidth="2" rx="5" />
              {/* White Drips */}
              <path d="M -55 10 Q -45 25 -35 10 Q -25 25 -15 10 Q -5 25 5 10 Q 15 25 25 10 Q 35 25 45 10 Q 55 10 L 55 -5 L -55 -5 Z" fill="white" opacity="0.9" />

              {/* Cake Layer Middle */}
              <rect x="-42" y="-35" width="84" height="32" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" rx="4" />
              <path d="M -42 -20 Q -32 -10 -22 -20 Q -12 -10 -2 -20 Q 8 -10 18 -20 Q 28 -10 38 -20 Q 42 -20 L 42 -35 L -42 -35 Z" fill="white" opacity="0.9" />

              {/* Strawberries on top */}
              <circle cx="-25" cy="-40" r="7" fill="#ef4444" />
              <circle cx="0" cy="-42" r="8" fill="#ef4444" />
              <circle cx="25" cy="-40" r="7" fill="#ef4444" />

              {/* Lit Birthday Candles */}
              {/* Candle 1 */}
              <rect x="-15" y="-62" width="4" height="22" fill="#22c55e" />
              <path d="M -13 -65 Q -15 -75 -13 -78 Q -11 -75 -13 -65" fill="#f97316" className="animate-pulse" />
              {/* Candle 2 (Center) */}
              <rect x="-2" y="-66" width="4" height="24" fill="#a855f7" />
              <path d="M 0 -69 Q -3 -82 0 -85 Q 3 -82 0 -69" fill="#f97316" className="animate-pulse" />
              {/* Candle 3 */}
              <rect x="11" y="-62" width="4" height="22" fill="#3b82f6" />
              <path d="M 13 -65 Q 11 -75 13 -78 Q 15 -75 13 -65" fill="#f97316" className="animate-pulse" />
            </g>

            {/* Little Girl's Silhouette/Cartoon Face bottom-center */}
            <g transform="translate(300, 310)">
              {/* Hair */}
              <circle cx="0" cy="55" r="30" fill="#1e293b" />
              <rect x="-20" y="32" width="40" height="15" fill="#1e293b" rx="5" />
              {/* Pig tails */}
              <circle cx="-32" cy="50" r="14" fill="#1e293b" />
              <circle cx="32" cy="50" r="14" fill="#1e293b" />
              {/* Pink Bows */}
              <circle cx="-26" cy="42" r="5" fill="#ec4899" />
              <circle cx="26" cy="42" r="5" fill="#ec4899" />
              {/* Face */}
              <circle cx="0" cy="58" r="24" fill="#fed7aa" />
              {/* Closed Eyes */}
              <path d="M -12 56 Q -8 60 -4 56" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 4 56 Q 8 60 12 56" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              {/* Smile */}
              <path d="M -5 68 Q 0 74 5 68" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
              {/* Blushing cheeks */}
              <circle cx="-14" cy="65" r="4.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="14" cy="65" r="4.5" fill="#f43f5e" opacity="0.6" />
            </g>
          </svg>
        );
      case 'classroom_reading':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="classroomBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#classroomBg)" />

            {/* Classroom Window on Right */}
            <g transform="translate(460, 40)">
              <rect x="0" y="0" width="100" height="150" fill="#bae6fd" stroke="#94a3b8" strokeWidth="4" />
              <line x1="50" y1="0" x2="50" y2="150" stroke="#94a3b8" strokeWidth="3" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#94a3b8" strokeWidth="3" />
              {/* Yellow wall lights outside */}
              <circle cx="-35" cy="50" r="100" stroke="#fef08a" strokeWidth="1" fill="none" opacity="0.1" />
              {/* Cute Bird Sitting at window frame */}
              <g transform="translate(40, 110)">
                <ellipse cx="0" cy="15" rx="15" ry="11" fill="#f97316" />
                <circle cx="10" cy="5" r="8" fill="#f97316" />
                <polygon points="17,3 23,6 17,9" fill="#fbbf24" />
                <path d="M -8 18 Q -13 25 -10 22" stroke="#475569" strokeWidth="2" fill="none" />
              </g>
            </g>

            {/* Large Chalkboard */}
            <g transform="translate(40, 30)">
              {/* Wooden frame */}
              <rect x="0" y="0" width="380" height="180" fill="#78350f" rx="8" />
              {/* Inside board surface */}
              <rect x="8" y="8" width="364" height="164" fill="#064e3b" rx="4" />

              {/* Chalk Writings */}
              <text x="30" y="55" fill="#fef08a" fontFamily="monospace" fontSize="24" fontWeight="bold">ɑ  o  e  i  u  ü</text>
              <text x="30" y="100" fill="white" fontFamily="sans-serif" fontSize="20" fontWeight="extrabold">拼音认读与看图写话 📓</text>
              <text x="30" y="140" fill="#86efac" fontFamily="sans-serif" fontSize="15">星期二 • 熊猫贝贝老师开课</text>

              {/* Tiny chalk block lying at the ledge */}
              <rect x="230" y="168" width="12" height="4" fill="white" />
              <rect x="250" y="169" width="10" height="3" fill="#fca5a5" />
            </g>

            {/* School classroom desk top layout */}
            <rect x="0" y="270" width="600" height="130" fill="#cbd5e1" />
            <rect x="30" y="250" width="460" height="130" fill="#d97706" stroke="#92400e" strokeWidth="4" rx="10" />
            <rect x="40" y="260" width="440" height="110" fill="#f59e0b" rx="6" />

            {/* Text Books open on table */}
            <g transform="translate(160, 275)">
              {/* Shadows */}
              <rect x="-35" y="5" width="80" height="45" fill="#ca8a04" opacity="0.6" rx="2" />
              {/* Book sheets */}
              <rect x="-40" y="0" width="42" height="42" fill="white" stroke="#94a3b8" strokeWidth="1" rx="1" />
              <rect x="1" y="0" width="42" height="42" fill="white" stroke="#94a3b8" strokeWidth="1" rx="1" />
              {/* Book spine */}
              <line x1="1" y1="0" x2="1" y2="42" stroke="#475569" strokeWidth="2.5" />
              {/* Scribble text lines */}
              <line x1="-30" y1="10" x2="-10" y2="10" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <line x1="-30" y1="18" x2="-12" y2="18" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <line x1="-30" y1="26" x2="-15" y2="26" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              
              <line x1="10" y1="10" x2="30" y2="10" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <line x1="10" y1="18" x2="32" y2="18" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <line x1="10" y1="26" x2="25" y2="26" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              {/* Cute Panda Cartoon Illustration in book */}
              <circle cx="28" cy="27" r="4.5" fill="black" />
              <circle cx="28" cy="27" r="3.5" fill="white" />
            </g>

            {/* Bright Pastel Pencil box on the desk */}
            <g transform="translate(68, 290)">
              <rect x="0" y="0" width="38" height="50" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" rx="4" />
              <rect x="3" y="10" width="32" height="35" fill="#c084fc" rx="2" />
              {/* Pencil tips protruding */}
              <line x1="8" y1="0" x2="8" y2="-12" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
              <line x1="19" y1="0" x2="19" y2="-16" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              <line x1="30" y1="0" x2="30" y2="-10" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        );
      case 'park_environment':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="parkSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ecfeff" />
                <stop offset="60%" stopColor="#ccfbf1" />
                <stop offset="100%" stopColor="#f0fdf4" />
              </linearGradient>
              <linearGradient id="grassGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#parkSky)" />

            {/* Sun */}
            <circle cx="48" cy="50" r="20" fill="#fef08a" opacity="0.5" />
            <circle cx="48" cy="50" r="14" fill="#facc15" />

            {/* Grassy fields rolling */}
            <path d="M -50 410 Q 150 250 350 330 T 650 270 L 650 410 Z" fill="url(#grassGreen)" />
            <path d="M -30 410 Q 110 200 280 290 T 670 230 L 670 410 Z" fill="#166534" opacity="0.3" />

            {/* Park Pathways */}
            <path d="M 220 410 L 320 280 L 360 280 L 330 410 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />

            {/* Eco Recycle green bin on right */}
            <g transform="translate(470, 210)">
              {/* Back support shadow */}
              <rect x="-2" y="30" width="36" height="55" fill="#15803d" opacity="0.6" rx="4" />
              {/* Canister body */}
              <rect x="0" y="25" width="32" height="55" fill="#22c55e" stroke="#166534" strokeWidth="2" rx="3" />
              {/* Flap lid */}
              <rect x="-3" y="16" width="38" height="10" fill="#15803d" stroke="#14532d" strokeWidth="2" rx="2" />
              {/* Trash disposal aperture */}
              <rect x="7" y="35" width="18" height="12" fill="#14532d" rx="2" />
              {/* Recycle graphic symbol arrow shape */}
              <circle cx="16" cy="62" r="6" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="3,2" />
            </g>

            {/* Little blooming flowers on left */}
            <g transform="translate(90, 240)">
              <circle cx="0" cy="15" r="30" fill="#22c55e" opacity="0.3" />
              {/* Stems */}
              <line x1="-10" y1="15" x2="-10" y2="35" stroke="#15803d" strokeWidth="2" />
              <line x1="8" y1="20" x2="8" y2="35" stroke="#15803d" strokeWidth="2" />
              {/* Flower 1 */}
              <circle cx="-10" cy="15" r="9" fill="#ef4444" />
              <circle cx="-10" cy="15" r="4.5" fill="#facc15" />
              {/* Flower 2 */}
              <circle cx="8" cy="20" r="8" fill="#ec4899" />
              <circle cx="8" cy="20" r="3" fill="#fff" />
            </g>

            {/* Banana Peel lying on grass */}
            <g transform="translate(170, 280)">
              {/* Curved yellow peels */}
              <path d="M 0 5 Q -10 -5 -15 8 Q -10 12 0 5" fill="#facc15" />
              <path d="M 0 5 Q 10 0 15 12 Q 5 13 0 5" fill="#facc15" />
              <path d="M 0 5 Q -2 -14 3 -12 L 0 5" fill="#ca8a04" />
            </g>
          </svg>
        );
      case 'zoo_panda':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="zooSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="10%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#zooSky)" />

            {/* Bamboo stalks/background leaves */}
            <g opacity="0.4" stroke="#059669" strokeWidth="5" strokeLinecap="round">
              {/* Bamboo 1 */}
              <line x1="50" y1="410" x2="55" y2="-10" strokeWidth="12" />
              <ellipse cx="65" cy="120" rx="20" ry="6" fill="#10b981" transform="rotate(25 65 120)" />
              <ellipse cx="35" cy="200" rx="18" ry="5" fill="#047857" transform="rotate(-15 35 200)" />

              {/* Bamboo 2 */}
              <line x1="530" y1="410" x2="520" y2="-10" strokeWidth="16" />
              <ellipse cx="500" cy="150" rx="22" ry="7" fill="#10b981" transform="rotate(-20 500 150)" />
              <ellipse cx="540" cy="250" rx="24" ry="8" fill="#065f46" transform="rotate(30 540 250)" />
            </g>

            {/* Giant grey stone boulder */}
            <ellipse cx="140" cy="310" rx="150" ry="90" fill="#94a3b8" stroke="#64748b" strokeWidth="3" />
            <ellipse cx="140" cy="295" rx="135" ry="70" fill="#cbd5e1" />

            {/* Sleeping Panda cartoon vectors */}
            <g transform="translate(300, 180)">
              {/* Back foot */}
              <circle cx="35" cy="50" r="18" fill="#1e293b" />
              {/* Body ball */}
              <ellipse cx="0" cy="20" rx="60" ry="45" fill="white" stroke="#e2e8f0" strokeWidth="2.5" />
              <ellipse cx="-8" cy="15" rx="55" ry="40" fill="#f8fafc" />
              
              {/* Giant head ball */}
              <circle cx="-35" cy="-14" r="35" fill="white" stroke="#e2e8f0" strokeWidth="2" />
              {/* Black Ears */}
              <circle cx="-65" cy="-42" r="12" fill="#1e293b" />
              <circle cx="-12" cy="-38" r="10" fill="#1e293b" />

              {/* Black eye patches */}
              <ellipse cx="-48" cy="-16" rx="9" ry="12" fill="#1e293b" transform="rotate(15 -48 -16)" />
              <ellipse cx="-23" cy="-14" rx="7" ry="10" fill="#1e293b" transform="rotate(-15 -23 -14)" />
              {/* White eyes inside */}
              <circle cx="-45" cy="-17" r="2.5" fill="white" />
              <circle cx="-25" cy="-15" r="2" fill="white" />

              {/* Nose */}
              <polygon points="-36,-6 -32,-6 -34,-4" fill="#1e293b" />
              {/* Cheeks */}
              <circle cx="-54" cy="-5" r="4" fill="#f43f5e" opacity="0.6" />

              {/* Green bamboo twig clamped in hand */}
              <path d="M -50 15 Q -10 10 10 -2" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <ellipse cx="-8" cy="8" rx="10" ry="3.5" fill="#34d399" transform="rotate(15 -8 8)" />

              {/* Front limb black */}
              <path d="M -55 12 Q -65 30 -58 45 Q -50 48 -45 35 Z" fill="#1e293b" />
            </g>
          </svg>
        );
      case 'moon_festival':
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="moonSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#030712" />
                <stop offset="60%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>
              <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="40%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#moonSkyGrad)" />

            {/* Glowing Twinkling Stars */}
            <circle cx="100" cy="50" r="1" fill="white" opacity="0.8" />
            <circle cx="210" cy="70" r="1.5" fill="#fef08a" opacity="0.9" />
            <circle cx="480" cy="40" r="1.2" fill="white" opacity="0.8" />
            <circle cx="340" cy="110" r="1.2" fill="white" opacity="0.6" />
            <circle cx="70" cy="160" r="1.5" fill="white" opacity="0.7" />
            {/* Cross spark star */}
            <path d="M 280 50 L 280 56 M 277 53 L 283 53" stroke="#fff" strokeWidth="1" />

            {/* Giant Mid-Autumn Golden Moon */}
            <circle cx="480" cy="80" r="50" fill="#fff" opacity="0.15" />
            <circle cx="480" cy="80" r="42" fill="url(#moonGlow)" stroke="#fef08a" strokeWidth="1.5" />
            {/* Crater shadows */}
            <ellipse cx="465" cy="70" rx="9" ry="6" fill="#ca8a04" opacity="0.2" />
            <ellipse cx="495" cy="95" rx="14" ry="8" fill="#ca8a04" opacity="0.2" />
            <circle cx="452" cy="88" r="5" fill="#ca8a04" opacity="0.25" />

            {/* Gentle wispy blue clouds passing */}
            <path d="M 380 90 C 430 75 480 110 550 90" fill="none" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" opacity="0.3" />

            {/* Slate patio stonework backyard garden base */}
            <rect x="0" y="260" width="600" height="140" fill="#334155" />
            <path d="M -50 260 Q 150 240 320 255 T 650 245 L 650 260 Z" fill="#475569" />

            {/* Chinese Classic design circular Stone table */}
            <g transform="translate(300, 260)">
              {/* Table top */}
              <ellipse cx="0" cy="45" rx="130" ry="40" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="0" cy="42" rx="124" ry="35" fill="#64748b" />
              {/* Stand */}
              <path d="M -25 45 C -25 80 -15 95 -12 110 L 12 110 C 15 95 25 80 25 45 Z" fill="#475569" />

              {/* Red plate with mooncakes */}
              <g transform="translate(0, 32)">
                <ellipse cx="0" cy="5" rx="42" ry="14" fill="#be123c" />
                <ellipse cx="0" cy="2" rx="38" ry="11" fill="#e11d48" />

                {/* Baked yellow gold mooncakes */}
                {/* Mooncake 1 */}
                <ellipse cx="-15" cy="0" rx="12" ry="8" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
                <circle cx="-15" cy="-2" r="5" fill="#eab308" opacity="0.4" />
                {/* Mooncake 2 Center */}
                <ellipse cx="14" cy="2" rx="14" ry="9" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
                <circle cx="14" cy="0" r="6" fill="#eab308" opacity="0.4" />
              </g>

              {/* Chinese traditional tea pot boiling on left of table */}
              <g transform="translate(-70, 25)">
                {/* Teapot Body */}
                <ellipse cx="0" cy="0" rx="14" ry="12" fill="#7c2d12" />
                {/* Handle */}
                <path d="M -8 -11 C -18 -8 -15 8 -6 10" stroke="#7c2d12" strokeWidth="2.5" fill="none" />
                {/* Spout */}
                <path d="M 12 -3 Q 22 -14 24 -15" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Steam */}
                <path d="M 24 -18 Q 28 -25 24 -30 Q 20 -35 25 -42" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,2" fill="none" opacity="0.5" />
              </g>
            </g>
          </svg>
        );
      default: {
        const getGradientFromAccent = (accent: string) => {
          switch (accent) {
            case 'emerald':
            case 'green':
              return { start: '#34d399', end: '#064e3b', floor: '#10b981' };
            case 'sky':
            case 'blue':
              return { start: '#5bc0be', end: '#1c2541', floor: '#3a506b' };
            case 'indigo':
              return { start: '#c7d2fe', end: '#1e1b4b', floor: '#4f46e5' };
            case 'amber':
            case 'yellow':
              return { start: '#fde047', end: '#78350f', floor: '#ca8a04' };
            case 'rose':
            case 'red':
              return { start: '#fda4af', end: '#4c0519', floor: '#e11d48' };
            case 'orange':
              return { start: '#fed7aa', end: '#7c2d12', floor: '#ea580c' };
            case 'purple':
              return { start: '#e9d5ff', end: '#3b0764', floor: '#9333ea' };
            case 'neutral':
            case 'slate':
            default:
              return { start: '#cbd5e1', end: '#0f172a', floor: '#475569' };
          }
        };

        const colors = getGradientFromAccent(scene.accentColor || 'slate');
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-2xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`defaultGrad-${scene.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.start} />
                <stop offset="100%" stopColor={colors.end} />
              </linearGradient>
              <radialGradient id={`glow-${scene.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </radialGradient>
            </defs>
            {/* Background sky */}
            <rect width="600" height="400" fill={`url(#defaultGrad-${scene.id})`} />
            
            {/* Sun / Moon or Stars */}
            <circle cx="500" cy="80" r="40" fill="#ffffff" opacity="0.1" />
            <circle cx="500" cy="80" r="30" fill="#ffffff" opacity="0.15" />
            
            {/* Decorative floating clouds */}
            <g fill="#ffffff" opacity="0.35">
              <path d="M 60 80 Q 80 65 95 80 Q 110 80 105 95 Q 90 105 75 95 Q 55 95 60 80" />
              <path d="M 320 60 Q 335 48 348 60 Q 360 60 355 72 Q 342 80 330 72 Q 312 72 320 60" />
            </g>

            {/* Gentle rolling grass/ground at the bottom */}
            <path d="M -20 320 Q 150 250 350 310 T 620 280 L 620 410 L -20 410 Z" fill={colors.floor} opacity="0.4" />
            <path d="M -50 340 Q 180 290 320 330 T 650 300 L 650 410 L -50 410 Z" fill={colors.floor} opacity="0.7" />

            {/* Big beautiful glowing center spotlight */}
            <circle cx="300" cy="200" r="140" fill={`url(#glow-${scene.id})`} />
            
            {/* Floating vector elements */}
            <circle cx="160" cy="180" r="6" fill="#ffffff" opacity="0.2" />
            <circle cx="440" cy="160" r="8" fill="#ffffff" opacity="0.3" />
            <circle cx="400" cy="240" r="4" fill="#ffffff" opacity="0.25" />

            {/* Huge central emoji display */}
            <text x="300" y="235" fontSize="110" textAnchor="middle" style={{ userSelect: 'none' }} className="animate-bounce">
              {scene.emoji}
            </text>

            {/* Floating Sparkles in Background */}
            <path d="M 180 110 L 180 116 M 177 113 L 183 113" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
            <path d="M 420 120 L 420 126 M 417 123 L 423 123" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
          </svg>
        );
      }
    }
  };

  return (
    <div id="visualizer-container" className="relative w-full aspect-[3/2] bg-slate-100 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
      {/* Dynamic Vector canvas */}
      {renderSceneSVG()}

      {/* Floating Explore Point Markers */}
      {scene.explorePoints.map((point) => {
        const isExplored = exploredIds.includes(point.id);
        const isSelected = selectedPoint?.id === point.id;
        
        return (
          <motion.button
            key={point.id}
            id={`hotspot-${point.id}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onClick={() => {
              onExplorePointClick(point);
              setSelectedPoint(point);
            }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer z-20 group"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Ripple Pulse Rings */}
            <span className="absolute inline-flex h-10 w-10 rounded-full bg-yellow-400 opacity-40 animate-ping" />
            
            {/* Main Interactive Circle */}
            <div className={`relative h-8 w-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-shadow transition-all duration-300 shadow-md ${
              isSelected 
                ? 'bg-rose-500 text-white ring-4 ring-rose-200' 
                : isExplored 
                  ? 'bg-yellow-400 text-slate-800 ring-2 ring-yellow-200' 
                  : 'bg-white text-rose-500 hover:bg-rose-100'
            }`}>
              {isExplored ? (
                <Star className="w-4.5 h-4.5 fill-current text-white" />
              ) : (
                <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
              )}
            </div>

            {/* Hover Tooltip label */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
              <span className="font-mono text-[9px] block text-slate-300 leading-none">{point.pinyin}</span>
              <span className="font-medium text-xs">{point.label}</span>
            </div>
          </motion.button>
        );
      })}

      {/* Explore Point Dialog Flashcard */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            id="explore-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-amber-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 z-30"
          >
            {/* Left Content info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                  selectedPoint.type === 'person' ? 'bg-orange-100 text-orange-700' :
                  selectedPoint.type === 'nature' ? 'bg-emerald-100 text-emerald-700' :
                  selectedPoint.type === 'object' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {selectedPoint.type === 'person' ? '👤 观察人物' :
                   selectedPoint.type === 'nature' ? '🌿 观察自然' :
                   selectedPoint.type === 'object' ? '🎒 观察事物' : '✨ 描写动作'}
                </span>
                
                <button
                  id="btn-speak-vocab"
                  onClick={() => readAloud(selectedPoint.label)}
                  className="flex items-center gap-1 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full font-medium transition"
                  title="朗读这个词"
                >
                  🔊 读音
                </button>
              </div>

              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">{selectedPoint.label}</h3>
                <span className="text-xs text-slate-400 font-mono">[{selectedPoint.pinyin}]</span>
              </div>
              
              <p className="text-sm text-slate-600 mt-1 pl-1 border-l-2 border-amber-300 leading-relaxed font-sans">
                {selectedPoint.description}
              </p>
            </div>

            {/* Right Buttons Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-2.5 md:pt-0 border-slate-100">
              <button
                id="btn-read-sentence"
                onClick={() => readAloud(selectedPoint.description)}
                className="flex-1 md:flex-initial text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-3 py-2 rounded-xl transition duration-150 flex items-center justify-center gap-1.5"
              >
                🔊 听示范句
              </button>
              
              <button
                id="btn-add-phrase-to-draft"
                onClick={() => {
                  onAddTextToDraft(selectedPoint.description);
                  // Quick flash notification of success
                  readAloud("已放入本子");
                }}
                className="flex-1 md:flex-initial text-xs bg-rose-500 hover:bg-rose-600 active:transform active:scale-95 text-white font-bold px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> 放入写话本
              </button>

              <button
                id="btn-close-explore-card"
                onClick={() => setSelectedPoint(null)}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-2"
              >
                关闭
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

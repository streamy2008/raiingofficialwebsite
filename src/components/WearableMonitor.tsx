import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Thermometer, 
  Wind, 
  Droplets, 
  Heart, 
  AlertCircle,
  Moon,
  Timer,
  User,
  Minus,
  Plus
} from 'lucide-react';

// --- Types ---
type VitalKey = 'HR' | 'SpO2' | 'BP' | 'Resp' | 'Temp' | 'Sleep' | 'Exercise';

interface VitalConfig {
  label: string;
  subLabel?: string;
  unit: string;
  icon: any;
  color: string;
  min: number;
  max: number;
  moduleName?: string;
}

const VITAL_CONFIGS: Partial<Record<VitalKey, VitalConfig>> = {
  BP: { label: 'NIBP', subLabel: '(115)', unit: 'mmHG', icon: Activity, color: '#ffffff', min: 90, max: 160, moduleName: '无线血压模块' },
  SpO2: { label: 'SpO2', subLabel: 'PI 12.0 PR 75', unit: '%', icon: Droplets, color: '#3b82f6', min: 90, max: 100, moduleName: '无线血氧模块' },
  HR: { label: 'HR', subLabel: '(ECG)', unit: 'bpm', icon: Heart, color: '#22c55e', min: 50, max: 120, moduleName: '无线心电采集器' },
  Resp: { label: 'Resp', unit: 'bpm', icon: Wind, color: '#ffffff', min: 8, max: 30 },
  Temp: { label: 'Temp', unit: '°C', icon: Thermometer, color: '#ef4444', min: 35.0, max: 38.0, moduleName: '无线体温传感器' },
};

// --- Components ---

const ECGWaveform = () => {
  const [points, setPoints] = useState<number[]>(Array(100).fill(50));

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const next = [...prev];
        const t = Date.now() * 0.01;
        let y = 50;
        
        const cycle = t % 4;
        if (cycle < 0.2) y -= Math.sin(cycle * Math.PI * 5) * 8;
        else if (cycle < 0.3) y += (cycle - 0.2) * 80;
        else if (cycle < 0.4) y -= (cycle - 0.3) * 250;
        else if (cycle < 0.5) y += (cycle - 0.4) * 150;
        else if (cycle > 1.0 && cycle < 1.5) y -= Math.sin((cycle - 1.0) * Math.PI * 2) * 12;

        next.shift();
        next.push(y);
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const pathData = points.map((y, i) => `${i * 4},${y}`).join(' L ');

  return (
    <svg viewBox="0 0 400 100" className="w-full h-full block" preserveAspectRatio="none">
      <path
        d={`M 0,50 L ${pathData}`}
        fill="none"
        stroke="#4ade80"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

const SliderWrapper = ({ children, value, onChange, min, max, step = 1, align = 'right', isActive }: any) => {
  const handleDecrease = (e: any) => {
    e.stopPropagation();
    const newVal = Math.max(min, Number(value) - step);
    onChange({ target: { value: newVal } });
  };
  
  const handleIncrease = (e: any) => {
    e.stopPropagation();
    const newVal = Math.min(max, Number(value) + step);
    onChange({ target: { value: newVal } });
  };

  return (
    <div className="relative group">
      {children}
      <div className={`absolute ${align === 'right' ? 'right-0 lg:right-full lg:pr-4' : 'left-0 lg:left-full lg:pl-4'} top-full lg:top-1/2 mt-2 lg:mt-0 lg:-translate-y-1/2 transition-opacity z-50 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto'} focus-within:opacity-100 focus-within:pointer-events-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black/80 p-3 lg:p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDecrease} 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/30 text-white touch-manipulation shrink-0"
            >
              <Minus size={20} />
            </button>
            <input 
              type="range" 
              min={min} 
              max={max} 
              step={step} 
              value={value} 
              onChange={onChange}
              className="w-24 lg:w-32 accent-white cursor-pointer h-2 bg-white/20 rounded-lg appearance-none"
            />
            <button 
              onClick={handleIncrease} 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/30 text-white touch-manipulation shrink-0"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="text-center text-[10px] font-bold opacity-60">点击按钮或滑动修改</div>
        </div>
      </div>
    </div>
  );
};

const VitalCard = ({ vitalKey, isActive, value }: { vitalKey: VitalKey; isActive: boolean; value: any; }) => {
  const config = VITAL_CONFIGS[vitalKey as keyof typeof VITAL_CONFIGS];
  if (!config) return null;

  let displayColor = config.color;
  
  if (vitalKey === 'BP') {
    const systolic = parseInt(String(value).split('/')[0], 10);
    if (systolic <= 90) displayColor = '#ef4444';
    else if (systolic >= 92 && systolic <= 93) displayColor = '#f97316';
    else if (systolic >= 94 && systolic <= 95) displayColor = '#fdba74';
    else if (systolic === 91) displayColor = '#f97316';
  } else {
    const numValue = Number(value);
    if (vitalKey === 'Temp') displayColor = numValue > 38.0 ? '#ef4444' : '#ffffff';
    else if (vitalKey === 'SpO2') displayColor = numValue < 90 ? '#ef4444' : '#ffffff';
    else if (vitalKey === 'HR') displayColor = numValue > 120 ? '#ef4444' : '#ffffff';
  }

  if (vitalKey === 'BP') {
    const [sys, dia] = String(value).split('/').map(Number);
    const mapValue = Math.round((sys + 2 * dia) / 3);

    return (
      <motion.div animate={isActive ? { scale: 1.1, x: 10 } : { scale: 1, x: 0 }} className={`relative transition-all duration-500 ${isActive ? 'z-20' : 'z-10'} h-full flex flex-col justify-center`}>
        <div className="flex flex-col items-start text-left w-full">
          <div className="text-sm lg:text-lg font-normal text-white mb-2 tracking-widest opacity-90 text-left w-full">无线血压模块</div>
          <div className="flex items-center gap-4 w-full mb-2 h-8 lg:h-10">
            <div className="flex items-baseline gap-2">
              <span className="text-lg lg:text-2xl font-black" style={{ color: config.color }}>{config.label}</span>
              <span className="text-[10px] lg:text-xs font-bold" style={{ color: config.color }}>{config.unit}</span>
            </div>
            <div className="flex gap-2 text-[10px] lg:text-xs font-bold text-white opacity-80 ml-auto">
              <span>18:15</span><span>18:30</span>
            </div>
          </div>
          <div className="flex items-stretch mt-1 lg:mt-2">
            <div className="flex flex-col justify-between text-[10px] lg:text-xs font-bold text-white opacity-60 mr-2 py-1 lg:py-2">
              <span>160</span><span>90</span>
            </div>
            <div className="text-4xl lg:text-6xl font-black tracking-tighter tabular-nums transition-colors duration-300 leading-none" style={{ color: displayColor }}>{value}</div>
            <div className="text-lg lg:text-2xl font-bold text-white opacity-80 ml-2 self-end mb-1 lg:mb-2 leading-none">{mapValue}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (vitalKey === 'HR') {
    return (
      <motion.div animate={isActive ? { scale: 1.1, x: -10 } : { scale: 1, x: 0 }} className={`relative transition-all duration-500 ${isActive ? 'z-20' : 'z-10'} h-full flex flex-col justify-center`}>
        <div className="flex flex-col items-end text-right w-full">
          <div className="text-sm lg:text-lg font-normal text-white mb-2 tracking-widest opacity-90 text-right w-full">无线心电采集器</div>
          <div className="flex items-center justify-end gap-4 w-full mb-2 h-8 lg:h-10">
            <div className="flex items-center gap-2">
              <span className="text-lg lg:text-2xl font-bold text-white opacity-80">ECG</span>
              <div className="relative text-[#ef4444] flex items-center justify-center">
                <Heart className="w-8 h-8 lg:w-10 lg:h-10 fill-current" />
                <Activity className="w-5 h-5 absolute text-[#22c55e]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg lg:text-2xl font-black text-white opacity-90">{config.label}</span>
              <span className="text-[10px] lg:text-xs font-bold text-white opacity-60">{config.unit}</span>
            </div>
          </div>
          <div className="flex items-stretch justify-end mt-1 lg:mt-2">
            <div className="flex flex-col justify-between text-[10px] lg:text-xs font-bold text-white opacity-60 mr-2 py-1 lg:py-2">
              <span>120</span><span>50</span>
            </div>
            <div className="text-4xl lg:text-6xl font-black tracking-tighter tabular-nums transition-colors duration-300 leading-none" style={{ color: displayColor }}>{value}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (vitalKey === 'SpO2') {
    return (
      <motion.div animate={isActive ? { scale: 1.1, x: 10 } : { scale: 1, x: 0 }} className={`relative transition-all duration-500 ${isActive ? 'z-20' : 'z-10'} h-full flex flex-col justify-center`}>
        <div className="flex flex-col items-start text-left w-full">
          <div className="text-sm lg:text-lg font-normal text-white tracking-widest opacity-90 text-left w-full mb-2">无线血氧模块</div>
          <div className="text-lg lg:text-2xl font-bold text-white opacity-90 mb-2">SpO₂%</div>
          <div className="flex items-stretch justify-start">
            <div className="flex flex-col justify-between text-[10px] lg:text-xs font-bold text-white opacity-60 mr-2 py-1 lg:py-2">
              <span>100</span><span>90</span>
            </div>
            <div className="text-4xl lg:text-6xl font-black tracking-tighter tabular-nums transition-colors duration-300 leading-none" style={{ color: displayColor }}>{value}</div>
            <div className="flex flex-col justify-between text-[10px] lg:text-xs font-bold text-white opacity-80 ml-4 py-1 lg:py-2">
              <span>Pi 6.29</span><span>PR 75</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (vitalKey === 'Temp') {
    return (
      <motion.div animate={isActive ? { scale: 1.1, x: -10 } : { scale: 1, x: 0 }} className={`relative transition-all duration-500 ${isActive ? 'z-20' : 'z-10'} h-full flex flex-col justify-center`}>
        <div className="flex flex-col items-end text-right w-full">
          <div className="text-sm lg:text-lg font-normal text-white tracking-widest opacity-90 text-right w-full mb-2">无线体温传感器</div>
          <div className="text-lg lg:text-2xl font-bold text-white opacity-90 mb-2">Temp ℃</div>
          <div className="flex items-stretch justify-end">
            <div className="flex flex-col justify-between text-[10px] lg:text-xs font-bold text-white opacity-60 mr-2 py-1 lg:py-2 text-right">
              <span>38.0</span><span>35.0</span>
            </div>
            <div className="text-4xl lg:text-6xl font-black tracking-tighter tabular-nums transition-colors duration-300 leading-none" style={{ color: displayColor }}>{Number(value).toFixed(1)}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div animate={isActive ? { scale: 1.1, x: (['BP', 'SpO2'].includes(vitalKey) ? 10 : -10) } : { scale: 1, x: 0 }} className={`relative transition-all duration-500 ${isActive ? 'z-20' : 'z-10'}`}>
      <div className={`flex flex-col ${['HR', 'Resp', 'Temp'].includes(vitalKey) ? 'items-end text-right' : 'items-start text-left'}`}>
        <div className="flex items-baseline gap-1 lg:gap-2">
          <span className="text-sm lg:text-xl font-black text-white/90 tracking-tighter">{config.label}</span>
          <span className="text-3xl lg:text-5xl font-black tracking-tighter tabular-nums transition-colors duration-300" style={{ color: displayColor }}>{value}</span>
          <div className="flex flex-col items-start">
            <span className="text-[10px] lg:text-xs font-bold opacity-60 uppercase tracking-widest">{config.unit}</span>
            {config.subLabel && <span className="text-[8px] lg:text-[10px] opacity-40 font-mono">{config.subLabel}</span>}
          </div>
        </div>
        {config.moduleName && <div className="mt-1 text-[8px] lg:text-[10px] font-bold text-white/40 tracking-widest uppercase">[{config.moduleName}]</div>}
      </div>
      {isActive && (
        <motion.div 
          layoutId="highlight" 
          className="absolute -inset-4 lg:-inset-6 border-[3px] rounded-2xl lg:rounded-[2rem] backdrop-blur-md -z-10"
          style={{
            borderColor: displayColor,
            backgroundColor: `${displayColor}1A`,
            boxShadow: `0 0 30px ${displayColor}60, inset 0 0 20px ${displayColor}20`
          }}
        />
      )}
    </motion.div>
  );
};

const RandomBreatheCircle = ({ fill, delay = 0 }: { fill: string, delay?: number }) => {
  const randomAnimation = useMemo(() => ({
    x: [0, Math.random() * 8 - 4, Math.random() * 8 - 4, Math.random() * 8 - 4, 0],
    y: [0, Math.random() * 8 - 4, Math.random() * 8 - 4, Math.random() * 8 - 4, 0],
    scale: [1, 1.3, 1.6, 1.3, 1],
    opacity: [0.8, 0.4, 0.1, 0.4, 0.8],
  }), []);

  return (
    <motion.g
      className="pointer-events-none origin-center"
      animate={randomAnimation}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      <circle cx="0" cy="0" r="8" fill={fill} />
    </motion.g>
  );
};

const PatientSVG = ({ activeVital, onSelectVital }: any) => {
  return (
    <svg viewBox="0 0 500 800" className="w-full h-full drop-shadow-2xl">
      <image 
        href="https://huaxishiping.oss-cn-beijing.aliyuncs.com/20260405device.png" 
        x="0" y="0" width="500" height="800" 
        preserveAspectRatio="xMidYMid meet"
        referrerPolicy="no-referrer"
      />
      <g transform="translate(260, 188)" onClick={(e) => { e.stopPropagation(); onSelectVital?.('HR'); }} className="cursor-pointer">
        <RandomBreatheCircle fill="#22c55e" delay={0} />
        <circle cx="0" cy="0" r="4" fill="#22c55e" stroke="#fff" strokeWidth="1.5" />
        {activeVital === 'HR' && <circle cx="0" cy="0" r="12" fill="none" stroke="#22c55e" strokeWidth="1.5" className="animate-ping" />}
      </g>
      <g transform="translate(146, 278)" onClick={(e) => { e.stopPropagation(); onSelectVital?.('BP'); }} className="cursor-pointer">
        <RandomBreatheCircle fill="#fbbf24" delay={0.5} />
        <circle cx="0" cy="0" r="4" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
        {activeVital === 'BP' && <circle cx="0" cy="0" r="12" fill="none" stroke="#fbbf24" strokeWidth="1.5" className="animate-ping" />}
      </g>
      <g transform="translate(126, 414)" onClick={(e) => { e.stopPropagation(); onSelectVital?.('SpO2'); }} className="cursor-pointer">
        <RandomBreatheCircle fill="#3b82f6" delay={1} />
        <circle cx="0" cy="0" r="4" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
        {activeVital === 'SpO2' && <circle cx="0" cy="0" r="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-ping" />}
      </g>
      <g transform="translate(288, 246)" onClick={(e) => { e.stopPropagation(); onSelectVital?.('Temp'); }} className="cursor-pointer">
        <RandomBreatheCircle fill="#ef4444" delay={1.5} />
        <circle cx="0" cy="0" r="4" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
        {activeVital === 'Temp' && <circle cx="0" cy="0" r="12" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" />}
      </g>
    </svg>
  );
};

const getRespScore = (val: number) => {
  if (val <= 8) return 3; if (val >= 9 && val <= 11) return 1; if (val >= 12 && val <= 20) return 0;
  if (val >= 21 && val <= 24) return 2; if (val >= 25) return 3; return 0;
};
const getSpO2Score = (val: number, scale: number = 1, oxygen: boolean = false) => {
  if (scale === 1) {
    if (val <= 91) return 3; if (val >= 92 && val <= 93) return 2; if (val >= 94 && val <= 95) return 1;
    if (val >= 96) return 0; return 0;
  } else {
    if (val <= 83) return 3; if (val >= 84 && val <= 85) return 2; if (val >= 86 && val <= 87) return 1;
    if (val >= 88 && val <= 92) return 0; 
    if (val >= 93 && val <= 94) return oxygen ? 1 : 0; 
    if (val >= 95 && val <= 96) return oxygen ? 2 : 0; 
    if (val >= 97) return oxygen ? 3 : 0; 
    return 0;
  }
};
const getOxygenScore = (val: boolean) => val ? 2 : 0;
const getBPScore = (val: string) => {
  const sys = parseInt(val.split('/')[0], 10);
  if (isNaN(sys)) return 0;
  if (sys <= 90) return 3; if (sys >= 91 && sys <= 100) return 2; if (sys >= 101 && sys <= 110) return 1;
  if (sys >= 111 && sys <= 219) return 0; if (sys >= 220) return 3; return 0;
};
const getHRScore = (val: number) => {
  if (val <= 40) return 3; if (val >= 41 && val <= 50) return 1; if (val >= 51 && val <= 90) return 0;
  if (val >= 91 && val <= 110) return 1; if (val >= 111 && val <= 130) return 2; if (val >= 131) return 3; return 0;
};
const getConsciousnessScore = (val: string) => val === 'CVPU' ? 3 : 0;
const getTempScore = (val: number) => {
  if (val <= 35.0) return 3; if (val >= 35.1 && val <= 36.0) return 1; if (val >= 36.1 && val <= 38.0) return 0;
  if (val >= 38.1 && val <= 39.0) return 1; if (val >= 39.1) return 2; return 0;
};

export default function WearableMonitor() {
  const [activeVital, setActiveVital] = useState<VitalKey | null>(null);
  const [isManualMode, setIsManualMode] = useState(false);
  const [vitalValues, setVitalValues] = useState<Record<string, any>>({
    HR: 75, SpO2: 93, BP: '120/80', Resp: 16, Temp: 37.0, Sleep: 6.5, Exercise: 40,
    Oxygen: false, Consciousness: '清楚', SpO2Scale: 1
  });

  const updateVital = (key: string, value: any) => {
    setIsManualMode(true);
    setVitalValues(v => ({ ...v, [key]: value }));
  };

  useEffect(() => {
    if (isManualMode) return;
    const interval = setInterval(() => {
      setVitalValues(prev => {
        const [sys, dia] = prev.BP.split('/').map(Number);
        const newSys = Math.min(Math.max(sys + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3), 110), 130);
        const newDia = Math.min(Math.max(dia + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2), 70), 90);
        
        return {
          ...prev,
          HR: Math.min(Math.max(prev.HR + (Math.random() > 0.5 ? 1 : -1), 60), 90),
          Resp: Math.min(Math.max(prev.Resp + (Math.random() > 0.8 ? 1 : Math.random() < 0.2 ? -1 : 0), 12), 20),
          SpO2: Math.min(Math.max(prev.SpO2 + (Math.random() > 0.5 ? 1 : -1), 90), 100),
          BP: `${newSys}/${newDia}`,
          Temp: Number((prev.Temp + (Math.random() - 0.5) * 0.05).toFixed(1))
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isManualMode]);

  const ewsScores = useMemo(() => {
    const hr = getHRScore(vitalValues.HR);
    const spo2 = getSpO2Score(vitalValues.SpO2, vitalValues.SpO2Scale || 1, vitalValues.Oxygen);
    const bp = getBPScore(vitalValues.BP);
    const resp = getRespScore(vitalValues.Resp);
    const temp = getTempScore(vitalValues.Temp);
    const oxygen = getOxygenScore(vitalValues.Oxygen);
    const consciousness = getConsciousnessScore(vitalValues.Consciousness);
    const total = hr + spo2 + bp + resp + temp + oxygen + consciousness;
    return { hr, spo2, bp, resp, temp, oxygen, consciousness, total };
  }, [vitalValues]);

  const ewsColor = ewsScores.total >= 7 ? '#ef4444' : ewsScores.total >= 5 ? '#f97316' : '#22c55e';
  const isFlashing = ewsScores.total >= 5 && ewsScores.total <= 6;
  const showCriticalAlert = ewsScores.total >= 7;

  const resetToDefault = () => {
    setIsManualMode(false);
    setActiveVital(null);
    setVitalValues({
      HR: 75, SpO2: 93, BP: '120/80', Resp: 16, Temp: 37.0, Sleep: 6.5, Exercise: 40,
      Oxygen: false, Consciousness: '清楚'
    });
  };

  return (
    <div 
      className={`relative w-full h-full text-white font-serif overflow-hidden selection:bg-white/20 transition-colors duration-1000 ${isFlashing ? 'animate-pulse bg-[#78350f]' : 'bg-[#3C8B56]'}`}
      onClick={resetToDefault}
    >
      <main className="relative w-full h-full flex flex-col lg:block pb-24 lg:pb-0 overflow-y-auto overflow-x-hidden">
        
        {isManualMode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold text-white/80 animate-pulse pointer-events-none">
            手动干预模式 - 点击空白处恢复默认值并继续监测
          </div>
        )}

        <div className="w-full lg:absolute lg:inset-0 flex items-center justify-center z-10 h-[45vh] lg:h-full pt-4 lg:pt-0 pointer-events-none">
          <div className="w-full max-w-md lg:max-w-2xl h-full relative pointer-events-auto">
            <PatientSVG activeVital={activeVital} onSelectVital={setActiveVital} />
          </div>
        </div>

        <div className="relative z-30 w-full px-6 lg:px-0 flex flex-row justify-between lg:block mt-4 lg:mt-0">
          <div className="flex flex-col gap-6 lg:gap-16 lg:absolute lg:left-12 lg:top-12 w-[45%] lg:w-auto" onClick={(e) => e.stopPropagation()}>
            <div onClick={() => setActiveVital('BP')}>
              <SliderWrapper value={parseInt(vitalValues.BP.split('/')[0], 10)} onChange={(e: any) => updateVital('BP', `${e.target.value}/80`)} min={60} max={250} align="left" isActive={activeVital === 'BP'}>
                <VitalCard vitalKey="BP" isActive={activeVital === 'BP'} value={vitalValues.BP} />
              </SliderWrapper>
            </div>
            <div onClick={() => setActiveVital('SpO2')}>
              <SliderWrapper value={vitalValues.SpO2} onChange={(e: any) => updateVital('SpO2', Number(e.target.value))} min={70} max={100} align="left" isActive={activeVital === 'SpO2'}>
                <VitalCard vitalKey="SpO2" isActive={activeVital === 'SpO2'} value={vitalValues.SpO2} />
              </SliderWrapper>
            </div>
            <div className="invisible pointer-events-none h-0 lg:h-auto">
              <VitalCard vitalKey="Resp" isActive={false} value={20} />
            </div>
            <div className="flex flex-col gap-3 lg:gap-6 mt-4">
              <div className="flex items-center gap-2 lg:gap-4">
                <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-white/60" />
                <span className="text-xs lg:text-lg font-bold whitespace-nowrap">睡眠 <span className="text-lg lg:text-2xl ml-1 lg:ml-2">{vitalValues.Sleep}</span><span className="text-[10px] lg:text-xs ml-1 opacity-60">h</span></span>
              </div>
              <div className="flex items-center gap-2 lg:gap-4">
                <Timer className="w-4 h-4 lg:w-5 lg:h-5 text-white/60" />
                <span className="text-xs lg:text-lg font-bold whitespace-nowrap">运动 <span className="text-lg lg:text-2xl ml-1 lg:ml-2">{vitalValues.Exercise}</span><span className="text-[10px] lg:text-xs ml-1 opacity-60">m</span></span>
              </div>
              <div className="flex items-center gap-2 lg:gap-4">
                <User className="w-4 h-4 lg:w-5 lg:h-5 text-white/60" />
                <span className="text-xs lg:text-lg font-bold whitespace-nowrap text-white/90">体态: 运动</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:gap-16 items-end text-right lg:absolute lg:right-12 lg:top-12 w-[45%] lg:w-auto" onClick={(e) => e.stopPropagation()}>
            <div onClick={() => setActiveVital('HR')}>
              <SliderWrapper value={vitalValues.HR} onChange={(e: any) => updateVital('HR', Number(e.target.value))} min={30} max={200} align="right" isActive={activeVital === 'HR'}>
                <VitalCard vitalKey="HR" isActive={activeVital === 'HR'} value={vitalValues.HR} />
              </SliderWrapper>
            </div>
            <div onClick={() => setActiveVital('Resp')}>
              <SliderWrapper value={vitalValues.Resp} onChange={(e: any) => updateVital('Resp', Number(e.target.value))} min={5} max={40} align="right" isActive={activeVital === 'Resp'}>
                <VitalCard vitalKey="Resp" isActive={activeVital === 'Resp'} value={vitalValues.Resp} />
              </SliderWrapper>
            </div>
            <div onClick={() => setActiveVital('Temp')}>
              <SliderWrapper value={vitalValues.Temp} onChange={(e: any) => updateVital('Temp', Number(e.target.value))} min={34} max={42} step={0.1} align="right" isActive={activeVital === 'Temp'}>
                <VitalCard vitalKey="Temp" isActive={activeVital === 'Temp'} value={vitalValues.Temp} />
              </SliderWrapper>
            </div>

            <div className="flex flex-col gap-3 mt-4 bg-black/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md w-full max-w-[180px] lg:max-w-[256px] text-left">
              <div className="text-xs font-bold opacity-60 uppercase mb-1">NEWS2 附加参数</div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold shrink-0">是否吸氧</span>
                <button onClick={() => updateVital('Oxygen', !vitalValues.Oxygen)} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${vitalValues.Oxygen ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60'}`}>
                  {vitalValues.Oxygen ? '是 (2分)' : '否 (0分)'}
                </button>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold shrink-0">意识状态</span>
                <button onClick={() => updateVital('Consciousness', vitalValues.Consciousness === '清楚' ? 'CVPU' : '清楚')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${vitalValues.Consciousness === 'CVPU' ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'}`}>
                  {vitalValues.Consciousness === 'CVPU' ? 'CVPU (3分)' : '清楚 (0分)'}
                </button>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold shrink-0">血氧量表</span>
                <button onClick={() => updateVital('SpO2Scale', vitalValues.SpO2Scale === 1 ? 2 : 1)} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${vitalValues.SpO2Scale === 2 ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'}`}>
                  {vitalValues.SpO2Scale === 2 ? '量表 2' : '量表 1'}
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-end lg:items-center gap-2 lg:gap-6 mt-2 lg:mt-4">
              <span className="text-lg lg:text-3xl font-black opacity-40">NEWS2</span>
              <motion.div animate={{ backgroundColor: ewsColor, scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-12 h-12 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-2xl lg:text-4xl font-black shadow-2xl border-2 lg:border-4 border-white/20">
                {ewsScores.total}
              </motion.div>
            </div>

            <div className="mt-2 lg:mt-4 bg-black/10 backdrop-blur-md p-3 lg:p-6 rounded-2xl lg:rounded-3xl border border-white/5 w-full max-w-[180px] lg:max-w-[256px] text-left">
              <div className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 lg:mb-4">早期风险预警评分 (NEWS2)</div>
              <div className="flex flex-col gap-2 lg:gap-3">
                <EWSItem label="呼吸频率" score={ewsScores.resp} color={ewsScores.resp > 0 ? '#fff' : '#22c55e'} />
                <EWSItem label="血氧饱和度" score={ewsScores.spo2} color={ewsScores.spo2 > 0 ? '#fff' : '#22c55e'} />
                <EWSItem label="是否吸氧" score={ewsScores.oxygen} color={ewsScores.oxygen > 0 ? '#fff' : '#22c55e'} />
                <EWSItem label="收缩压" score={ewsScores.bp} color={ewsScores.bp > 0 ? '#fff' : '#22c55e'} />
                <EWSItem label="心率" score={ewsScores.hr} color={ewsScores.hr > 0 ? '#fff' : '#22c55e'} />
                <EWSItem label="意识" score={ewsScores.consciousness} color={ewsScores.consciousness > 0 ? '#fff' : '#22c55e'} />
                <EWSItem label="体温" score={ewsScores.temp} color={ewsScores.temp > 0 ? '#fff' : '#22c55e'} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative lg:absolute lg:left-12 lg:bottom-12 w-[calc(100%-3rem)] mx-6 lg:mx-0 lg:w-96 h-28 lg:h-[264px] bg-black/20 backdrop-blur-xl rounded-2xl lg:rounded-[2rem] border border-white/10 p-4 lg:p-6 overflow-hidden mt-8 mb-12 lg:mt-0 lg:mb-0 z-30 flex flex-col shrink-0" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-green-400">ECG Real-time</span>
            </div>
            <span className="text-[8px] lg:text-[10px] font-mono opacity-30">II - 25mm/s</span>
          </div>
          <div className="flex-1 w-full relative min-h-[40px]">
            <ECGWaveform />
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showCriticalAlert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-red-600 text-white p-8 rounded-3xl max-w-md w-full shadow-2xl border border-red-400 flex flex-col items-center text-center" onClick={(e) => e.stopPropagation()}>
              <AlertCircle className="w-20 h-20 mb-6 animate-pulse" />
              <h2 className="text-3xl font-black mb-2">高危预警</h2>
              <p className="text-xl font-bold mb-8 opacity-90">NEWS2 评分 ≥ 7 分</p>
              <div className="bg-black/20 px-6 py-4 rounded-xl w-full mb-8">
                <p className="text-2xl font-black tracking-widest">立即启动快速反应小组</p>
              </div>
              <button onClick={() => { setIsManualMode(false); setVitalValues(v => ({ ...v, Temp: 37.0, HR: 75, Resp: 16 })); }} className="bg-white text-red-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-red-50 transition-colors">
                已收到，采取措施
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const EWSItem = ({ label, score, color }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-xs font-bold opacity-80">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-xs font-black opacity-60">[{score}]</span>
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
    </div>
  </div>
);

import { motion } from 'motion/react';
import { Activity, Shield, Server, Network, Wifi, Monitor, User, AlertTriangle, ChevronRight } from 'lucide-react';

export default function HospitalScene() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="space-y-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-brand-green mb-4 tracking-tighter">HOSPITAL</h2>
        <p className="text-lg font-bold opacity-60">典型院内场景 — 智慧病区全景监护</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Card 1: Central Workstation */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[32px] p-10 md:p-12 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500 group cursor-default"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-brand-green/5 rounded-2xl text-brand-green">
              <Monitor size={32} />
            </div>
            <div className="text-xs font-black tracking-widest opacity-30 uppercase">Station</div>
          </div>
          <h3 className="text-2xl font-black mb-4">中央工作站</h3>
          <p className="text-base font-bold opacity-70 mb-6">全院级病床动态实时掌控，风险分级管理</p>
          
          <div className="space-y-4 max-h-[400px] opacity-100 mt-8 pt-8 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-8 md:group-hover:pt-8 border-t border-brand-green/10 transition-all duration-700 overflow-hidden">
            {[
              { id: 1, risk: 0, color: 'bg-green-500', label: '低风险' },
              { id: 2, risk: 1, color: 'bg-yellow-500', label: '中风险' },
              { id: 4, risk: 4, color: 'bg-red-500', label: '高风险' },
            ].map(bed => (
              <div key={bed.id} className="flex justify-between items-center p-3 bg-apple-grey rounded-xl">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${bed.color}`}></span>
                  <span className="font-bold text-sm">病床 {bed.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black opacity-40 uppercase">{bed.label}</span>
                  <span className="text-sm font-black">{bed.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2: Risk Warning */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[32px] p-10 md:p-12 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500 group cursor-default"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-brand-green/5 rounded-2xl text-brand-green">
              <AlertTriangle size={32} />
            </div>
            <div className="text-xs font-black tracking-widest opacity-30 uppercase">EWS Score</div>
          </div>
          <h3 className="text-2xl font-black mb-4">早期风险预警评分</h3>
          <p className="text-base font-bold opacity-70 mb-6">基于多维生命体征的智能评分系统</p>
          
          <div className="max-h-[400px] opacity-100 mt-8 pt-8 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-8 md:group-hover:pt-8 border-t border-brand-green/10 transition-all duration-700 overflow-hidden">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: '心率', val: 2 },
                { label: '呼吸', val: 1 },
                { label: '体温', val: 0 },
                { label: 'SpO2', val: 1 },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-apple-grey rounded-xl flex justify-between items-center">
                  <span className="text-xs font-bold opacity-60">{item.label}</span>
                  <span className="text-sm font-black text-brand-green">{item.val}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-2xl">
              <span className="font-black">当前综合评分</span>
              <span className="text-2xl font-black">4</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Real-time Data */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[32px] p-10 md:p-12 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500 group cursor-default"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-brand-green/5 rounded-2xl text-brand-green">
              <Activity size={32} />
            </div>
            <div className="text-xs font-black tracking-widest opacity-30 uppercase">Live Data</div>
          </div>
          <h3 className="text-2xl font-black mb-4">实时监护数据</h3>
          <p className="text-base font-bold opacity-70 mb-6">毫秒级数据同步，生命体征全程在线</p>
          
          <div className="space-y-3 max-h-[400px] opacity-100 mt-8 pt-8 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-8 md:group-hover:pt-8 border-t border-brand-green/10 transition-all duration-700 overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b border-black/5">
              <span className="text-sm font-bold opacity-60">心率 bpm</span>
              <span className="text-lg font-black text-brand-green">112</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-black/5">
              <span className="text-sm font-bold opacity-60">体温 ℃</span>
              <span className="text-lg font-black text-brand-green">36.7</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-black/5">
              <span className="text-sm font-bold opacity-60">血压 mmHg</span>
              <span className="text-lg font-black text-brand-green">121/80</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Infrastructure & Network */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[32px] p-10 md:p-12 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500 group cursor-default"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-brand-green/5 rounded-2xl text-brand-green">
              <Network size={32} />
            </div>
            <div className="text-xs font-black tracking-widest opacity-30 uppercase">Network</div>
          </div>
          <h3 className="text-2xl font-black mb-4">智慧病区基础设施</h3>
          <p className="text-base font-bold opacity-70 mb-6">嵌入式医院网络，安全可靠的数据闭环</p>
          
          <div className="grid grid-cols-2 gap-4 max-h-[400px] opacity-100 mt-8 pt-8 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-8 md:group-hover:pt-8 border-t border-brand-green/10 transition-all duration-700 overflow-hidden">
            <div className="p-4 bg-apple-grey rounded-2xl flex flex-col items-center gap-2">
              <Server size={20} className="text-brand-green" />
              <span className="text-[10px] font-black opacity-60">安全服务器</span>
            </div>
            <div className="p-4 bg-apple-grey rounded-2xl flex flex-col items-center gap-2">
              <Shield size={20} className="text-brand-green" />
              <span className="text-[10px] font-black opacity-60">数据港湾</span>
            </div>
            <div className="p-4 bg-apple-grey rounded-2xl flex flex-col items-center gap-2">
              <Wifi size={20} className="text-brand-green" />
              <span className="text-[10px] font-black opacity-60">生物传感器</span>
            </div>
            <div className="p-4 bg-apple-grey rounded-2xl flex flex-col items-center gap-2">
              <Network size={20} className="text-brand-green" />
              <span className="text-[10px] font-black opacity-60">医院网络</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Professional Features Section */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-brand-green text-white rounded-[40px] p-12 md:p-16 relative overflow-hidden"
      >
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-black mb-8">多场景覆盖的专业监护</h3>
            <div className="space-y-4">
              {[
                '智能实时提示与医疗级精度',
                '多屏互动监护（中央/移动/手持/床旁）',
                '生态开放平台，支持第三方系统接入',
                '多模式病人接收，支持扫码与录入',
                '可接入电子病历与床旁互动屏'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ChevronRight size={14} />
                  </div>
                  <span className="text-base font-bold opacity-90">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-64 h-64 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-3xl border border-white/20">
              <User size={80} className="opacity-40" />
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  );
}

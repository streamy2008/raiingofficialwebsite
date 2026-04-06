import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Thermometer, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowUpRight,
  Database,
  Cpu,
  HeartPulse,
  Monitor,
  Wind,
  Zap,
  FileText,
  Stethoscope
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById('heating-device-scroll-container');
    if (!container) return;
    
    const handleScroll = () => setIsScrolled(container.scrollTop > 50);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '无线传感器', href: '#monitoring' },
    { name: '升温干预', href: '#intervention' },
    { name: '系统管理', href: '#management' },
    { name: '学术验证', href: '#academic' },
  ];

  return (
    <nav className={`glass-nav transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'} sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-brand-green/10`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 pr-16 md:pr-24">
        <div className="flex items-center gap-2">
          <img 
            src="https://huaxishiping.oss-cn-beijing.aliyuncs.com/1.png" 
            alt="Logo" 
            className="w-8 h-8 object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-bold tracking-tight">CareClever | 万木千帆</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold opacity-80 hover:opacity-100 transition-opacity"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-brand-green text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-green/90 transition-colors">联系我们</button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-brand-green/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-brand-green text-white px-4 py-3 rounded-xl w-full font-bold">联系我们</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-brand-green font-bold tracking-widest uppercase text-sm mb-4 block"
        >
          无线监测 • 智能干预 • 系统管理
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight"
        >
          无线体温管理 <br />
          <span className="text-brand-green">智能闭环解决方案</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl opacity-80 mb-10 max-w-2xl mx-auto font-bold"
        >
          Monitoring Intervention Managing <br />
          为围术期患者提供全流程、高精度的体温安全保障
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="bg-brand-green text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-green/90 transition-colors">探索解决方案</button>
          <button className="flex items-center gap-1 text-brand-green font-bold hover:opacity-80 transition-opacity text-lg">
            观看产品视频 <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6"
      >
        <div className="bg-apple-grey rounded-t-3xl overflow-hidden h-64 md:h-96 flex items-center justify-center relative group">
          <img 
            src="https://huaxishiping.oss-cn-beijing.aliyuncs.com/hero.png" 
            alt="Medical System" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white">
            <p className="text-xs md:text-sm font-bold opacity-80">CareClever</p>
            <h3 className="text-lg md:text-2xl font-black">智能闭环解决方案</h3>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ProductCard = ({ title, subtitle, features, id, index }: any) => {
  const isEven = index % 2 === 0;
  return (
    <section id={id} className={`py-24 ${isEven ? 'bg-white' : 'bg-apple-grey'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-green font-bold mb-2"
          >
            {subtitle}
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 md:whitespace-nowrap"
          >
            {title}
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-brand-green/10 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h5 className="text-xl font-bold mb-3">{feature.name}</h5>
              <p className="opacity-80 leading-relaxed font-bold">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AcademicSection = () => {
  const literatures = [
    {
      title: "腋动脉近核心体温(Near-core)",
      journal: "Anesthesiology",
      desc: "腋动脉近核心体温可以作为核心体温的替代，具有极高的临床一致性",
      icon: <FileText className="text-brand-green" />
    },
    {
      title: "成人手术 (VS. 食道温)",
      journal: "北京协和医院/四川大学华西医院",
      desc: "iThermometer®测量值与食道温具有极高的一致性，平均偏差仅0.14℃",
      icon: <Stethoscope className="text-brand-green" />
    },
    {
      title: "小儿手术 (VS. 食道温)",
      journal: "首都医科大学附属北京儿童医院",
      desc: "在小儿手术中，iThermometer®同样表现出卓越的准确性，偏差控制在0.25℃以内",
      icon: <HeartPulse className="text-brand-green" />
    }
  ];

  return (
    <section id="academic" className="py-24 bg-apple-grey">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">学术验证与临床应用</h2>
          <p className="opacity-80 max-w-2xl mx-auto font-bold">
            CareClever® 解决方案经过多家顶级三甲医院临床验证，具有极高的准确性和可靠性
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {literatures.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-brand-green/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-apple-grey flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-black mb-2">{item.title}</h3>
              <p className="text-brand-green text-sm font-bold mb-4">{item.journal}</p>
              <p className="opacity-80 text-sm leading-relaxed font-bold">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-20 px-6 border-t border-brand-green/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img 
              src="https://huaxishiping.oss-cn-beijing.aliyuncs.com/1.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold tracking-tight">CareClever | 万木千帆</span>
          </div>
          <p className="opacity-80 max-w-sm mb-8 font-bold">
            专注物联网、大数据和人工智能技术创新，致力于提供智能生命体征监测及患者风险预测数字化解决方案
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-apple-grey flex items-center justify-center cursor-pointer hover:bg-brand-green/10 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-black mb-6">产品系列</h4>
          <ul className="space-y-4 opacity-80 text-sm font-bold">
            <li><a href="#" className="hover:text-brand-green">无线体温传感器</a></li>
            <li><a href="#" className="hover:text-brand-green">医用升温毯 (电热)</a></li>
            <li><a href="#" className="hover:text-brand-green">充气升温装置</a></li>
            <li><a href="#" className="hover:text-brand-green">体温监测系统</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-black mb-6">关于我们</h4>
          <ul className="space-y-4 opacity-80 text-sm font-bold">
            <li><a href="#" className="hover:text-brand-green">公司简介</a></li>
            <li><a href="#" className="hover:text-brand-green">学术文献</a></li>
            <li><a href="#" className="hover:text-brand-green">新闻动态</a></li>
            <li><a href="#" className="hover:text-brand-green">联系我们</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-green/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60 font-bold">
        <p>© 2026 万木千帆科技. 保留所有权利</p>
        <div className="flex gap-8">
          <a href="#" className="hover:underline">隐私政策</a>
          <a href="#" className="hover:underline">服务条款</a>
          <a href="#" className="hover:underline">www.raiing.com</a>
        </div>
      </div>
    </footer>
  );
};

export default function HeatingDevice() {
  return (
    <div className="min-h-screen bg-white text-brand-green font-serif overflow-y-auto h-full w-full">
      <Navbar />
      
      <Hero />
      
      <ProductCard 
        id="monitoring"
        index={0}
        subtitle="无线监测传感器"
        title="全场景体温监测 精准触达"
        description="涵盖腋动脉型、耳道型及腔内型（食道、鼻咽、直肠、膀胱），满足手术麻醉、普通病房、ICU等全场景需求"
        features={[
          { name: "腋动脉型", desc: "CW101A/CW110A系列，无创舒适，10-30天长续航", icon: <Activity className="text-green-500" /> },
          { name: "耳道型", desc: "CW20/CW30系列，反映核心体温，全方位临床适配", icon: <ShieldCheck className="text-green-500" /> },
          { name: "腔内型", desc: "CW401A系列，支持食道、鼻咽、直肠", icon: <Thermometer className="text-green-500" /> },
          { name: "腔内II型", desc: "无线导尿管温度监测", icon: <Cpu className="text-green-500" /> }
        ]}
      />
      
      <ProductCard 
        id="intervention"
        index={1}
        subtitle="智能升温干预"
        title="主动升温 守护围术期安全"
        description="提供碳纤维电热升温毯及充气升温装置，通过智能闭环控制，有效预防围术期低体温"
        features={[
          { name: "电热升温毯", desc: "H620/H680系列，碳纤维加热，无电磁干扰", icon: <Zap className="text-blue-500" /> },
          { name: "充气升温", desc: "FAW系列，快速升温，多种一次性风毯可选", icon: <Wind className="text-blue-500" /> },
          { name: "闭环管理", desc: "根据实时体温自动调节功率，防止过热", icon: <Thermometer className="text-blue-500" /> },
          { name: "安全防护", desc: "IPX7防水，多重温度报警，生物安全性检测", icon: <ShieldCheck className="text-blue-500" /> }
        ]}
      />

      <ProductCard 
        id="management"
        index={2}
        subtitle="系统管理平台"
        title="数字化体温管理 构建闭环"
        description="MP101A无线体温监测系统，实现全院级体温数据实时汇总、预警及分析，提升临床效率"
        features={[
          { name: "实时汇总", desc: "多床位体温数据一屏掌控，实时趋势分析", icon: <Monitor className="text-purple-500" /> },
          { name: "智能预警", desc: "低体温、高体温自动报警，及时干预", icon: <Activity className="text-purple-500" /> },
          { name: "HIS集成", desc: "无缝对接医院信息系统，数据自动归档", icon: <Database className="text-purple-500" /> },
          { name: "移动端支持", desc: "支持平板、手机端查看，随时随地掌握动态", icon: <Cpu className="text-purple-500" /> }
        ]}
      />
      
      <AcademicSection />
      
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-black tracking-tight mb-8">开启智能化体温管理新纪元</h2>
          <p className="text-lg md:text-xl opacity-80 mb-10 px-4 font-bold">
            万木千帆科技，以数据驱动医疗，让每一位患者都能享受到更智慧、更安全的医疗服务
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-brand-green text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-brand-green/90 transition-colors">申请演示</button>
            <button className="px-10 py-4 text-lg font-bold border border-brand-green/20 rounded-full hover:bg-apple-grey transition-colors">
              下载产品手册
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

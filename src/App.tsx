import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X, Phone, Mail, MapPin, Monitor, ChevronRight } from 'lucide-react';
import HospitalScene from './components/HospitalScene';
import WearableMonitor from './components/WearableMonitor';
import HeatingDevice from './components/HeatingDevice';

// --- Types ---
interface ProductDetail {
  id: string;
  title: string;
  image: string;
  sections: {
    title: string;
    content: string;
    image?: string;
    quote?: {
      text: string;
      author: string;
    };
    note?: string;
  }[];
}

const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  sensorDetail: {
    id: 'sensorDetail',
    title: 'iThermonitor® 无线体温传感器系列',
    image: 'https://wds-service-1258344699.file.myqcloud.com/20/14846/png/1672822287340f0268775c646e844.png',
    sections: [
      {
        title: '无线体温传感器-腋动脉型',
        content: '预期用途：配套监护设备使用，用于采集和传递人体体温阻值信号。主要场景：普通病房、PACU、ICU、疫情防控等。产品特点：SCI文献验证、无创舒适监测、标示核心体温、蓝牙无线传输、全监护仪适配。',
      },
      {
        title: '无线体温传感器-耳道型',
        image: 'https://wds-service-1258344699.file.myqcloud.com/20/14846/png/16728224530834ead74cebd62effb.png',
        content: '预期用途：采集人体耳温信号。特点：无创、鼓膜核心温度、蓝牙传输。场景：PACU、重症医学科、特护病房。',
      },
      {
        title: '无线体温传感器-腔内I型/II型',
        content: '适用范围/预期用途：与具有体温监护功能的监护设备（如各品牌监护仪、监护系统）配套使用，用于采集和传递人体体腔温度信号（包括食道、直肠、鼻咽部和膀胱温度信号）。产品分为 Ⅰ型 和 Ⅱ型：Ⅰ型用于食道、直肠或鼻咽部监测；Ⅱ型为膀胱测温导尿管系列。主要应用场景：手术麻醉科、重症医学科、特护病房。特点：无菌产品、高精度持续测温、体液防护、安全保障、易操作。',
      }
    ]
  },
  systemDetail: {
    id: 'systemDetail',
    title: '万木千帆®CareClever® 无线体温监测系统',
    image: 'https://huaxishiping.oss-cn-beijing.aliyuncs.com/device.png',
    sections: [
      {
        title: '无线体温监测系统（围手术期）',
        content: '应用场景：手术麻醉科、ICU、普通病房、产房(分娩镇痛)。特点：无创监测、无线传输、轻松操作、数据分析、可视图表、数据沉淀、动态连续性、直观体温趋势、PACU多床位监测、质控指标可视化、自动物联网。',
        quote: {
          text: '“围手术期全程监测体温- 手术患者的体温监测应具有动态连续性、涵盖整个围手术期，包括术前、术中、术后恢复期。建议术前即开始体温监测，作为患者基础体温值，为实施预保温提供参考；术后体温监测亦非常重要，不仅可评估术中体温保护措施的效果，还可以为后续治疗提供参考。”',
          author: '——围手术期患者低体温防治专家共识（2017）'
        }
      },
      {
        title: '无线体温监测系统（智慧病区）',
        content: '应用场景：普通病房、传染病房、急诊病房、肿瘤病房、新生儿病房、重症医学科。特点：使用智能无线体温系统，比传统体温监测平均提前4.35小时发现患者发热。可实现无创监测、自动HIS填报*等功能。',
        note: '[1] Liu Y, Liu C, Gao M, Wang Y, Bai Y, Xu R, Gong R. Evaluation of a wearable wireless device with artificial intelligence, iThermonitor WT705, for continuous temperature monitoring for patients in surgical wards: a prospective comparative study. BMJ Open. 2020 Nov 18;10(11):e039474. *项功能需要与医院系统对接后方可实现。'
      },
      {
        title: '无线体温监测系统（疫情防控）',
        content: '应用场景：重点管控（居家隔离、集中隔离）、医院系统（传染科、呼吸科、急诊、ICU、方舱医院）。特点：性价比高、部署快、医患智能交互。适用于居家隔离、方舱医院、急诊病房等重点管控场景。'
      }
    ]
  },
  wearableSystemDetail: {
    id: 'wearableSystemDetail',
    title: '无线可穿戴多参数监护系统',
    image: 'https://huaxishiping.oss-cn-beijing.aliyuncs.com/device.png',
    sections: [
      {
        title: '典型院内场景 - 智慧病区',
        content: '通过无线可穿戴技术，实现全院级、多场景的专业监护。系统涵盖中央监控、移动监护、早期预警及数据集成。',
      }
    ]
  }
};

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [contactModal, setContactModal] = useState<{ title: string; contact: string; phone: string } | null>(null);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);

  // Animation variants
  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <div className="min-h-screen font-serif">
      {/* --- Navigation --- */}
      <header className="fixed top-0 w-full h-12 backdrop-blur-nav z-[1000]">
        <div className="max-w-5xl mx-auto h-full flex justify-center items-center px-6">
          <nav>
            <ul className="flex items-center gap-4 md:gap-8 list-none">
              <li className="hidden md:block"><a href="#home" className="text-[13px] font-normal h-12 flex items-center hover:opacity-70 transition-opacity">首页</a></li>
              <li className="hidden md:block"><a href="#products" className="text-[13px] font-normal h-12 flex items-center hover:opacity-70 transition-opacity">产品</a></li>
              <li className="hidden md:block">
                <a href="#solutions" className="text-[13px] font-normal h-12 flex items-center hover:opacity-70 transition-opacity">
                  <span className="text-center leading-[1.2]">解决方案</span>
                </a>
              </li>
              <li className="hidden md:block">
                <a href="#partners" className="text-[13px] font-normal h-12 flex items-center hover:opacity-70 transition-opacity">
                  <span className="text-center leading-[1.2]">合作伙伴</span>
                </a>
              </li>
              <li className="hidden md:block">
                <a href="#news" className="text-[13px] font-normal h-12 flex items-center hover:opacity-70 transition-opacity">
                  <span className="text-center leading-[1.2]">新闻资讯</span>
                </a>
              </li>
              <li className="relative group">
                <button 
                  onClick={() => setIsContactMenuOpen(!isContactMenuOpen)}
                  className="text-[13px] font-normal h-12 flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer relative z-10"
                >
                  <span className="text-center leading-[1.2]">联系我们</span> 
                  <ChevronDown size={12} />
                </button>
                
                {/* Invisible overlay to catch clicks outside on mobile */}
                {isContactMenuOpen && (
                  <div 
                    className="fixed inset-0 z-0 md:hidden" 
                    onClick={() => setIsContactMenuOpen(false)}
                  />
                )}

                {/* Submenu */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 z-10 ${isContactMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'}`}>
                  <div className="bg-white rounded-2xl apple-shadow w-72 p-3 border border-brand-green/10">
                    <button 
                      onClick={() => {
                        setContactModal({ title: '无线体温业务', contact: '联系人：董先生', phone: '+86-18600145600' });
                        setIsContactMenuOpen(false);
                      }}
                      className="w-full text-left p-4 rounded-xl hover:bg-apple-grey transition-all group/item"
                    >
                      <h4 className="text-base font-bold mb-1 border-b border-brand-green/10 pb-1">无线体温业务</h4>
                      <p className="text-xs opacity-80">点击查看联系详情</p>
                    </button>
                    <button 
                      onClick={() => {
                        setContactModal({ title: '无线多参数监护业务', contact: '联系人：赵先生', phone: '+86-18884113373' });
                        setIsContactMenuOpen(false);
                      }}
                      className="w-full text-left p-4 rounded-xl hover:bg-apple-grey transition-all mt-2"
                    >
                      <h4 className="text-base font-bold mb-1 border-b border-brand-green/10 pb-1">无线多参数监护业务</h4>
                      <p className="text-xs opacity-80">点击查看联系详情</p>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* --- Hero Banner --- */}
      <section className="h-[400px] bg-brand-green flex items-center justify-center mt-12 overflow-hidden">
        <motion.h1 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="text-4xl md:text-5xl font-bold text-white tracking-tight"
        >
          Connect Health For Tomorrow
        </motion.h1>
      </section>

      {/* --- Core Text --- */}
      <section id="home" className="py-32 px-6 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="max-w-5xl mx-auto"
        >
          <h2 className="font-black leading-[1.1] tracking-widest">
            <span className="block mb-4 text-[clamp(48px,12vw,92px)]">MONITORING</span>
            <span className="block mb-4 text-[clamp(48px,12vw,92px)]">INTERVENTION</span>
            <span className="block mb-4 text-[clamp(48px,12vw,92px)]">MANAGING</span>
          </h2>
          <a href="#products" className="inline-block mt-10 border-2 border-brand-green px-10 py-3 rounded-full text-lg font-bold hover:bg-brand-green hover:text-white transition-all">
            了解更多
          </a>
        </motion.div>
      </section>

      {/* --- Products Grid --- */}
      <section id="products" className="py-20 px-6 bg-apple-grey">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="text-center text-3xl font-bold mb-16"
          >
            可穿戴监护 低体温干预 围术期管理
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Item 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              onClick={() => setActiveOverlay('sensorDetail')}
              className="bg-white rounded-[28px] p-10 md:p-12 cursor-pointer transition-all duration-500 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 group"
            >
              <h3 className="text-2xl font-black mb-4">无线体温传感器</h3>
              <p className="text-base font-bold opacity-85 mb-5">精准实时体温监测，适用于多种医疗场景</p>
              <div className="max-h-[500px] opacity-100 mt-5 pt-5 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 md:group-hover:mt-5 md:group-hover:pt-5 border-t border-brand-green/10 transition-all duration-500 overflow-hidden">
                <p className="text-sm mb-2 leading-relaxed">iThermonitor® 无线体温传感器（腋动脉型）</p>
                <p className="text-sm mb-2 leading-relaxed">iThermonitor® 无线体温传感器（耳道型）</p>
                <p className="text-sm mb-2 leading-relaxed">iThermonitor® 无线体温传感器（腔内I型）</p>
                <p className="text-sm mb-2 leading-relaxed">iThermonitor® 无线体温传感器（腔内II型）</p>
              </div>
            </motion.div>

            {/* Product Item 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              onClick={() => setActiveOverlay('systemDetail')}
              className="bg-white rounded-[28px] p-10 md:p-12 cursor-pointer transition-all duration-500 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 group"
            >
              <h3 className="text-2xl font-black mb-4">无线体温监测系统</h3>
              <p className="text-base font-bold opacity-85 mb-5">多设备协同工作，实现全院级体温管理</p>
              <div className="max-h-[500px] opacity-100 mt-5 pt-5 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 md:group-hover:mt-5 md:group-hover:pt-5 border-t border-brand-green/10 transition-all duration-500 overflow-hidden">
                <p className="text-sm mb-2 leading-relaxed">万木千帆®CareClever® 无线系统（围手术期）</p>
                <p className="text-sm mb-2 leading-relaxed">万木千帆®CareClever® 无线系统（智慧病区）</p>
                <p className="text-sm mb-2 leading-relaxed">万木千帆®CareClever® 无线系统（疫情防控）</p>
              </div>
            </motion.div>

            {/* Product Item 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              onClick={() => setActiveOverlay('monitorIframe')}
              className="bg-white rounded-[28px] p-10 md:p-12 cursor-pointer transition-all duration-500 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 group"
            >
              <h3 className="text-2xl font-black mb-4">无线可穿戴多参数监护仪</h3>
              <p className="text-base font-bold opacity-85 mb-5">实时监测多项生命体征，提升医疗效率</p>
              <div className="max-h-[500px] opacity-100 mt-5 pt-5 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 md:group-hover:mt-5 md:group-hover:pt-5 border-t border-brand-green/10 transition-all duration-500 overflow-hidden">
                <h5 className="font-bold mb-2">主要应用场景：</h5>
                <p className="text-sm mb-1 leading-relaxed">内外科普通病房 / 老年病房 / ERAS病房</p>
                <p className="text-sm mb-1 leading-relaxed">手术室外麻醉 / 转运过程 / 急诊中心</p>
                <p className="text-sm mb-1 leading-relaxed">化疗中心 / 透析中心 / 心衰中心</p>
              </div>
            </motion.div>

            {/* Product Item 4 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              onClick={() => setActiveOverlay('wearableSystemDetail')}
              className="bg-white rounded-[28px] p-10 md:p-12 cursor-pointer transition-all duration-500 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 group"
            >
              <h3 className="text-2xl font-black mb-4">无线可穿戴多参数监护系统</h3>
              <p className="text-base font-bold opacity-85 mb-5">模块化集成化监护解决方案，支持远程医疗</p>
              <div className="max-h-[500px] opacity-100 mt-5 pt-5 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 md:group-hover:mt-5 md:group-hover:pt-5 border-t border-brand-green/10 transition-all duration-500 overflow-hidden">
                <p className="text-sm mb-2 leading-relaxed">自由穿戴—四组传感器自由穿戴</p>
                <p className="text-sm mb-2 leading-relaxed">全程在线—医护可随时随地监护</p>
                <p className="text-sm mb-2 leading-relaxed">多屏互动—中央、移动、手持、床旁</p>
                <p className="text-sm mb-2 leading-relaxed">分区监护—自由命名病区分区</p>
              </div>
            </motion.div>

            {/* Product Item 5 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              onClick={() => setActiveOverlay('heatingDevice')}
              className="bg-white rounded-[28px] p-10 md:p-12 cursor-pointer transition-all duration-500 border border-brand-green/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10 group"
            >
              <h3 className="text-2xl font-black mb-4">智能闭环充气升温装置</h3>
              <p className="text-base font-bold opacity-85 mb-5">智能温控，围术期低体温防治专家</p>
              <div className="max-h-[500px] opacity-100 mt-5 pt-5 md:max-h-0 md:opacity-0 md:mt-0 md:pt-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 md:group-hover:mt-5 md:group-hover:pt-5 border-t border-brand-green/10 transition-all duration-500 overflow-hidden">
                <p className="text-sm mb-2 leading-relaxed">产品由充气升温装置主机、一次性使用医用充气升温毯、可重复性使用医用充气升温毯和无线体温传感器（可选）、无线体温探头（可选）组成。</p>
                <p className="text-sm mb-2 leading-relaxed">两种医用充气式升温毯，可二选一。</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- About Us --- */}
      <section id="about" className="py-24 px-6 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-black mb-8">关于我们</h2>
          <div className="text-base leading-[2.2] text-justify opacity-95">
            睿仁医疗科技，旗下拥有北京睿仁医疗科技有限公司和湖南万木千帆科技有限公司两个科技运营实体，拥有包括万木千帆®、CareClever®、iThermonitor®、发烧总监®、iFertracker®、孕律®在内的多个健康医疗品牌。我们设计打造穿戴式生命监测、物联网解决方案、数据及人工智能服务，帮助医生更好地诊断、管理、预防和干预，帮助人们更好地管理自己的健康。
          </div>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-16 px-6 text-center border-t border-brand-green/5 bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-4 text-xs mb-4">
            <a href="tel:010-64118658" className="flex items-center gap-1 hover:opacity-70 transition-opacity"><Phone size={12} /> 010-64118658</a>
            <span className="opacity-30">|</span>
            <a href="tel:010-56411036" className="flex items-center gap-1 hover:opacity-70 transition-opacity"><Phone size={12} /> 010-56411036</a>
            <span className="opacity-30">|</span>
            <a href="mailto:support@raiing.com" className="flex items-center gap-1 hover:opacity-70 transition-opacity"><Mail size={12} /> support@raiing.com</a>
            <span className="opacity-30">|</span>
            <a 
              href="https://uri.amap.com/search?keyword=北京市朝阳区北苑东路19号中国铁建广场E座" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            >
              <MapPin size={12} /> 北京市朝阳区北苑东路19号中国铁建广场E座
            </a>
          </div>
          <div className="text-[10px] opacity-60">
            Copyright © 2022 Raiing All rights reserved. 京ICP备14029927号-1 药品医疗器械网络信息服务备案[(京)网药械信息备字（2023）第 00356 号]
          </div>
        </motion.div>
      </footer>

      {/* --- Overlays --- */}
      <AnimatePresence>
        {activeOverlay && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed inset-0 bg-white z-[3000] ${activeOverlay === 'monitorIframe' ? 'overflow-hidden' : 'overflow-y-auto'}`}
          >
            {activeOverlay === 'monitorIframe' ? (
              <div className="w-full h-full relative bg-[#3C8B56]">
                <button 
                  onClick={() => setActiveOverlay(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-[100] bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-md transition-all"
                >
                  <X size={24} />
                </button>
                <WearableMonitor />
              </div>
            ) : activeOverlay === 'heatingDevice' ? (
              <div id="heating-device-scroll-container" className="w-full h-full relative overflow-y-auto">
                <button 
                  onClick={() => setActiveOverlay(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-[100] bg-black/10 hover:bg-black/20 text-black p-3 rounded-full backdrop-blur-md transition-all"
                >
                  <X size={24} />
                </button>
                <HeatingDevice />
              </div>
            ) : (
              <>
                <div className="sticky top-0 bg-white/90 backdrop-blur-xl px-6 py-5 flex justify-between items-center border-b border-brand-green/10 z-10">
                  <div className="font-bold">产品详情</div>
                  <button 
                    onClick={() => setActiveOverlay(null)}
                    className="text-2xl p-2 hover:opacity-70 transition-opacity"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="max-w-4xl mx-auto py-10 px-6">
                  {activeOverlay === 'wearableSystemDetail' ? (
                    <HospitalScene />
                  ) : (
                    <div className="mb-16">
                      <h1 className="text-3xl md:text-4xl font-black mb-8 text-center">{PRODUCT_DETAILS[activeOverlay].title}</h1>
                      <img 
                        src={PRODUCT_DETAILS[activeOverlay].image} 
                        alt={PRODUCT_DETAILS[activeOverlay].title}
                        className="w-full max-w-lg mx-auto block rounded-2xl mb-12"
                        referrerPolicy="no-referrer"
                      />
                      
                      {PRODUCT_DETAILS[activeOverlay].sections.map((section, idx) => (
                        <div key={idx} className="mt-12">
                          <h5 className="text-xl font-black mb-4 border-l-4 border-brand-green pl-4">{section.title}</h5>
                          {section.image && (
                            <img 
                              src={section.image} 
                              alt={section.title} 
                              className="w-full max-w-md mx-auto block rounded-2xl my-8"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <p className="text-base leading-relaxed opacity-95 mb-4">{section.content}</p>
                          
                          {section.quote && (
                            <div className="expert-quote italic bg-apple-grey p-8 rounded-2xl relative my-6 border border-black/5">
                              <p className="relative z-10">{section.quote.text}</p>
                              <div className="text-right text-xs mt-4 font-bold opacity-80">{section.quote.author}</div>
                            </div>
                          )}
                          
                          {section.note && (
                            <div className="text-xs opacity-70 border-t border-brand-green/10 pt-5 mt-8 leading-relaxed">
                              {section.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-center mt-48 pb-20">
                    <button 
                      onClick={() => setActiveOverlay(null)}
                      className="border-2 border-brand-green px-10 py-3 rounded-full text-lg font-bold hover:bg-brand-green hover:text-white transition-all"
                    >
                      返回产品列表
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Contact Modal --- */}
      <AnimatePresence>
        {contactModal && (
          <div className="fixed inset-0 z-[4000] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactModal(null)}
              className="absolute inset-0 bg-black/50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-10 rounded-[20px] w-full max-w-sm relative text-center apple-shadow"
            >
              <button 
                onClick={() => setContactModal(null)}
                className="absolute top-4 right-5 text-xl font-bold p-2"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-black mb-5">{contactModal.title}</h3>
              <p className="text-base mb-2">{contactModal.contact}</p>
              <p className="text-lg font-bold text-brand-green mb-8">{contactModal.phone}</p>
              <a 
                href={`tel:${contactModal.phone}`}
                className="inline-block border-2 border-brand-green px-10 py-3 rounded-full text-lg font-bold hover:bg-brand-green hover:text-white transition-all"
              >
                立即拨打
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

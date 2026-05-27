"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import AvatarImage from "@/assets/images/avatar.png";

/** 与头部高度对齐，用于滚动判断与锚点定位 */
const HEADER_OFFSET_PX = 80;

const anchors = [
  { title: "INTRODUCTION / 介绍", id: "#introduction" },
  { title: "EXPERIENCE / 经历", id: "#experience" },
  { title: "PUBLICATIONS / 发表论文", id: "#publications" },
  { title: "ACADEMIC CURATIONS / 学术策划", id: "#academic_curation" },
  { title: "SELECTED AWARDS / 比赛获奖", id: "#selected_awards" },
  { title: "EXHIBITIONS / 参加展览", id: "#exhibitions" },
  { title: "ACTIVITIES / 活动参与", id: "#activities" },
  { title: "SERVICE / 服务", id: "#service" },
  { title: "STUDENT FUNDING / 学生基金", id: "#scholarships_funds" },
  { title: "CONTACT ME / 联系方式", id: "#contact" },
];

function RightAnchorNav({
  activeId,
  onNavigate,
  className = "",
  tone = "light",
}: {
  activeId: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  className?: string;
  /** light：黑字灰线（浅色背景）；dark：白字浅灰线（深色背景），版式与 light 一致 */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <nav
      className={`relative h-fit shrink-0 ${className}`}
      aria-label="Section navigation"
    >
      <div
        className={`absolute bottom-0 left-0 top-0 w-[3px] ${
          dark ? "bg-white/35" : "bg-[#E5E5E5]"
        }`}
      />
      {anchors.map((anchor, index) => (
        <a
          key={index}
          href={anchor.id}
          onClick={(e) => onNavigate(e, anchor.id)}
          className={`font-hanyi relative block pb-5 pl-[21px] text-[16px] tracking-widest transition-all ${
            dark
              ? "text-white/90 hover:text-white"
              : "text-black hover:text-black"
          } ${activeId === anchor.id ? (dark ? "font-bold text-white" : "font-bold") : ""}`}
        >
          {activeId === anchor.id && (
            <div
              className={`absolute left-0 top-0 h-[30px] w-[3px] ${
                dark ? "bg-white" : "bg-black"
              }`}
            />
          )}
          {anchor.title}
        </a>
      ))}
    </nav>
  );
}

export default function AboutPage() {
  const [isShow, setIsShow] = useState(false);
  const [activeId, setActiveId] = useState("#introduction");
  const [isPublish, setIsPublish] = useState(false);
  const [useBodyStickyNav, setUseBodyStickyNav] = useState(false);
  const bodyBlockRef = useRef<HTMLDivElement>(null);
  const handleDownClick = () => {
    setIsShow(!isShow);
  };
  const handlePublishDownClick = () => {
    setIsPublish(!isPublish);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${HEADER_OFFSET_PX}px 0px -75% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    anchors.forEach((anchor) => {
      const element = document.querySelector(anchor.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const updateBodyNavVisibility = useCallback(() => {
    const el = bodyBlockRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    setUseBodyStickyNav(top <= HEADER_OFFSET_PX);
  }, []);

  useEffect(() => {
    updateBodyNavVisibility();
    window.addEventListener("scroll", updateBodyNavVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateBodyNavVisibility);
    return () => {
      window.removeEventListener("scroll", updateBodyNavVisibility);
      window.removeEventListener("resize", updateBodyNavVisibility);
    };
  }, [updateBodyNavVisibility]);

  const scrollToAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - HEADER_OFFSET_PX;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* 介绍区域 */}
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-[1500px] flex-col px-4">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:gap-16">
            {/* 左侧内容 */}
            <div className="flex-1">
              <h1 className="my-6 text-2xl font-bold md:my-10 md:text-3xl">
                Zhiyuan(Zack) Zhou / 周致远
              </h1>
              <Image
                src={AvatarImage}
                alt="Avatar"
                width={645}
                height={363}
                className="w-full max-w-[645px]"
              />
              <div id="introduction" className="my-10">
                <p className="font-hanyi leading-relaxed">
                  I am a master's student in Artifcial inteligence and Data
                  Design at the School of Design and lihnovation, Tongi
                  University, under the guidance ofAssistant Professor Liu
                  Guanhong at Hybrid-X Lab, am training to become a
                  human-computer interaction researcher and interdiscipinary
                  designerwhile also pursuing a career as a young digital
                  antist. My curent research interests ie in embodied
                  interaction design and Al-driven art designexploring their
                  applicaions in computational education and intangible cutural
                  hertage dissemination under my advisor's leadership. l believe
                  in leadership and innovation capabilities of design thinking
                  within interdisciplinary research, which is why l also attempt
                  to inspire more scientihc
                </p>
                <p className="font-hanyi mt-4 leading-relaxed">
                  我是同济大学设计创意学院人工智能与数据设计的硕士生，师从前瞻创意实验室的刘冠宏助理教授
                  。我正在学习成为一名人机交互研究者、跨学科设计师，同时我也是一名青年数字艺术家。目前的研究兴趣点在有形/具身交互设计、人工智能艺术设计等方向，并且在导师的领导下探索这些研究在计算教育、非物质文化遗产数字化等场景的应用。我相信设计思维在交叉学科研究中的领导能力和创新能力，也在尝试通过科技艺术创作和话语性设计的方法去启发更多科学研究。
                  我是同济大学设计创意学院人工智能与数据设计的硕士生，师从智能数据可视化实验室的刘冠宏助理教授。我正在学习成为一名人机交互研究者、跨学科设计师，同时我也是一名青年数字艺术家。
                </p>
                <div className="my-4 flex items-center gap-4">
                  <button
                    onClick={handleDownClick}
                    className={`cursor-pointer transition-transform ${
                      isShow ? "rotate-0" : "-rotate-90"
                    }`}
                  >
                    <svg
                      width="22"
                      height="15"
                      viewBox="0 0 22 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 15L0 0H22L11 15Z" fill="black" />
                    </svg>
                  </button>
                  <hr className="h-px flex-1 bg-black" />
                </div>
                {isShow && (
                  <div className="space-y-4">
                    <p className="leading-relaxed text-gray-700">
                      I graduated with a Bachelor of Arts degree (top 1%
                      academicaly) in Art and Technology from the School of
                      Creative Design at the China Academyof Art, and was
                      awarded the qualification for direct admission to graduate
                      studies, the title of Outstanding Graduate of Zhejiang
                      Province, and the Gold Award for Graduation Design at the
                      Lin Fengmian School of China Academy of Art.（1.25%）
                    </p>
                    <p className="leading-relaxed text-gray-700">
                      As an eary-career researcher, l have gained
                      hands-onexpenience in multiple laboratories, including the{" "}
                      <a
                        target="_blank"
                        href="https://design.zju.edu.cn/guanyunlab"
                        className="link"
                      >
                        Guanyun Lab
                      </a>{" "}
                      (,supervised by Professor{" "}
                      <a
                        target="_blank"
                        href="https://www.guanyundesign.com/ABOUT"
                        className="link"
                      >
                        Guanyun Wang
                      </a>
                      ) at the International Design Insitute of Zhejiang
                      University, and the{" "}
                      <a target="_blank" href="https://www.milab.design" className="link">
                        Media and interaction Lab
                      </a>{" "}
                      (Mi Lab, supervised by Professor{" "}
                      <a
                        target="_blank"
                        href="https://thfl.tsinghua.edu.cn/en/yjdw/jzg/Central_Organization/Resercher/haipengmi.html"
                        className="link"
                      >
                        Halipeng Mi
                      </a>
                      ) at the{" "}
                      <a target="_blank" href="https://thfl.tsinghua.edu.cn/en" className="link">
                        Future Laboratory
                      </a>
                      , Tsinghua University.
                    </p>
                    <p className="leading-relaxed text-gray-700">
                      0n the practical front. I have served as a product manager
                      and interaction design intern at an Al startup. During
                      myundergraduate studies, l founded{" "}
                      <a target="_blank" className="link" href="https://designanything.design">
                        D&A Lab
                      </a>
                      , an interdisciplinary student organizaion that provides
                      an open platform for academic exchange andcolaborative
                      project opportunities for art and design students
                      nationwide.Recently, I established Hangzhou Diffusion Art
                      Technology Co., Ltd., which is a studio specializing in
                      art technology and design innovation. We have moved into
                      Hangzhou Holographic Intelligent Technology Research
                      Institute.
                    </p>
                    <p className="leading-relaxed text-gray-700">
                      In terms of creative practice, my discursive design and
                      technology-basecartworks have been selected for
                      prestigious exhibiions and accolades, including the Milan
                      Design Week, Dutch Design Week, Hangzhou Art andTechnology
                      Biennale, the inaugural CCF Computational Art Exhibition,
                      Series of Exhibitions by the Art Committee of the China
                      Artists Association: The Threshold of the Future - The
                      First Experimental Art Exhibition，the Lin Fengmian
                      Graduation Design Gold Award from the China Academy of
                      Art, the Best visual Efects Award in the AlGC section of
                      the Beling interational Fim Festival,{" "}
                      <a
                        target="_blank"
                        href="https://www.media.mit.edu/posts/mit-ai-for-filmmaking-hackathon-2024"
                        className="link"
                      >
                        <a target="_blank" href="https://www.media.mit.edu/posts/mit-ai-for-filmmaking-hackathon-2024/" className="link">and the Best Al Appication Award at the Ml Al
                        FilmHackathon</a>
                      </a>
                      , Several of my works are held in the permanent collection
                      of the Art Museum of the China Academy of Art.My research
                      has been published in top academic conferences in the
                      field of human-computer interaction and design, such as
                      CHI, UbiComp/ISWC, and DIS.
                    </p>
                    <p className="leading-relaxed text-gray-700">
                      我以优异的成绩(前1%)获得了中国美术学院创新设计学院艺术与科技专业的艺术学学士学位，并获得了推荐免试攻读研究生资格、浙江省优秀毕业生和中国美术学院林风眠毕业设计金奖等荣誉。
                    </p>
                    <p className="leading-relaxed text-gray-700">
                      作为研究领域的初学者，我在许多实验室有实习经验，包括浙江大学国际设计研究院的智慧形态实验室(GuanyunLab，由王冠云教授指导)、清华大学未来实验率的媒体与互动实验率(MiLab，由米海鹏教授指导)。我的研究发表在CHI、UbiComp/
                      ISWC、DIS等人机交互和设计领域顶级学术会议。
                    </p>
                    <p className="leading-relaxed text-gray-700">
                      在实践方面，我在AI创业公司有过产品经理和交互设计师实习的经历;在本科期间我创立了设计交叉学科学生组织<a target="_blank" href="https://designanything.design/" className="link">D&ALab</a>，以该组织为基础为全国高校艺术设计类学生提供开源的学术交流平台和项目合作机会。最近，我创立了杭州扩散艺术科技有限公司，这是一家专注于艺术科技和设计创新的工作室，我们入住了
                      <a
                       className="link"
                        target="_blank"
                        href="http://www.cad.zju.edu.cn/kechuangpingtai"
                      >
                        杭州全息智能技术研究院
                      </a>
                      。
                    </p>
                    <p className="leading-relaxed text-gray-700">
                      在创作方面，我的话语性设计和科技艺术作品會入选米兰设计周、荷兰设计周、中国杭州艺术与科技双年展、首届CCF中国计算艺术展、中国美协艺委会届展系列：未来之阈——首届实验艺术展览、中国美术学院林风眠毕业设计金奖、北京电影节AIGC单元最佳视效奖、麻省理工学院AI电影黑客松最佳AI应用奖等展览和奖励，作品被中国美术学院美术馆收藏。
                    </p>
                  </div>
                )}
                <div className="my-3 flex flex-wrap gap-3 md:my-5 md:gap-7">
                  <button className="flex h-[40px] cursor-pointer items-center justify-center rounded-[5px] border border-black bg-[#FF2F30] px-3 text-white">
                    View my Projects / 查看我的项目
                  </button>
                 
                  <button className="flex h-[40px] cursor-pointer items-center justify-center rounded-[5px] border border-black bg-[#A1A1A1] px-3 text-white">
                    CV / 简历
                  </button>
                  <a href="https://scholar.google.com/citations?user=LpYB6OMAAAAJ&hl=zh-CN" target="_blank" >
                  <button className="flex h-[40px] cursor-pointer items-center justify-center rounded-[5px] bg-black px-3 text-white">
                    Google Scholar / 谷歌学术
                  </button>
                    </a>
                  <button className="flex h-[40px] cursor-pointer items-center justify-center rounded-[5px] border border-black bg-[#A1A1A1] px-3 text-white">
                    Contact / 联系
                  </button>
                </div>
              </div>
            </div>

            {/* 右侧锚点：进入 body-block 后隐藏，由 body 内 right-nav-white（与右侧同款样式、static）接替 */}
            <div
              className={`right-nav sticky top-40 mt-10 h-fit ${
                useBodyStickyNav ? "hidden" : "hidden md:block"
              }`}
            >
              <RightAnchorNav activeId={activeId} onNavigate={scrollToAnchor} />
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div
        ref={bodyBlockRef}
        className="body-block font-hanyi flex w-full justify-center bg-[#222222] py-24 text-white"
      >
        <div className="flex w-full max-w-[1500px] flex-col gap-10 px-4 md:flex-row md:items-stretch md:gap-12">
          <div className="min-w-0 flex-1 space-y-16 text-white">
            <section>
              <h2 id="experience" className="about-h1 mb-[23px]">
                EXPERIENCE / 经历
              </h2>
              <div className="min-h-[300px]">
                <h3 className="about-h1 pb-[7px]">Education/教育</h3>
                <div className="pb-[15px] text-[16px] leading-[16px]">
                  <p>Master of Design (Engineering)/设计学硕士(工学)</p>
                  <p>
                    Artifcial Intelligence and Data Design/人工智能与数据设计
                  </p>
                  <p>Tongji University,Shanghai/同济大学，上海</p>
                  <p>2025.09-Future</p>
                </div>
                <div>
                  <p>Bachelor of Arts/艺术学学士</p>
                  <p>Art and Technology / 艺术与科技</p>
                  <p>China Academy of Art，Hangzhou/中国美术学院</p>
                  <p>2021.09-2025.06</p>
                </div>
                <h3 className="font-bold about-h1 pb-[7px] mt-3">Reaserch/科研</h3>
                <div>
                  <p>Research intem/实习生</p>
                  <p>Future lab/未来实验室</p>
                  <p>Tsinghua University，Beijing/清华大学,北京</p>
                  <p>2024.11-2025.03</p>
                </div>
                <div className="mt-3">
                  <p>Research intemn/实习生</p>
                  <p>Guanyun lab/智慧形态实验室</p>
                  <p>Zhejiang University,Hangzhou/浙江大学，杭州</p>
                  <p>2023.11-2024.09</p>
                </div>
                <h3 className="about-h1 pb-[7px] mt-3 font-bold">Industry/产业</h3>
                <div>
                  <p>Al Porduct manager/产品经理</p>
                  <p>TIAMAT/上海退格数字科技有限公司</p>
                  <p>2023.11-2025.03</p>
                </div>
                <div>
                  <p>Interaction designer/交互设计师</p>
                  <p>Where/杭州启真谓尔科技有限公司</p>
                  <p>2023.06-2023.09</p>
                </div>
                <h3 className="about-h1 pb-[7px] mt-3 font-bold">Student organization/学生组织</h3>
                <div>
                  <p>X-lab/浙江大学启真交叉学科创新创业实验室</p>
                  <p>Head ofthelnduetrial nesinn / 工业设计部门负吉</p>
                  <p>2022.12 - Future</p>
                </div>
                <div className="mt-3">
                  <p>D&A LAB/中国美术学院人工智能创新设计实验室</p>
                  <p>co-founder/创始人</p>
                  <p>2023.04-Future</p>
                </div>
              </div>
            </section>

            <section>
              <h2 id="publications" className="mb-8 text-2xl">
                PUBLICATIONS / 论文发表
              </h2>
              <div>
                <p>
                  [1] Bloodborne Circularity: A Speculative Regenerative
                  Product-Service System for Microplastic Recovery
                </p>
                <p>Zhiyuan Zhou, Guanhong Liu</p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  Cumulus Athens 2026(Accepted)
                </span>
              </div>
              <div>
                <p>
                  [2] Onbody Learning, Everyday Companionship: Exploring On-body
                  Robots for Children’s Education in Home and Classroom Settings
                </p>
                <p>
                  Zhiyuan Zhou, Chen Wang, Xukeqing Chen, Zhen Tang, Fanjing
                  Meng, Guanhong Liu
                </p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  HCII 2026(Accepted)
                </span>
              </div>
              <div>
                <p>
                  [3] Flowing Ink Resonator: An Embodied Soundscape for
                  Culturally Grounded Authoring under Rare Records
                </p>
                <p>Xuefei Zhou，Fenggui Rao，Zhiyuan Zhou</p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  CHI2026
                </span>
              </div>
              <div>
                <p>
                  <a
                    target="_blank"
                    className="link"
                    href="https://www.sciencedirect.com/science/article/pii/S3050741326000017"
                  >
                    [4] A Natural Behavior planner for Multi-personal
                    Human-Robot Interaction within the Simulated Environment
                  </a>
                </p>
                <p>
                  Yue Chen, Pai Zheng, Zhiyuan Zhou, Chin-En Keith Soo, Haining
                  Wang, Chunyang Yu
                </p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  Design and Artificial Intelligence (2026/2/21)
                </span>
              </div>
              <div>
                <p>
                  <a
                    target="_blank"
                    className="link"
                    href="https://dl.acm.org/doi/abs/10.1145/3715668.3735613"
                  >
                    [5] Exploring Eco-Narrative Interaction through AIGC: The
                    Creative Journey of “Plast-ocean”
                  </a>
                </p>
                <p>Jinlin Miao, Zhiyuan Zhou, Fanjing Meng</p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  DIS2025
                </span>
              </div>
             
              <div className="my-4 flex items-center gap-4">
                <button
                  onClick={handlePublishDownClick}
                  className={`cursor-pointer transition-transform ${
                    isPublish ? "rotate-0" : "-rotate-90"
                  }`}
                >
                  <svg
                    width="22"
                    height="15"
                    viewBox="0 0 22 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 15L0 0H22L11 15Z" fill="#fff" />
                  </svg>
                </button>
                <hr className="h-px flex-1 bg-black" />
              </div>
              {isPublish ? <>
               

              <div>
                <p>
                  <a
                    target="_blank"
                    className="link"
                    href="https://dl.acm.org/doi/abs/10.1145/3715668.3736734"
                  >
                    [6] Let My Goldfish Go: A Design Reflection Based on
                    Non-Anthropocentric Perspectives
                  </a>
                </p>
                <p>
                  Siyu Tian, Yu Hong, Baoying Feng, Chengcheng Huang, Zhiyuan
                  Zhou
                </p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  DIS205
                </span>
              </div>
              <div>
                <p>
                  [7] From Struggle to Enjoyment: Investigating lCH Digital
                  Inheritance Through the Lens ofVocational Education.
                </p>
                <p>Qixuan Xu, Zhiyuan Zhou, Nan Cao, Guanhong Liu</p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  CHI2025
                </span>
              </div>
              <div>
                <p>
                  <a
                    target="_blank"
                    className="link"
                    href="https://dl.acm.org/doi/abs/10.1145/3706599.3720312"
                  >
                    [8] The Immersive Art Therapy Driven by AIGC: An Innovative
                    Approach to Alleviating Children's Nyctophobia
                  </a>
                </p>
                <p>
                  Jinlin Miao, Zhiyuan Zhou, Yilei Wu, Fenggui Rao, Fanjing Meng
                </p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  CHI2025
                </span>
              </div>
              <div>
                <p>
                  [9] The Immersive Art Therapy Driven by AIGC: An Innovative
                  Approach to Alleviating Children's Nyctophobia
                </p>
                <p>Yue zhu, Zhiyuan Zhou, Jinlin Miao, Yiiie Guo</p>
                <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-fit items-center justify-center rounded-[5px] border px-2">
                  UbiComp2024
                </span>
              </div>
                <div>
                  <p>
                  [10] From Struggle to Enjoyment: Investigating ICH Digital
                    Inheritance Through the Lens of Vocational Education.
                  </p>
                  <p>Qixuan Xu, Zhiyuan Zhou, Nan Cao, Guanhong Liu</p>
                  <span className="rounded-2 border-[white]text-white my-[5px] flex h-[30px] w-[88px] items-center justify-center rounded-[5px] border">
                    CHI2025
                  </span>
                </div>
              </> : (
                <div></div>
              )}
            </section>

       

            <section>
              <h2 id="selected_awards" className="mb-8 text-2xl">
                SELECTED AWARDS / 比赛获奖
              </h2>
              <div>
                <p>· 2025 | 第三届 灵源AIGC艺术设计展，总策划</p>
                <p>· 2024 | 文明互鉴·AI电影联合创作计划(一万道彩虹)</p>
                <p>· 2024 | 第二届 THUxCAA灵源AIGC艺术设计展，总策划</p>
                <p>· 2023 | "任意东西“姚风摄影作品展，策展人</p>
                <p>· 2023 | THUxCAA灵源AIGC图像生成展，总策划</p>
                <p>· 2023 | "最设计:设计再出发2023·载入杭州"，视觉设计</p>
                <p>
                  · 2023 | "寻元·超算"算法艺术展，无锡运河艺术公园，展览助理
                </p>
              </div>
            </section>

            <section>
              <h2 id="academic_curation" className="mb-8 text-2xl">
                ACADEMIC CURATION / 学术策划
              </h2>
              <div>
                <p>· 2024 | MIT AI FOR FILMMAKING, CREATIVE USAGE OF AI </p>
                <p>· 2024 | 北京国际电影节 AIGC短片单元 最佳视效奖</p>
                <p>· 2024 | 浙江省挑战杯 金奖</p>
                <p>· 2024 | DIA佳作奖 两项</p>
                <p>· 2024 | 《Linkio》KPA鲲鹏奖数字设计优秀奖</p>
                <p>· 2023 | 中国国际大学生创新大赛 初创组 金奖</p>
                <p>· 2023 | 第十届“创青春"中国青年创新创业大赛 银奖</p>
                <p>
                  · 2023 | 第九届浙江省国际"互联网+"大学生创新创业大赛 初创组
                  金奖
                </p>
                <p>· 2023 | ICADA 日本概念设计奖 银奖</p>
                <p>· 2023 | ROCA平面与空间设计奖 金奖</p>
              </div>
            </section>

            <section>
              <h2 id="exhibitions" className="mb-8 text-2xl">
                EXHIBITIONS / 参加展览
              </h2>
              <div>
                <p>
                  · 2026 |
                  中国美协艺委会届展系列：未来之阈——首届实验艺术展览，“众意体”，湖北武汉
                </p>
                <p>
                  · 2025 |
                  中国（杭州）艺术与科技双年展，“众意体”，浙江杭州，余杭美术馆
                </p>
                <p>· 2025 | 上海艺术设计大展，“众意体”，上海，中华艺术宫</p>
                <p>
                  · 2025 |
                  首届CCF中国计算艺术展,最佳作品奖,“众意体”，山东济南，山东科技馆
                </p>
                <p>
                  · 2024 |{" "}
                  <a
                    href="https://tongjidesign.wixstudio.com/fly-to-the-moon"
                    target="_blank"
                    className="link"
                  >
                    米兰设计周
                  </a>
                  ，
                  <a
                    target="_blank"
                    className="link"
                    href="https://tjdi.tongji.edu.cn/NewsDetail.do?ID=5608&lang=_en"
                  >
                    Tongji's "Fly Me to the Moon" at Milan Design Week 2024
                  </a>
                  ，“Re - plastic Blood plan” and “Linkio”，意大利米兰
                </p>
              </div>
            </section>

            <section>
              <h2 id="activities" className="mb-8 text-2xl">
                ACTIVITIES / 活动参与
              </h2>
              <div>
                <p>
                  · 2024 | 中国数字艺术大展
                  学术论坛(三)"与A|一起进化(B)"DIGITALARTCHINA()，嘉宾
                </p>
                <p>
                  · 2023| BMWx同济联合创新挑战营，同济大学设计创意学院，XAILab
                </p>
                <p>
                  · 2022 | AI与机械臂工作坊入选，同济大学设计创意学院，Bake Lab
                </p>
                <p>
                  · 2023 |
                  清华国际艺术与设计教育大会系列工作坊，清华大学美术学院
                </p>
                <p>
                  · 2023 |
                  中国科技大学和合肥综合性国家科学中心能源院"AIGC+聚变未来”媒介创客训练营
                  暨艺术与科学联合实验室创意工作坊
                </p>
              </div>
            </section>

            <section>
              <h2 id="service" className="mb-8 text-2xl">
                SERVICE / 服务
              </h2>
              <div>
                <p>· Students Volunteer：CHl 2026</p>
              </div>
              <div>
                <p>· Reviewer: CHl 2026（6）,CHI 2025（2）</p>
              </div>
            </section>

            <section>
              <h2 id="scholarships_funds" className="mb-8 text-2xl">
                SCHOLARSHIPS & FUNDS / 奖学金和学生基金
              </h2>
              <div>
                <p>· 2025 | 浙江省政府奖学金</p>
                <p>
                  · 2024 | 国家级大学生创新创业训练项目
                  灵源SOULSCAPES--人工智能艺术设计研学展宣IP打造(2/5)
                </p>
                <p>· 2023 | 浙江省政府奖学金</p>
                <p>· 2023 | 国家级大学生创新创业训练项目《意绘》结项(1/5)</p>
                <p>· 2023 | 国家级大学生创新创业训练项目《D&LAB》结项(2/4)</p>
                <p>· 2023 | 校级新苗项目《AIGC在艺术疗愈中的应用》结题(3/5)</p>
              </div>
            </section>

            <section>
              <h2 id="contact" className="mb-8 text-2xl">
                CONTACT ME / 联系方式
              </h2>
              <div>
                <p>
                  · E-mall:{" "}
                  <a href="mailto:2533351@tongjiedu.cn">
                    2533351@tongjiedu.cn/3210601057@caa.edu.cn
                  </a>
                </p>
                <p>· Tel: +86 135 8813 6577</p>
                <p>· Address:杨浦区四平路1239号同济大学(四平路校区)</p>
              </div>
            </section>
          </div>

          {useBodyStickyNav && (
            <div className="right-nav-white mt-10 hidden min-h-0 shrink-0 md:block">
              <div
                className="sticky top-40 overflow-y-auto overflow-x-hidden overscroll-y-contain pr-1 [-webkit-overflow-scrolling:touch]"
                style={{
                  maxHeight: `calc(100vh - ${HEADER_OFFSET_PX}px - 2.5rem)`,
                }}
              >
                <RightAnchorNav
                  tone="dark"
                  activeId={activeId}
                  onNavigate={scrollToAnchor}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

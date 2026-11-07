import type { Project } from "../types/content";

// 图片与内容来自用户提供的项目总览；不收录未经核对的性能提升数据。
export const projects: Project[] = [
  {
    id: "single-phase-mmc",
    slug: "single-phase-five-level-mmc",
    visibility: "public",
    featured: true,
    order: 10,
    areas: ["projects"],
    status: "已完成实物验证",
    title: "单相五电平 MMC 实验平台",
    fullTitle: "单相五电平 MMC 的电容电压均衡实验平台",
    summary: "从功率平台搭建、采样与驱动联调，到 FPGA 控制和实物验证，搭建一套用于研究电容电压均衡的实验平台。",
    category: "电力电子 / 实验平台",
    tags: ["FPGA", "硬件设计", "实验验证"],
    cover: "/images/mmc/platform-public-680.webp",
    coverAlt: "单相五电平 MMC 实物平台，标注功率板、FPGA 控制、采样、检测、电感及示波器的位置",
    coverWidth: 680,
    coverHeight: 427,
    coverCaption: "实物平台与主要模块（公开展示版）。",
    evidenceHeading: "实物运行与采样结果",
    overview: "模块化多电平换流器（MMC）由多个子模块组成，子模块电容电压的均衡是控制中的重要问题。这套单相五电平实验平台把功率电路、采样、驱动与 FPGA 控制连接起来，用真实硬件观察和验证电容电压均衡与五电平输出。",
    contributions: [
      { title: "功率平台搭建", description: "搭建上下桥臂功率平台，完成硬件连接与隔离驱动联调。" },
      { title: "采样与过零检测", description: "完成电压采样与电流过零检测，为控制器提供电容电压和电流方向信息。" },
      { title: "FPGA 控制", description: "完成 FPGA 控制程序与采样接口联调，观测子模块电压。" },
      { title: "实物实验验证", description: "结合示波器与 ILA 采样，检查平台运行和五电平输出。" },
    ],
    facts: [
      { label: "平台拓扑", value: "单相五电平半桥 MMC" },
      { label: "桥臂结构", value: "上、下桥臂各 4 个子模块" },
      { label: "实验直流侧电压", value: "200 V" },
      { label: "控制与采样", value: "FPGA + AD7606" },
      { label: "采样对象", value: "8 路子模块电容电压" },
      { label: "实验负载", value: "100 Ω" },
    ],
    evidence: [
      {
        title: "五电平输出波形",
        src: "/images/mmc/waveform-public-480.webp", width: 480, height: 300,
        alt: "示波器截图：绿色和蓝色的阶梯波形，展示平台的五电平输出",
        caption: "示波器记录的五电平阶梯输出，用于展示平台的实物运行结果。",
      },
      {
        title: "FPGA 采样检测",
        src: "/images/mmc/sampling-public-376.webp", width: 376, height: 363,
        alt: "ILA 截图：8 路子模块电容电压读数，均接近 50 V",
        caption: "ILA 中的 8 路电容电压读数接近 50 V，展示采样数据进入 FPGA 后的观测结果。",
      },
    ],
    overviewImage: {
      src: "/images/mmc/overview-public-1000.webp", width: 1000, height: 562,
      alt: "项目总览：实物平台、FPGA 采样检测、五电平波形、实验参数和个人负责工作",
    },
  },
  {
    "id": "ncp1342-flyback",
    "slug": "ncp1342-flyback-power-supply",
    "visibility": "public",
    "featured": true,
    "order": 20,
    "areas": [
      "projects"
    ],
    "status": "样机调试与版本迭代",
    "title": "65W 准谐振反激电源",
    "fullTitle": "65W 准谐振反激电源设计与调试",
    "summary": "围绕 NCP1342 完成磁件参数与器件选型、样机调试和测试记录整理，展示从非同步整流到同步整流改版的实践过程。",
    "category": "电力电子 / 电源设计",
    "tags": [
      "NCP1342",
      "反激电源",
      "样机调试"
    ],
    "cover": "/images/flyback/iteration-cover-560.webp",
    "coverAlt": "样机调通与迭代：左侧 V1 非同步整流、右侧 V2 UCC24612 同步整流的实物对比，带双非电源仔水印",
    "coverWidth": 560,
    "coverHeight": 420,
    "coverCaption": "从 V1 非同步整流到 V2 UCC24612 同步整流的样机迭代，保留正反面实物对比。",
    "evidenceHeading": "样机迭代与调试记录",
    "overview": "这是一项从参数设计推进到实际样机的电源实践，设计目标为 90–265 Vac 输入、20 V / 3.25 A 输出。我围绕磁件参数、主功率器件与 NCP1342 外围完成设计和调试，并在非同步整流样机的基础上进行同步整流改版。这里分别保留各版本的实物与测试记录；设计目标不等同于全部性能已通过验证。",
    "contributions": [
      {
        "title": "01 · 设计计算与选型",
        "description": "根据输入输出目标，整理反激磁件参数、主功率器件和 NCP1342 外围设计，形成板级实现与后续调试的依据。"
      },
      {
        "title": "02 · 样机实现与调通",
        "description": "将设计落实到样机，结合板上测量检查供电、反馈与功率级的工作状态，并保留非同步整流和同步改版的实物记录。"
      },
      {
        "title": "03 · 波形分析与问题排查",
        "description": "结合反馈、供电、输出电压和电流采样信号，排查高输入电压、负载变化时出现的周期性掉压与重启，记录调整前后的现象。"
      },
      {
        "title": "04 · 版本迭代与测试整理",
        "description": "引入 UCC24612 同步整流，调整吸收与 ZCD 相关参数并跟踪波形。整理测试报告，区分已有功能记录与仍需补齐的验证，不把旧版结果套用到新版。"
      }
    ],
    "facts": [
      {
        "label": "设计功率目标",
        "value": "65 W"
      },
      {
        "label": "设计输入范围",
        "value": "90–265 Vac"
      },
      {
        "label": "设计输出目标",
        "value": "20 V / 3.25 A"
      },
      {
        "label": "主控器件",
        "value": "NCP1342"
      },
      {
        "label": "样机版本",
        "value": "V1 非同步整流 / V2 同步整流"
      },
      {
        "label": "验证边界",
        "value": "功能调试与测试记录；不含可靠性验收"
      }
    ],
    "evidence": [
      {
        "title": "V2 · 同步整流改版样机",
        "src": "/images/flyback/v2-prototype-560.webp",
        "alt": "采用同步整流的 V2 反激电源改版实物照片，带有中文水印",
        "width": 560,
        "height": 526,
        "caption": "在 V1 的基础上引入 UCC24612 同步整流并开展后续调试。该照片展示改版实物，不将 V1 的完整测试记录视为 V2 已完成验收。"
      },
      {
        "title": "同步整流版 · VDS 与电流实测波形",
        "src": "/images/flyback/switch-scope-560.webp",
        "alt": "实测示波器截图，绿色为 VDS，蓝色为电流；顶部设备标识和采集时间已遮挡",
        "width": 560,
        "height": 358,
        "caption": "同步整流版的一次实测记录：绿色为 VDS，蓝色为电流，展示开关过程中的电压与电流变化。"
      },
      {
        "title": "启动阶段 · 实测波形记录",
        "src": "/images/flyback/startup-scope-560.webp",
        "alt": "启动调试阶段的黄绿双通道实测波形，顶部设备标识和采集时间已遮挡",
        "width": 560,
        "height": 358,
        "caption": "样机启动调试阶段的一次示波器记录，用于保留这一过程中的信号变化。"
      },
      {
        "title": "迭代调试 · 参数调整前",
        "src": "/images/flyback/debug-before-560.webp",
        "alt": "参数调整前的多通道调试截图，顶部设备标识和采集时间已遮挡",
        "width": 560,
        "height": 358,
        "caption": "用于排查负载变化时周期性掉压与重启的一次多通道记录。结合反馈、供电、输出及采样信号查找问题，保留当时的异常现象。"
      },
      {
        "title": "迭代调试 · 参数调整后跟踪",
        "src": "/images/flyback/debug-after-560.webp",
        "alt": "参数调整后的多通道跟踪记录，波形保留，顶部设备标识和采集时间已遮挡",
        "width": 560,
        "height": 358,
        "caption": "调整 ZCD/OPP 补偿后继续跟踪相关信号。这里展示调试过程，不据此给出整体效率提升或全部工况稳定的结论；同步版的完整测试仍需补齐。"
      }
    ]
  },
];

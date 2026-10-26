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
];

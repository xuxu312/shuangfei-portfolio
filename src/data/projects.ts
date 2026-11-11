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
  {
    "id": "l6599-llc",
    "slug": "l6599-llc-converter",
    "visibility": "public",
    "featured": true,
    "order": 30,
    "areas": [
      "projects"
    ],
    "status": "样机调通与实测记录",
    "title": "240 W 半桥 LLC 电源",
    "fullTitle": "240 W 半桥 LLC 电源：谐振设计与样机调试",
    "summary": "围绕 24 V 隔离供电目标，开展谐振腔与磁件设计、L6599 外围配置及样机调试，用原理图、PCB、实物和波形记录设计到验证的过程。",
    "category": "电力电子 / 谐振电源",
    "tags": [
      "L6599",
      "谐振腔设计",
      "样机调试"
    ],
    "cover": "/images/llc/llc-cover-560.webp",
    "coverAlt": "240 W LLC 样机两面实物照片：左侧贴片面、右侧插件面，带双非电源仔水印",
    "coverWidth": 560,
    "coverHeight": 380,
    "coverCaption": "同一样机的贴片面与插件面，展示实际板级实现。图片采用经审核的公开展示版。",
    "evidenceHeading": "设计实现与实测记录",
    "overview": "面向 PFC 后级的工业 24 V 隔离供电场景，设计一套半桥 LLC 样机，目标为 380–420 VDC 输入、24 V / 10 A 输出。我围绕谐振腔与磁件、L6599 外围参数及样机调试开展工作，保留原理图、PCB 与实测记录。项目已完成基础调通；设计目标与完整性能验收分开，软启动部分展示不同配置的测试记录。",
    "contributions": [
      {
        "title": "01 · 谐振腔与磁件设计",
        "description": "根据输入输出目标开展谐振腔与磁件参数设计，将计算结果作为主功率级和样机调试的依据。"
      },
      {
        "title": "02 · L6599 外围配置",
        "description": "围绕 L6599 配置外围参数，并结合样机测试关注驱动、供电和软启动过程中的信号变化。"
      },
      {
        "title": "03 · 样机调通与问题排查",
        "description": "完成样机基础调通，结合实际波形检查工作状态，并围绕启动现象开展不同配置的测试。"
      },
      {
        "title": "04 · 测试记录整理",
        "description": "整理原理图、PCB、样机照片和实测波形，将设计目标、观察到的现象及仍待补齐的验证分别记录。"
      }
    ],
    "facts": [
      {
        "label": "电路拓扑",
        "value": "半桥 LLC 谐振变换器"
      },
      {
        "label": "设计功率目标",
        "value": "240 W"
      },
      {
        "label": "设计输入范围",
        "value": "380–420 VDC"
      },
      {
        "label": "设计输出目标",
        "value": "24 V / 10 A"
      },
      {
        "label": "主控器件",
        "value": "L6599"
      },
      {
        "label": "当前阶段",
        "value": "完成基础调通，保留实测记录"
      }
    ],
    "evidence": [
      {
        "title": "原理图 · 电路组成概览",
        "src": "/images/llc/llc-schematic-900.webp",
        "width": 900,
        "height": 585,
        "alt": "LLC 样机原理图公开展示版，展示电路组成，右下角文件信息已遮挡",
        "caption": "展示主功率级、控制外围及反馈保护等电路组成，作为理解样机方案的概览。"
      },
      {
        "title": "PCB · 板级实现",
        "src": "/images/llc/llc-pcb-900.webp",
        "width": 900,
        "height": 751,
        "alt": "LLC 样机 PCB 布局公开展示版，保留器件位置与走线关系并添加水印",
        "caption": "展示样机的 PCB 布局与板级实现，与封面中的实物照片相互补充。"
      },
      {
        "title": "基础工作 · 实测波形",
        "src": "/images/llc/llc-operation-720.webp",
        "width": 720,
        "height": 461,
        "alt": "LLC 样机基础工作时的多通道示波器记录，设备标识和采集信息已遮挡",
        "caption": "样机基础调通后的一组实测记录，用于展示实际工作状态，不将单张波形扩展为全部输入、负载条件均已通过。"
      },
      {
        "title": "软启动 · 配置 A 实测记录",
        "src": "/images/llc/llc-softstart-a-720.webp",
        "width": 720,
        "height": 461,
        "alt": "软启动配置 A 的实测波形，保留刻度与曲线，顶部设备和采集信息已遮挡",
        "caption": "软启动调试中的一组配置记录，保留当时的信号变化；具体参数暂未确认，因此使用配置 A 标识。"
      },
      {
        "title": "软启动 · 配置 B 实测记录",
        "src": "/images/llc/llc-softstart-b-720.webp",
        "width": 720,
        "height": 461,
        "alt": "软启动配置 B 的实测波形，保留刻度与曲线，顶部设备和采集信息已遮挡",
        "caption": "另一组软启动配置的实测记录，与配置 A 并列展示。现有信息不足以据此确定最佳参数或给出定量改善结论。"
      }
    ]
  },
  {
    "id": "anpc-six-channel-driver",
    "slug": "anpc-six-channel-gate-driver",
    "visibility": "public",
    "featured": true,
    "order": 40,
    "areas": [
      "projects"
    ],
    "status": "原理图与 PCB 设计交付",
    "title": "ANPC 六路隔离驱动板",
    "fullTitle": "ANPC 六路隔离驱动板",
    "summary": "面向 ANPC 光伏逆变器，基于 6 颗 NSI6801 完成六路隔离驱动原理图适配与四层 PCB 设计。",
    "category": "电力电子 / 隔离驱动",
    "tags": [
      "NSI6801",
      "隔离驱动",
      "四层 PCB"
    ],
    "cover": "/images/anpc/anpc-pcb-public-560.webp",
    "coverAlt": "六路隔离驱动板的 PCB 布局与布线，带双非电源仔水印",
    "coverWidth": 560,
    "coverHeight": 366,
    "coverCaption": "六路驱动板 PCB（公开展示版）。",
    "overview": "这块板用于连接逆变器的控制端与功率级，为一个 ANPC 相桥臂的 6 个功率器件提供隔离驱动和配套的独立供电。本项目只展示采用 6 颗 NSI6801 的单板六路方案，重点呈现原理图适配与四层 PCB 的板级实现。",
    "contributions": [
      {
        "title": "六路原理图适配",
        "description": "完成隔离驱动、配套供电、缓冲及接口电路的适配与连接。"
      },
      {
        "title": "四层 PCB Layout",
        "description": "完成器件布局、布线与四层板级设计。"
      }
    ],
    "facts": [
      {
        "label": "应用场景",
        "value": "ANPC 光伏逆变器的板级隔离驱动"
      },
      {
        "label": "单板对应",
        "value": "一个 ANPC 相桥臂的 6 个功率器件"
      },
      {
        "label": "隔离驱动",
        "value": "6 × NSI6801 单通道"
      },
      {
        "label": "输入缓冲",
        "value": "NCA8541，包含公共使能"
      },
      {
        "label": "隔离供电",
        "value": "2 × NSD1026V、3 只变压器、6 组独立副边供电"
      },
      {
        "label": "PCB 层数",
        "value": "四层：Top / GND / Power / Bottom"
      },
      {
        "label": "完成范围",
        "value": "原理图适配与 PCB 设计交付"
      },
      {
        "label": "验证边界",
        "value": "不将整机性能、安规或实板测试列为本人已完成成果"
      }
    ],
    "evidenceHeading": "最终六路方案：原理图与 PCB",
    "evidence": [
      {
        "title": "六路隔离驱动原理图",
        "src": "/images/anpc/anpc-schematic-public-900.webp",
        "width": 900,
        "height": 619,
        "alt": "采用六颗 NSI6801 的六路隔离驱动原理图，带中文水印，非电路标题栏已遮挡",
        "caption": "采用 6 颗 NSI6801 的六路方案，包含隔离驱动、供电、缓冲与接口电路。图片为公开展示版，不提供原始工程文件。"
      },
      {
        "title": "四层 PCB Layout",
        "src": "/images/anpc/anpc-pcb-public-900.webp",
        "width": 900,
        "height": 588,
        "alt": "六路隔离驱动板的 PCB 布局与布线，带双非电源仔水印",
        "caption": "六路驱动板的布局与布线，采用 Top / GND / Power / Bottom 四层组织。层名不等于所有参考端可以共地。"
      }
    ],
    "detailSections": [
      {
        "id": "signal-chain",
        "title": "工作原理：六路信号链",
        "paragraphs": [
          "上层控制器送来的六路控制信号，先经过 NCA8541 缓冲和公共使能，再进入六颗 NSI6801，形成六路隔离驱动输出，连接到功率板上的相应器件。驱动板负责传递、隔离和驱动，不在板上生成逆变器调制或死区。"
        ]
      },
      {
        "id": "power-chain",
        "title": "工作原理：六路供电链",
        "paragraphs": [
          "两颗 NSD1026V 在外部时序驱动下激励三只变压器，每只变压器提供两个独立副边，经过整流滤波后，为六路驱动输出侧供电。每路相对自己的浮动参考端工作，不能把六路输出参考端当成同一个公共地。"
        ]
      },
      {
        "id": "layout",
        "title": "PCB 怎样组织",
        "paragraphs": [
          "板卡采用四层结构，按隔离供电、输入缓冲、六路驱动和输出接口组织电路。现有工程中的六颗 NSI6801 沿同一排重复布置，各通道按相近的单元结构展开。",
          "布局复盘重点看三条电流回路：变压器原边激励、副边整流充电，以及跨越连接器、线束和功率板的完整门极驱动回路。不能只看驱动板上的线短不短，还要看电流从哪里返回。"
        ]
      },
      {
        "id": "precautions",
        "title": "画板时重点注意什么",
        "items": [
          {
            "title": "隔离与参考地",
            "text": "逻辑侧和六路浮动输出分开检查，内层铺铜也不能把本应隔离的参考端连接起来；层名写着 GND，不代表可以整板共地。"
          },
          {
            "title": "去耦与脉冲回路",
            "text": "去耦电容应靠近芯片电源脚，整流器与储能电容围绕副边组织，尽量缩小快速变化电流的闭合路径。"
          },
          {
            "title": "驱动输出与回流",
            "text": "输出和对应参考端成对考虑，连同连接器、线束与功率板一起复查，不能只优化本板局部。"
          },
          {
            "title": "规则与交付",
            "text": "隔离间距需要对应明确的设计输入；DRC 无违规不能代替耐压、EMC 或实板验证，原理图、BOM 与制造文件也要保持同一版本。"
          }
        ],
        "notice": "以上是设计关注点和复查标准，不表示原板已经逐项验证通过。"
      }
    ]
  },
];

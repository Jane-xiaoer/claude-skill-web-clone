# 🪞 Web Clone · 网站复刻方法论

> Reproduce any website — from a single-file static page to a WebGL-heavy interactive demo — without faking it from AI hallucinations.
> 把任何一个网站(从单文件静态页到 WebGL 重前端 demo)忠实复刻出来 —— 不靠 AI 臆测代码硬抄。

**English** · [中文](#中文)

---

## What this skill does

You see a website you love. You want to clone it — to learn how it works, to remix it into your own thing, or to run it offline. AI tools love to produce *plausible-looking* "clone analysis" documents full of code blocks that are entirely fabricated and break the moment you run them.

This skill is a **methodology plus executable probes that put real source first**, with a 6-step decision tree covering:

- Static HTML/CSS sites → `wget --mirror`
- React / Vue / Next content sites → rebuild on a template
- Multi-page sites → crawl internal routes before designing templates
- Interactive sites → record hover / click / scroll / canvas-drag states before cloning
- **WebGL / Canvas / Three.js heavy frontends** → reverse-engineer real source, line by line; when there's no findable source, runtime frame-capture + a **baseline-first replay gate** with `SOURCE / PARTIAL / GUESS` evidence grading
- Verify in a real browser, document the truth, replace content with yours
- **Visual / rebrand modes** → distill a versionable `design-dna.json` (design tokens + style + effects), then "keep the DNA, swap the content"

## Iron rule: real source first, never copy AI-guessed code

> Any AI-written "clone analysis" — treat the conceptual skeleton as a hint, but **assume every executable code block is hallucinated** until you've verified it against real source code line by line.

**Case in point** (see `references/marbles-case.md`): A real WebGL marbles demo uses **analytic ray-sphere intersection** + an SVG `feDisplacementMap` to refract the live DOM. An AI analysis confidently described it as **ray-marching + SDF + sampling the DOM as a texture** — two entirely different implementations. Copying the AI version produces nothing like the original and runs many times slower.

So **step 1 is always: get the real source**.

## What's in here

```
claude-skill-web-clone/
├── SKILL.md                       ← The methodology (loaded by Claude Code / Codex / Cursor)
├── README.md
├── LICENSE                         ← MIT
├── follow-wechat-qrcode.jpg
└── references/
    ├── reverse-engineering.md     ← How to dissect a WebGL/Canvas frontend, line by line
    ├── effect-extraction.md       ← Evidence grading + baseline-first gate for extracting effects
    ├── design-dna.md              ← Structured design-identity layer (visual / rebrand modes)
    ├── marbles-case.md            ← Flagship case: real architecture vs AI hallucination
    └── deliverables.md            ← NOTES.md / TEARDOWN.md / RECON/ templates
└── scripts/
    ├── recon-site.mjs             ← Browser screenshots + DOM/framework/resource signals
    ├── route-crawl.mjs            ← Same-site route map + screenshot per route
    ├── interaction-probe.mjs      ← Scroll/hover/click/canvas-drag state evidence
    ├── network-capture.mjs        ← XHR/fetch capture for SPA fixtures
    ├── asset-harvest.mjs          ← Download discovered source assets
    ├── dna-scaffold.mjs           ← Build a design-dna.json skeleton, prefilled from recon
    └── visual-diff.mjs            ← Pixel comparison for original vs clone screenshots
```

## Install

This is a [Claude Code skill](https://docs.claude.com/en/docs/agents-and-tools/skills). Drop it into your skills directory:

```bash
git clone https://github.com/Jane-xiaoer/claude-skill-web-clone.git ~/.claude/skills/web-clone
```

Then use it by saying things like:
- "复刻这个网站: https://..."
- "Clone this site for me"
- "Reverse-engineer this WebGL demo"
- "把这个站抄下来改成我的"

Claude / Codex will load `SKILL.md` and walk the decision tree.

## The decision tree (one-screen summary)

| Step | What to do |
|---|---|
| **1** | `gh api search/repositories?q=<name>` — find the real source on GitHub FIRST |
| **2** | If no source: browser-probe the site, crawl routes, capture network, and probe interactions |
| **3** | Pick the path: `wget` mirror / template rebuild / **WebGL reverse-engineering** / theme market |
| **4** | Set up `~/projects/website-clones/<name>-clone/` (or your equivalent), keep `index-original.html` read-only |
| **5** | Strip tracking, write `NOTES.md` + `TEARDOWN.md`, verify in a real browser with screenshots |
| **6** | Replace text / media / brand colors with yours |

## License & attribution discipline

Before deploying anything publicly, **check the source repo's license**:

| License | What you can do |
|---|---|
| MIT / Apache / BSD / Unlicense | Modify, redeploy, just keep credits |
| **NONE / unstated** | Default = **All Rights Reserved**. Local learning only, must credit, **do not redeploy publicly without permission** |
| Proprietary / explicitly forbidden | Read-only learning, no copying, no deployment |

⚠️ "Code is on GitHub" ≠ "code is MIT". Many viral demos have no LICENSE file and default to All Rights Reserved.

## Flagship case

`marbles-case.md` documents the full reverse-engineering of [chiuhans111/marbles](https://github.com/chiuhans111/marbles) — a 1067-line single-file WebGL + SVG-filter glass marbles interactive demo — and contrasts the real architecture with an AI-generated clone analysis that got the core mechanism completely backwards. This is the canonical example of why you must verify against real source.

---

## 中文

### 这个 skill 是干什么的

你看到一个喜欢的网站,想复刻 —— 学它怎么做、改成你自己的版本、或者离线跑起来。AI 工具最爱产出**看起来煞有其事**的"复刻分析文档",里面的代码块几乎全是臆造的,照抄必崩。

这个 skill 把"真源码至上"做成可重复的流程,**6 步决策树**覆盖三大分支:
- 静态 HTML/CSS 站 → `wget --mirror`
- React / Vue / Next 内容站 → 重建模板灌内容
- **WebGL / Canvas / Three.js 重前端** → 逆向真源码,逐行核对;找不到源码时用运行时帧捕获 + **baseline-first 复现闸门** + `SOURCE/PARTIAL/GUESS` 证据分级
- **视觉复刻 / 内容爆改模式** → 把"那个站的感觉"蒸馏成可版本化的 `design-dna.json`(设计 token + 风格 + 特效),然后"DNA 留着、内容换掉"
- 浏览器真验证,如实记录,最后替换成你自己的内容

### 头号铁律:真源码至上,绝不抄 AI 臆造代码

> 任何 AI 写的"复刻分析",**概念骨架可以参考,但里面的可执行代码块默认全是臆造的**,必须用真源码核对,否则照抄必崩。

**实证案例**:一份 AI 分析文档把原站"解析法求光线-球体交点 + 把光学结果编码成位移图 + 交给 SVG `feDisplacementMap` 扭曲真实 DOM"的真架构,臆造成了"ray-marching + SDF + 把 DOM 当纹理采样"—— 两套完全不同的实现,照抄做不出原效果且慢 N 倍。详见 `references/marbles-case.md`。

### 安装

这是一个 [Claude Code skill](https://docs.claude.com/en/docs/agents-and-tools/skills)。clone 到你的 skills 目录:

```bash
git clone https://github.com/Jane-xiaoer/claude-skill-web-clone.git ~/.claude/skills/web-clone
```

然后跟 Claude / Codex / Cursor 说:
- 「复刻这个网站: https://...」
- 「把这个站抄下来改成我的」
- 「逆向拆解这个 WebGL demo」

AI 会自动加载 `SKILL.md` 走决策树。

### 旗舰范例

`references/marbles-case.md` 拆解了 [chiuhans111/marbles](https://github.com/chiuhans111/marbles) —— 1067 行单文件 WebGL + SVG filter 玻璃弹珠站,真架构对比 AI 分析文档的错误,是"为什么必须真源码核对"的标准教材。

---

## 致谢 / Credits

- **方法论沉淀来源 / Origin**:Jane 的克隆中枢 `~/projects/website-clones/` 工作流(2026-05-27 marbles 案例跑通后抽出 skill)
- **旗舰范例原作 / Flagship case author**:[chiuhans111/marbles](https://github.com/chiuhans111/marbles) by Hans Chiu — 没有这份单文件 1067 行的玻璃弹珠源码就没有这个 skill 的"真源码至上"铁律
- **设计身份层 schema / Design-DNA schema**:`references/design-dna.md` 的三维 DNA JSON 改编自 [zanwei/design-dna](https://github.com/zanwei/design-dna)（MIT），用于"视觉复刻 / 内容爆改"模式
- **特效提取纪律 / Effect-extraction discipline**:`references/effect-extraction.md` 的证据分级 + baseline-first 闸门受 [lixiaolin94/skills · web-shader-extractor](https://github.com/lixiaolin94/skills) 启发（该仓库无 LICENSE，本 skill 只借方法概念、用自己的话重写，未复制其代码或原文）
- **迭代打磨 / Iteration**:Jane(`@xiaoerzhan`) + Claude Code(多轮 reverse-engineering)

---

## License

MIT. Use it freely, remix it, ship it. Attribution welcome but not required.

如果这个 skill 让你免于在 AI 臆造代码上浪费一个下午,欢迎 ⭐ 这个仓库。
If this skill saves you a frustrating afternoon of debugging fake AI code, ⭐ the repo.

---

## 📱 关注作者 / Follow Me

如果这个仓库对你有帮助,欢迎关注我。后面我会持续更新更多 AI Skill、设计方法、网站美学和创意工作流。

If this repo helped you, follow me for more AI skills, design systems, web aesthetics, and creative workflows.

- X (Twitter): [@xiaoerzhan](https://x.com/xiaoerzhan)
- 微信公众号 / WeChat Official Account: 扫码关注 / Scan to follow

<p align="center">
  <img src="./follow-wechat-qrcode.jpg" alt="Jane WeChat Official Account QR code" width="300" />
</p>

<p align="center"><strong>中文:</strong>欢迎关注我的公众号,一起研究 AI Skill、设计原则、网站表达和创意工作流。</p>

<p align="center"><strong>English:</strong> Follow my WeChat Official Account for more AI skills, design principles, web aesthetics, and creative workflows.</p>

# NOTICE 来源与许可

本仓库是 [`code-animation-prompts`](https://github.com/XiaoyeCodes/code-animation-prompts) 的 **DSH（DeepSeek Harness）集成插件**，**仅含集成代码，不含上游素材**。

## 上游署名

- **原始素材整理者**：哔哩哔哩「俯仰观照」。
- **技能封装与仓库维护**：[XiaoyeCodes](https://github.com/XiaoyeCodes)。
- 上游仓库：https://github.com/XiaoyeCodes/code-animation-prompts

## 分享约定（摘自上游 LICENSE.md）

> 全部免费，不用私信，不用买课。你可以免费用、免费转给别人；转的时候也请免费分享。
> 禁止把这些内容包装成课程、付费 skills 或任何收费的东西拿去卖。

本仓库遵守上述约定：免费分享、保留署名、**不将上游合集或其衍生打包收费**。

## 第三方许可（上游内，均为 MIT）

| 来源 | 署名 |
| --- | --- |
| Lemo-Opuscar | Copyright (c) 2026 LemoLab |
| mg-styles-15 | Copyright (c) 2026 Vincentwei1021 |
| code-video | Copyright (c) 2026 Bae-ChangHyun |

## 本仓库范围

- 包含：DSH 插件客户端/宿主代码、构建脚本（从本机已安装的上游技能读取 catalog 内联生成产物）。
- 不包含：任何 341 提示词正文、参考静帧、示例视频（属于上游仓库，请安装上游技能获取）。
- `lib/client.js` 为构建产物，不提交（`.gitignore`），由使用者在本机生成arik 避免二次分发素材。

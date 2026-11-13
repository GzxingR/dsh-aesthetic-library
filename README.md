# dsh-aesthetic-library

给 **DeepSeek Harness (DSH)** 用的「审美库」插件，把 [`code-animation-prompts`](https://github.com/XiaoyeCodes/code-animation-prompts) 的 341 种代码动画风格接进 DSH：

- **Plugins 页新增「审美库」Tab**：浏览 341 风格、搜索/系列筛选、点选收藏（两栏：左浏览 / 右我的收藏，可增删、导出 `library.json`）。
- **对话输入框敲 `@`**：弹出「审美库」候选，选中即在草稿里插入 `【审美风格 B3 粒子聚形】` 这样的引用（官方输入触发器，纯键盘）。

## 合规与来源（重要）

本仓库**只包含 DSH 集成代码，不打包任何上游素材**（不含 341 提示词、静帧、示例视频）：

- `build-client.mjs` 在你**本机已安装**的 `code-animation-prompts` 技能里读取 `references/catalog.json`，构建时把目录内联进产物 `lib/client.js`；**产物不提交**（见 `.gitignore`）。所以每个人在自己机器上生成，不构成二次分发素材。
- 上游素材许可：免费分享、保留署名、**禁止把合集或衍生打包收费**。详见上游 `LICENSE.md` 与本仓库 `NOTICE.md`。

## 前置

1. 本机装有 DSH 0.2.2（桌面版）。
2. 已安装上游技能到 `~/.agents/skills/code-animation-prompts`（或任意位置，用 `CATALOG_PATH` 指过去）。

## 构建

```powershell
node build-client.mjs
```

`CATALOG_PATH` / `LIBRARY_PATH` 可覆盖 catalog 与可选收藏路径。

## 安装到 DSH（desktop profile）

方式 A：DSH 内 `plugin_manager install_bundle` 指向本目录。

方式 B：手动
```powershell
New-Item -ItemType Junction -Path "$env:USERPROFILE\.dsh\profiles\node_modules\dsh-aesthetic-library" -Target "<本仓库绝对路径>"
# 在 $env:USERPROFILE\.dsh\profiles\desktop\cordis.patch.yml 末尾追加：
#   - insert:
#       - id: aesthetic-library
#         name: dsh-aesthetic-library
# 重启 / 刷新 DSH
```

## 用法

- Plugins 页 →「审美库」Tab → 挑风格，「加入」收进收藏，「导出 library.json」。
- 任意会话输入框敲 `@` →「审美库」分组 → 输入关键字过滤 → 选中插入风格引用，继续写需求或发送。

## 许可

本集成代码以 MIT 提供。上游素材与第三方许可见 [NOTICE.md](./NOTICE.md)，遵守其免费分享约定。

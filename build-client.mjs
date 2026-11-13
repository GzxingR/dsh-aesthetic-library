// 构建 lib/client.js：把「code-animation-prompts」341 风格目录与可选收藏打进 factory-form 客户端包。
// 合规说明：本仓库不打包任何上游素材；catalog 从你本地已安装的上游 skill 读取（build 时内联到产物），
// 产物 lib/client.js 不提交（见 .gitignore），每人在本机自行生成。
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

// catalog：优先环境变量 CATALOG_PATH，其次已安装的上游技能 references/catalog.json
const CAT = process.env.CATALOG_PATH || path.join(os.homedir(), '.agents', 'skills', 'code-animation-prompts', 'references', 'catalog.json');
// 可选收藏：LIBRARY_PATH，或本目录 library.json（存在才读），否则空
const LIB = process.env.LIBRARY_PATH || path.join(HERE, 'library.json');

if (!fs.existsSync(CAT)) {
  console.error('找不到上游 catalog：' + CAT + '\n请先安装 code-animation-prompts 技能（或设 CATALOG_PATH 指向 references/catalog.json）。');
  process.exit(1);
}
const rawCat = JSON.parse(fs.readFileSync(CAT, 'utf8'));
const catalog = Array.isArray(rawCat) ? rawCat : (rawCat.entries || []);
const library = fs.existsSync(LIB) ? JSON.parse(fs.readFileSync(LIB, 'utf8')) : { items: [] };

const client = `window.__ModuleLoader__.load({
  id: "dsh-aesthetic-library",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    var React = require("react");

    var CATALOG = ${JSON.stringify(catalog)};
    var SEED = ${JSON.stringify(library.items || [])};

    var SERIES_COLOR = { AG: "#2f6f5d", M: "#8a5a2b", K: "#b04a6a", Z: "#8c2f2f", H: "#7a6a1f", L: "#355c8a", V: "#5b4a8a", X: "#3a6a6a", R: "#9a3b4e", O: "#555" };

    var CSS = [
      ".al-wrap{display:flex;flex-direction:column;height:100%;min-height:420px;color:var(--dsw-alias-label-primary);font-family:inherit}",
      ".al-top{padding:16px 22px 6px}",
      ".al-hd{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}",
      ".al-title{font-size:20px;font-weight:700}",
      ".al-sub{color:var(--dsw-alias-label-secondary);font-size:12.5px}",
      ".al-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:12px 0 4px}",
      ".al-search{flex:1;min-width:220px;padding:9px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:9px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit}",
      ".al-search:focus{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-1px}",
      ".al-chip{font-size:12px;padding:5px 11px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none}",
      ".al-chip.on{background:var(--dsw-alias-brand-primary);color:#fff;border-color:var(--dsw-alias-brand-primary)}",
      ".al-body{flex:1;display:flex;gap:0;min-height:0;border-top:1px solid var(--dsw-alias-border-l1);margin-top:10px}",
      ".al-left{flex:1;overflow:auto;padding:14px 22px}",
      ".al-right{width:264px;flex:0 0 264px;border-left:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);display:flex;flex-direction:column;min-height:0}",
      ".al-right .rh{padding:12px 14px;border-bottom:1px solid var(--dsw-alias-border-l1);font-weight:600;font-size:13.5px;display:flex;justify-content:space-between;align-items:center}",
      ".al-right .rl{flex:1;overflow:auto;padding:8px 10px}",
      ".al-right .rf{padding:10px 12px;border-top:1px solid var(--dsw-alias-border-l1);display:flex;gap:8px;flex-direction:column}",
      ".al-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:10px}",
      ".al-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:11px;padding:12px 13px;display:flex;flex-direction:column;gap:7px;transition:border-color .12s}",
      ".al-card:hover{border-color:var(--dsw-alias-brand-primary)}",
      ".al-card .hd{display:flex;align-items:center;gap:7px}",
      ".al-sw{width:9px;height:9px;border-radius:50%;flex:0 0 9px}",
      ".al-badge{font-size:10.5px;font-family:ui-monospace,Consolas,monospace;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l2);border-radius:5px;padding:0 5px}",
      ".al-nm{font-weight:600;font-size:13.5px}",
      ".al-ds{color:var(--dsw-alias-label-secondary);font-size:11.8px;line-height:1.5;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}",
      ".al-tags{display:flex;gap:5px;flex-wrap:wrap}",
      ".al-tg{font-size:10px;background:var(--dsw-alias-bg-layer-2);border-radius:5px;padding:1px 6px;color:var(--dsw-alias-label-secondary)}",
      ".al-add{font:inherit;font-size:12px;border:1px solid var(--dsw-alias-brand-primary);background:transparent;color:var(--dsw-alias-brand-primary);border-radius:7px;padding:5px;cursor:pointer}",
      ".al-add.on{background:var(--dsw-alias-brand-primary);color:#fff}",
      ".al-item{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;font-size:12.5px}",
      ".al-item:hover{background:var(--dsw-alias-bg-layer-2)}",
      ".al-item .nm{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".al-item .rm{color:var(--dsw-alias-label-secondary);cursor:pointer;border:none;background:transparent;font:inherit;font-size:14px;line-height:1;padding:2px 5px;border-radius:5px}",
      ".al-item .rm:hover{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-bg-layer-2)}",
      ".al-btn{font:inherit;font-size:12.5px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border-radius:8px;padding:7px 12px;cursor:pointer}",
      ".al-btn.primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}",
      ".al-empty{color:var(--dsw-alias-label-secondary);font-size:12.5px;text-align:center;padding:26px 10px;line-height:1.7}",
      ".al-muted{color:var(--dsw-alias-label-secondary);font-size:11.5px}"
    ].join("\\n");

    function ensureCss() {
      if (document.querySelector('style[data-plugin-css="aesthetic-library"]')) return;
      var s = document.createElement("style");
      s.setAttribute("data-plugin-css", "aesthetic-library");
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    var KEY = "dsh_aesthetic_library_picks";
    function loadSel() {
      try {
        var raw = localStorage.getItem(KEY);
        if (raw === null) return null;
        return JSON.parse(raw);
      } catch (e) { return null; }
    }
    function saveSel(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }
    var SYNC_BASE = "http://127.0.0.1:8794";
    function postDisk(list) {
      try {
        fetch(SYNC_BASE + "/api/library", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: 1, items: list }) }).catch(function () {});
      } catch (e) {}
    }
    function seedPicks() {
      var l = loadSel();
      if (l === null) return SEED.slice();
      return l;
    }

    function seriesList() {
      var m = {}, out = [];
      for (var i = 0; i < CATALOG.length; i++) { var s = CATALOG[i].series; if (s && !m[s]) { m[s] = 1; out.push(s); } }
      return out;
    }
    var SERIES = seriesList();

    function AestheticTab() {
      ensureCss();
      var h = React.createElement;
      var qR = React.useState(""); var q = qR[0], setQ = qR[1];
      var sR = React.useState("all"); var ser = sR[0], setSer = sR[1];
      var pR = React.useState(seedPicks); var picks = pR[0], setPicks = pR[1];
      var fR = React.useState(false); var onlyFav = fR[0], setOnlyFav = fR[1];
      var mR = React.useState(""); var msg = mR[0], setMsg = mR[1];
      var svR = React.useState("检测中…"); var srv = svR[0], setSrv = svR[1];

      React.useEffect(function () {
        try {
          fetch(SYNC_BASE + "/api/library", { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); }).then(function (d) {
            if (d && Array.isArray(d.items)) { setPicks(d.items); saveSel(d.items); }
            setSrv("● 已连落盘服务");
          }).catch(function () { setSrv("○ 本地模式（可导出）"); });
        } catch (e) { setSrv("○ 本地模式（可导出）"); }
      }, []);

      var picked = {};
      for (var i = 0; i < picks.length; i++) picked[picks[i].id] = true;

      function persist(list) { setPicks(list); saveSel(list); postDisk(list); }
      function toggle(e) {
        var list = picks.slice(), idx = -1;
        for (var i = 0; i < list.length; i++) if (list[i].id === e.id) { idx = i; break; }
        if (idx >= 0) list.splice(idx, 1);
        else list.unshift({ id: e.id, domain: "animation", name: e.name, tags: e.tags || [], source: "code-animation-prompts", ref: e.file, when: e.fit || "", addedAt: Date.now() });
        persist(list);
        setMsg(idx >= 0 ? "已移出：" + e.name : "已加入：" + e.name);
      }
      function removeId(id) {
        var list = picks.filter(function (x) { return x.id !== id; });
        persist(list);
      }
      function exportJson() {
        var data = { version: 1, updatedAt: Date.now(), note: "由 DSH 审美库插件导出", items: picks };
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob); a.download = "library.json"; a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
        setMsg("已导出 library.json（覆盖 aesthetic-library/ 同名文件即可）");
      }
      function copyJson() {
        try {
          navigator.clipboard.writeText(JSON.stringify({ version: 1, items: picks }, null, 2));
          setMsg("已复制 JSON 到剪贴板");
        } catch (e) { setMsg("复制失败，请用导出"); }
      }

      var ql = q.toLowerCase().trim();
      var rows = [];
      for (var i = 0; i < CATALOG.length; i++) {
        var e = CATALOG[i];
        if (ser !== "all" && e.series !== ser) continue;
        if (onlyFav && !picked[e.id]) continue;
        if (ql) {
          var hay = (e.id + " " + e.name + " " + (e.tags || []).join(" ") + " " + (e.description || "") + " " + (e.fit || "")).toLowerCase();
          if (hay.indexOf(ql) < 0) continue;
        }
        rows.push(e);
      }

      var chips = [h("span", { key: "all", className: "al-chip" + (ser === "all" ? " on" : ""), onClick: function () { setSer("all"); } }, "全部")];
      for (var i = 0; i < SERIES.length; i++) {
        (function (s) { chips.push(h("span", { key: s, className: "al-chip" + (ser === s ? " on" : ""), onClick: function () { setSer(s); } }, s)); })(SERIES[i]);
      }
      chips.push(h("span", { key: "fav", className: "al-chip" + (onlyFav ? " on" : ""), onClick: function () { setOnlyFav(!onlyFav); } }, "仅看已收藏"));

      var cards = rows.map(function (e) {
        var on = picked[e.id];
        var col = SERIES_COLOR[e.series] || "var(--dsw-alias-label-secondary)";
        return h("div", { key: e.id, className: "al-card" },
          h("div", { className: "hd" },
            h("span", { className: "al-sw", style: { background: col } }),
            h("span", { className: "al-badge" }, e.id),
            h("span", { className: "al-nm" }, e.name)),
          h("div", { className: "al-ds" }, (e.description || "") + (e.fit ? " · 适合：" + e.fit : "")),
          h("div", { className: "al-tags" }, (e.tags || []).slice(0, 5).map(function (t, k) { return h("span", { key: k, className: "al-tg" }, t); })),
          h("button", { className: "al-add" + (on ? " on" : ""), onClick: function () { toggle(e); } }, on ? "✓ 已加入" : "+ 加入审美库")
        );
      });

      var favItems = picks.map(function (p) {
        var col = SERIES_COLOR[p.id && p.id.length > 1 ? p.id.replace(/[0-9].*$/, "") : ""] || "var(--dsw-alias-brand-primary)";
        return h("div", { key: p.id, className: "al-item" },
          h("span", { className: "al-sw", style: { background: col } }),
          h("span", { className: "nm", title: p.name + " · " + p.id }, p.name + " · " + p.id),
          h("button", { className: "rm", title: "移除", onClick: function () { removeId(p.id); } }, "×"));
      });

      return h("div", { className: "al-wrap" },
        h("div", { className: "al-top" },
          h("div", { className: "al-hd" },
            h("div", { className: "al-title" }, "审美库"),
            h("div", { className: "al-sub" }, "浏览 " + CATALOG.length + " 种代码动画风格 · 点「加入」收进右侧收藏 · 导出 library.json 给 AI 调研用"),
            h("div", { className: "al-sub", style: { marginLeft: "auto", color: "var(--dsw-alias-label-secondary)" } }, srv)),
          h("div", { className: "al-bar" },
            h("input", { className: "al-search", placeholder: "搜索名字 / 标签 / 适合，如 水墨、粒子、讲解、赛博", value: q, onChange: function (ev) { setQ(ev.target.value); } }),
            chips)),
        h("div", { className: "al-body" },
          h("div", { className: "al-left" },
            rows.length ? h("div", { className: "al-grid" }, cards) : h("div", { className: "al-empty" }, "没有匹配的风格" + (onlyFav ? "（当前只看已收藏）" : "") + "，换个关键词或点「全部」。")),
          h("div", { className: "al-right" },
            h("div", { className: "rh" }, h("span", null, "我的收藏"), h("span", { className: "al-muted" }, picks.length + " 个")),
            h("div", { className: "rl" }, picks.length ? favItems : h("div", { className: "al-empty" }, "还没有收藏。左边点「加入」就会出现在这里。")),
            h("div", { className: "rf" },
              h("button", { className: "al-btn primary", onClick: exportJson }, "导出 library.json"),
              h("div", { style: { display: "flex", gap: 8 } },
                h("button", { className: "al-btn", style: { flex: 1 }, onClick: copyJson }, "复制 JSON"),
                h("button", { className: "al-btn", style: { flex: 1 }, onClick: function () { persist([]); setMsg("已清空收藏"); } }, "清空")),
              h("div", { className: "al-muted", style: { minHeight: 16 } }, msg))))
      );
    }

    function makeTriggerSource() {
      return {
        trigger: "@",
        name: "aesthetic",
        order: 20,
        showGroupTitle: true,
        candidates: function (session, req) {
          var q = (req && req.query ? req.query : "").toLowerCase().trim();
          var out = [];
          for (var i = 0; i < CATALOG.length && out.length < 40; i++) {
            var e = CATALOG[i];
            var hay = (e.id + " " + e.name + " " + (e.tags || []).join(" ") + " " + (e.description || "")).toLowerCase();
            if (!q || hay.indexOf(q) >= 0) {
              out.push({ name: e.id, label: e.id + " " + e.name, description: (e.description || "") + (e.fit ? " · 适合：" + e.fit : ""), value: e.id, section: "审美库" });
            }
          }
          return Promise.resolve(out);
        },
        onPick: function (pick) {
          var id = (pick && pick.candidate && (pick.candidate.value || pick.candidate.name)) || "";
          var e = null;
          for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) { e = CATALOG[i]; break; }
          return { text: "【审美风格 " + id + (e ? " " + e.name : "") + "】" };
        }
      };
    }

    var inject = ["slots"];
    function apply(ctx) {
      ctx.effect(function () {
        return ctx.slots.inject("plugins.tab", function () {
          return ctx.slots.register({ name: "plugins.tab", id: "aesthetic-library", label: "审美库" }, AestheticTab);
        });
      }, "aesthetic-library: plugins tab");
      ctx.effect(function () {
        var it = ctx.get ? ctx.get("inputTriggers") : undefined;
        if (!it || typeof it.registerSource !== "function") return function () {};
        return it.registerSource(makeTriggerSource());
      }, "aesthetic-library: @ trigger source");
    }
    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
`;

fs.mkdirSync(path.join(HERE, 'lib'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'lib', 'client.js'), client, 'utf8');
console.log('wrote lib/client.js | catalog', catalog.length, '| seed', (library.items || []).length);

// Erzeugt das Wissensdokument (HTML -> PDF) aus build/content.js
const fs = require('fs'), vm = require('vm'), { chromium } = require('playwright');
const src = fs.readFileSync(process.argv[2], 'utf8') + '\n;this.__ = {PHASES, ORDER, ELEMENTS, ETAB_NOTICE};';
const ctx = {}; vm.createContext(ctx); vm.runInContext(src, ctx);
const { ELEMENTS: E, ETAB_NOTICE } = ctx.__;
const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const txt = s => esc(s).replace(/__(.+?)__/g, '$1');
function block(id, opts = {}) {
  const e = E[id]; if (!e) throw new Error('fehlt: ' + id);
  let h = `<section class="el"><h3>${esc(e.title)}${e.sub ? ' <span class="sub">' + esc(e.sub) + '</span>' : ''}</h3>`;
  if (e.intro) h += `<p class="lead"><b>Worum es geht:</b> ${txt(e.intro.text)}</p>`;
  if (e.role) h += `<p class="role"><b>Rolle der oder des Digitalisierungsbeauftragten:</b> ${txt(e.role.text)}</p>`;
  if (opts.notice) h += `<p class="role"><b>${esc(ETAB_NOTICE.title)}:</b> ${txt(ETAB_NOTICE.text)}</p>`;
  const groups = e.aspectGroups || [];
  if (groups.length) {
    h += `<h4>${e.kind === 'q' ? 'Reflexionsaspekte' : 'Erläuterungen'}</h4>`;
    groups.forEach(g => {
      if (g.title) h += `<p class="gt">${esc(g.title)}</p>`;
      h += '<ul>' + g.items.map(it => `<li><b>${esc(it.h)}:</b> ${txt(it.p)}${it.list ? '<ul>' + it.list.map(x => `<li>${txt(x)}</li>`).join('') + '</ul>' : ''}</li>`).join('') + '</ul>';
    });
  }
  const qg = e.questionGroups || e.qGroups || (e.qs ? [{ qs: e.qs }] : []);
  if (qg.length) {
    h += '<h4>Leitfragen</h4>';
    qg.forEach(g => { if (g.title) h += `<p class="gt">${esc(g.title)}</p>`; h += '<ul class="q">' + g.qs.map(q => `<li>${txt(q.q)}</li>`).join('') + '</ul>'; });
  }
  return h + '</section>';
}
const parts = [
  ['Das Modell', 'Grundlagen und Logik', ['intro', 'vision', 'logik', 'rueckkopplung']],
  ['Orientierung schaffen', 'Die oder der Digitalisierungsbeauftragte stößt an und moderiert. Die Elemente werden im Verlauf immer wieder aufgegriffen.', ['vergewisserung', 'beteiligung', 'steuerung', 'anstoss']],
  ['Pilotieren und lernen', 'Ressourcenorientiert. Steuerung: Digitalisierungsbeauftragte/r mit Mandat der Schulleitung.', ['pilotierung', 'p-planung', 'p-durchfuehrung', 'p-evaluation']],
  ['Etablieren und verankern', 'Zielorientiert. Steuerung: Schulleitung.', ['etablierung', 'e-planung', 'e-durchfuehrung', 'e-evaluation']]
];
let body = '';
parts.forEach(([t, s, ids], i) => {
  body += `<h2>${i + 1}. ${esc(t)}</h2><p class="pnote">${esc(s)}</p>`;
  ids.forEach(id => body += block(id, { notice: i === 3 && id !== 'etablierung' }));
});
const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Orientierungsmodell: Wissensdokument</title>
<style>
@page{size:A4;margin:18mm 17mm 18mm 17mm}
body{font-family:"DejaVu Sans","Liberation Sans",Arial,sans-serif;font-size:9.6pt;line-height:1.45;color:#16232a}
h1{font-size:17pt;margin:0 0 4pt;color:#006A77}
.meta{color:#4a5a60;margin:0 0 10pt}
.box{border:1px solid #c9d6da;border-radius:6px;padding:7pt 10pt;background:#f3f8f9;margin:0 0 12pt}
.box p{margin:0 0 4pt}
h2{font-size:13pt;color:#006A77;border-bottom:1.5px solid #006A77;padding-bottom:2pt;margin:16pt 0 4pt;break-after:avoid}
.pnote{margin:0 0 6pt;color:#4a5a60;font-style:italic}
h3{font-size:11pt;margin:11pt 0 3pt;break-after:avoid}
h3 .sub{font-weight:normal;color:#4a5a60}
h4{font-size:9.6pt;margin:6pt 0 2pt;text-transform:uppercase;letter-spacing:.04em;color:#4a5a60;break-after:avoid}
.gt{margin:4pt 0 1pt;font-weight:bold;color:#1F6FB2;break-after:avoid}
p{margin:0 0 4pt} ul{margin:0 0 4pt;padding-left:14pt} li{margin:0 0 2pt}
ul.q li{list-style:"?  "}
.lead,.role{margin:0 0 4pt} .role{background:#eef3fa;padding:4pt 6pt;border-radius:4px}
.el{break-inside:auto}
</style></head><body>
<h1>Orientierungsmodell für die digitalisierungsbezogene agile Schulentwicklung</h1>
<p class="meta">Wissensdokument für den KI-Assistenten · Arbeitsstand Oktober 2026 · Quelle: interaktive Website https://chrheckl-ai.github.io/orientierungsmodell-schulentwicklung/</p>
<div class="box">
<p><b>Aufbau des Schaubilds:</b> Ein Pfeil führt von einer ersten, noch vorläufigen Vision zur gelebten Schulpraxis. Darunter stehen drei Bereiche: Orientierung schaffen (Vergewisserung, Klärung der Kreise der Beteiligung, Abstimmung von Prinzipien der Steuerung, Anstoß), Pilotieren und lernen (kleiner Kreislauf aus Planung, Durchführung, Evaluation) und Etablieren und verankern (größerer Kreislauf aus Planung, Durchführung, Evaluation). Die Figur mit dem Fernglas steht für die Digitalisierungsbeauftragte oder den Digitalisierungsbeauftragten.</p>
<p><b>Kernlogik:</b> Von ressourcenorientierter Pilotierung zu zielorientierter Etablierung. Statt zuerst zu fragen, was alles fehlt, richtet sich der Blick auf das, was schon da ist, und darauf, was sich damit jetzt umsetzen lässt.</p>
<p><b>Hinweis:</b> Einzelne Texte sind Entwürfe und noch nicht abschließend von der AG abgestimmt.</p>
</div>
${body}
</body></html>`;
fs.writeFileSync(process.argv[3] + '.html', html);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(html, { waitUntil: 'load' });
  await p.pdf({ path: process.argv[3] + '.pdf', format: 'A4', printBackground: true, displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size:7pt;color:#777;width:100%;text-align:center">Orientierungsmodell · Wissensdokument · Seite <span class="pageNumber"></span> von <span class="totalPages"></span></div>',
    margin: { top: '16mm', bottom: '18mm', left: '17mm', right: '17mm' } });
  await b.close();
})();

"""Schaubild V2 (Kreisläufe) als SVG, Koordinaten direkt aus der PowerPoint (pt, Folie 720 x 540)."""
import json, re, math, html, os
D = os.path.dirname(os.path.abspath(__file__))
def esc(s): return html.escape(s, quote=True)

def style_block():
    src = open(os.path.join(D, 'svg.py')).read()
    m = re.search(r"a\('''(<style>.*?</style>)'''\)", src, re.S)
    return m.group(1)

def text_lines(bbox_html):
    s = open(bbox_html).read()
    out = []
    for m in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>', s, re.S):
        words = re.findall(r'>([^<]+)</word>', m.group(5))
        x0, y0, x1, y1 = map(float, m.groups()[:4])
        out.append(dict(x=x0, y=y0, x1=x1, h=y1 - y0, t=html.unescape(' '.join(words))))
    return out

def build_svg(geo_json, bbox_html, paths_json):
    G = json.load(open(geo_json)); L = text_lines(bbox_html); P = json.load(open(paths_json))
    byid = {g['id']: g for g in G}
    o = []; a = o.append
    a('<svg id="diagram" viewBox="0 0 720 540" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="group" aria-label="Schaubild: Schulentwicklungsprozesse als Digitalisierungsbeauftragte/-r initiieren und agil begleiten">')
    a(style_block())
    a('''<defs>
<filter id="dsh" x="-15%" y="-20%" width="130%" height="150%"><feDropShadow dx="0" dy="1.4" stdDeviation="2.2" style="flood-color:var(--d-shadow)" flood-opacity="1"/></filter>
<linearGradient id="visionGrad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:var(--d-arrow-a)"/><stop offset="1" style="stop-color:var(--d-arrow-b)"/></linearGradient>
<symbol id="mini" viewBox="0 0 22.4 17.3"><path d="''' + P['smallSpiral'] + '''"/></symbol>
<symbol id="fernglasSym" viewBox="238.6 392.5 42.9 36.5"><path d="''' + P['fernglas'] + '''"/></symbol>
</defs>''')
    a('<rect x="0" y="0" width="720" height="540" style="fill:var(--d-sheet)"/>')

    def line_at(txt):
        for l in L:
            if l['t'].replace('–', '–').startswith(txt): return l
        raise SystemExit('Textzeile fehlt: ' + txt)
    def size_of(l): return 12 if l['h'] > 13 and l['h'] < 14 else (10.5 if l['h'] < 12.5 else (16 if l['h'] > 17 else 14))

    # Titelleiste
    tl = line_at('Schulentwicklungsprozesse')
    a('<g class="in" style="--d:0s"><rect class="dg-head" x="0" y="0" width="720" height="33.6"/>'
      '<text class="dg-title" x="360" y="%.1f" text-anchor="middle" style="font-size:13px">%s</text></g>' % (tl['y'] + 11.6, esc(tl['t'])))

    # Vision-Pfeil
    v = byid['62']; x0, y0, w, h = v['x'], v['y'], v['w'], v['h']; d = h
    vl, gl = line_at('Vision'), line_at('gelebte')
    a('<g class="el in" data-id="vision" tabindex="0" role="button" aria-label="Vision und gelebte Schulpraxis: Entwicklungsrichtung" style="--d:.05s;--c:var(--teal-ink)"><g class="lift">'
      '<path class="vision-arrow" d="M%.1f %.1f H%.1f L%.1f %.1f L%.1f %.1f H%.1f Q%.1f %.1f %.1f %.1f V%.1f Q%.1f %.1f %.1f %.1f Z"/>'
      % (x0 + 3, y0, x0 + w - d, x0 + w, y0 + h / 2, x0 + w - d, y0 + h, x0 + 3, x0, y0 + h, x0, y0 + h - 3, y0 + 3, x0, y0, x0 + 3, y0)
      + '<text class="vtxt" x="%.1f" y="%.1f" style="font-size:16px">Vision</text>' % (vl['x'], vl['y'] + 0.905 * 16)
      + '<text class="vtxt" x="%.1f" y="%.1f" text-anchor="end" style="font-size:16px">gelebte Schulpraxis</text>' % (gl['x1'], gl['y'] + 0.905 * 16)
      + '</g></g>')

    # Gestrichelte Linien (flipV: von unten links nach oben rechts)
    a('<g class="in" style="--d:.5s">')
    for i in ('57', '54', '55'):
        c = byid[i]
        if c['flipV']: x1_, y1_, x2_, y2_ = c['x'], c['y'] + c['h'], c['x'] + c['w'], c['y']
        else: x1_, y1_, x2_, y2_ = c['x'], c['y'], c['x'] + c['w'], c['y'] + c['h']
        a('<line class="dash" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f"/>' % (x1_, y1_, x2_, y2_))
    a('</g>')

    # Kreisläufe aus den Bögen der PowerPoint
    def cycle(gid, el_id, color, label, delay):
        arcs = [g for g in G if g.get('prst') == 'arc' and g['name'].startswith(byid[gid]['name'])]
        c0 = arcs[0]; cx, cy, r = c0['x'] + c0['w'] / 2, c0['y'] + c0['h'] / 2, c0['w'] / 2
        parts = ['<circle class="hit" cx="%.1f" cy="%.1f" r="%.1f"/>' % (cx, cy, r + 8)]
        sw, ah, hw = 4.5, 12.5, 6.4
        for arc in arcs:
            st = int(arc['adj']['adj1'].split()[1]) / 60000; en = int(arc['adj']['adj2'].split()[1]) / 60000
            while en <= st: en += 360
            head = math.degrees(ah / r)
            aend = en - head * 0.85
            p = lambda deg: (cx + r * math.cos(math.radians(deg)), cy + r * math.sin(math.radians(deg)))
            (sx, sy), (ex, ey), (tx, ty) = p(st), p(aend), p(en)
            parts.append('<path d="M%.2f %.2f A%.2f %.2f 0 %d 1 %.2f %.2f" style="fill:none;stroke:%s;stroke-width:%.1f;stroke-linecap:round"/>' % (sx, sy, r, r, 1 if aend - st > 180 else 0, ex, ey, color, sw))
            ab = en - head; bx, by = p(ab); nx, ny = math.cos(math.radians(ab)), math.sin(math.radians(ab))
            parts.append('<path d="M%.2f %.2f L%.2f %.2f L%.2f %.2f Z" style="fill:%s;stroke:%s;stroke-width:1;stroke-linejoin:round"/>' % (tx, ty, bx + nx * hw, by + ny * hw, bx - nx * hw, by - ny * hw, color, color))
        a('<g class="el sc" data-id="%s" tabindex="0" role="button" aria-label="%s" style="--c:%s"><g class="grow" style="--d:%ss"><g class="lift">%s</g></g></g>' % (el_id, label, color, delay, ''.join(parts)))
    cycle('90', 'pilotierung', 'var(--blue)', 'Pilotierung: Kreislauf aus Planung, Durchführung und Evaluation', .7)
    cycle('100', 'etablierung', 'var(--purple)', 'Etablierung: Kreislauf aus Planung, Durchführung und Evaluation', 1.0)

    # Kästen
    boxes = [
        ('vergewisserung', 'orient', '7', .1, 'Vergewisserung vorhandener Mittel und gemeinsamer Ziele'),
        ('beteiligung', 'orient', '10', .17, 'Klärung der Kreise der Beteiligung'),
        ('steuerung', 'orient', '12', .24, 'Abstimmung von Prinzipien der Steuerung'),
        ('anstoss', 'orient', '14', .31, 'Anstoß für eine Auseinandersetzung im Kollegium'),
        ('p-durchfuehrung', 'pilot', '16', .62, 'Pilotierung: Durchführung mit denen, die mitgestalten wollen'),
        ('p-evaluation', 'pilot', '19', .76, 'Pilotierung: Evaluation dessen, was erreichbar ist'),
        ('p-planung', 'pilot', '21', .55, 'Pilotierung: Planung mit dem, was vorhanden ist'),
        ('e-durchfuehrung', 'etab', '23', .92, 'Etablierung: Durchführung mit denen, die gebraucht werden'),
        ('e-evaluation', 'etab', '26', .99, 'Etablierung: Evaluation dessen, was erreichbar ist'),
        ('e-planung', 'etab', '29', .85, 'Etablierung: Planung mit dem, was notwendig und realisierbar ist'),
    ]
    color = {'orient': 'var(--teal)', 'pilot': 'var(--blue)', 'etab': 'var(--purple)'}
    for bid, ph, sid, dl, label in boxes:
        b = byid[sid]; x0, y0, w, h = b['x'], b['y'], b['w'], b['h']
        a('<g class="el in" data-id="%s" tabindex="0" role="button" aria-label="%s" style="--d:%ss;--c:%s"><g class="lift">' % (bid, esc(label), dl, color[ph]))
        a('<rect class="box-bg" x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="5"/>' % (x0, y0, w, h))
        a('<rect class="ring" x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="7.5"/>' % (x0 - 3, y0 - 3, w + 6, h + 6))
        first = True
        for l in L:
            if x0 <= l['x'] <= x0 + w and y0 <= l['y'] + l['h'] / 2 <= y0 + h:
                sz = 12 if first else 10.5
                a('<text class="%s" x="%.1f" y="%.1f" style="font-size:%spx">%s</text>' % ('h' if first else 't', l['x'], l['y'] + 0.905 * sz, sz, esc(l['t'].replace('– ', '–  ').replace('–  ', '– '))))
                first = False
        cx, cy = x0 + w - 9, y0 + 9
        a('<g class="prog" data-for="%s" transform="translate(%.1f %.1f)" aria-hidden="true"><circle class="pr-bg" r="4.6"/><circle class="pr-fg" r="4.6" transform="rotate(-90)" stroke-dasharray="0 30"/><circle class="pr-done" r="5.4"/><path class="pr-check" d="M-2.4 0.1 L-0.7 1.8 L2.5 -1.6"/></g>' % (bid, cx, cy))
        a('</g></g>')

    # Kleine Spiralen und Auslassungspunkte
    for k, i in enumerate(('25', '30', '31', '32')):
        p = byid[i]
        a('<g class="el sc in" data-id="rueckkopplung" tabindex="%s" role="button" aria-label="Rückkopplung statt starrer Phasen" style="--d:%ss;--c:var(--teal)"><g class="lift"><rect class="hit" x="%.1f" y="%.1f" width="%.1f" height="%.1f"/><use href="#mini" xlink:href="#mini" x="%.1f" y="%.1f" width="%.1f" height="%.1f" style="fill:var(--teal)"/></g></g>'
          % ('0' if k == 0 else '-1', .14 + .07 * k, p['x'] - 4, p['y'] - 4, p['w'] + 8, p['h'] + 8, p['x'], p['y'], p['w'], p['h']))
    dots = line_at('…')
    a('<text class="dots in" x="%.1f" y="%.1f" style="--d:.4s">…</text>' % (dots['x'], dots['y'] + 0.905 * 14))

    # Fernglas: die Figur steht für die Digitalisierungsbeauftragten
    f = byid['17']
    a('<g class="el sc in" data-id="logik" tabindex="0" role="button" aria-label="Die Figur mit dem Fernglas: du als Digitalisierungsbeauftragte oder Digitalisierungsbeauftragter" style="--d:.45s;--c:var(--blue)"><g class="lift"><rect class="hit" x="%.1f" y="%.1f" width="%.1f" height="%.1f"/><use href="#fernglasSym" xlink:href="#fernglasSym" x="%.2f" y="%.2f" width="%.2f" height="%.2f" preserveAspectRatio="none" style="fill:var(--blue)"/></g></g>'
      % (f['x'] - 3, f['y'] - 3, f['w'] + 6, f['h'] + 6, f['x'], f['y'], f['w'], f['h']))

    # Phasenpfeile
    def chev(x0, y0, x1, y1):
        ym = (y0 + y1) / 2; dd = (y1 - y0) / 2
        return 'M%.1f %.1f H%.1f L%.1f %.1f L%.1f %.1f H%.1f Q%.1f %.1f %.1f %.1f V%.1f Q%.1f %.1f %.1f %.1f Z' % (
            x0 + 2.5, y0, x1 - dd, x1, ym, x1 - dd, y1, x0 + 2.5, x0, y1, x0, y1 - 2.5, y0 + 2.5, x0, y0, x0 + 2.5, y0)
    # Phasenpfeile, verlängert, mit Angabe der Steuerung darunter (Hinweis des Dezernenten)
    BODY = 112  # Breite ohne Spitze, so dass die Beschriftung darunter nicht übersteht
    for i, el_id, fill, label, dl, cap in (('40', 'pilotierung', '#1F6FB2', 'Pilotierung', 1.05, 'Steuerung: DiB'),
                                           ('41', 'etablierung', '#6B3FA0', 'Etablierung', 1.1, 'Steuerung: Schulleitung')):
        c = byid[i]
        cx = c['x'] + (c['w'] - c['h'] / 2) / 2
        nb = max(BODY, c['w'] - c['h'] / 2)
        x0 = cx - nb / 2; x1 = x0 + nb + c['h'] / 2
        col = 'var(--blue)' if el_id == 'pilotierung' else 'var(--purple)'
        a('<g class="el in" data-id="%s" tabindex="-1" role="button" aria-label="%s (%s): Überblick" style="--d:%ss;--c:%s"><g class="lift"><path d="%s" style="fill:%s;filter:url(#dsh)"/><text class="chev-t" x="%.1f" y="%.1f" text-anchor="middle">%s</text>'
          '<text class="chev-cap" x="%.1f" y="%.1f" text-anchor="middle" style="fill:%s">%s</text></g></g>'
          % (el_id, label, cap.replace('DiB', 'Digitalisierungsbeauftragte'), dl, col, chev(x0, c['y'], x1, c['y'] + c['h']), fill, cx, c['y'] + c['h'] / 2 + 4, label,
             cx, c['y'] + c['h'] + 11.5, col, cap))
    a('</svg>')
    return '\n'.join(o)

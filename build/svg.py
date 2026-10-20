"""Erzeugt das SVG-Schaubild (Koordinaten in pt, aus dem Original-PDF übernommen)."""
import json, html

def esc(s):
    return html.escape(s, quote=True)

def build_svg(paths):
    P = paths
    out = []
    a = out.append
    a('<svg id="diagram" viewBox="36 8 769 578" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="group" aria-label="Schaubild: Schulentwicklungsprozesse als Digitalisierungsbeauftragte/-r initiieren und agil begleiten">')
    a('''<style>
#diagram .dg-head{fill:var(--d-head)}
#diagram .dg-title{font:700 12.6px Arial,Helvetica,sans-serif;fill:#fff}
#diagram .box-bg{fill:var(--d-box);stroke:var(--d-stroke);stroke-width:.75;filter:url(#dsh);transition:stroke .15s ease,fill .15s ease,stroke-width .15s ease}
#diagram .h{font:700 13px Arial,Helvetica,sans-serif;fill:var(--c)}
#diagram .t{font:400 11px Arial,Helvetica,sans-serif;fill:var(--c)}
#diagram .vtxt{font:400 17px Arial,Helvetica,sans-serif;fill:var(--teal-ink)}
#diagram .dots{font:400 15px Arial,Helvetica,sans-serif;fill:var(--d-muted)}
#diagram .chev-t{font:700 11.5px Arial,Helvetica,sans-serif;fill:#fff}
.chev-cap{font:700 9px Arial,Helvetica,sans-serif}
#diagram .dash{stroke:var(--dash);stroke-width:.8;fill:none;stroke-dasharray:4 1.5 .5 1.5 .5 1.5}
#diagram .hit{fill:transparent}
#diagram .el{cursor:pointer;outline:none}
#diagram .lift{transition:transform .2s ease;transform-box:fill-box;transform-origin:center}
#diagram .el:hover .lift,#diagram .el:focus-visible .lift{transform:translateY(-1.6px)}
#diagram .el.sc:hover .lift,#diagram .el.sc:focus-visible .lift{transform:scale(1.06)}
#diagram .el:hover .box-bg,#diagram .el:focus-visible .box-bg{stroke:var(--c);stroke-width:1.3}
#diagram .el:focus-visible .box-bg{stroke-width:2}
#diagram .el.is-active .box-bg{stroke:var(--c);stroke-width:1.9;fill:var(--d-box);fill:color-mix(in srgb,var(--c) 9%,var(--d-box))}
#diagram .ring{opacity:0;transition:opacity .15s ease;fill:none;stroke:var(--c);stroke-width:1.4;stroke-dasharray:3 2}
#diagram .el:focus-visible .ring,#diagram .el.is-active .ring{opacity:1}
#diagram .el:hover .ring{opacity:.7}
#diagram .vision-arrow{fill:url(#visionGrad);transition:filter .2s ease}
#diagram .el:hover .vision-arrow,#diagram .el:focus-visible .vision-arrow,#diagram .el.is-active .vision-arrow{filter:url(#dsh)}
#diagram .pr-bg{fill:none;stroke:var(--d-stroke);stroke-width:1.3}
#diagram .pr-fg{fill:none;stroke:var(--c);stroke-width:1.6;stroke-linecap:round;transition:stroke-dasharray .3s ease}
#diagram .pr-done{fill:var(--c);opacity:0;transition:opacity .2s ease}
#diagram .pr-check{fill:none;stroke:#fff;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;opacity:0}
#diagram .prog.done .pr-done,#diagram .prog.done .pr-check{opacity:1}
@media (prefers-reduced-motion:no-preference){
  #diagram:not(.static) .in{animation:dgRise .6s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s)}
  #diagram:not(.static) .grow{animation:dgGrow .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s);transform-box:fill-box;transform-origin:center}
}
@keyframes dgRise{from{opacity:0;transform:translateY(7px)}}
@keyframes dgGrow{from{opacity:0;transform:scale(.55) rotate(-60deg)}}
</style>''')
    a('''<defs>
<filter id="dsh" x="-15%" y="-20%" width="130%" height="150%"><feDropShadow dx="0" dy="1.4" stdDeviation="2.2" style="flood-color:var(--d-shadow)" flood-opacity="1"/></filter>
<linearGradient id="visionGrad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:var(--d-arrow-a)"/><stop offset="1" style="stop-color:var(--d-arrow-b)"/></linearGradient>
<symbol id="mini" viewBox="0 0 22.4 17.3"><path d="__MINI__"/></symbol>
</defs>'''.replace('__MINI__', P['smallSpiral']))

    # Hintergrund + Titelleiste
    a('<rect x="36" y="8" width="769" height="578" fill="var(--d-sheet)" style="fill:var(--d-sheet)"/>')
    a('<g class="in" style="--d:0s"><rect class="dg-head" x="36" y="8.4" width="769" height="35.9"/>'
      '<text class="dg-title" x="420.5" y="30.6" text-anchor="middle">Schulentwicklungsprozesse als Digitalisierungsbeauftragte/-r initiieren und agil begleiten</text></g>')

    # Vision-Pfeil
    a('<g class="el in" data-id="vision" tabindex="0" role="button" aria-label="Vision und gelebte Schulpraxis: Entwicklungsrichtung" style="--d:.05s;--c:var(--teal-ink)"><g class="lift">'
      '<path class="vision-arrow" d="M79 59.5 H740 L768 75.5 L740 91.5 H79 Q75 91.5 75 87.5 V63.5 Q75 59.5 79 59.5 Z"/>'
      '<text class="vtxt" x="128.1" y="81.7">Vision</text>'
      '<text class="vtxt" x="587.7" y="79.6">gelebte Schulpraxis</text>'
      '</g></g>')

    # Gestrichelte Linien vom Fernglas
    a('<g class="in" style="--d:.5s">'
      '<line class="dash" x1="289.3" y1="405.7" x2="783.5" y2="458.2"/>'
      '<line class="dash" x1="289.7" y1="387.8" x2="779.9" y2="205.6"/>'
      '<line class="dash" x1="289.3" y1="396.4" x2="779.9" y2="328.8"/>'
      '</g>')

    # Kreisläufe Planung -> Durchführung -> Evaluation -> Planung (im Uhrzeigersinn)
    import math
    def cycle(cx, cy, r, stations, gap, sw, ah, color):
        """Drei Bogenpfeile; Lücken liegen in Richtung der Kästen (stations in Grad, im Uhrzeigersinn)."""
        def pt(deg, rad=r):
            t = math.radians(deg)
            return cx + rad * math.cos(t), cy + rad * math.sin(t)
        parts = []
        n = len(stations)
        for i in range(n):
            a0 = stations[i] + gap
            a1 = stations[(i + 1) % n] - gap
            while a1 <= a0:
                a1 += 360
            head = math.degrees(ah / r)
            aend = a1 - head * 0.85
            x0, y0 = pt(a0); x1, y1 = pt(aend)
            large = 1 if (aend - a0) > 180 else 0
            parts.append('<path d="M%.2f %.2f A%.2f %.2f 0 %d 1 %.2f %.2f" style="fill:none;stroke:%s;stroke-width:%.2f;stroke-linecap:round"/>'
                         % (x0, y0, r, r, large, x1, y1, color, sw))
            tx, ty = pt(a1)
            ab = a1 - head
            bx, by = pt(ab)
            nx, ny = math.cos(math.radians(ab)), math.sin(math.radians(ab))
            w = ah * 0.58
            parts.append('<path d="M%.2f %.2f L%.2f %.2f L%.2f %.2f Z" style="fill:%s;stroke:%s;stroke-width:1;stroke-linejoin:round"/>'
                         % (tx, ty, bx + nx * w, by + ny * w, bx - nx * w, by - ny * w, color, color))
        return ''.join(parts)

    import os
    if os.environ.get('CYCLE') == '1':
        a('<g class="el sc" data-id="pilotierung" tabindex="0" role="button" aria-label="Pilotierung: Kreislauf aus Planung, Durchführung und Evaluation" style="--c:var(--blue)">'
          '<g class="grow" style="--d:.7s"><g class="lift"><circle class="hit" cx="412" cy="318" r="54"/>'
          + cycle(412, 318, 44, [96, 197, 284], 15, 4.2, 11, 'var(--blue)') + '</g></g></g>')
        a('<g class="el sc" data-id="etablierung" tabindex="0" role="button" aria-label="Etablierung: Kreislauf aus Planung, Durchführung und Evaluation" style="--c:var(--purple)">'
          '<g class="grow" style="--d:1s"><g class="lift"><circle class="hit" cx="680" cy="308" r="66"/>'
          + cycle(680, 308, 55, [102, 190, 258], 13, 4.8, 12.5, 'var(--purple)') + '</g></g></g>')
    else:
        a('<g class="el sc" data-id="pilotierung" tabindex="0" role="button" aria-label="Pilotierung: Überblick" style="--c:var(--blue)">'
          '<g class="grow" style="--d:.7s"><g class="lift"><rect class="hit" x="371" y="267" width="87" height="102"/>'
          '<path d="%s" style="fill:var(--blue)"/></g></g></g>' % P['pilotSpiral'])
        a('<g class="el sc" data-id="etablierung" tabindex="0" role="button" aria-label="Etablierung: Überblick" style="--c:var(--purple)">'
          '<g class="grow" style="--d:1s"><g class="lift"><rect class="hit" x="623" y="212" width="128" height="166"/>'
          '<path d="%s" style="fill:var(--purple)"/></g></g></g>' % P['etabSpiral'])

    # Kästen
    boxes = [
        ("vergewisserung", "orient", (81.7, 110.9, 232.7, 181.5), .1, [
            ("h", "Vergewisserung", 98.6, 122.7), ("t", "– vorhandener Mittel", 98.6, 140.6), ("t", "– gemeinsamer Ziele", 98.6, 153.6)]),
        ("beteiligung", "orient", (81.7, 209.1, 232.7, 263.4), .17, [
            ("h", "Klärung", 91.3, 217.1), ("t", "der Kreise der Beteiligung", 91.3, 236.9)]),
        ("steuerung", "orient", (81.2, 296.3, 232.2, 366.9), .24, [
            ("h", "Abstimmung", 91.0, 311.1), ("t", "von Prinzipien der", 91.0, 329.0), ("t", "Steuerung", 91.0, 342.0)]),
        ("anstoss", "orient", (81.5, 398.7, 232.5, 534.7), .31, [
            ("h", "Anstoß", 90.3, 419.9), ("t", "für eine Auseinander-", 90.3, 435.6), ("t", "setzung im Kollegium", 90.3, 449.8),
            ("t", "– Erfolgsaussichten", 90.3, 462.7), ("t", "– Gelingensbedingungen", 90.3, 476.6), ("t", "– Möglichkeiten der", 90.3, 489.6),
            ("t", "Mitgestaltung", 101.7, 503.8)]),
        ("p-durchfuehrung", "pilot", (250.8, 258.7, 366.2, 313.0), .62, [
            ("h", "Durchführung", 260.5, 263.6), ("t", "mit denen, die", 260.5, 279.6), ("t", "mitgestalten wollen", 260.5, 292.6)]),
        ("p-evaluation", "pilot", (381.1, 183.2, 496.4, 237.5), .76, [
            ("h", "Evaluation", 402.9, 189.0), ("t", "dessen, was", 402.9, 204.7), ("t", "erreichbar ist", 402.9, 217.7)]),
        ("p-planung", "pilot", (345.2, 376.1, 460.6, 430.4), .55, [
            ("h", "Planung", 368.3, 381.7), ("t", "mit dem, was", 368.3, 397.7), ("t", "vorhanden ist", 368.3, 410.6)]),
        ("e-durchfuehrung", "etab", (499.7, 259.3, 615.1, 313.6), .92, [
            ("h", "Durchführung", 509.3, 264.3), ("t", "mit denen, die", 509.3, 280.1), ("t", "gebraucht werden", 509.3, 293.0)]),
        ("e-evaluation", "etab", (593.9, 151.1, 709.2, 205.4), .99, [
            ("h", "Evaluation", 613.9, 156.1), ("t", "dessen, was", 613.9, 171.8), ("t", "erreichbar ist", 613.9, 184.8)]),
        ("e-planung", "etab", (593.9, 405.4, 709.2, 473.5), .85, [
            ("h", "Planung", 613.9, 411.7), ("t", "mit dem, was", 613.9, 427.7), ("t", "notwendig und", 613.9, 441.6), ("t", "realisierbar ist", 613.9, 454.6)]),
    ]
    color = {"orient": "var(--teal)", "pilot": "var(--blue)", "etab": "var(--purple)"}
    labels = {
        "vergewisserung": "Vergewisserung vorhandener Mittel und gemeinsamer Ziele",
        "beteiligung": "Klärung der Kreise der Beteiligung",
        "steuerung": "Abstimmung von Prinzipien der Steuerung",
        "anstoss": "Anstoß für eine Auseinandersetzung im Kollegium",
        "p-durchfuehrung": "Pilotierung: Durchführung mit denen, die mitgestalten wollen",
        "p-evaluation": "Pilotierung: Evaluation dessen, was erreichbar ist",
        "p-planung": "Pilotierung: Planung mit dem, was vorhanden ist",
        "e-durchfuehrung": "Etablierung: Durchführung mit denen, die gebraucht werden",
        "e-evaluation": "Etablierung: Evaluation dessen, was erreichbar ist",
        "e-planung": "Etablierung: Planung mit dem, was notwendig und realisierbar ist",
    }
    for bid, ph, (x0, y0, x1, y1), d, lines in boxes:
        w, h = x1 - x0, y1 - y0
        a('<g class="el in" data-id="%s" tabindex="0" role="button" aria-label="%s" style="--d:%ss;--c:%s"><g class="lift">' % (bid, esc(labels[bid]), d, color[ph]))
        a('<rect class="box-bg" x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="7"/>' % (x0, y0, w, h))
        a('<rect class="ring" x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="9.5"/>' % (x0 - 3, y0 - 3, w + 6, h + 6))
        for kind, txt, tx, ty in lines:
            size = 13 if kind == "h" else 11
            a('<text class="%s" x="%.1f" y="%.1f">%s</text>' % (kind, tx, ty + 0.905 * size, esc(txt)))
        cx, cy = x1 - 9.5, y0 + 9.5
        a('<g class="prog" data-for="%s" transform="translate(%.1f %.1f)" aria-hidden="true">'
          '<circle class="pr-bg" r="4.6"/><circle class="pr-fg" r="4.6" transform="rotate(-90)" stroke-dasharray="0 30"/>'
          '<circle class="pr-done" r="5.4"/><path class="pr-check" d="M-2.4 0.1 L-0.7 1.8 L2.5 -1.6"/></g>' % (bid, cx, cy))
        a('</g></g>')

    # Kleine Spiralen (Rückkopplung) und Auslassungspunkte
    minis = [(147.8, 186.6, .14), (147.8, 271.6, .21), (147.8, 373.3, .28), (147.8, 539.9, .36)]
    for i, (x, y, d) in enumerate(minis):
        a('<g class="el sc in" data-id="rueckkopplung" tabindex="%s" role="button" aria-label="Rückkopplung statt starrer Phasen" style="--d:%ss;--c:var(--teal)"><g class="lift">'
          '<rect class="hit" x="%.1f" y="%.1f" width="30" height="24"/>'
          '<use href="#mini" xlink:href="#mini" x="%.1f" y="%.1f" width="22.4" height="17.3" style="fill:var(--teal)"/></g></g>'
          % ("0" if i == 0 else "-1", d, x - 4, y - 3.5, x, y))
    a('<text class="dots in" x="149.4" y="573" style="--d:.4s">…</text>')

    # Fernglas
    a('<g class="el sc in" data-id="logik" tabindex="0" role="button" aria-label="Die Logik des Orientierungsmodells" style="--d:.45s;--c:var(--blue)"><g class="lift">'
      '<rect class="hit" x="236" y="389" width="50" height="43"/>'
      '<path d="%s" style="fill:var(--blue)"/></g></g>' % P['fernglas'])

    # Phasen-Pfeile unten
    def chev(x0, y0, x1, y1):
        ym = (y0 + y1) / 2
        return 'M%.1f %.1f H%.1f L%.1f %.1f L%.1f %.1f H%.1f Q%.1f %.1f %.1f %.1f V%.1f Q%.1f %.1f %.1f %.1f Z' % (
            x0 + 2.5, y0, x1 - 11, x1, ym, x1 - 11, y1, x0 + 2.5, x0, y1, x0, y1 - 2.5, y0 + 2.5, x0, y0, x0 + 2.5, y0)
    a('<g class="el in" data-id="pilotierung" tabindex="-1" role="button" aria-label="Pilotierung: Überblick" style="--d:1.05s;--c:var(--blue)"><g class="lift">'
      '<path d="%s" style="fill:#1F6FB2;filter:url(#dsh)"/><text class="chev-t" x="397" y="528.6" text-anchor="middle">Pilotierung</text></g></g>' % chev(353.6, 512.3, 456.5, 537.0))
    a('<g class="el in" data-id="etablierung" tabindex="-1" role="button" aria-label="Etablierung: Überblick" style="--d:1.1s;--c:var(--purple)"><g class="lift">'
      '<path d="%s" style="fill:#6B3FA0;filter:url(#dsh)"/><text class="chev-t" x="637.5" y="528.6" text-anchor="middle">Etablierung</text></g></g>' % chev(593.9, 512.1, 696.8, 536.8))
    a('<g class="el sc in" data-id="rueckkopplung" tabindex="-1" role="button" aria-label="Rückkopplung statt starrer Phasen" style="--d:1.08s;--c:var(--purple)"><g class="lift">'
      '<rect class="hit" x="505" y="512" width="30" height="24"/>'
      '<use href="#mini" xlink:href="#mini" x="509.3" y="515.4" width="22.3" height="17.3" style="fill:var(--purple)"/></g></g>')
    a('</svg>')
    return '\n'.join(out)

if __name__ == "__main__":
    import sys
    paths = json.load(open(sys.argv[1]))
    print(build_svg(paths))

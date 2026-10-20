"""Baut Version 2 (Kreisläufe) als neues Artefakt und als eigenständige HTML-Datei."""
import json, sys, os, re, base64
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
from svg2 import build_svg
geo, bbox, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
VARIANT = sys.argv[4] if len(sys.argv) > 4 else 'summary'
SUFFIX = sys.argv[5] if len(sys.argv) > 5 else ''
os.makedirs(OUT, exist_ok=True)
tpl = open(os.path.join(D, 'template.html')).read()
content = open(os.path.join(D, 'content.js')).read()
svg = build_svg(geo, bbox, os.path.join(D, 'paths.json'))
def b64(f): return base64.b64encode(open(os.path.join(D, 'node/node_modules', f), 'rb').read()).decode()
fonts = ('<style>@font-face{font-family:"Lexend";font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,' + b64('@fontsource-variable/lexend/files/lexend-latin-wght-normal.woff2') + ') format("woff2")}'
         '@font-face{font-family:"Source Sans 3";font-style:normal;font-weight:200 900;font-display:swap;src:url(data:font/woff2;base64,' + b64('@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2') + ') format("woff2")}</style>')
tpl = re.sub(r'<link rel="preconnect"[^>]*>\n<link rel="preconnect"[^>]*>\n<link rel="stylesheet" href="https://fonts.googleapis.com[^>]*>', lambda m: fonts, tpl)
assert 'fonts.googleapis' not in tpl
tpl = tpl.replace('var PDF_VARIANT = "summary"; /*__PDFVARIANT__*/', 'var PDF_VARIANT = "%s";' % VARIANT)
assert 'PDF_VARIANT = "%s"' % VARIANT in tpl
page = tpl.replace('<!--__SVG__-->', svg).replace('/*__CONTENT__*/', content)
art = page.replace('<!--__JSPDF__-->', '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/4.2.1/jspdf.umd.min.js"></script>')
art = art.replace('<title>Orientierungsmodell agile Schulentwicklung</title>', '<title>Orientierungsmodell agile Schulentwicklung V2' + (' ' + SUFFIX if SUFFIX else '') + '</title>', 1)
open(os.path.join(OUT, 'orientierungsmodell_v2' + ('_' + SUFFIX.lower() if SUFFIX else '') + '.html'), 'w').write(art)
lib = open(os.path.join(D, 'node/node_modules/jspdf/dist/jspdf.umd.min.js')).read().replace('</script', '<\\/script')
body = page.replace('<!--__JSPDF__-->', '<script>' + lib + '</script>')
head, rest = body.split('</style>', 1)
full = ('<!doctype html>\n<html lang="de">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        + head + '</style>\n</head>\n<body>\n' + rest + '\n</body>\n</html>\n')
open(os.path.join(OUT, 'Orientierungsmodell_Schulentwicklung_V2' + ('_' + SUFFIX if SUFFIX else '') + '.html'), 'w').write(full)
print('artifact', len(art)//1024, 'KB; standalone', len(full)//1024, 'KB')

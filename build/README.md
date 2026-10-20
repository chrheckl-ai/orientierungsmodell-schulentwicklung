# Bauquellen der Website

Aus diesen Dateien entsteht `index.html` im Hauptordner. Texte ändert man in `content.js`, Aufbau, Gestaltung und Bedienung in `template.html`. Danach wird neu gebaut, und das Ergebnis ersetzt `index.html`.

## Dateien

| Datei | Inhalt |
|---|---|
| `content.js` | Alle Texte: Elemente, Rollen, Reflexionsaspekte, Leitfragen (`ELEMENTS`, `ORDER`, `ETAB_NOTICE`) |
| `template.html` | Gerüst der Seite mit CSS und JavaScript |
| `build2.py` | Baut die Seite aus Vorlage, Inhalten und Schaubild |
| `svg2.py`, `svg.py`, `paths.json` | Erzeugen das Schaubild als SVG |
| `layout/geo.json`, `layout/bbox.html` | Positionen und Textzeilen des Schaubilds (aus der PowerPoint der AG) |
| `node/package.json`, `node/package-lock.json` | Schriften (Lexend, Source Sans 3) und jsPDF, werden in die Seite eingebettet |
| `tools/wissensdokument.js` | Erzeugt das Wissensdokument (PDF) für den KI-Assistenten in AIS.chat |

## Bauen

Einmalig die Pakete installieren (etwa 60 MB, liegen nicht im Repository):

```
cd build/node && npm ci && cd ../..
```

Dann bauen und das Ergebnis übernehmen:

```
python3 build/build2.py build/layout/geo.json build/layout/bbox.html out summary
cp out/Orientierungsmodell_Schulentwicklung_V2.html index.html
```

`out/Orientierungsmodell_Schulentwicklung_V2.html` ist die eigenständige Fassung, identisch mit `index.html` und mit der LOGINEO-Datei. `out/orientierungsmodell_v2.html` ist die Fassung für das Claude-Artifact.

## Prüfen vor dem Hochladen

- Anführungszeichen in `content.js` immer typografisch „…“, nie ein gerades Anführungszeichen innerhalb eines Strings. Das hat die Seite schon einmal komplett lahmgelegt.
- Alle Script-Blöcke der gebauten Datei auf Syntaxfehler prüfen und die Seite im Browser testen, auf Desktop- und auf Handybreite.

## Markierungen in content.js

- `draft: true` erscheint als „Entwurf“ (noch nicht von der AG abgestimmt).
- `added: true` an einer Leitfrage erscheint als „ergänzt“ (gegenüber der EduMap).

## Wissensdokument neu erzeugen

Nach Änderungen an `content.js` (braucht Node und Playwright mit Chromium):

```
node build/tools/wissensdokument.js build/content.js out/Orientierungsmodell_Wissensdokument
```

Ergebnis: `out/Orientierungsmodell_Wissensdokument.pdf` (und `.html`). Danach in AIS.chat im Hintergrundwissen des Assistenten austauschen.

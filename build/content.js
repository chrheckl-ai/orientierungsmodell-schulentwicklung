/* Inhalte des Orientierungsmodells.
   src: "ppt"  = Begleitmaterial der AG (Handout, Stand 20.09.2026)
        draft  = Entwurf (noch nicht von der AG abgestimmt)
   Leitfragen: Grundlage EduMap, bereinigt; added = ergänzt */
const PHASES = {
  model:  { label: "Das Modell", color: "var(--teal-ink)", rgb: [0, 106, 119] },
  orient: { label: "Orientierung schaffen", color: "var(--teal)", rgb: [0, 128, 144] },
  pilot:  { label: "Pilotieren und lernen", color: "var(--blue)", rgb: [31, 111, 178] },
  etab:   { label: "Etablieren und verankern", color: "var(--purple)", rgb: [107, 63, 160] }
};

const ORDER = ["vergewisserung", "beteiligung", "steuerung", "anstoss",
  "p-planung", "p-durchfuehrung", "p-evaluation",
  "e-planung", "e-durchfuehrung", "e-evaluation"];

/* Hinweis in allen Elementen der Etablierung (Anregung des Dezernenten) */
const ETAB_NOTICE = { draft: true, title: "Steuerung: Schulleitung", text: "Die Etablierung ist ein großer Schulentwicklungsprozess, den die Schulleitung steuert. Dein Schwerpunkt als Digitalisierungsbeauftragte/r bleibt die Pilotierung." };

const ELEMENTS = {
  intro: {
    phase: "model", kind: "info", eyebrow: "Einführung", title: "Wozu dient diese Seite?", sub: "",
    intro: { text: "Die Seite unterstützt dich dabei, digitalisierungsbezogene Schulentwicklungsprozesse an deiner Schule anzustoßen und zu begleiten. Sie lädt zu einem anderen Blick ein: Statt zuerst zu fragen, was alles fehlt, geht es um das, was schon da ist, und darum, was sich damit jetzt umsetzen lässt." },
    aspectGroups: [
      { items: [
        { h: "Orientierung statt fester Schrittfolge", p: "Das Orientierungsmodell bietet dabei keine feste Schrittfolge. Es hilft,",
          list: ["in offenen Entwicklungssituationen Orientierung zu gewinnen,", "Beteiligung und Erprobung zu ermöglichen,", "Erfahrungen für die weitere Entwicklung zu nutzen und", "mit wachsender Klarheit zunehmend systematisch zu gestalten und zu verankern."] },
        { draft: true, h: "Vom Vorhandenen aus denken", p: "Viele Vorhaben geraten ins Stocken, weil zuerst geklärt wird, was alles fehlt. Diese Seite setzt anders an: Was ist schon da, und was lässt sich damit jetzt umsetzen? Das ist mit „agil begleiten“ gemeint: in kleinen Schritten erproben, auswerten und nachsteuern. So entstehen auch mit begrenzter Zeit und begrenzten Ressourcen sichtbare Ergebnisse." },
        { draft: true, h: "Eine Hilfe für dich als Digitalisierungsbeauftragte/r", p: "Diese Seite ist für deine Arbeit als Digitalisierungsbeauftragte oder Digitalisierungsbeauftragter gedacht. Im Schaubild stehst du für die Figur mit dem Fernglas: Du richtest den Blick nach vorn, erkundest Möglichkeiten und hältst den Entwicklungsprozess an deiner Schule in Bewegung." },
        { h: "Was du hier findest", p: "Zu den einzelnen Elementen des Modells findest du forschungsbasierte Reflexionsaspekte und Leitfragen für die Praxis. Die Leitfragen helfen dir, die Situation an deiner Schule zu klären und Veränderungen anzustoßen. Sie eignen sich auch, um Gespräche mit der Schulleitung, der Steuergruppe oder dem Kollegium vorzubereiten." }
      ] },
      { title: "Konzeptionelle Grundlage", items: [
        { h: "Das Orientierungsmodell strukturiert die Begleitung", p: "Es zeigt, worauf Digitalisierungsbeauftragte beim Initiieren und Begleiten von Schulentwicklungsprozessen achten können." },
        { h: "Mit den vorhandenen Ressourcen planen", p: "Gerade wenn vieles noch offen ist, hilft es, mit den vorhandenen Mitteln ins Handeln zu kommen, gemeinsam zu erproben und aus Erfahrungen zu lernen. Mit wachsender Klarheit lässt sich dann zielgerichtet gestalten und verankern." },
        { h: "Erkenntnisse aus der Schulentwicklungs- und Transferforschung schärfen den Blick", p: "Sie zeigen, unter welchen Bedingungen Schulentwicklung gelingen kann. Auf ihnen beruhen die Reflexionsaspekte und Leitfragen zu den einzelnen Elementen." }
      ] }
    ],
    howto: true,
    related: ["logik", "rueckkopplung", "vergewisserung"]
  },

  vision: {
    phase: "model", kind: "info", title: "Von der Vision zur gelebten Schulpraxis", sub: "Die Entwicklungsrichtung",
    intro: { draft: true, text: "Der Pfeil beschreibt die Richtung des gesamten Prozesses. Am Anfang steht eine erste, noch vorläufige Vision davon, was sich an der Schule verändern soll. Am Ziel steht eine gelebte Schulpraxis, in der das Neue selbstverständlich zum Alltag gehört." },
    aspectGroups: [{ items: [
      { draft: true, h: "Vision als Kompass", p: "Eine Vision gibt Richtung, ohne den Weg festzulegen. Sie darf zu Beginn unscharf sein und wird durch Erprobung und Erfahrung konkreter." },
      { draft: true, h: "Gelebte Schulpraxis als Ziel", p: "Eine Entwicklung ist am Ziel, wenn sie verlässlich im Unterricht und in den Abläufen der Schule verankert ist und nicht mehr eigens organisiert werden muss." },
      { draft: true, h: "Vision und Praxis im Abgleich", p: "Je klarer wird, was sich bewährt, desto genauer lässt sich die Vision fassen. Der Abgleich zwischen Vision und Praxis begleitet den ganzen Prozess." }
    ] }],
    related: ["vergewisserung", "e-evaluation"]
  },

  logik: {
    phase: "model", kind: "info", title: "Die Logik des Orientierungsmodells", sub: "Von ressourcenorientierter Pilotierung zu zielorientierter Etablierung",
    role: { draft: true, text: "Die Figur mit dem Fernglas bist du. Als Digitalisierungsbeauftragte oder Digitalisierungsbeauftragter initiierst du Entwicklungsprozesse und begleitest sie. Der Schwerpunkt deines Auftrags liegt auf der Orientierung für deine Schulleitung und dein Kollegium und auf der Pilotierung. Die Etablierung ist ein großer Schulentwicklungsprozess, den die Schulleitung steuert." },
    intro: { text: "Je offener der Weg und die geeignete Lösung noch sind, desto wichtiger ist es, mit vorhandenen Personen, Kompetenzen und Möglichkeiten zu beginnen und überschaubar zu erproben. Aus den Erfahrungen lässt sich dann ableiten, was eine dauerhafte Verankerung braucht." },
    aspectGroups: [
      { items: [
        { h: "Ausgangspunkt: Schulentwicklung unter Bedingungen von Offenheit und Unsicherheit", p: "",
          list: ["Schulentwicklung als komplexer und offener Entwicklungsprozess", "Entwicklung als lernender und partizipativer Prozess", "Handeln und Lernen statt vollständiger Vorausplanung"] },
        { draft: true, h: "Wege, die sich erst zeigen", p: "Du richtest den Blick nach vorn und erkundest, welche Wege für deine Schule möglich sind. Die gestrichelten Linien stehen für diese Möglichkeiten: Zu Beginn ist offen, welcher Weg trägt. Durch Pilotierung und Etablierung wird nach und nach klarer, wohin es geht." }
      ] }
    ],
    related: ["pilotierung", "etablierung"]
  },

  rueckkopplung: {
    phase: "model", kind: "info", title: "Rückkopplung statt starrer Phasen", sub: "Die kleinen Spiralen",
    intro: { text: "Das Modell unterscheidet keine starren Phasen. Die Elemente zeigen, was im Verlauf eines Entwicklungsprozesses in den Blick gehört. Rückkopplungen und erneute Vergewisserung sind ausdrücklich vorgesehen." },
    aspectGroups: [{ items: [
      { draft: true, h: "Immer wieder aufgreifen", p: "Die Spiralen zwischen den Elementen zeigen: Vergewisserung, Beteiligung, Steuerung und Anstoß bauen aufeinander auf und werden im Verlauf erneut aufgegriffen. Neue Erfahrungen können dazu führen, Ziele, Mittel oder Beteiligte noch einmal zu klären." },
      { draft: true, h: "Ein offener Prozess", p: "Die Punkte unter dem Anstoß deuten an, dass der Prozess offen bleibt. Welche Schritte folgen, ergibt sich aus der Situation der jeweiligen Schule." },
      { draft: true, h: "Agil begleiten", p: "Agil heißt hier, in kurzen Schleifen zu planen, zu handeln und auszuwerten, statt einen langen Plan abzuarbeiten. Abweichungen sind Gelegenheiten zum Lernen." }
    ] }],
    related: ["vergewisserung", "steuerung"]
  },

  pilotierung: {
    phase: "pilot", kind: "info", title: "Pilotierung", sub: "Pilotieren und lernen",
    role: { draft: true, text: "Hier liegt der Schwerpunkt deines Auftrags. Du steuerst die Pilotierung: Du unterstützt die Pilotgruppe, hältst die Schulleitung über den Stand der Erprobung auf dem Laufenden und sorgst dafür, dass aus den Erfahrungen gelernt wird." },
    intro: { draft: true, text: "In der Pilotierung wird das Vorhaben in einem überschaubaren Rahmen erprobt. Leitend ist die Frage, was mit den __vorhandenen__ Mitteln möglich ist, gemeinsam mit den Menschen, die mitgestalten wollen. Die Erfahrungen zeigen, was trägt und was angepasst werden muss." },
    aspectGroups: [{ items: [
      { h: "Mit den vorhandenen Ressourcen planen", p: "Gerade wenn vieles noch offen ist, hilft es, mit den vorhandenen Mitteln ins Handeln zu kommen, gemeinsam zu erproben und aus Erfahrungen zu lernen." },
      { draft: true, h: "Der Kreislauf", p: "Planung, Durchführung und Evaluation folgen aufeinander. Am Ende steht die Entscheidung, ob das Erprobte weiter erprobt, angepasst, verworfen oder etabliert wird." }
    ] }],
    related: ["p-planung", "p-durchfuehrung", "p-evaluation"]
  },

  etablierung: {
    phase: "etab", kind: "info", title: "Etablierung", sub: "Etablieren und verankern",
    notice: ETAB_NOTICE,
    role: { draft: true, text: "Du bringst deine Erfahrungen aus der Pilotierung ein und berätst die Schulleitung und die Steuergruppe. Die Verantwortung für die dauerhafte Verankerung liegt bei der Schulleitung." },
    intro: { draft: true, text: "Mit wachsender Klarheit wird das Erprobte zielgerichtet gestaltet und dauerhaft verankert. Jetzt geht es darum, was notwendig und realisierbar ist, wer dafür gebraucht wird und wie das Vorhaben Teil der gelebten Schulpraxis wird." },
    aspectGroups: [{ items: [
      { h: "Zielgerichtet gestalten", p: "Was sich in der Pilotierung bewährt hat, wird jetzt mit klaren Zielen weiterentwickelt und fest verankert." },
      { draft: true, h: "Der größere Kreislauf", p: "Der Kreislauf der Etablierung ist bewusst größer: Es geht nicht mehr um eine kleine Pilotgruppe, sondern um die ganze Schule. Mehr Menschen sind beteiligt, Strukturen werden verbindlicher und die Wirkung reicht weiter." }
    ] }],
    related: ["e-planung", "e-durchfuehrung", "e-evaluation"]
  },

  vergewisserung: {
    phase: "orient", kind: "q", title: "Vergewisserung", sub: "vorhandener Mittel und gemeinsamer Ziele",
    role: { draft: true, text: "Du kannst das Gespräch darüber anregen, was schon da ist und wohin es gehen soll, etwa mit der Schulleitung oder in der Steuergruppe. Oft übernimmst du dabei auch die Moderation. Die Leitfragen helfen dir, Anlass, Ziele und vorhandene Mittel gemeinsam zu klären, bevor etwas geplant wird." },
    intro: { text: "Bevor eine Erprobung beginnt, braucht es eine gemeinsame Orientierung darüber, was weiterentwickelt werden soll und woran dabei angeknüpft werden kann." },
    aspectGroups: [
      { title: "Gemeinsame Entwicklungsrichtung", items: [
        { h: "Anlass und Bedarf", p: "Wahrgenommener Handlungsbedarf bildet einen Ausgangspunkt für Schulentwicklungsprozesse. Seine Klärung hilft, den konkreten Entwicklungsanlass zu erfassen und die Ausgangssituation der Schule in den Blick zu nehmen." },
        { draft: true, h: "Pädagogisch-didaktische Bedeutung", p: "Digitalisierungsbezogene Schulentwicklung orientiert sich an pädagogischen und didaktischen Anliegen. Entscheidend ist dabei nicht der Einsatz digitaler Medien an sich, sondern ihr möglicher Beitrag zum Lehren und Lernen." },
        { h: "Geteilte Orientierung", p: "Ein geteiltes Verständnis der angestrebten Entwicklung schafft Orientierung für den gemeinsamen Entwicklungsprozess." }
      ] },
      { title: "Vorhandene Mittel", items: [
        { h: "Vorhandenes als Ausgangspunkt", p: "Schulentwicklung beginnt nicht bei null: Vorhandene Aktivitäten, Erfahrungen, Kompetenzen und Strukturen bieten Anknüpfungspunkte für erste Entwicklungsschritte." },
        { h: "Verfügbare Handlungsspielräume", p: "Personelle, zeitliche, materielle und organisatorische Möglichkeiten bestimmen mit, was unter den jeweiligen Bedingungen erprobt werden kann." }
      ] }
    ],
    questionGroups: [
      { title: "Gemeinsame Ziele", qs: [
        { id: "v1", q: "Wo besteht Handlungsbedarf?" },
        { id: "v2", q: "Welche Interessen gibt es?" },
        { id: "v3", q: "Was ist von besonderer pädagogisch-didaktischer Bedeutung?" },
        { id: "v4", q: "Wie lautet eine erste Formulierung unserer Vision?" }
      ] },
      { title: "Vorhandene Mittel", qs: [
        { id: "v5", q: "Was haben wir bereits (Aktivitäten, Erfahrungen, Kompetenzen, Ausstattung, Strukturen)?" },
        { id: "v6", q: "Was brauchen wir für die Umsetzung?" }
      ] }
    ]
  },

  beteiligung: {
    phase: "orient", kind: "q", title: "Klärung", sub: "der Kreise der Beteiligung",
    role: { draft: true, text: "Du hast meist einen guten Überblick, wer im Kollegium Interesse und Expertise mitbringt. Nutze die Leitfragen, um Mitstreiterinnen und Mitstreiter zu gewinnen und zu klären, wer in welcher Form beteiligt wird. Oft sind Digitalisierungsbeauftragte selbst die Change Agents, die den Prozess vorantreiben." },
    intro: { text: "Schulentwicklung braucht Beteiligung. Dabei geht es nicht nur darum, wer beteiligt wird, sondern auch darum, welche Perspektiven und Beiträge benötigt werden und unter welchen Bedingungen Menschen bereit sind, mitzuwirken." },
    aspectGroups: [{ items: [
      { h: "Relevante Perspektiven", p: "Die Berücksichtigung unterschiedlicher Perspektiven ermöglicht es, verschiedene Sichtweisen und Betroffenheiten in den Entwicklungsprozess einzubeziehen." },
      { h: "Formen der Beteiligung", p: "Beteiligung kann unterschiedlich weit reichen: von Information und Rückmeldung bis hin zu Mitbestimmung und aktiver Mitgestaltung. Damit können Personen und Gruppen in unterschiedlicher Weise in Entwicklungsprozesse einbezogen sein." },
      { h: "Motivation", p: "Motivation ist eine wichtige Voraussetzung für Beteiligung. Zugleich lässt sie sich stärken, wenn Beteiligung gut gestaltet ist. Bedeutsamkeit, Kompetenzerleben, Autonomie, Mitbestimmung und Wirksamkeitserleben spielen dabei eine wichtige Rolle." },
      { h: "Bereitschaft zur Beteiligung und Erprobung", p: "Wer freiwillig mitmacht und mitgestalten kann, engagiert sich eher. Interesse und die Bereitschaft, sich auf Neues einzulassen, erleichtern den Einstieg." },
      { h: "Personen, die die Entwicklung vorantreiben", p: "Für Entwicklungsprozesse sind Personen bedeutsam, die Expertise und Engagement mitbringen, gut vernetzt sind und den Prozess aktiv vorantreiben können. In der Transferforschung werden sie als „Change Agents“ bezeichnet." }
    ] }],
    questionGroups: [{ qs: [
      { id: "b1", q: "Welche Unterstützung gibt es durch die Fachschaft und das Kollegium?" },
      { id: "b2", q: "Wie groß ist die Bereitschaft, das Vorhaben umzusetzen?" },
      { id: "b3", added: true, q: "Wer soll in welcher Form beteiligt werden (informieren, Rückmeldung geben, mitentscheiden, mitgestalten)?" },
      { id: "b4", added: true, q: "Wer kann die Entwicklung mit Expertise und Engagement vorantreiben?" }
    ] }]
  },

  steuerung: {
    phase: "orient", kind: "q", title: "Abstimmung", sub: "von Prinzipien der Steuerung",
    role: { draft: true, text: "Kläre früh deine eigene Rolle: Die Pilotierung steuerst du mit einem klaren Mandat der Schulleitung. Die Gesamtverantwortung und die Steuerung der Etablierung liegen bei der Schulleitung. Ein solches Mandat stärkt deine Position und entlastet dich." },
    intro: { draft: true, text: "Entwicklungsprozesse brauchen verlässliche Absprachen darüber, wie gesteuert, entschieden und kommuniziert wird. Gerade wenn der Weg noch offen ist, geben gemeinsam vereinbarte Prinzipien Sicherheit, ohne das Vorgehen im Detail festzulegen." },
    aspectGroups: [{ items: [
      { draft: true, h: "Rollen und Verantwortlichkeiten", p: "Klare Zuständigkeiten entlasten alle Beteiligten. Es sollte erkennbar sein, wer koordiniert, wer entscheidet und wer welche Aufgaben übernimmt. In vielen Schulen hat sich dafür eine Steuergruppe bewährt, in der Schulleitung und Kollegium zusammenarbeiten." },
      { draft: true, h: "Rückhalt durch die Schulleitung", p: "Die Schulleitung ist für das Gelingen von Entwicklungsprozessen zentral. Sie verleiht dem Vorhaben Legitimation, schafft Freiräume und sorgt dafür, dass Ergebnisse in die Strukturen der Schule übergehen können." },
      { draft: true, h: "Transparenz und Kommunikation", p: "Regelmäßige Information über Stand, Entscheidungen und Ergebnisse schafft Vertrauen. Auch wer nicht aktiv mitarbeitet, sollte nachvollziehen können, was geschieht und wie man sich einbringen kann." },
      { draft: true, h: "Beweglich steuern", p: "Agil steuern heißt, in kurzen Zyklen zu arbeiten und zu festen Zeitpunkten zu prüfen, wo man steht. Wenn sich Ziele oder Vorgehen ändern, ist das Teil des Prozesses und kein Zeichen des Scheiterns." }
    ] }],
    questionGroups: [{ qs: [
      { id: "s1", q: "Welche Unterstützung gibt es durch die Schulleitung?" },
      { id: "s2", q: "Wer übernimmt die Leitung und Verantwortung für das Vorhaben?" },
      { id: "s3", added: true, q: "Wie werden Entscheidungen getroffen und im Kollegium kommuniziert?" },
      { id: "s4", added: true, q: "In welchem Rhythmus überprüfen wir den Prozess und passen ihn an?" }
    ] }]
  },

  anstoss: {
    phase: "orient", kind: "q", title: "Anstoß", sub: "für eine Auseinandersetzung im Kollegium",
    role: { draft: true, text: "Den Anstoß gibst häufig du selbst, zum Beispiel mit einem kurzen Impuls in der Lehrerkonferenz oder der Steuergruppe. Die Leitfragen helfen dir, diesen Impuls so vorzubereiten, dass er Interesse weckt und zum Mitmachen einlädt." },
    intro: { draft: true, text: "Ein Anstoß macht das Vorhaben im Kollegium sichtbar und lädt zur Auseinandersetzung ein. Er weckt Interesse, zeigt realistische Erfolgsaussichten und macht deutlich, wie man sich beteiligen kann." },
    aspectGroups: [{ items: [
      { draft: true, h: "Erfolgsaussichten", p: "Lehrkräfte lassen sich eher auf Neues ein, wenn sie einen Nutzen für ihren Unterricht erkennen und die Umsetzung realistisch erscheint. Konkrete Beispiele aus der eigenen oder einer vergleichbaren Schule machen Erfolgsaussichten greifbar." },
      { draft: true, h: "Gelingensbedingungen", p: "Ein guter Anstoß benennt offen, was das Vorhaben braucht: Zeit, Unterstützung, Fortbildung oder Ausstattung. Das schafft Vertrauen und beugt Überforderung vor." },
      { draft: true, h: "Möglichkeiten der Mitgestaltung", p: "Wer sieht, dass eigene Ideen und Erfahrungen gefragt sind, beteiligt sich eher. Der Anstoß sollte deshalb Wege zum Mitmachen eröffnen und keine fertigen Lösungen vorgeben." },
      { draft: true, h: "An Interessen anknüpfen", p: "Impulse, die an Fragen und Interessen aus dem Kollegium anschließen, erreichen mehr als Vorgaben von außen. Hilfreich sind Formate, die eigene Erfahrungen ermöglichen, etwa Praxisbeispiele oder kurze Erprobungen." }
    ] }],
    questionGroups: [{ qs: [
      { id: "a1", q: "Welcher Impuls hilft, das Kollegium für das Vorhaben zu gewinnen?" },
      { id: "a2", q: "Wofür interessiert sich das Kollegium besonders?" },
      { id: "a3", q: "Wer zeigt Interesse und kann passende Kompetenzen oder Expertise einbringen?" },
      { id: "a4", added: true, q: "Welche Erfolgsaussichten können wir aufzeigen?" },
      { id: "a5", added: true, q: "Welche Gelingensbedingungen sollten wir offen benennen?" },
      { id: "a6", added: true, q: "Welche Möglichkeiten der Mitgestaltung bieten wir an?" }
    ] }]
  },

  "p-planung": {
    phase: "pilot", kind: "q", title: "Planung", sub: "mit dem, was vorhanden ist",
    role: { draft: true, text: "Du unterstützt die Pilotgruppe dabei, mit dem zu beginnen, was da ist, und den ersten Schritt überschaubar zu halten. Hilfreich ist dein Wissen über vorhandene Ausstattung, Fortbildungsangebote und Unterstützung, etwa durch die Medienberatung." },
    intro: { draft: true, text: "Die Pilotierung beginnt mit dem, was bereits da ist: mit den Menschen, ihren Kompetenzen und den vorhandenen Möglichkeiten. Geplant wird ein überschaubarer erster Schritt, dessen Aufwand vertretbar bleibt." },
    aspectGroups: [{ items: [
      { draft: true, h: "Von den Mitteln aus denken", p: "Die Pilotierung fragt zuerst: Was können wir mit dem, was wir haben, sinnvoll erproben? Das senkt die Hürde, ins Handeln zu kommen, und macht unabhängig von idealen Voraussetzungen." },
      { draft: true, h: "Leistbarer Einsatz", p: "Der Einsatz an Zeit und Kraft sollte so bemessen sein, dass er auch dann vertretbar ist, wenn die Erprobung nicht wie erhofft gelingt. Das hält das Risiko klein und macht Mut, Neues zu versuchen." },
      { draft: true, h: "Überschaubarer Rahmen", p: "Ein klar begrenzter Pilot, etwa in einer Klasse, einem Fach oder einem Jahrgang, erleichtert die Durchführung und liefert schnell auswertbare Erfahrungen." },
      { draft: true, h: "Kooperationen", p: "Partnerschaften innerhalb und außerhalb der Schule erweitern die eigenen Möglichkeiten. Wer sich verbindlich einbringt, prägt das Vorhaben mit." }
    ] }],
    questionGroups: [{ qs: [
      { id: "pp1", q: "Welche Kompetenzen sind vorhanden?" },
      { id: "pp2", q: "Mit wem und wie können wir kooperieren, um unsere Möglichkeiten zu erweitern?" },
      { id: "pp3", added: true, q: "Was können wir mit den vorhandenen Mitteln in einem überschaubaren Rahmen erproben?" }
    ] }]
  },

  "p-durchfuehrung": {
    phase: "pilot", kind: "q", title: "Durchführung", sub: "mit denen, die mitgestalten wollen",
    role: { draft: true, text: "Während der Erprobung bist du Ansprechperson und hältst die Verbindung zwischen Pilotgruppe, Schulleitung und Kollegium. Du kannst helfen, Erfahrungen regelmäßig festzuhalten." },
    intro: { draft: true, text: "Die Erprobung wird von denen getragen, die Interesse haben und sich freiwillig einbringen. Aufgaben werden gemeinsam vereinbart, Erfahrungen werden festgehalten." },
    aspectGroups: [{ items: [
      { draft: true, h: "Freiwilligkeit als Stärke", p: "In der Pilotierung arbeiten diejenigen mit, die mitgestalten wollen. Ihr Engagement und ihre Neugier sind die wichtigste Ressource der Erprobung." },
      { draft: true, h: "Verbindliche Absprachen", p: "Aufgaben, Zuständigkeiten und Zeiträume werden gemeinsam vereinbart. Klare Absprachen geben der Erprobung Halt, ohne sie starr zu machen." },
      { draft: true, h: "Erfahrungen festhalten", p: "Kurze Notizen, Beispiele aus dem Unterricht oder Rückmeldungen von Schülerinnen und Schülern bilden die Grundlage für die spätere Auswertung." }
    ] }],
    questionGroups: [{ qs: [
      { id: "pd1", q: "Wer ist beteiligt?" },
      { id: "pd2", q: "Wer möchte sich einbringen und mitgestalten?" },
      { id: "pd3", q: "Welche Aufgaben sind zu vereinbaren und zu verteilen?" },
      { id: "pd4", added: true, q: "Wie halten wir Erfahrungen während der Erprobung fest?" }
    ] }]
  },

  "p-evaluation": {
    phase: "pilot", kind: "q", title: "Evaluation", sub: "dessen, was erreichbar ist",
    role: { draft: true, text: "Du kannst die Auswertung moderieren und dafür sorgen, dass am Ende eine bewusste Entscheidung steht. Die Leitfragen geben diesem Gespräch eine Struktur." },
    intro: { draft: true, text: "Die Auswertung der Pilotierung dient vor allem dem Lernen. Sie klärt, was sich bewährt hat, was angepasst werden muss und ob das Vorhaben in die Breite getragen werden soll." },
    aspectGroups: [{ items: [
      { draft: true, h: "Aus Erfahrungen lernen", p: "Im Mittelpunkt steht die Frage, was die Erprobung gezeigt hat. Auch Schwierigkeiten liefern wertvolle Hinweise für die weitere Entwicklung." },
      { draft: true, h: "Unerwartetes nutzen", p: "Überraschende Ergebnisse können neue Möglichkeiten eröffnen. Es lohnt sich, sie bewusst aufzugreifen." },
      { draft: true, h: "Das Erreichbare im Blick", p: "Bewertet wird, was unter den gegebenen Bedingungen erreichbar war. Das schützt vor überzogenen Erwartungen und macht Fortschritte sichtbar." },
      { draft: true, h: "Über den nächsten Schritt entscheiden", p: "Am Ende steht eine bewusste Entscheidung: weiter erproben, anpassen, verwerfen oder das Erprobte etablieren." }
    ] }],
    questionGroups: [{ qs: [
      { id: "pe1", q: "Was ist bisher gelungen?" },
      { id: "pe2", q: "Was passt noch nicht?" },
      { id: "pe3", q: "Welche Schwierigkeiten gilt es zu überwinden?" },
      { id: "pe4", q: "Welche Überlegungen und Anpassungen sind notwendig?" },
      { id: "pe5", added: true, q: "Soll das Erprobte etabliert, weiter erprobt oder verändert werden?" }
    ] }]
  },

  "e-planung": {
    phase: "etab", kind: "q", title: "Planung", sub: "mit dem, was notwendig und realisierbar ist",
    notice: ETAB_NOTICE,
    role: { draft: true, text: "Die Planung der Etablierung verantwortet die Schulleitung, zum Beispiel gemeinsam mit der Steuergruppe. Du bringst die Erfahrungen aus der Pilotierung ein und berätst, wie sich das Vorhaben verbindlich verankern lässt, etwa im Medienkonzept." },
    intro: { draft: true, text: "Auf Grundlage der Erfahrungen aus der Pilotierung wird nun zielgerichtet geplant. Die Frage lautet: Was ist notwendig, damit das Vorhaben dauerhaft gelingt, und was davon lässt sich realisieren? Notwendig kann auch sein, was die Schule aufgrund von Vorgaben ohnehin umsetzen muss." },
    aspectGroups: [{ items: [
      { draft: true, h: "Erkenntnisse nutzen", p: "Die Ergebnisse der Pilotierung bilden die Grundlage der Planung. Was sich bewährt hat, wird übernommen. Was nicht getragen hat, wird verändert oder verworfen." },
      { draft: true, h: "Zielorientierung", p: "Mit wachsender Klarheit lassen sich Ziele genauer bestimmen. Die Planung richtet sich daran aus, welche Kompetenzen, Ressourcen und Strukturen für diese Ziele gebraucht werden." },
      { draft: true, h: "Vorgaben einbeziehen", p: "„Notwendig“ meint nicht nur, was das Gelingen braucht. Manches muss die Schule ohnehin umsetzen, etwa aufgrund neuer Lehrpläne oder Prüfungsordnungen. Eine Pilotierung kann dann der erste Schritt sein, um eine solche Vorgabe an der eigenen Schule umzusetzen." },
      { draft: true, h: "Verbindliche Verankerung", p: "Dauerhaft wird ein Vorhaben, wenn es in den Strukturen der Schule festgehalten ist, etwa im Medienkonzept, im schulinternen Lehrplan, in Konferenzbeschlüssen oder in der Fortbildungsplanung." },
      { draft: true, h: "Realistischer Zeitrahmen", p: "Etablierung braucht Zeit. Ein Zeitrahmen mit Zwischenschritten beugt Überforderung vor und hält den Prozess in Bewegung." }
    ] }],
    questionGroups: [{ qs: [
      { id: "ep1", q: "Welche Erkenntnisse ergeben sich aus der Evaluation und müssen berücksichtigt werden?" },
      { id: "ep1b", added: true, q: "Welche Vorgaben muss die Schule ohnehin umsetzen (z. B. Lehrpläne, Prüfungsordnungen, Erlasse)?" },
      { id: "ep2", q: "Wie können die erprobten Ziele gemeinsam getragen werden?" },
      { id: "ep3", q: "Welche Kompetenzen sind notwendig?" },
      { id: "ep4", q: "Welche Expertise müssen wir uns dazuholen (z. B. Fortbildungen, Hospitationen)?" },
      { id: "ep5", q: "Welcher zeitliche Rahmen muss gesetzt werden?" },
      { id: "ep6", added: true, q: "Wie wird das Vorhaben verbindlich verankert (z. B. im Medienkonzept, im schulinternen Lehrplan, durch Konferenzbeschluss)?" },
      { id: "ep7", added: true, q: "Wie steuert die Schulleitung die Etablierung, und welche Rolle übernimmt die oder der Digitalisierungsbeauftragte dabei?" }
    ] }]
  },

  "e-durchfuehrung": {
    phase: "etab", kind: "q", title: "Durchführung", sub: "mit denen, die gebraucht werden",
    notice: ETAB_NOTICE,
    role: { draft: true, text: "Die Schulleitung setzt den Rahmen und entscheidet, wer einbezogen wird. Du kannst helfen, die Erfahrungen der Pilotgruppe weiterzugeben, und auf Unterstützung hinweisen, zum Beispiel auf schulinterne Fortbildungen oder Angebote der Medienberatung." },
    intro: { draft: true, text: "Damit das Vorhaben in der Breite ankommt, werden nun auch diejenigen einbezogen, die für eine dauerhafte Umsetzung gebraucht werden. Die Erfahrungen der Pilotgruppe helfen dabei." },
    aspectGroups: [{ items: [
      { draft: true, h: "Von der Pilotgruppe in die Breite", p: "Die Etablierung reicht über die Freiwilligen hinaus. Beteiligt werden alle, die für die dauerhafte Umsetzung eine Rolle spielen, etwa eine ganze Fachschaft oder ein Jahrgangsteam." },
      { draft: true, h: "Erfahrungen weitergeben", p: "Die Mitglieder der Pilotgruppe können als Multiplikatorinnen und Multiplikatoren wirken. Ihre Praxiserfahrung macht das Vorhaben für andere greifbar." },
      { draft: true, h: "Unterstützung sichern", p: "Wer neu dazukommt, braucht Unterstützung, etwa durch Fortbildung, Materialien, Austauschformate oder feste Ansprechpersonen." }
    ] }],
    questionGroups: [{ qs: [
      { id: "ed1", q: "Für wen ist die Teilnahme sinnvoll?" },
      { id: "ed1b", added: true, q: "Für wen ist die Teilnahme notwendig?" },
      { id: "ed2", q: "Wer bringt passende Kompetenzen und Expertise ein?" },
      { id: "ed3", added: true, q: "Wie geben wir die Erfahrungen aus der Pilotierung weiter und wie unterstützen wir neu Beteiligte?" }
    ] }]
  },

  "e-evaluation": {
    phase: "etab", kind: "q", title: "Evaluation", sub: "dessen, was erreichbar ist",
    notice: ETAB_NOTICE,
    role: { draft: true, text: "Die Evaluation der Etablierung verantwortet die Schulleitung. Du kannst deine Beobachtungen einbringen. Ergeben sich dabei neue Ideen, kannst du diese wieder in einer kleinen Pilotierung erproben." },
    intro: { draft: true, text: "Auch die Etablierung wird regelmäßig ausgewertet. Die Evaluation prüft, ob das Vorhaben die angestrebte Wirkung entfaltet, und bildet den Ausgangspunkt für die weitere Entwicklung." },
    aspectGroups: [{ items: [
      { draft: true, h: "Wirkung prüfen", p: "Entscheidend ist, welchen Beitrag das Vorhaben zum Lehren und Lernen leistet. Rückmeldungen von Lehrkräften sowie Schülerinnen und Schülern geben dafür wichtige Hinweise." },
      { draft: true, h: "Teilziele anpassen", p: "Die Evaluation führt zu angepassten Teilzielen. So bleibt die Entwicklung beweglich, auch wenn sie bereits verankert ist." },
      { draft: true, h: "Gelebte Schulpraxis", p: "Ein Vorhaben ist etabliert, wenn es selbstverständlich zum Schulalltag gehört. Die Evaluation fragt deshalb auch, ob die Verankerung trägt." }
    ] }],
    questionGroups: [{ qs: [
      { id: "ee1", q: "Was hat funktioniert, was nicht?" },
      { id: "ee2", q: "Welche Schwierigkeiten ergeben sich?" },
      { id: "ee3", q: "Was muss angepasst oder überdacht werden?" },
      { id: "ee4", q: "Welche angepassten Teilziele müssen vereinbart werden?" },
      { id: "ee5", added: true, q: "Woran erkennen wir, dass das Vorhaben Teil der gelebten Schulpraxis geworden ist?" }
    ] }]
  }
};

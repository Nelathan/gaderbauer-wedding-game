// Wedding Haikus - Original collection for Daniel & Astrid's wedding
// 27.09.2025 at Schallaburg Castle, Niederösterreich
// Each haiku carries a distinct theme from their 14-year journey

export const haikus = [
  {
    id: 1,
    theme: "Burgmauern & Ewigkeit",
    lines: [
      { text: "Alte Steine schweigen", codeword: "STEIN" },
      { text: "Zeit tropft durch verwitterte Fugen", codeword: "ZEIT" },
      { text: "Ewigkeit beginnt", codeword: "EWIG" },
    ],
  },
  {
    id: 2,
    theme: "Herbstgold & Neubeginn",
    lines: [
      { text: "Blätter tanzen leis", codeword: "BLATT" },
      { text: "Goldene Wege erwachen", codeword: "GOLD" },
      { text: "Neuer Schritt in Licht", codeword: "LICHT" },
    ],
  },
  {
    id: 3,
    theme: "Sternennacht & Visionen",
    lines: [
      { text: "Sterne spinnen Licht", codeword: "STERN" },
      { text: "Nachthimmel trägt eure Träume", codeword: "TRAUM" },
      { text: "Zukunft leuchtet klar", codeword: "KLAR" },
    ],
  },
  {
    id: 4,
    theme: "Wein & Lebenslust",
    lines: [
      { text: "Weinreben im Wind", codeword: "WEIN" },
      { text: "Gläser klingen, Stimmen singen", codeword: "KLANG" },
      { text: "Fest im Abendrot", codeword: "FEST" },
    ],
  },
  {
    id: 5,
    theme: "Alchemie & Verwandlung",
    lines: [
      { text: "Honig wird zu Gold", codeword: "HONIG" },
      { text: "Sanfte Wärme, Magie wächst", codeword: "MAGIE" },
      { text: "Liebe gärt im Fass", codeword: "FASS" },
    ],
  },
  {
    id: 6,
    theme: "Zwei Flüsse vereinen sich",
    lines: [
      { text: "Wasser sucht Wasser", codeword: "WASSER" },
      { text: "Zwei Ströme verschlingen sich", codeword: "STROM" },
      { text: "Neuer Strom entsteht", codeword: "NEU" },
    ],
  },
  {
    id: 7,
    theme: "Wortlose Nähe",
    lines: [
      { text: "Blicke sagen mehr", codeword: "BLICK" },
      { text: "Stille trägt geteiltes Lachen", codeword: "STILL" },
      { text: "Herzen hören zu", codeword: "HERZ" },
    ],
  },
  {
    id: 8,
    theme: "Zeitreise & Geschichte",
    lines: [
      { text: "Alte Uhren ticken", codeword: "UHR" },
      { text: "Vergangenheit flüstert leis", codeword: "ECHO" },
      { text: "Heute wird Legende", codeword: "HEUTE" },
    ],
  },
  {
    id: 9,
    theme: "Zielgenauigkeit",
    lines: [
      { text: "Sehne spannt sich still", codeword: "SEHNE" },
      { text: "Pfeil fliegt durch klare Gedanken", codeword: "PFEIL" },
      { text: "Herz trifft auf Ziel", codeword: "ZIEL" },
    ],
  },
  {
    id: 10,
    theme: "Kindheit & Weitergabe",
    lines: [
      { text: "Kinderlachen fliegt", codeword: "KIND" },
      { text: "Alte Spiele, neue Hände", codeword: "SPIEL" },
      { text: "Zeit wandert im Kreis", codeword: "KREIS" },
    ],
  },
  {
    id: 11,
    theme: "Karte & Entdeckungslust",
    lines: [
      { text: "Unbekanntes Land", codeword: "LAND" },
      { text: "Hand in Hand die Wege zeichnen", codeword: "HAND" },
      { text: "Neugier führt euch weit", codeword: "WEIT" },
    ],
  },
  {
    id: 12,
    theme: "Geheimnis der Nacht",
    lines: [
      { text: "Nachts flüstert der Wind", codeword: "NACHT" },
      { text: "Geheimnisse in Schatten", codeword: "GEHEIM" },
      { text: "Träume wiegen sanft", codeword: "SANFT" },
    ],
  },
  {
    id: 13,
    theme: "Handwerk & Zukunftsbau",
    lines: [
      { text: "Werkzeug ruht im Licht", codeword: "WERK" },
      { text: "Pläne wachsen zwischen Händen", codeword: "PLAN" },
      { text: "Zukunft wird gebaut", codeword: "BAU" },
    ],
  },
  {
    id: 14,
    theme: "Natur & Stille",
    lines: [
      { text: "Morgentau im Gras", codeword: "TAU" },
      { text: "Birken flüstern eure Namen", codeword: "BIRKE" },
      { text: "Stille wie ein Lied", codeword: "LIED" },
    ],
  },
  {
    id: 15,
    theme: "Freude & Gemeinschaft",
    lines: [
      { text: "Glück springt von Gesicht", codeword: "GLUECK" },
      { text: "Lachen rollt wie Wellen fort", codeword: "WELLE" },
      { text: "Heute sind wir eins", codeword: "WIR" },
    ],
  },
  {
    id: 16,
    theme: "Mut & Aufbruch",
    lines: [
      { text: "Tür knarrt in den Tag", codeword: "TUER" },
      { text: "Schritte wagen fremde Pfade", codeword: "SCHRITT" },
      { text: "Mut blüht im Morgen", codeword: "MUT" },
    ],
  },
  {
    id: 17,
    theme: "Sprache & Präzision",
    lines: [
      { text: "Ein Wort wiegt ein Jahr", codeword: "WORT" },
      { text: "Klarheit schneidet durch das Grau", codeword: "SCHARF" },
      { text: "Sprache baut Brücken", codeword: "BRUECKE" },
    ],
  },
];

// Secret salt for verification (the "single S")
export const SECRET_SALT = "GADERBAUER_HOCHZEIT_2025_SCHALLABURG_APFELHAIN";

// Get all lines as a flat array for easier processing
export const getAllLines = () => {
  return haikus.flatMap((haiku) => haiku.lines);
};

// Get a specific haiku by ID
export const getHaikuById = (id) => {
  return haikus.find((haiku) => haiku.id === id);
};

// Get line by codeword
export const getLineByCodeword = (codeword) => {
  const allLines = getAllLines();
  return allLines.find((line) => line.codeword === codeword.toUpperCase());
};

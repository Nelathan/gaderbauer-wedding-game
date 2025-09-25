// Wedding Haikus - Complete collection for Daniel & Astrid's wedding
// 27.09.2025 at Schallaburg Castle, Niederösterreich
// Each haiku carries a distinct theme from their 14-year journey
// Each haiku must be of highest lyrical quality and exactly 5-7-5 syllables
// The active set of haikus must be strictly 16 items for our 48 players
// The active set of haikus must be strictly orthogonal

export const haikus = [
  {
    id: 1,
    theme: "Burgmauern & Ewigkeit",
    active: true,
    lines: [
      { text: "Alte Steine still", codeword: "STEIN" },
      { text: "Zeit tropft durch alte Fugen", codeword: "ZEIT" },
      { text: "Ewigkeit beginnt", codeword: "EWIG" },
    ],
  },
  {
    id: 2,
    theme: "Herbstgold & Neubeginn",
    active: true,
    lines: [
      { text: "Blätter tanzen leis", codeword: "BLATT" },
      { text: "Goldne Wege erwachen", codeword: "GOLD" },
      { text: "Neuer Schritt in Licht", codeword: "LICHT" },
    ],
  },
  {
    id: 3,
    theme: "Sternennacht & Visionen",
    active: true,
    lines: [
      { text: "Sterne spinnen Licht", codeword: "STERN" },
      { text: "Nachthimmel hütet Träume", codeword: "TRAUM" },
      { text: "Zukunft leuchtet klar", codeword: "KLAR" },
    ],
  },
  {
    id: 6,
    theme: "Zwei Flüsse vereinen sich",
    active: true,
    lines: [
      { text: "Wasser sucht Wasser", codeword: "WASSER" },
      { text: "Zwei Ströme verschlingen sich", codeword: "STROM" },
      { text: "Neuer Strom entsteht", codeword: "NEU" },
    ],
  },
  {
    id: 11,
    theme: "Kompass & Aufbruch",
    active: true,
    lines: [
      { text: "Mut zeichnet die Luft", codeword: "MUT" },
      { text: "Karten flüstern uns den Pfad", codeword: "KARTE" },
      { text: "Wir gehen voran", codeword: "KOMPASS" },
    ],
  },
  {
    id: 13,
    theme: "Handwerk & Zukunftsbau",
    active: true,
    lines: [
      { text: "Werkzeug ruht im Licht", codeword: "WERK" },
      { text: "Pläne wachsen in Händen", codeword: "PLAN" },
      { text: "Zukunft wird gebaut", codeword: "BAU" },
    ],
  },
  {
    id: 16,
    theme: "Rätsel & Dreiklang",
    active: true,
    lines: [
      { text: "Zettel suchen sich", codeword: "RAETSEL" },
      { text: "Drei Stimmen werden zu Klang", codeword: "TRIO" },
      { text: "Lachen schließt den Ring", codeword: "RING" },
    ],
  },
  {
    id: 17,
    theme: "Aquarell & Atemfarbe",
    active: true,
    lines: [
      { text: "Wasser küsst Papier", codeword: "PAPIER" },
      { text: "Pinsel atmet sanftes Blau", codeword: "PINSEL" },
      { text: "Farbe wird zu Traum", codeword: "FARBE" },
    ],
  },
  {
    id: 19,
    theme: "Reife Ernte",
    active: true,
    lines: [
      { text: "Rot der Apfel hängt", codeword: "APFEL" },
      { text: "Von warmer Sonne gereift", codeword: "SONNE" },
      { text: "Das Ernten beginnt", codeword: "ERNTE" },
    ],
  },
  {
    id: 21,
    theme: "Terrakotta & Echo",
    active: true,
    lines: [
      { text: "Terrakotta lacht", codeword: "TERRA" },
      { text: "Laubengänge tragen Klang", codeword: "LAUBEN" },
      { text: "Heute schreiben wir", codeword: "ECHO" },
    ],
  },
  {
    id: 25,
    theme: "Pfeil und Atem",
    active: true,
    lines: [
      { text: "Sehne spannt sich still", codeword: "BOGEN" },
      { text: "Atem zählt den Augenblick", codeword: "AUGE" },
      { text: "Wir sind die Richtung", codeword: "RICHTUNG" },
    ],
  },
  {
    id: 27,
    theme: "Fundament gesetzt",
    active: true,
    lines: [
      { text: "Erste Steine tief", codeword: "TIEF" },
      { text: "Maßband sucht den Sonnenstand", codeword: "MASS" },
      { text: "Zukunft fasst nun Fuß", codeword: "FUSS" },
    ],
  },
  {
    id: 28,
    theme: "Zimmer wird Heim",
    active: true,
    lines: [
      { text: "Räume lauschen leis", codeword: "RAUM" },
      { text: "Schritte zeichnen weiche Bahn", codeword: "BAHN" },
      { text: "Atem nennt es Heim", codeword: "HEIM" },
    ],
  },
  {
    id: 33,
    theme: "Walzer im Arkadengang",
    active: true,
    lines: [
      { text: "Schritte kreisen mild", codeword: "KREISEN" },
      { text: "Walzer findet unsern Takt", codeword: "WALZER" },
      { text: "Schritt wird warmes Wir", codeword: "SCHRITT" },
    ],
  },
  {
    id: 34,
    theme: "Duett der Gedanken",
    active: true,
    lines: [
      { text: "Fragen treffen sich", codeword: "DIALOG" },
      { text: "Antworten hören zu sich", codeword: "RESONANZ" },
      { text: "Ein Gedanke singt", codeword: "DUETT" },
    ],
  },
  {
    id: 38,
    theme: "Donauwind & Fernsicht",
    active: true,
    lines: [
      { text: "Donauwind erzählt", codeword: "DONAU" },
      { text: "Hügel öffnen Wege weit", codeword: "HUEGEL" },
      { text: "Heute ruft der Blick", codeword: "BLICK" },
    ],
  },
];

// Secret salt for verification (the "single S")
export const SECRET_SALT = "GADERBAUER_HOCHZEIT_2025_SCHALLABURG_APFELHAIN";

// Get all lines as a flat array for easier processing (only active haikus)
export const getAllLines = () => {
  return haikus.filter((haiku) => haiku.active).flatMap((haiku) => haiku.lines);
};

// Get a specific haiku by ID (only active haikus)
export const getHaikuById = (id) => {
  return haikus.find((haiku) => haiku.id === id && haiku.active);
};

// Get only active haikus
export const getActiveHaikus = () => {
  return haikus.filter((haiku) => haiku.active);
};

// Get all haikus (active and inactive)
export const getAllHaikus = () => {
  return haikus;
};

// Get line by codeword (only from active haikus)
export const getLineByCodeword = (codeword) => {
  const allLines = getAllLines();
  return allLines.find((line) => line.codeword === codeword.toUpperCase());
};

// GENERATION VALIDATION - Always check these requirements for generate-cards.js
export const validateForGeneration = () => {
  const activeHaikus = getActiveHaikus();
  const allLines = getAllLines();
  const codewords = allLines.map((line) => line.codeword);
  const uniqueCodewords = new Set(codewords);

  const checks = {
    // 1. Exactly 16 active haikus (for 48 total cards)
    exactly16Haikus: {
      valid: activeHaikus.length === 16,
      actual: activeHaikus.length,
      expected: 16,
    },

    // 2. All active codewords are distinct
    allCodewordsDistinct: {
      valid: uniqueCodewords.size === codewords.length,
      totalCodewords: codewords.length,
      uniqueCodewords: uniqueCodewords.size,
      duplicates: codewords.filter(
        (item, index) => codewords.indexOf(item) !== index,
      ),
    },

    // 3. Each haiku has exactly 3 lines
    each3Lines: {
      valid: activeHaikus.every((haiku) => haiku.lines.length === 3),
      violations: activeHaikus.filter((haiku) => haiku.lines.length !== 3),
    },

    // 4. No missing data (text and codeword for each line)
    noMissingData: {
      valid: allLines.every((line) => line.text && line.codeword),
      violations: allLines.filter((line) => !line.text || !line.codeword),
    },
  };

  const allValid = Object.values(checks).every((check) => check.valid);

  return {
    checks,
    allValid,
    totalCards: activeHaikus.length * 3,
    summary: `Ready: ${allValid ? "YES" : "NO"} | Haikus: ${activeHaikus.length}/16 | Cards: ${activeHaikus.length * 3}/48`,
  };
};

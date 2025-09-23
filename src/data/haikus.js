// Wedding Haikus - German themed, romantic and celebratory
// Each haiku has 3 lines with associated codewords for verification

export const haikus = [
  {
    id: 1,
    lines: [
      { text: "Ringe glänzen hell", codeword: "GOLD" },
      { text: "Zwei Herzen schlagen als eins", codeword: "HERZ" },
      { text: "Ewige Liebe", codeword: "EWIG" }
    ]
  },
  {
    id: 2,
    lines: [
      { text: "Weiße Rosen blühn", codeword: "ROSE" },
      { text: "Im Garten der Träume süß", codeword: "TRAUM" },
      { text: "Hoffnung erblüht neu", codeword: "HOPE" }
    ]
  },
  {
    id: 3,
    lines: [
      { text: "Kirchenglocken läut'n", codeword: "BELL" },
      { text: "Melodie der großen Lieb'", codeword: "SONG" },
      { text: "Himmel jubiliert", codeword: "FREU" }
    ]
  },
  {
    id: 4,
    lines: [
      { text: "Brautkleid weht im Wind", codeword: "KLEID" },
      { text: "Seide tanzt mit Sonnenlicht", codeword: "TANZ" },
      { text: "Schönheit strahlt so rein", codeword: "LICHT" }
    ]
  },
  {
    id: 5,
    lines: [
      { text: "Champagner perlt auf", codeword: "PERL" },
      { text: "Kristallgläser klingen hell", codeword: "GLAS" },
      { text: "Auf das Glück mit euch", codeword: "PROST" }
    ]
  },
  {
    id: 6,
    lines: [
      { text: "Sterne leuchten warm", codeword: "STAR" },
      { text: "Über unserem Hochzeitstanz", codeword: "NACHT" },
      { text: "Magie liegt im Raum", codeword: "MAGIK" }
    ]
  },
  {
    id: 7,
    lines: [
      { text: "Versprechen erklingt", codeword: "WORT" },
      { text: "Treue bis zum letzten Tag", codeword: "TREU" },
      { text: "Seelen sind vereint", codeword: "EINS" }
    ]
  },
  {
    id: 8,
    lines: [
      { text: "Blütenmeer so weiß", codeword: "BLAU" },
      { text: "Duft erfüllt die warme Luft", codeword: "DUFT" },
      { text: "Frühling in den Herz'n", codeword: "MAI" }
    ]
  },
  {
    id: 9,
    lines: [
      { text: "Familien vereint", codeword: "BAND" },
      { text: "Alte Wurzeln, neue Zweig'", codeword: "BAUM" },
      { text: "Zukunft wächst empor", codeword: "WUCHS" }
    ]
  },
  {
    id: 10,
    lines: [
      { text: "Kerzenschein so warm", codeword: "KERZ" },
      { text: "Flammen tanzen sanft im Wind", codeword: "WIND" },
      { text: "Liebe brennt ewig", codeword: "FEUER" }
    ]
  },
  {
    id: 11,
    lines: [
      { text: "Hochzeitstorte süß", codeword: "TORTE" },
      { text: "Drei Etagen voller Glück", codeword: "DREI" },
      { text: "Süße Träume wahr", codeword: "SUESS" }
    ]
  },
  {
    id: 12,
    lines: [
      { text: "Violinen klingen", codeword: "GEIG" },
      { text: "Melodien der großen Lieb'", codeword: "MUSIK" },
      { text: "Herzen im Einklang", codeword: "KLANG" }
    ]
  },
  {
    id: 13,
    lines: [
      { text: "Fotograf hält fest", codeword: "FOTO" },
      { text: "Momente voller Zärtlichkeit", codeword: "ZART" },
      { text: "Erinnerung bleibt", codeword: "BLEIBT" }
    ]
  },
  {
    id: 14,
    lines: [
      { text: "Brautstrauß fliegt hoch", codeword: "STRAUSS" },
      { text: "Hoffnung schwebt durch warme Luft", codeword: "FLUG" },
      { text: "Glück findet neuen Ort", codeword: "FANG" }
    ]
  },
  {
    id: 15,
    lines: [
      { text: "Mondschein küsst sanft", codeword: "MOND" },
      { text: "Zwei Seelen unter Sternen", codeword: "ZWEI" },
      { text: "Unendlichkeit beginnt", codeword: "ANFANG" }
    ]
  }
];

// Secret salt for verification (the "single S")
export const SECRET_SALT = "GADERBAUER_HOCHZEIT_2025_LIEBE_EWIG";

// Get all lines as a flat array for easier processing
export const getAllLines = () => {
  return haikus.flatMap(haiku => haiku.lines);
};

// Get a specific haiku by ID
export const getHaikuById = (id) => {
  return haikus.find(haiku => haiku.id === id);
};

// Get line by codeword
export const getLineByCodeword = (codeword) => {
  const allLines = getAllLines();
  return allLines.find(line => line.codeword === codeword.toUpperCase());
};

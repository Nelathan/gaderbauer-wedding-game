#!/usr/bin/env node

import { getActiveHaikus, validateForGeneration } from "../src/data/haikus.js";
import fs from "fs";
import path from "path";

// Generate HTML for printable cards
const generateCardsHTML = () => {
  const activeHaikus = getActiveHaikus();
  const allLines = activeHaikus.flatMap((haiku) => haiku.lines);

  let html = `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Haiku Hochzeitskarten - Druckversion</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Crimson Text', serif;
            background: #f5f5f5;
            padding: 20px;
        }

        .cards-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10mm;
            max-width: 210mm; /* A4 width */
        }

        .card-container {
            display: flex;
            gap: 10mm;
            margin-bottom: 10mm;
        }

        .card {
            width: 60mm;
            height: 85mm; /* Standard business card size */
            background: linear-gradient(135deg, #fdf7f0 0%, #fbeee1 100%);
            border: 2px solid #e2844a;
            border-radius: 8px;
            page-break-inside: avoid;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 8mm;
        }

        .card-back {
            background: linear-gradient(135deg, #f0c299 0%, #e8a06d 100%);
        }

        .haiku-line {
            font-size: 14px;
            line-height: 1.4;
            color: #713729;
            font-style: italic;
            margin-bottom: 8px;
            text-align: center;
        }

        .card-number {
            font-size: 8px;
            color: #b05432;
            margin-top: auto;
            font-weight: 600;
        }

        .codeword {
            font-size: 18px;
            font-weight: 600;
            color: #713729;
            background: rgba(255, 255, 255, 0.7);
            padding: 6px 12px;
            border-radius: 4px;
            border: 2px solid #b05432;
            letter-spacing: 2px;
            font-family: 'Courier New', monospace;
        }

        .codeword-label {
            font-size: 10px;
            color: #713729;
            margin-bottom: 4px;
            font-weight: 600;
        }

        .wedding-info {
            font-size: 8px;
            color: #b05432;
            margin-top: auto;
            text-align: center;
            line-height: 1.2;
        }

        .decorative {
            position: absolute;
            font-size: 20px;
            opacity: 0.3;
        }

        .decorative.top-left { top: 5px; left: 5px; }
        .decorative.top-right { top: 5px; right: 5px; }
        .decorative.bottom-left { bottom: 5px; left: 5px; }
        .decorative.bottom-right { bottom: 5px; right: 5px; }

        @media print {
            body { background: white; }
            .cards-container {
                gap: 5mm;
            }
            .card {
                box-shadow: none;
                border: 1px solid #e2844a;
            }
        }

        .page-break {
            page-break-before: always;
        }

        .instructions {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 2px solid #e2844a;
        }

        .instructions h2 {
            color: #b05432;
            margin-bottom: 10px;
        }

        .instructions p {
            margin-bottom: 8px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="instructions">
        <h2>🌸 Haiku Hochzeitsspiel - Druckanleitung 🌸</h2>
        <p><strong>Druckeinstellungen:</strong></p>
        <ul>
            <li>Papier: A4 (210mm x 297mm)</li>
            <li>Ausrichtung: Hochformat</li>
            <li>Ränder: Minimal (5mm)</li>
            <li>Qualität: Hoch (für beste Lesbarkeit)</li>
        </ul>
        <p><strong>Nach dem Drucken:</strong></p>
        <ul>
            <li>Jede Karte ausschneiden (60mm x 85mm)</li>
            <li>Optional: Auf dickerem Papier (200g/m²) drucken</li>
            <li>Die Karten werden automatisch nummeriert für einfache Verteilung</li>
        </ul>
        <p><strong>Spiel-URL:</strong> <a href="https://nelathan.github.io/gaderbauer-wedding-game/">https://nelathan.github.io/gaderbauer-wedding-game/</a></p>
    </div>

    <div class="cards-container">
`;

  allLines.forEach((line, index) => {
    const cardNumber = index + 1;

    html += `
      <div class="card-container">
        <div class="card card-front">
            <div class="decorative top-left">🌸</div>
            <div class="decorative top-right">💕</div>

            <div class="haiku-line">${line.text}</div>

            <div class="decorative bottom-left">✨</div>
            <div class="decorative bottom-right">🌸</div>

            <div class="card-number">
                Karte ${cardNumber}
            </div>
        </div>

        <div class="card card-back">
            <div class="decorative top-left">💒</div>
            <div class="decorative top-right">💍</div>

            <div class="codeword-label">CODEWORT</div>
            <div class="codeword">${line.codeword}</div>

            <div class="wedding-info">
                Daniel & Astrid<br>
                27.09.2025
            </div>

            <div class="decorative bottom-left">🥂</div>
            <div class="decorative bottom-right">💒</div>
        </div>
      </div>
    `;

    // Add page break every 3 cards (3x1 grid)
    if ((index + 1) % 3 === 0 && index < allLines.length - 1) {
      html += `</div><div class="page-break"></div><div class="cards-container">`;
    }
  });

  html += `
    </div>

    <div class="page-break"></div>

    <div class="instructions">
        <h2>📋 Spielanleitung für die Gäste</h2>
        <ol>
            <li><strong>Karte erhalten:</strong> Jeder Gast bekommt eine Karte mit einer Haiku-Zeile</li>
            <li><strong>Partner finden:</strong> Sucht zwei andere Gäste, deren Zeilen zu einem Haiku passen</li>
            <li><strong>Codewörter sammeln:</strong> Notiert euch die drei Codewörter von den Kartenrückseiten</li>
            <li><strong>Website besuchen:</strong> Geht zur Spiel-Website (QR-Code oder Link)</li>
            <li><strong>Eingabe:</strong> Gebt die drei Codewörter in der richtigen Reihenfolge ein</li>
            <li><strong>Erfolg:</strong> Bei richtiger Kombination wird das komplette Haiku angezeigt! 🎉</li>
        </ol>

        <p><strong>Tipp:</strong> Achtet auf die thematischen Verbindungen der Zeilen!</p>

        <h3>📊 Spielstatistik</h3>
        <p>• ${activeHaikus.length} Haikus insgesamt<br>
        • ${allLines.length} Karten für ${allLines.length} Gäste<br>
        • ${activeHaikus.length} mögliche Lösungen<br>
        • Themen aus 14 Jahren Daniel & Astrid</p>
    </div>
</body>
</html>
  `;

  return html;
};

// Generate markdown list for easy reference
const generateMarkdownList = () => {
  let markdown = `# 🌸 Haiku Hochzeitsspiel - Lösungsliste\n\n`;
  markdown += `*Diese Datei ist nur für das Brautpaar gedacht!*\n\n`;
  markdown += `**Hochzeit:** Daniel & Astrid • 27.09.2025 • Schallaburg\n\n`;
  markdown += `## 📋 Spielanleitung für die Gäste\n\n`;
  markdown += `1. **Karte erhalten:** Jeder Gast bekommt eine Karte mit einer Haiku-Zeile\n`;
  markdown += `2. **Partner finden:** Sucht zwei andere Gäste, deren Zeilen zu einem Haiku passen\n`;
  markdown += `3. **Codewörter sammeln:** Notiert euch die drei Codewörter von den Kartenrückseiten\n`;
  markdown += `4. **Website besuchen:** Geht zur Spiel-Website (QR-Code oder Link)\n`;
  markdown += `5. **Eingabe:** Gebt die drei Codewörter in der richtigen Reihenfolge ein\n`;
  markdown += `6. **Erfolg:** Bei richtiger Kombination wird das komplette Haiku angezeigt! 🎉\n\n`;
  markdown += `---`;

  getActiveHaikus().forEach((haiku, index) => {
    markdown += `\n\n## ${index + 1}. ${haiku.theme}\n\n`;
    haiku.lines.forEach((line) => {
      markdown += `| \`${line.codeword}\` | ${line.text} |\n`;
    });
  });

  return markdown;
};

// Main execution
const main = () => {
  try {
    // Validate haiku collection before generation
    console.log("🔍 Validating haiku collection...");
    const validation = validateForGeneration();

    if (!validation.allValid) {
      console.error("❌ Validation failed!");
      console.error(validation.summary);
      Object.entries(validation.checks).forEach(([key, check]) => {
        if (!check.valid) {
          console.error(`   • ${key}: FAILED`);
          if (check.duplicates?.length > 0) {
            console.error(
              `     Duplicates: ${[...new Set(check.duplicates)].join(", ")}`,
            );
          }
          if (check.violations?.length > 0) {
            console.error(`     Violations: ${check.violations.length} items`);
          }
          if (check.actual !== undefined) {
            console.error(
              `     Got: ${check.actual}, Expected: ${check.expected}`,
            );
          }
        }
      });
      process.exit(1);
    }

    console.log("✅ Validation passed!");
    console.log(validation.summary);
    console.log();

    // Create output directory
    const outputDir = path.join(process.cwd(), "cards-output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Generate HTML for printing
    const cardsHTML = generateCardsHTML();
    fs.writeFileSync(path.join(outputDir, "haiku-cards.html"), cardsHTML);

    // Generate markdown reference
    const markdownList = generateMarkdownList();
    fs.writeFileSync(path.join(outputDir, "haiku-solutions.md"), markdownList);

    // Generate JSON for digital use
    const jsonData = {
      generated: new Date().toISOString(),
      wedding: {
        couple: "Daniel & Astrid",
        date: "27.09.2025",
        gameUrl: "https://nelathan.github.io/gaderbauer-wedding-game/",
      },
      statistics: {
        totalHaikus: getActiveHaikus().length,
        totalCards: getActiveHaikus().length * 3,
        totalGuests: getActiveHaikus().length * 3,
      },
      haikus: getActiveHaikus(),
    };
    fs.writeFileSync(
      path.join(outputDir, "haiku-data.json"),
      JSON.stringify(jsonData, null, 2),
    );

    console.log("✅ Karten erfolgreich generiert!");
    console.log(`📁 Ausgabe in: ${outputDir}`);
    console.log("📄 Dateien:");
    console.log("   • haiku-cards.html (Druckversion für Browser)");
    console.log("   • haiku-solutions.md (Lösungsliste für Brautpaar)");
    console.log("   • haiku-data.json (Daten im JSON-Format)");
    console.log("");
    console.log("🖨️  Zum Drucken: Öffnet haiku-cards.html im Browser");
    console.log("📱 Für mobile Ansicht: Responsive Design inklusive");
    console.log("");
    console.log(
      `🎯 Insgesamt ${getActiveHaikus().length * 3} Karten für ${getActiveHaikus().length * 3} Gäste`,
    );
    console.log(
      `✨ ${getActiveHaikus().length} verschiedene Haikus zu entdecken`,
    );
    console.log(`🏰 Themen aus 14 Jahren Daniel & Astrid Geschichte`);
  } catch (error) {
    console.error("❌ Fehler beim Generieren der Karten:", error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateCardsHTML, generateMarkdownList };

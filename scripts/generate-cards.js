#!/usr/bin/env node

import { haikus } from "../src/data/haikus.js";
import fs from "fs";
import path from "path";

// Generate HTML for printable cards
const generateCardsHTML = () => {
  const allLines = haikus.flatMap((haiku) => haiku.lines);

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

        .card {
            width: 60mm;
            height: 85mm; /* Standard business card size */
            background: linear-gradient(135deg, #fdf7f0 0%, #fbeee1 100%);
            border: 2px solid #e2844a;
            border-radius: 8px;
            page-break-inside: avoid;
            position: relative;
            overflow: hidden;
        }

        .card-front, .card-back {
            width: 100%;
            height: 100%;
            padding: 8mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
        }

        .card-back {
            transform: rotateY(180deg);
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
            .cards-container { gap: 5mm; }
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
        <p><strong>Spiel-URL:</strong> <em>Wird nach Deployment eingefügt</em></p>
    </div>

    <div class="cards-container">
`;

  allLines.forEach((line, index) => {
    const cardNumber = index + 1;
    const haikuNumber = Math.floor(index / 3) + 1;
    const lineNumber = (index % 3) + 1;

    html += `
        <div class="card">
            <div class="card-front">
                <div class="decorative top-left">🌸</div>
                <div class="decorative top-right">💕</div>

                <div class="haiku-line">${line.text}</div>

                <div class="decorative bottom-left">✨</div>
                <div class="decorative bottom-right">🌸</div>

                <div class="card-number">
                    Karte ${cardNumber} | Haiku ${haikuNumber}.${lineNumber}
                </div>
            </div>

            <div class="card-back">
                <div class="decorative top-left">💒</div>
                <div class="decorative top-right">💍</div>

                <div class="codeword-label">CODEWORT</div>
                <div class="codeword">${line.codeword}</div>

                <div class="wedding-info">
                    Daniel & Astrid<br>
                    27.09.2025<br>
                    Haiku ${haikuNumber} • Zeile ${lineNumber}
                </div>

                <div class="decorative bottom-left">🥂</div>
                <div class="decorative bottom-right">💒</div>
            </div>
        </div>
    `;

    // Add page break every 9 cards (3x3 grid)
    if ((index + 1) % 9 === 0 && index < allLines.length - 1) {
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
        <p>• ${haikus.length} Haikus insgesamt<br>
        • ${allLines.length} Karten für ${allLines.length} Gäste<br>
        • ${haikus.length} mögliche Lösungen<br>
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

  haikus.forEach((haiku, index) => {
    markdown += `## Haiku ${index + 1} - ${haiku.theme}\n\n`;
    haiku.lines.forEach((line, lineIndex) => {
      markdown += `**Zeile ${lineIndex + 1}:** "${line.text}" → \`${line.codeword}\`\n\n`;
    });
    markdown += `**Vollständiges Haiku:**\n`;
    haiku.lines.forEach((line) => {
      markdown += `> ${line.text}\n`;
    });
    markdown += `\n---\n\n`;
  });

  return markdown;
};

// Main execution
const main = () => {
  try {
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
        gameUrl: "https://yourusername.github.io/gaderbauer-wedding-game/",
      },
      statistics: {
        totalHaikus: haikus.length,
        totalCards: haikus.length * 3,
        totalGuests: haikus.length * 3,
      },
      haikus: haikus,
    };
    fs.writeFileSync(path.join(outputDir, "haiku-data.json"), JSON.stringify(jsonData, null, 2));

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
    console.log(`🎯 Insgesamt ${haikus.length * 3} Karten für ${haikus.length * 3} Gäste`);
    console.log(`✨ ${haikus.length} verschiedene Haikus zu entdecken`);
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

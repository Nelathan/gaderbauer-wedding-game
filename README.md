# 🌸 Haiku Hochzeitsspiel 🌸

Ein interaktives Hochzeitsspiel für Daniel & Astrid's Hochzeit am 27.09.2025

## 📝 Spielprinzip

Jeder Gast erhält eine Karte mit:
- **Vorderseite**: Eine Zeile eines Haikus
- **Rückseite**: Ein Codewort zur Verifikation

**Ziel**: Kombiniere drei Karten, um ein vollständiges Haiku zu bilden!

## 🎯 Wie gespielt wird

1. **Karten sammeln**: Finde zwei andere Gäste mit passenden Haiku-Zeilen
2. **Codewörter notieren**: Schreibt euch die drei Codewörter von den Kartenrückseiten auf
3. **Website besuchen**: Geht zu der Spiel-Website
4. **Eingabe**: Gebt die drei Codewörter in der richtigen Reihenfolge ein
5. **Erfolg**: Bei richtiger Kombination wird das komplette Haiku angezeigt! 🎉

## 🚀 Für Entwickler

### Tech Stack
- **Vue.js 3** (Composition API)
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **CryptoJS** (SHA-256 Verifikation)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Deployment

Das Spiel wird automatisch über GitHub Actions auf GitHub Pages deployed:
- **URL**: `https://yourusername.github.io/gaderbauer-wedding-game/`
- **Trigger**: Push auf `main` oder `master` Branch

## 🔧 Spielmechanik

### Verifikation
- Jede gültige Haiku-Kombination wird über SHA-256 Hash verifiziert
- **Hash-Input**: `CODEWORT1 + CODEWORT2 + CODEWORT3 + SECRET_SALT`
- Keine Lösungsdatei im Frontend - nur Hashes zum Abgleich

### Brute-Force Schutz
- **10 Sekunden Timeout** nach falscher Eingabe
- Timeout wird in `localStorage` gespeichert (browserbasiert)
- Verhindert schnelles Durchprobieren aller Kombinationen

### Features
- ✨ **Deutsche Benutzeroberfläche**
- 🎨 **Hochzeits-Design** mit warmen Farben
- 📱 **Responsive Design** (Mobile & Desktop)
- ⏰ **Timeout-System** mit Countdown
- 🎉 **Erfolgs-Animation** bei richtiger Lösung
- 📊 **Versuchszähler**

## 📊 Spielstatistiken

- **16 Haikus** mit je 3 Zeilen
- **48 Karten** für die Gäste
- **16 gültige Kombinationen**
- Jedes Haiku hat ein eigenes thematisches Motiv aus eurer 14-jährigen Geschichte

## 🎨 Haiku Themen

Die Haikus reflektieren authentische Themen eurer Geschichte:
- Burgmauern & Ewigkeit (Schallaburg)
- Herbstgold & Neubeginn (September)
- Alchemie & Verwandlung (Braukunst)
- Zielgenauigkeit (Bogenschießen)
- Kindheit & Weitergabe (Theodor)
- Sprache & Präzision (linguistische Klarheit)
- Handwerk & Zukunftsbau (Daniels Projekte)

## 📱 Browser-Kompatibilität

- ✅ Chrome/Edge (modern)
- ✅ Firefox (modern)
- ✅ Safari (iOS/macOS)
- ✅ Mobile Browser

## 🔒 Sicherheit

- **Keine Lösungen** im Frontend-Code
- **Hash-basierte Verifikation**
- **Rate Limiting** durch Timeout
- **Client-side only** - keine Server-Abhängigkeiten

## 💝 Für das Brautpaar

Viel Spaß beim Spiel! Die Haikus sind mit Liebe geschrieben und spiegeln die Magie eurer besonderen Verbindung wider.

**Daniel & Astrid** 
*27. September 2025*

---

*Mit besten Wünschen für einen unvergesslichen Hochzeitstag!* 🥂
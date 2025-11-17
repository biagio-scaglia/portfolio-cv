# Portfolio CV - Windows 7 Style

Un portfolio interattivo ispirato all'interfaccia Windows 7, costruito con React e TypeScript.

## 🌐 Live Demo

[Visita il sito live](https://biagio-scaglia.github.io/portfolio-cv)

## ✨ Caratteristiche

- **Interfaccia Windows 7**: Design autentico ispirato a Windows 7 con effetti glass e animazioni
- **Finestre interattive**: Sistema di finestre con funzionalità di minimizzazione, massimizzazione e ridimensionamento
- **Slideshow sfondi**: Sistema automatico per cambiare gli sfondi del desktop con controllo personalizzabile
- **Responsive Design**: Ottimizzato per desktop, tablet e dispositivi mobili
- **Boot Screen**: Schermata di avvio con animazioni e suoni
- **Taskbar funzionale**: Barra delle applicazioni con gestione delle finestre aperte
- **Form contatti**: Form di contatto simulativo integrato
- **Gestione documenti**: Visualizzazione di PDF e immagini
- **Player musicale**: Lettore audio integrato

## 🛠️ Tecnologie

- **React 19** con TypeScript
- **Vite** - Build tool moderno e veloce
- **7.css** - Framework CSS per Windows 7 UI
- **Font Awesome** - Icone
- **Howler.js** - Gestione audio avanzata
- **GitHub Pages** - Hosting

## 📦 Installazione

```bash
# Clona il repository
git clone https://github.com/biagio-scaglia/portfolio-cv.git

# Entra nella directory
cd portfolio-cv

# Installa le dipendenze
npm install
```

## 🚀 Script Disponibili

```bash
# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview del build di produzione
npm run preview

# Deploy su GitHub Pages
npm run deploy
```

## 📁 Struttura del Progetto

```
portfolio-cv/
├── src/
│   ├── components/       # Componenti React
│   │   ├── Window.tsx    # Componente finestra base
│   │   ├── BootScreen.tsx
│   │   ├── StartMenu.tsx
│   │   └── ...
│   ├── assets/           # Risorse (immagini, suoni, PDF)
│   ├── App.tsx           # Componente principale
│   └── main.tsx          # Entry point
├── public/
└── package.json
```

## 🎨 Funzionalità Principali

### Finestre
- Drag & drop per spostare le finestre
- Ridimensionamento tramite bordi
- Minimizzazione e ripristino dalla taskbar
- Massimizzazione a schermo intero
- Gestione z-index per finestre sovrapposte

### Desktop
- Icone trascinabili sul desktop
- Slideshow automatico degli sfondi
- Selezione manuale degli sfondi
- Responsive layout per mobile e tablet

### Taskbar
- Pulsanti per le finestre aperte
- Indicatore di stato attivo
- Gestione finestre minimizzate
- Orologio in tempo reale

## 📱 Responsive

Il progetto è completamente responsive e ottimizzato per:
- **Desktop**: Layout completo con tutte le funzionalità
- **Tablet**: Layout adattato con griglia icone
- **Mobile**: Interfaccia ottimizzata per touch

## 🚢 Deploy

Il progetto è configurato per il deploy automatico su GitHub Pages:

```bash
npm run deploy
```

Il sito sarà disponibile su: `https://biagio-scaglia.github.io/portfolio-cv`

## 📝 Licenza

Questo progetto è privato.

## 👤 Autore

**Biagio Scaglia**

- Portfolio: [GitHub Pages](https://biagio-scaglia.github.io/portfolio-cv)
- GitHub: [@biagio-scaglia](https://github.com/biagio-scaglia)

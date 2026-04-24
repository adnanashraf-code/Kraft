# KRAFT 🪐 | Absolute Interaction Engine v2.0

![KRAFT Banner](file:///C:/Users/Adnan/.gemini/antigravity/brain/b4723657-04b8-4612-89cc-19d971ab2147/kraft_hero_banner_1776893849874.png)

**KRAFT** is a high-fidelity, state-driven visual interaction engine designed for creative teams who demand bold aesthetics and absolute structural control. Built on a Neo-Brutalist design philosophy, KRAFT bridges the gap between raw creative intent and pixel-perfect production reality.

---

## ⚡ Core Philosophy: Design Beyond Compromise

KRAFT isn't just a tool; it's a rebellion against the "boring" web. We prioritize:
- **Neo-Brutalist Aesthetics**: High-contrast HSL palettes, solid shadows, and bold typography (Outfit, Inter, Editorial).
- **Absolute Interaction**: Every element is a live node in a state-driven logic tree.
- **State-Driven Integrity**: Powered by a high-performance Zustand engine for zero-latency workspace hydration.
- **Cyber-Vault Infrastructure**: Instant access to 10k+ assets, fonts, and brand logos.

---

## 🛠️ System Modules

### 1. The Design Studio
The heartbeat of KRAFT. A high-fidelity canvas featuring:
- **Dynamic Layering**: Non-destructive hierarchy management.
- **Magnetic Guides**: Real-time alignment for geometric precision.
- **Universal Toolbar**: Quick-access shapes, text engines, and asset injectors.

### 2. Cloud Hub (Cyber-Vault)
A premium dashboard serving as a centralized asset repository:
- **10,000+ Icons**: Integrated `lucide-react` and `simple-icons` lookup.
- **100+ Curated Fonts**: Professional typography selection.
- **AI-Generated Fuel**: 20+ specialized assets for rapid prototyping.
- **Auto-Purge Logic**: Optimized 12-hour asset lifecycle management with toggleable controls.

### 3. System BIOS & Control Center
A deep-level configuration modal for hardware-level control:
- **Animation Speed**: Global control over UI transitions.
- **GPU Acceleration**: Toggleable performance modes.
- **Workspace Prefs**: Custom grid sizes and snapping sensitivity.

### 4. The Manifesto
An integrated design philosophy section that defines the KRAFT ethos: "Kill the Boring." It features interactive Neo-Brutalist cards and high-impact typography.

---

## 📂 Project Architecture

### System Flow & Engine Logic
KRAFT is built on a **Modular State Engine** architecture. Every user interaction is normalized into a state update, which then drives the synchronized rendering of the canvas and the asset pipeline.

```mermaid
graph LR
    subgraph "Input Layer"
        UI[User Interaction]
        BIOS[System BIOS Config]
    end

    subgraph "The Brain (Central Store)"
        Store{{"Zustand Global State"}}
        History[Undo/Redo Stack]
        Persist[(Local Storage)]
    end

    subgraph "Asset Pipeline"
        Vault[Cloud Vault]
        Icons[10k+ Icon Resolver]
        Fonts[Font Streamer]
    end

    subgraph "Rendering Engine"
        Canvas[Virtual Canvas]
        DOM[Optimized DOM]
    end

    UI --> Store
    BIOS --> Store
    Store <--> History
    Store <--> Persist
    
    Vault --> Store
    Icons --> Store
    Fonts --> Store

    Store --> Canvas
    Canvas --> DOM
    DOM --> Export[Production Code Export]
```

### Directory Breakdown
```bash
KRAFT/
├── public/              # Static hardware assets & manifest
├── src/
│   ├── app/
│   │   └── routes/      # Main entry points (Landing, Studio, Docs, Dashboard)
│   ├── assets/          # Raw images, SVG shapes, and brand logos
│   ├── components/
│   │   ├── canvas/      # The Viewport: Rulers, Grids, and Element rendering
│   │   ├── common/      # System UI: BIOS Modals, Identity system, Buttons
│   │   ├── dashboard/   # The Hub: Cloud Vault, Project cards, Templates
│   │   ├── editor/      # Workspace: Property panels, Toolbars, Sidebars
│   │   ├── landing/     # Marketing: Manifesto, Feature sections, CTA
│   │   └── layout/      # Framework: Global Nav, Footer, Command Center
│   ├── data/            # Static configuration & system constants
│   ├── hooks/           # Performance-tuned React hooks (Events, Sizing)
│   ├── store/           # Zustand Engine: Global state & history logic
│   ├── theme/           # Neo-Brutalist design tokens & color palettes
│   ├── utils/           # Helper logic: Icon resolvers, Math, Export logic
│   ├── App.jsx          # Root Router & Global Providers
│   └── index.css        # The Design System: Tailwind + Custom Keyframes
├── tailwind.config.js   # Master Theme Configuration
└── vite.config.js       # High-performance Build Pipeline
```

---

## 🚀 Tech Stack

- **Core**: React 18 + Vite
- **State**: Zustand (with Persist Middleware)
- **Styling**: Tailwind CSS + `tailwindcss-animate`
- **Icons**: Lucide React + Simple Icons
- **Fonts**: Google Fonts (Outfit, Inter) + Custom Editorial
- **Animations**: Optimized CSS Keyframes & Tailwind Transitions

---

## 🏁 Getting Started

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Launch Dev Engine**:
   ```bash
   npm run dev
   ```

3. **Open Studio**:
   Navigate to `localhost:5173` and click **Launch Studio**.

---

## 🗺️ Development Roadmap

### ✅ Completed
- [x] **Neo-Brutalist Design System**: Solid shadows, high-contrast HSL.
- [x] **Cloud Vault v2.0**: 10k+ assets with instant search.
- [x] **System BIOS**: Interactive hardware acceleration controls.
- [x] **Manifesto Section**: High-impact marketing integration.
- [x] **Full Responsiveness**: Optimized for all device classes.

### 🚧 In Progress
- [ ] **Advanced Layering**: Multi-select and grouping logic.
- [ ] **Magnetic Guides**: Real-time alignment assistance.
- [ ] **Asset Marketplace**: Community contribution engine.

---

*Built with Absolute Precision by the KRAFT Team*


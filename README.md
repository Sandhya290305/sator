# 🎮 SATOR – Interactive Excel & PowerPoint Learning Game

![SATOR Logo](./public/assets/generated/app-icon-transparent.dim_256x256.png)

## 📖 Overview

**SATOR** is an immersive, gamified learning experience that teaches Excel and PowerPoint skills through **scenario-based real-world business challenges**. Instead of traditional multiple-choice questions, players perform actual Excel formulas, data analysis, chart creation, and PowerPoint presentations within realistic workplace contexts. The game features a dramatic **blood red visual theme** with dark contrasting backgrounds, red glowing effects, and neon animations, creating an engaging and memorable learning environment.

Built as a standalone **desktop application** for Windows using Electron, SATOR delivers 7 progressive levels with 10 tasks each, combining education with entertainment through interactive simulations, dynamic scoring, and contextual hints.

---

## ✨ Features

- 🎯 **7 Levels × 10 Tasks** – 70 comprehensive learning challenges covering Excel formulas, data analysis, formatting, PowerPoint slide creation, and business presentations
- ⏱️ **Extended Timer System** – Red animated countdown timers with visual warnings and proper flow continuity between tasks
- 🎲 **Two-Attempt Validation** – Accurate attempt tracking with visual feedback, automatic tutorials after second failure, and dynamic scoring
- 💡 **Manual Hint System** – On-demand scenario-contextual guidance explaining both technical steps and business reasoning
- 📊 **Data-Based Scenarios** – Real-world business contexts with structured datasets (sales figures, employee records, financial data, project timelines)
- 🔊 **Audio Feedback** – Success, error, and tick sound effects generated via Web Audio API
- 🩸 **Blood Red Theme** – Dramatic visual design with dark backgrounds, red glowing shadows, neon effects, and metallic SATOR branding
- 💾 **Offline Capability** – Complete functionality without internet connection, perfect for standalone use
- 🖥️ **Desktop .exe Version** – Packaged as "SATOR Setup.exe" Windows installer with auto-launch and custom icon
- 🎨 **Interactive Simulations** – Real Excel spreadsheet interface and PowerPoint slide creation with live validation
- 🏆 **Progressive Difficulty** – Sequential task completion requirements with locked progression until success
- 📚 **Automatic Tutorials** – Step-by-step guidance with video content triggered after failed attempts

---

## 🚀 Installation

### For Developers

1. **Download or Clone the Repository**
   ```bash
   git clone <repository-url>
   cd sator
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Run Locally (Development Mode)**
   ```bash
   pnpm run dev
   ```
   The application will open in your browser at `http://localhost:3000`

4. **Build Desktop Version (Windows Installer)**
   ```bash
   pnpm run make
   ```
   This generates `SATOR Setup.exe` in the `/frontend/out/make` directory

### For Judges & End Users

1. **Download** the `SATOR Setup.exe` installer file
2. **Run** the installer – it will automatically install the application
3. **Launch** – The game opens automatically after installation
4. **Play Offline** – No internet connection required!

The installer creates a desktop shortcut and Start Menu entry for easy access.

---

## 🎮 Gameplay Instructions

### Getting Started
1. Launch SATOR from your desktop or Start Menu
2. Select a level from the main menu (levels unlock progressively)
3. Read the scenario-based task description carefully
4. Perform the required Excel or PowerPoint actions in the simulation interface

### Excel Tasks
- **Enter Data**: Click cells and type values or formulas
- **Create Formulas**: Use Excel functions like `=SUM()`, `=AVERAGE()`, `=IF()`, etc.
- **Format Cells**: Apply number formatting, colors, and styles
- **Create Charts**: Build visualizations from your data
- **Validate**: The system checks your work automatically

### PowerPoint Tasks
- **Add Slides**: Create new slides using the template
- **Insert Text**: Click text boxes and type content
- **Add Shapes**: Use shape tools to create diagrams
- **Insert Images**: Place images on slides
- **Format**: Apply colors, fonts, and styles

### Using the Hint System
- Click the **"Hint"** button when you need help
- Hints provide step-by-step guidance without affecting your score
- You can access hints multiple times per task
- Hints explain both technical steps and business reasoning

### Progression & Scoring
- ✅ **First Attempt Success**: Full points awarded
- ⚠️ **Second Attempt Success**: Reduced points
- ❌ **Second Attempt Failure**: Automatic tutorial display
- 🔒 **Locked Tasks**: Complete current task to unlock the next
- 🏆 **Level Completion**: Finish all 10 tasks to advance

---

## 🛠️ Technologies Used

- **Backend**: Motoko (Internet Computer blockchain)
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with OKLCH color system
- **Desktop**: Electron with Electron Forge
- **Authentication**: Internet Identity (optional)
- **State Management**: React Query + Zustand
- **UI Components**: Shadcn/ui (Radix primitives)
- **Icons**: Lucide React + React Icons
- **Audio**: Web Audio API

---

## 📁 Folder Structure


# 🧠 Quiz One-Two-Three

An interactive, gamified trivia application built with **React.js** and **Vite**. This project challenges users with dynamic questions fetched from the [OpenTDB API](https://opentdb.com/), featuring persistent game states, a smart difficulty system, and playful DOM manipulations.

🚀 **Live Demo:** [[https://quizappbase-faniasv.vercel.app/]]

## ✨ Key Features

### 1. 🎮 Dynamic Gameplay Loop
- **Smart Difficulty Selection:** Users can choose between **Easy**, **Medium**, and **Hard**. The UI adapts to the selection with distinct color coding (Green/Yellow/Red).
- **Timer System:** A 60-second countdown adds pressure. The game auto-submits when time runs out.
- **Scoring Logic:** Reward system (+10 points) for correct answers and penalties (-5 points) for wrong ones.

### 2. 💾 Smart Resume (State Persistence)
- **Auto-Save:** Uses `localStorage` to save the user's progress (current question, score, timer) in real-time.
- **Seamless Resume:** If the user refreshes the page or closes the tab, they can pick up exactly where they left off without losing progress.

### 3. 🪄 The "Chasing Button" (Playful UX)
- **Interactive Penalty:** If a user fails the quiz (score < 75), the "Try Again" button becomes elusive and actively runs away from the cursor using **DOM manipulation** and coordinate randomization.
- **Responsive Logic:** The button calculates the window boundaries to ensure it never disappears off-screen.

### 4. 💅 Micro-Interactions & Feedback
- **Cinematic Loading:** "Jarvis" style loading messages with simulated delays for a smoother user experience.
- **Visual Feedback:** - Buttons indicate **"Preparing..."** states when fetching data.
    - Non-selected buttons become transparent/muted while loading, guiding user focus.
- **Celebration Mode:** A custom CSS-based **Confetti Animation** triggers upon passing the quiz (Score ≥ 75).

---

## 🛠️ Tech Stack

- **Framework:** React.js (Vite)
- **Styling:** CSS3 (Custom Animations `@keyframes`, Grid/Flexbox, Responsive Design)
- **API:** Open Trivia DB (Axios)
- **State Management:** React `useState`, `useEffect`
- **Deployment:** Vercel

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── LevelSelection.jsx  # Difficulty selection with dynamic loading states & opacity logic
│   ├── Login.jsx           # User entry point with "Enter" key support & fake loading
│   ├── Quiz.jsx            # Main game display & question rendering
│   └── Result.jsx          # Score board, chasing button logic, & confetti animation
├── App.jsx                 # Main Game Logic, Routing State, & LocalStorage handler
├── App.css                 # Global Styles & Animations
└── main.jsx

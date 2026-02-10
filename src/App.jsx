import React, { useEffect, useState } from 'react'
import axios from 'axios' // Library utk request ke server
import './App.css'

// Import constants dan hooks
import { QUIZ_STATES } from './utils/constants';
import { useQuiz } from './hooks/useQuiz';

import Login from './components/Login.jsx';
import LevelSelection from './components/LevelSelection';
import Quiz from './components/Quiz.jsx';
import Result from './components/Result';

function App() {
  const {
    // State
    quizState, username, setUsername,
    questions, currentIndex, score, correctCount, wrongCount,
    loading, timeLeft, difficulty,

    // Fungsi
    handleLoginTransition, handleLevelSelect, handleAnswer, handleRestart
  } = useQuiz();

  // --- BAGIAN TAMPILAN (UI) ---
  return (
    <div className="app">
      {/* LOGIC PINDAH HALAMAN (CONDITIONAL RENDERING) */}
      {/* QuizState adalah 'login', tampilkan ini: */}
      {quizState === QUIZ_STATES.LOGIN && (
        <Login 
          username={username} 
          setUsername={setUsername} 
          handleStart={handleLoginTransition}
          loading={loading} 
        />
      )}

      {/* Level Selection  */}
      {quizState === QUIZ_STATES.LEVEL_SELECTION && (
        <LevelSelection 
          username={username}
          onSelectLevel={handleLevelSelect} 
          loading={loading}
          currentLevel={difficulty}
        />
      )}

      {/* QuizState adalah 'playing', tampilkan ini: */}
      {quizState === QUIZ_STATES.PLAYING && questions.length > 0 && (
        <Quiz 
          username={username}
          timeLeft={timeLeft}
          currentIndex={currentIndex}
          questions={questions}
          handleAnswer={handleAnswer}
        />
      )}

      {/* QuizState adalah 'result', tampilkan ini: */}
      {quizState === QUIZ_STATES.RESULT && (
        <Result 
          username={username}
          score={score}
          correctCount={correctCount}
          wrongCount={wrongCount}
          handleRestart={handleRestart}
        />
      )}
    </div>
  )

}

export default App
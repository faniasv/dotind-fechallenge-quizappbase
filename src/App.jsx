import React, { useEffect, useState } from 'react'
import axios from 'axios' // Library utk request ke server
import './App.css'

// Import Tampilan dari components
import Login from './components/Login.jsx'
import LevelSelection from './components/LevelSelection'
import Quiz from './components/Quiz.jsx'
import Result from './components/Result'


function App() {
  // --- BAGIAN STATE (Variable) ---

  // 1. State utk mengatur halaman (Scene Management)
  // Nilai nanti bisa diisi: 'login', 'playing', 'result'
  const [quizState, setQuizState] = useState('login');

  // 2. State utk menyimpan username
  const [username, setUsername] = useState('');

  // 3. State utk menyimpan Data Quiz
  const [questions, setQuestions] = useState([]); // Menggunakan array utk simpan list soal
  const [currentIndex, setCurrentIndex] = useState(0) // Pointer soal sekarang (0, 1, 2, ...)
  const [correctCount, setCorrectCount] = useState(0); // Menghitung jumlah benar
  const [wrongCount, setWrongCount] = useState(0); // Menghitung jumlah salah
  const [score, setScore] = useState(0) // Menghitung jawaban yg benar
  const [loading, setLoading] = useState(false); // Status loading saat mengambil data

  // 4. State utk menyimpan Data Timer
  const [timeLeft, setTimeLeft] = useState(60);

  // 5. State utk memilih Level
  const [difficulty, setDifficulty] = useState('easy');

  // --- BAGIAN EFFECT ---
  
  // 1. Utk Resume (Krit H)
  useEffect(() => {
    const savedData = localStorage.getItem('quiz-save-v1');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUsername(parsed.username);
      setDifficulty(parsed.difficulty);
      setQuestions(parsed.questions);
      setCurrentIndex(parsed.currentIndex);
      setScore(parsed.score);
      setCorrectCount(parsed.correctCount || 0); // Load jawab benar
      setWrongCount(parsed.wrongCount || 0);     // Load jawab salah
      setTimeLeft(parsed.timeLeft);
      setQuizState(parsed.quizState);
    }
  }, []);

  // 2. Utk Autosave (Krit H)
  useEffect(() => {
    if (quizState === 'playing') {
      const dataToSave = {
        username,
        difficulty,
        questions,
        currentIndex,
        score,
        correctCount,
        wrongCount,
        timeLeft,
        quizState
      };
      localStorage.setItem('quiz-save-v1', JSON.stringify(dataToSave));
    }
  }, [questions, currentIndex, score, correctCount, wrongCount, timeLeft, quizState, username]);

  // 3. Timer (Krit E dan G)
  useEffect(() => {
    if (quizState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } 
    else if (timeLeft === 0 && quizState === 'playing') {
      setQuizState('result');
      localStorage.removeItem('quiz-save-v1'); 
    }
  }, [timeLeft, quizState]);
  
  // --- BAGIAN FUNGSI (logic) ---
  
  // 1. Fungsi utk Mengambil Soal dari API (Krit B)
  const fetchQuestions = async (selectedLevel) => {
    setLoading(true);
    try {
      // Req 10 soal pilihan ganda sesuai levelnyah
      const url = `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${selectedLevel}`;
      const res = await axios.get(url);

      // Data API utk memisahkan benar dan salah. Perlu digabung dan acak 
      const formattedQuestions = res.data.results.map((q) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        
        // Gabung correct sama incorrect terus diacak
        answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
      }));

      setQuestions(formattedQuestions);
      setQuizState('playing'); // Pindah scene ke quiz
      setCurrentIndex(0);
      setScore(0); // Reset skornya
      setCorrectCount(0);
      setWrongCount(0);
      setTimeLeft(60);
    } catch (err) {
      alert ("Failed to fect questions. Check internet question.");
      setQuizState('levelSelection');
    }
    setLoading(false);
  };

  // 2. Fungsi Start di Login
  const handleStart = () => {
    if(!username) return alert('Please enter your name!');
    fetchQuestions(); // Panggil fungsi utk ambil soal
  };

  // 3. Fungsi utk Handle Level
  const handleLevelSelect = (level) => {
    setDifficulty(level); // Simpan ke state
    fetchQuestions(level); // Panggil API sesuai level
  };

  // 4. Fungsi utk Cek Jawaban 
  const handleAnswer = (chosenAnswer) => {
    const currentQ = questions[currentIndex];

    // Utk cek benar atau salah
    if (chosenAnswer === currentQ.correct_answer) {
      setScore(score + 10);
      setCorrectCount(correctCount + 1);

    } else {
      setScore(score - 3);
      setWrongCount(wrongCount + 1);
    }

    // Utk cek apakah masih ada next soal?
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizState('result'); // Game Over -> ke result
      localStorage.removeItem('quiz-save-v1');
    }
  };

  // 5. Fungsi utk Restart 
  const handleRestart = () => {
    // 1. Balik ke 'login'
    setQuizState('login');

    // 2. Reset semua hitungan ke 0
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setCurrentIndex(0);
    setTimeLeft(60);
    localStorage.removeItem('quiz-save-v1');
  };

  // 6. Fungsi utk handle loading biar user ga "eh kok lama" terus tb tb JEDARRR
  const handleLoginTransition = () => {
    if (!username) return alert ('Please enter your name!');

    setLoading(true);

    // Tahan 1.5s
    setTimeout(() => {
      setLoading(false);
      setQuizState('levelSelection');
    }, 1500);

  };

  // --- BAGIAN TAMPILAN (UI) ---
  return (
    <div className="app">
      {/* LOGIC PINDAH HALAMAN (CONDITIONAL RENDERING) */}
      {/* QuizState adalah 'login', tampilkan ini: */}
      {quizState === 'login' && (
        <Login 
          username={username} 
          setUsername={setUsername} 
          handleStart={handleLoginTransition}
          loading={loading} 
        />
      )}

      {/* Level Selection  */}
      {quizState === 'levelSelection' && (
        <LevelSelection 
          username={username}
          onSelectLevel={handleLevelSelect} 
          loading={loading}
        />
      )}

      {/* QuizState adalah 'playing', tampilkan ini: */}
      {quizState === 'playing' && questions.length > 0 && (
        <Quiz 
          username={username}
          timeLeft={timeLeft}
          currentIndex={currentIndex}
          questions={questions}
          handleAnswer={handleAnswer}
        />
      )}

      {/* QuizState adalah 'result', tampilkan ini: */}
      {quizState === 'result' && (
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
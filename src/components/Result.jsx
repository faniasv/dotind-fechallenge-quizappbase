import React, {useState} from 'react';

const Result = ({ username, score, correctCount, wrongCount, handleRestart }) => {

  // Var utk cek skor memenuhi syarat (score >= 75)
  const isPassed = score >= 75;

  // Var state utk style posisi tombol "Coba lagi"
  // Awalnya diem, nanti bisa pindah-pindah wkwk
  const [buttonStyle, setButtonStyle] = useState({});
  const [isChasing, setIsChasing] = useState(false); // Cek apa mode kejar tombolnya aktif

  // --- Fungsi utk tombol kabur ke posisi acak ---
  const moveButton = (e) => {
    // Kabur kalo skornya jelek (tidak lulus)
    // Kalo lulus, gampang restart-nya
    if(!isPassed) {
      setIsChasing(true); // Aktifin mode kejar

      // Batas aman biar tombolnya ga keluar layar
      const maxTop = window.innerHeight - 100;
      const maxLeft = window.innerWidth - 150;

      // Acak posisi tombol
      const randomTop = Math.floor(Math.random() * maxTop);
      const randomLeft = Math.floor(Math.random() * maxLeft);

      setButtonStyle({
        position: 'fixed', // Biar bisa dipindah koordinatnya
        top: `${randomTop}px`,
        left: `${randomLeft}px`,
        width: 'auto',      
        minWidth: '150px',  
        padding: '15px 30px',
        transition: 'all 0.3s ease-out', // Biar animasinya mulus 
        transform: 'translate(-50%, -50%)', // Titik tenganya pas di kursor
        zIndex: 9999 // Biar tombol di atasnya teks 
      });
    }
  };

  // --- Fungsi utk ngasih confetti emoji (reward player) ---
  const renderConfetti = () => {
    return [...Array(30)].map((_, i) => (
      <div 
        key={i}
        className="confetti-piece"
        style={{
          left: `${Math.random() * 100}%`,
          animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          fontSize: `${Math.random() * 20 + 20}px`
        }}
      >
        {['🎉', '🎊', '⭐', '🏆'][Math.floor(Math.random() * 4)]}
      </div>
    ));
  };

  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden', minHeight: '450px' }}>
      
      {/* Hujan Confetti kalo player menang */}
      {isPassed && renderConfetti()}

      <div style={{ position: 'relative', zIndex: 5 }}>
        <h1>{isPassed ? "Congratulations, you win! 🥳" : "Oops! The answers were tricky today. Try again? 😜"}</h1>
        <p>Halo, {username}</p>
        
        <div className="score-board">
          <h2 style={{ color: isPassed ? '#2ecc71' : '#e74c3c' }}>
            Skor: {score}
          </h2>
          <p>Benar: {correctCount}</p>
          <p>Salah: {wrongCount}</p>
        </div>

        {/* Pesan iseng */}
        {!isPassed && isChasing && (
          <p style={{color: '#ff9f43', fontWeight: 'bold', marginTop: '10px'}}>
            Catch me if you can! 🏃‍♂️💨
          </p>
        )}

        {/* TOMBOL UTAMA */}
        <button 
          onClick={handleRestart}
          onMouseEnter={moveButton} 
          style={{ 
            marginTop: isChasing ? '0' : '20px', 
            ...buttonStyle 
          }}
        >
          {isPassed ? "One More Time?" : "Catch me!"}
        </button>
      </div>
    </div>
  );
};

export default Result;
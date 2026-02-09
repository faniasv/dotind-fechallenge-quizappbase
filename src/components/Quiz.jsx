import React from 'react';

const Quiz = ({ username, timeLeft, currentIndex, questions, handleAnswer }) => {
  const currentQuestion = questions[currentIndex];

  return (
    <div className="card">
      <div className="header-info">
        <span>Player: <b>{username}</b></span>
        <span style={{ color: timeLeft <= 10 ? '#ff4d4d' : '#2d3436' }}>
          Waktu: <b>{timeLeft}s</b>
        </span>
        <br />
        <span>Soal <b>{currentIndex + 1} / {questions.length}</b></span>
      </div>

      <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

      <div className="options-grid">
        {currentQuestion.answers.map((ans, idx) => (
          <button 
            key={idx} 
            className="option-btn"
            onClick={() => handleAnswer(ans)}
            dangerouslySetInnerHTML={{ __html: ans }}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
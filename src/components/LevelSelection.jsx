import React from 'react';

const LevelSelection = ({ onSelectLevel, username }) => {
    return (
        <div className="card">
            <h1>Select Difficulty</h1>
            <p>Ready, <b>(username)</b>? Choose your challenge!</p>

            <div classname="level-grid">
                {/* Utk memilih yg easy */}
                <button
                    className="level-btn easy"
                    onClick={() => onSelectLevel('easy')}
                >
                    Easy <br/> <small>(Chill Mode)</small>
                </button>

                {/* Utk memilih yg medium */}
                <button
                    className="level-btn medium"
                    onClick={() => onSelectLevel('medium')}
                >
                    Medium <br/> <small>(Thinker Mode)</small>
                </button>

                {/* Utk memilih yg hard */}
                <button
                    className="level-btn hard"
                    onClick={() => onSelectLevel('hard')}
                >
                    Hard <br/> <small>(Genius Mode)</small>
                </button>
            </div>
        </div>
    );
};

export default LevelSelection;
import React from 'react';

const LevelSelection = ({ onSelectLevel, username, loading, currentLevel }) => {
    
    const getClassName = (levelType, baseClass) => {
    if (loading && currentLevel !== levelType) {
      return `${baseClass} keep-color`; 
    }
    return baseClass;
    };

    return (
        <div className="card">
            <h1>Select Difficulty</h1>
            <p>Ready, <b>{username}</b>? Choose your challenge!</p>

            <div className="level-grid">
                {/* Utk memilih yg easy */}
                <button
                    className={getClassName('easy', 'level-btn easy')}
                    onClick={() => onSelectLevel('easy')}
                    disabled={loading}
                >
                    {loading && currentLevel === 'easy' ? "Preparing..." : (
                        <> Easy <br/> <small>(Chill mode)</small></>
                    )}
                </button>

                {/* Utk memilih yg medium */}
                <button
                    className={getClassName('medium', 'level-btn medium')}
                    onClick={() => onSelectLevel('medium')}
                    disabled={loading}
                >
                    {loading && currentLevel === 'medium' ? "Preparing..." : (
                        <> Medium <br/> <small>(Thinker Mode)</small></>
                    )}
                </button>

                {/* Utk memilih yg hard */}
                <button
                    className={getClassName('hard', 'level-btn hard')}
                    onClick={() => onSelectLevel('hard')}
                    disabled={loading}
                >
                    {loading && currentLevel === 'hard' ? "Preparing..." : (
                        <> Hard <br/> <small>(Genius mode)</small></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default LevelSelection;
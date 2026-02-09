import React from 'react';

const LevelSelection = ({ onSelectLevel, username, loading }) => {
    return (
        <div className="card">
            <h1>Select Difficulty</h1>
            <p>Ready, <b>{username}</b>? Choose your challenge!</p>

            <div className="level-grid">
                {/* Utk memilih yg easy */}
                <button
                    className="level-btn easy"
                    onClick={() => onSelectLevel('easy')}
                    disabled={loading}
                >
                    {loading ? "Preparing..." : (
                        <> Easy <br/> <small>(Chill mode)</small></>
                    )}
                </button>

                {/* Utk memilih yg medium */}
                <button
                    className="level-btn medium"
                    onClick={() => onSelectLevel('medium')}
                    disabled={loading}
                >
                    {loading ? "Preparing..." : (
                        <> Medium <br/> <small>(Thinker Mode)</small></>
                    )}
                </button>

                {/* Utk memilih yg hard */}
                <button
                    className="level-btn hard"
                    onClick={() => onSelectLevel('hard')}
                    disabled={loading}
                >
                    {loading ? "Preparing..." : (
                        <> Hard <br/> <small>(Genius mode)</small></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default LevelSelection;
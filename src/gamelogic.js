import { useState, useEffect } from "react";
import Maze from "./maze";
import Pacman from "./pacman";
import Ghost from "./ghost";
import BackgroundMusic from "./music";


const GRID_WIDTH = 13;
const GRID_HEIGHT = 9;

const pacmanStart = { x: 6, y: 4 };
const ghostStart = { x: 6, y: 6 };

let WALLS = [];

for (let x = 0; x < GRID_WIDTH; x++) {
  WALLS.push({ x, y: 0 });
  WALLS.push({ x, y: GRID_HEIGHT - 1 });
}
for (let y = 1; y < GRID_HEIGHT - 1; y++) {
  WALLS.push({ x: 0, y });
  WALLS.push({ x: GRID_WIDTH - 1, y });
}

const internalWallCoords = [
  { x: 2, y: 2 }, { x: 2, y: 3 },
  { x: 3, y: 2 },

  { x: 9, y: 2 }, { x: 10, y: 2 },
  { x: 10, y: 3 },

  { x: 2, y: 5 }, { x: 2, y: 6 },
  { x: 3, y: 6 },

  { x: 9, y: 5 }, { x: 10, y: 5 },
  { x: 10, y: 6 },

  { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 },
  { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 7, y: 5 },
];
WALLS.push(...internalWallCoords);

const allCells = [];
for (let y = 0; y < GRID_HEIGHT; y++) {
  for (let x = 0; x < GRID_WIDTH; x++) {
    allCells.push({ x, y });
  }
}

const INITIAL_COINS = allCells.filter(
    (cell) =>
      !WALLS.some((w) => w.x === cell.x && w.y === cell.y) &&
      !(cell.x === pacmanStart.x && cell.y === pacmanStart.y)
  );  

function GameLogic() {
  const [gameStarted, setGameStarted] = useState(false);
  const [pacmanPosition, setPacmanPosition] = useState(pacmanStart);
  const [pacmanDirection, setPacmanDirection] = useState("right");
  const [ghostPosition, setGhostPosition] = useState(ghostStart);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (pacmanPosition.x === ghostPosition.x && pacmanPosition.y === ghostPosition.y) {
        setGameOver(true);
    }
  }, [pacmanPosition, ghostPosition]);

  useEffect(() => {
    const coinIndex = coins.findIndex(
        coin => coin.x === pacmanPosition.x && coin.y === pacmanPosition.y
    );

    if (coinIndex !== -1) {
        setCoins(prevCoins => prevCoins.filter((_, i) => i !== coinIndex));
        setScore(prevScore => prevScore + 10); 
    }
  }, [pacmanPosition, coins]);

  useEffect(() => {
    if (coins.length === 0) {
        setGameWon(true);
    }
  }, [coins]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setPacmanPosition(pacmanStart);
    setGhostPosition(ghostStart);
    setCoins(INITIAL_COINS);
    setGameOver(false);
    setGameWon(false);
  };

  const restartGame = () => {
    setPacmanPosition(pacmanStart);
    setPacmanDirection("right");
    setGhostPosition(ghostStart);
    setGameOver(false);
    setGameWon(false);
    setCoins(INITIAL_COINS);
    setScore(0);
  };

  return (
    <div className="game-container">
      <BackgroundMusic src="/arcade.mp3" />
      {!gameStarted ? (
        <div className="start-screen">
          <h1>WELCOME TO PAC-MAN</h1>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div className="game-content">
          <h1 className="game-title">PAC-MAN</h1>
          <h2 className="score">Score: {score}</h2>

          <Maze
            walls={WALLS}
            coins={coins}
            pacmanPosition={pacmanPosition}
            pacmanDirection={pacmanDirection}
            ghostPosition={ghostPosition}
          />

          {!gameOver && !gameWon && (
            <>
              <Pacman
                position={pacmanPosition}
                setPosition={setPacmanPosition}
                walls={WALLS}
                gridWidth={GRID_WIDTH}
                gridHeight={GRID_HEIGHT}
                direction={pacmanDirection}
                setDirection={setPacmanDirection}
              />

              <Ghost
                position={ghostPosition}
                setPosition={setGhostPosition}
                walls={WALLS}
                gridWidth={GRID_WIDTH}
                gridHeight={GRID_HEIGHT}
              />
            </>
          )}

          {gameOver && (
            <div className="game-over">
              <h2>Game Over!</h2>
              <button onClick={restartGame}>Restart</button>
            </div>
          )}

          {gameWon && (
            <div className="game-won">
              <h2>You Win!</h2>
              <button onClick={restartGame}>Restart</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GameLogic;

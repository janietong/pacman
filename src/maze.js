import React from "react";
import "./App.css";

function Maze({
  walls,
  coins,
  pacmanPosition,
  pacmanDirection,
  ghostPosition
}) {
  const gridWidth = 13;
  const gridHeight = 9;

  return (
    <div className="game-board">
      {[...Array(gridHeight)].map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {[...Array(gridWidth)].map((_, colIndex) => {
            const x = colIndex;
            const y = rowIndex;

            const isWall = walls.some(w => w.x === x && w.y === y);
            const isCoin = coins.some(c => c.x === x && c.y === y);
            const isPacman = (x === pacmanPosition.x && y === pacmanPosition.y);
            const isGhost = (x === ghostPosition.x && y === ghostPosition.y);

            return (
              <div key={colIndex} className="cell">
                {isWall && <div className="wall" />}
                {isCoin && <div className="coin" />}
                {isGhost && <div className="ghost" />}
                {isPacman && (
                  <div
                    className="pacman"
                    style={{
                      "--rotation": `${getRotation(pacmanDirection)}deg`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function getRotation(direction) {
  switch (direction) {
    case "up": return -90;
    case "down": return 90;
    case "left": return 180;
    default: return 0;
  }
}

export default Maze;

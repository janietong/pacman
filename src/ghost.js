import {useEffect} from "react";

function Ghost({position, setPosition, walls, gridWidth, gridHeight}) {
    useEffect(() => {
        const moveInterval = setInterval(() => {
            const directions = ["up", "down", "right", "left"];
            const randomDir = directions[Math.floor(Math.random() * directions.length)];

            let newX = position.x;
            let newY = position.y;

            switch (randomDir) {
                case "up":
                  newY -= 1;
                  break;
                case "down":
                  newY += 1;
                  break;
                case "left":
                  newX -= 1;
                  break;
                case "right":
                  newX += 1;
                  break;
                default:
                  break;
              }

              if (newX >= 0 && newX < gridWidth && newY >= 0 && newY < gridHeight) {
                const isWall = walls.some((w) => w.x === newX && w.y === newY);
                if (!isWall) {
                    setPosition({x: newX, y: newY});
                }
              }
        }, 500);
        
        return () => clearInterval(moveInterval);
        }, [position, walls, gridWidth, gridHeight, setPosition])

        return null;
}

export default Ghost;
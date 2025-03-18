import {useEffect} from "react";
import "./App.css";

const Pacman = ({
    position,
    setPosition,
    walls,
    gridWidth,
    gridHeight,
    direction,
    setDirection
}) => {
    useEffect(() => {
        const handleKeyDown = (e) =>{
            let newX = position.x;
            let newY = position.y;
            let newDir = direction;

            switch (e.key) {
                case "ArrowUp":
                    newDir = "up";
                    newY = position.y - 1;
                    break;
                case "ArrowDown":
                    newDir = "down";
                    newY = position.y + 1
                    break;
                case "ArrowLeft":
                    newDir = "left";
                    newX = position.x - 1;
                    break;
                case "ArrowRight":
                    newDir = "right";
                    newX = position.x + 1;
                    break;
                default:
                    return;
            }

            if (newX >= 0 && newX < gridWidth && newY >= 0 && newY < gridHeight) {
                const isWall = walls.some((w) => w.x === newX && w.y === newY);
                if (!isWall) {
                    setPosition({x: newX, y: newY});
                }
            }
            setDirection(newDir);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [position, walls, gridWidth, gridHeight, setPosition, direction, setDirection]);
    return null;
};

export default Pacman;
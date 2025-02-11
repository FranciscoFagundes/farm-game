import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const GRID_SIZE = 20;
const CELL_SIZE = 50;
const STAGE_WIDTH = 1080;
const STAGE_HEIGHT = 720;

const PLANT_OPTIONS = {
  none: "green",
  milho: "#a2d149",
  trigo: "blue",
  girassol: "#e3c700",
};

const FarmGame = () => {
  const [farm, setFarm] = useState(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("none"))
  );

  const [cultivated, setCultivated] = useState(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false))
  );

  const [selectedPlant, setSelectedPlant] = useState("milho");
  const [isHoeing, setIsHoeing] = useState(false);
  const [workerPos, setWorkerPos] = useState({ x: 500, y: 0 });

  const moveWorker = (targetX, targetY, callback) => {
    const duration = 1000; // duration of the animation in ms
    const startX = workerPos.x;
    const startY = workerPos.y;
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setWorkerPos({
        x: startX + deltaX * progress,
        y: startY + deltaY * progress,
      });
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        callback();
      }
    };

    requestAnimationFrame(animate);
  };

  const handleClick = (row, col) => {
    const targetX = col * CELL_SIZE;
    const targetY = row * CELL_SIZE;

    // Calculate the position one tile beside the target tile
    const besideX = targetX + (targetX > workerPos.x ? -CELL_SIZE : CELL_SIZE);
    const besideY = targetY + (targetY > workerPos.y ? -CELL_SIZE : CELL_SIZE);

    moveWorker(besideX, besideY, () => {
      if (isHoeing) {
        const newCultivated = cultivated.map((r, rIdx) =>
          r.map((c, cIdx) => (rIdx === row && cIdx === col ? true : c))
        );
        setCultivated(newCultivated);
      } else if (cultivated[row][col] && farm[row][col] === "none") {
        const newFarm = farm.map((r, rIdx) =>
          r.map((c, cIdx) => (rIdx === row && cIdx === col ? selectedPlant : c))
        );
        setFarm(newFarm);
      }
    });
  };

  return (
    <div>
      <button onClick={() => setIsHoeing(!isHoeing)} style={{ cursor: 'pointer' }}>
        <img src={isHoeing ? 'images/hoe_selected.png' : 'images/hoe_unselected.png'} alt="Hoe Button" width={50} height={50} />
      </button>
      <div>
        {Object.keys(PLANT_OPTIONS).filter(plant => plant !== 'none').map((plant) => (
          <button
            key={plant}
            onClick={() => { setSelectedPlant(plant); setIsHoeing(false); }}
            style={{
              backgroundColor: PLANT_OPTIONS[plant],
              border: selectedPlant === plant ? '2px solid black' : '1px solid white',
              margin: '5px',
              padding: '10px',
              cursor: 'pointer'
            }}
          >
            {plant}
          </button>
        ))}
      </div>
      <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
        <Layer>
          {farm.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * CELL_SIZE}
                y={rowIndex * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill={cultivated[rowIndex][colIndex] ? (cell === "none" ? 'brown' : PLANT_OPTIONS[cell]) : PLANT_OPTIONS[cell]}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))
          )}
          <Rect
            x={workerPos.x}
            y={workerPos.y}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill="red"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default FarmGame;
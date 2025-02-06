import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const GRID_SIZE = 20; // 20x20 células
const CELL_SIZE = 50; // Tamanho das células
const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;

const PLANT_OPTIONS = {
  none: "green", // Gramado
  milho: "#a2d149", // Verde-claro
  trigo: "blue", // Marrom
  girassol: "#e3c700", // Amarelo
};

const FarmGame = () => {
  const [farm, setFarm] = useState(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("none"))
  );

  const [selectedPlant, setSelectedPlant] = useState("milho");

  const handleClick = (row, col) => {
    const newFarm = farm.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? selectedPlant : c))
    );
    setFarm(newFarm);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, padding: 10 }}>
        {Object.keys(PLANT_OPTIONS).map((plant) => (
          <button
            key={plant}
            onClick={() => setSelectedPlant(plant)}
            style={{
              padding: "10px",
              backgroundColor: PLANT_OPTIONS[plant],
              border: selectedPlant === plant ? "3px solid black" : "1px solid gray",
              cursor: "pointer",
            }}
          >
            {plant.charAt(0).toUpperCase() + plant.slice(1)}
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
                fill={PLANT_OPTIONS[cell]}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default FarmGame;

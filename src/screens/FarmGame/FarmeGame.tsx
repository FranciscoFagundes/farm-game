import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

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

  const [selectedPlant, setSelectedPlant] = useState("milho");

  const handleClick = (row, col) => {
    if (farm[row][col] !== "none") return;
    const newFarm = farm.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? selectedPlant : c))
    );
    setFarm(newFarm);
  };

  return (
    <div>
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
        <Layer>
          <Text
            text="Selecione a plantação:"
            fontSize={20}
            x={10}
            y={10}
            fill="white"
          />
          {Object.keys(PLANT_OPTIONS).map((plant, index) => (
            <Rect
              key={plant}
              x={200 + index * 100}
              y={10}
              width={80}
              height={30}
              fill={PLANT_OPTIONS[plant]}
              stroke={selectedPlant === plant ? "black" : "white"}
              strokeWidth={selectedPlant === plant ? 3 : 1}
              onClick={() => setSelectedPlant(plant)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default FarmGame;

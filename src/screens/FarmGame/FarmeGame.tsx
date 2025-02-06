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

  const [cultivated, setCultivated] = useState(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false))
  );

  const [selectedPlant, setSelectedPlant] = useState("milho");
  const [menuOpen, setMenuOpen] = useState(false);

  const [isHoeing, setIsHoeing] = useState(false);


  const handleClick = (row: number, col: number) => {
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
  };

  return (
    <div>
      <button onClick={() => setIsHoeing(!isHoeing)} style={{ backgroundColor: isHoeing ? 'brown' : 'lightgray' }}>
        {isHoeing ? 'Hoeing Mode' : 'Activate Hoe'}
      </button>
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
        </Layer>
        <Layer>
          <Rect
            x={10}
            y={10}
            width={150}
            height={40}
            fill="gray"
            onClick={() => setMenuOpen(!menuOpen)} // Alterna a visibilidade do menu
          />
          <Text
            text="Menu"
            fontSize={18}
            x={20}
            y={15}
            fill="white"
          />
        </Layer>
        {menuOpen && (
        <Layer>
          <Text
            text="Selecione:"
            fontSize={20}
            x={10}
            y={100}
            fill="white"
          />
          {Object.keys(PLANT_OPTIONS).map((plant, index) => (
            <Rect
              key={plant}
              x={200 + index * 100}
              y={100}
              width={80}
              height={30}
              fill={PLANT_OPTIONS[plant]}
              stroke={selectedPlant === plant ? "black" : "white"}
              strokeWidth={selectedPlant === plant ? 3 : 1}
              onClick={() => {setSelectedPlant(plant); setMenuOpen(false);}}
            />
          ))}
        </Layer>)}
      </Stage>
    </div>
  );
};

export default FarmGame;

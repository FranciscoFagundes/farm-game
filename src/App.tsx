import "./App.css";
import FarmGame from "./screens/FarmGame/FarmeGame";

function App() {
  return (
    <div className="App">
      <h1>My First React App</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <FarmGame />
      </div>
    </div>
  );
}

export default App;

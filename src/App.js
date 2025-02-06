import logo from './logo.svg';
import './App.css';
import FarmeGame from './screens/FarmGame/FarmeGame';

function App() {
  return (
    <div className="App">
      <h1>My First React App</h1>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
        <FarmeGame />
      </div>
     
    </div>
  );
}

export default App;

import './App.css';
import Weathers from './Components/weather.jsx';

function App() {
  document.body.style.backgroundImage = 'linear-gradient(to right, #141e30 0%, #243b55 100%)';
  return (
    <>
      <Weathers />
    </>
  );
}

export default App;

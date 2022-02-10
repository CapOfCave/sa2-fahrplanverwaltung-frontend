import './App.css';
import BusStopList from './BusStop/BusStopList';
import Header from './layout/Header';

function App() {
  return (
    <div>
      <Header></Header>
      Fahrplanverwaltung
      <BusStopList/>
    </div>
  );
}

export default App;

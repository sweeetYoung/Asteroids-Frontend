// import logo from './logo.svg';
import './App.css';
import List from "./views/content/content-left";
import AsteroidsMap from "./views/content/content-right";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

const socket = io.connect('http://localhost:3001');
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currentYear, setCurrentYear] = useState(0);
  const [miners, setMiners] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);
  const [initialAsteroidMinerals, setInitialAsteroidMinerals] = useState({})

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    let firstTick = true;
    socket.on('tick', (data) => {
      // console.log(data)
      if (firstTick) {
        console.log('first')
        let initial = {}
        data.asteroids.forEach(item => initial[item._id] = item.minerals)
        setInitialAsteroidMinerals(initial)
        console.log(initial)
        firstTick = false
      }
      setMiners(data.miners)
      setAsteroids(data.asteroids)
      setPlanets(data.planets)
      setCurrentYear(data.currentTick)
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('tick');
    };
  }, [])
  return (
    <div className="App">
      <div className="App-header">
        <i className="icon-logo"></i>
        BACKEND MINER
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </div>
      <div className="App-content">
        <List
          miners={miners}
          planets={planets}
          asteroids={asteroids}
          initialAsteroidMinerals={initialAsteroidMinerals}
        />
        <AsteroidsMap
          currentYear={currentYear}
          miners={miners}
          planets={planets}
          asteroids={asteroids}
        />
      </div>
    </div>
  );
}

export default App;

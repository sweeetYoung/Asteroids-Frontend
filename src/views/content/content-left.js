import React, {useEffect, useState} from 'react'
import '../../assets/content-left.scss'
import MinersTable from "./miners-table";
import AsteroidsTable from "./asteroids-table";
import PlanetsTable from "./planets-table";


function List({miners, planets, asteroids, initialAsteroidMinerals}) {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [selectedTab, setSelectedTab] = useState('1');
  // const [currentYear, setCurrentYear] = useState(0);

  return (
    <>
      <div className='data-view'>
        {/*three tabs*/}
        <div className="tabs">
          <div className={`tab-border ${selectedTab === '1' ? 'tab-border-selected' : ''}`} onClick={() => setSelectedTab('1')}>
            <i className="icon-miner tabs-icon"></i>
            <span>Miners</span>
          </div>
          <div className={`tab-border ${selectedTab === '2' ? 'tab-border-selected' : ''}`} onClick={() => setSelectedTab('2')}>
            <i className="icon-asteroid tabs-icon"></i>
            <span>Asteroids</span>
          </div>
          <div className={`tab-border ${selectedTab === '3' ? 'tab-border-selected' : ''}`} onClick={() => setSelectedTab('3')}>
            <i className="icon-planet tabs-icon"></i>
            <span>Planets</span>
          </div>
        </div>
        {/*table*/}
        <div className="table">
          {selectedTab === '1' && <MinersTable miners={miners} planets={planets} />}
          {selectedTab === '2' && <AsteroidsTable asteroids={asteroids} initialAsteroidMinerals={initialAsteroidMinerals} />}
          {selectedTab === '3' && <PlanetsTable planets={planets} />}
        </div>
      </div>
    </>
  )
}

export default List;

import BasicTable from "../../components/basic-table";
import React, {useEffect, useState} from "react";
import MinerHistoriesDialog from "../dialog/history-dialog";
import PlanetMinersDialog from "../dialog/planet-miners-dialog";
import CreateMinerDialog from "../dialog/create-miner-dialog";
import {getAllPlanets} from "../../api/planets";
import {getAllMiners} from "../../api/miners";

const PlanetsTable = (props) => {
  const { planets } = props;
  const [displayPlanetMiners, setDisplayPlanetMiners] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(undefined);
  const [displayCreateMinerDialog, setDisplayCreateMinerDialog] = useState(undefined)
  // const [planetsData, setPlanetsData] = useState(() => []);

  // const createMiner = (event) => {
  //
  // }
  // useEffect(() => {
  //   initData()
  // }, [])
  //
  // const initData = async() => {
  //   try {
  //     const res = await getAllPlanets();
  //     if (res.status === 200) {
  //       setPlanetsData(res.data);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
  const columns = [
    {
      title: <p style={{color: 'white', fontWeight: '700'}}>Name</p>,
      dataIndex: 'name',
      render: (val) => <p style={{color: '#9499C3'}}>{val}</p>,
    },
    {
      title: <p style={{color: 'white', fontWeight: '700'}}>Miners</p>,
      dataIndex: 'miners',
      render: (val) => <p style={{color: '#9499C3'}}>{val}</p>,
    },
    {
      title: <p style={{color: 'white', fontWeight: '700'}}>Minerals</p>,
      dataIndex: 'minerals',
      render: (val) => <p style={{color: val >= 1000 ? '#00CF67' : '#9499C3'}}>{val}/1000</p>,
    },
    {
      title: '',
      dataIndex: 'operation',
      key: 'operation',
      width: 200,
      render: (text, record) => {
        return record.minerals >= 1000 &&
          <div
            style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
            onClick={event => {
              event.stopPropagation();
              setSelectedPlanet(record);
              setDisplayCreateMinerDialog(true)
            }}
          >
            <i className='icon-add-miner' style={{color: '#00F0FF', fontSize: '12px', width: '12px', height: '12px'}}/>
            <span style={{color: '#00F0FF', marginLeft: '5px'}}>Create a miner</span>
          </div>

      },
    }
  ]

  return (
    <>
      <PlanetMinersDialog
        planet={selectedPlanet}
        isOpen={displayPlanetMiners}
        setIsOpen={setDisplayPlanetMiners}
      />
      <CreateMinerDialog
        planetAvailableOptions={selectedPlanet}
        isOpen={selectedPlanet && displayCreateMinerDialog}
        onCancel={() => {
          setDisplayCreateMinerDialog(false);
        }}
      />
      <BasicTable
        columns={columns}
        data={planets}
        onRow={record => {
          return {
            onClick: event => {
              console.log('row clicked,record');
              setSelectedPlanet(record);
              setDisplayPlanetMiners(true);
            }
          };
        }}
      />
    </>
  )
}

export default PlanetsTable

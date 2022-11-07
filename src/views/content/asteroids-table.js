import BasicTable from "../../components/basic-table";
import React, {useEffect, useState} from "react";
import MinerHistoriesDialog from "../dialog/history-dialog";
import {getAllPlanets} from "../../api/planets";
import {getAllMiners} from "../../api/miners";
import {getAllAsteroids} from "../../api/asteroids";

const AsteroidsTable = (props) => {

  const { asteroids, initialAsteroidMinerals, miners } = props;

  const columns = [
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>Name</p>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p style={{ color: '#9499C3' }}>{text}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>Minerals</p>,
      dataIndex: 'minerals',
      render: (val, record) => <p style={{ color: val === 0 ? '#EB5757' : '#9499C3' }}>{`${val}/${initialAsteroidMinerals[record._id]}`}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>Current miner</p>,
      dataIndex: 'currentMiner',
      key: 'currentMiner',
      render: (val) => <p style={{ color: '#9499C3' }}>{val ? val.name : 0}</p>
      // render: (val) => <p style={{ color: '#9499C3' }}>{val ? miners.find(miner => miner._id === val).name : 0}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>Position</p>,
      dataIndex: 'position',
      key: 'miner',
      render: (text) => <p style={{ color: '#9499C3' }}>{`${text.x},${text.y}`}</p>
    }
  ]

  return (
    <>
      <BasicTable
        columns={columns}
        data={asteroids}
      />
    </>
  )
}

export default AsteroidsTable

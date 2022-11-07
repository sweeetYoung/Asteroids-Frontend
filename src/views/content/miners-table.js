import BasicTable from "../../components/basic-table";
import React, {useEffect, useState} from "react";
import MinerHistoriesDialog from "../dialog/history-dialog";
import {getAllMiners} from "../../api/miners";
import {getAllPlanets} from "../../api/planets";
import {minerStatus} from "../../utils/enum";
import useWebSocket from "react-use-websocket";

const MinersTable = (props) => {

  const { miners } = props;

  const [selectedMiner, setSelectedMiner] = useState(undefined);
  const [displayMinerHistories, setDisplayMinerHistories] = useState(false);


  const columns = [
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>Name</p>,
      dataIndex: 'name',
      width: 40,
      render: (text) => <p style={{ color: '#FFF' }}>{text}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>Planet</p>,
      dataIndex: 'planet',
      width: 40,
      render: (value) => <p style={{ color: '#9499C3' }}>{value.name}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>carryCapacity</p>,
      dataIndex: 'carryCapacity',
      width: 40,
      render: (val, record) => <p style={{ color: val === record.minerals ? '#00CF67' : '#9499C3' }}>{`${record.minerals}/${val}`}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>travelSpeed</p>,
      dataIndex: 'travelSpeed',
      width: 40,
      render: (text) => <p style={{ color: '#9499C3' }}>{text}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>miningSpeed</p>,
      dataIndex: 'miningSpeed',
      width: 40,
      render: (text) => <p style={{ color: '#9499C3' }}>{text}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>Position</p>,
      dataIndex: 'x',
      width: 80,
      render: (val, record) => <p style={{ color: '#9499C3' }}>{Math.floor(val) + ',' + Math.floor(record.y)}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>Status</p>,
      dataIndex: 'status',
      width: 120,
      render: (text) => <p style={{ color: '#9499C3' }}>{minerStatus[text]}</p>,
    },
  ]

  return (
    <>
      <MinerHistoriesDialog
        miner={selectedMiner}
        isOpen={displayMinerHistories}
        setIsOpen={setDisplayMinerHistories}
      />
      <BasicTable
        columns={columns}
        data={miners}
        onRow={record => {
          return {
            onClick: event => {
              console.log('row clicked', record);
              setSelectedMiner(record);
              setDisplayMinerHistories(true);
            }
          };
        }}
      />
    </>
  )
}

export default MinersTable

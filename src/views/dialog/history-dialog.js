import {Modal, Table} from "antd";
import React, {useEffect, useState} from "react";
import BasicTableDataDialog from "../../components/basic-table-data-dialog";
import TableHeaderName from "../../components/table-header-name";
import {getAllPlanets} from "../../api/planets";
import {getAllHistoryForMiner} from "../../api/history";
import moment from "moment";
const MinerHistoriesDialog = (props) => {

  const { miner, isOpen, setIsOpen } = props
  const [loading, setLoading] = useState(true);
  const [minerHistories, setMinerHistories] = useState([]);

  useEffect(() => {
    miner && fetchMinerHistories(miner._id);
  }, [miner]);

  const fetchMinerHistories = (minerId) => {
    try {
      getAllHistoryForMiner(minerId).then(res => {
        if (res.status === 200) {
          setMinerHistories(res.data);
          console.log(res.data)
          setLoading(false)
        }
      })
    } catch (e) {
      console.error(e);
    }
  }

  const minerHistoriesTableColumns = [
    {
      title: <TableHeaderName name={'Date'} size={'small'} />,
      dataIndex: 'createdAt',
      width: 200,
      render: (val) => <p>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</p>,
    },
    {
      title: <TableHeaderName name={'Year'} size={'small'} />,
      dataIndex: 'year',
      render: (val) => <p>{val}</p>,
    },
    {
      title: <TableHeaderName name={'Planet'} size={'small'} />,
      dataIndex: 'planet',
      render: (val) => <p>{val}</p>,
    },
    {
      title: <TableHeaderName name={'carryCapacity'} size={'small'} />,
      dataIndex: ['capacity', 'current'],
      render: (val) => <p style={{ color: val === 200 ? '#00CF67' : '#9499C3' }}>{val}/200</p>,
    },
    {
      title: <TableHeaderName name={'travelSpeed'} size={'small'} />,
      dataIndex: ['speed', 'travel'],
      render: (val) => <p>{val}</p>,
    },
    {
      title: <TableHeaderName name={'miningSpeed'} size={'small'} />,
      dataIndex: ['speed', 'mining'],
      render: (val) => <p>{val}</p>,
    },
    {
      title: <TableHeaderName name={'Position'} size={'small'} />,
      dataIndex: 'position',
      key: '_id',
      render: (val) => <p>{`${val.x},${val.y}`}</p>
    },
    {
      title: <TableHeaderName name={'Status'} size={'small'} />,
      dataIndex: 'status',
      key: 'status',
      render: (val) => <p>{val}</p>,
    }
  ]

  return (
    <>
      <BasicTableDataDialog
        loading={loading}
        title={`History of ${miner?.name ?? ''}`}
        columns={minerHistoriesTableColumns}
        dataSource={minerHistories}
        isOpen={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
    </>
  )
}

export default MinerHistoriesDialog;

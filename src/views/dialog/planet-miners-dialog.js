import React, {useEffect, useState} from "react";
import TableHeaderName from "../../components/table-header-name";
import BasicTableDataDialog from "../../components/basic-table-data-dialog";
import {getAllMinersForPlanet} from "../../api/miners";
import {minerStatus} from "../../utils/enum";


const PlanetMinersDialog = (props) => {

  const { planet, isOpen, setIsOpen } = props
  const [loading, setLoading] = useState(true);
  const [miners, setMiners] = useState([]);

  useEffect(() => {
    if (planet) {
      fetchPlanetMiners(planet);
      console.log(planet)
    }
  }, [planet]);

  const fetchPlanetMiners = async (planet) => {
    try {
      getAllMinersForPlanet(planet._id).then(res => {
        if (res.status === 200) {
          console.log(res.data)
          setMiners(res.data);
        }
      })
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const planetMinersTableColumns = [
    {
      title: <TableHeaderName name={'Name'} size={'small'} />,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: <TableHeaderName name={'carryCapacity'} size={'small'} />,
      dataIndex: 'carryCapacity',
      key: 'carryCapacity',
      render: (text) => <p style={{ color: text === 200 ? '#00CF67' : '#9499C3' }}> {text}/200</p>,
    },
    {
      title: <TableHeaderName name={'travelSpeed'} size={'small'} />,
      dataIndex: 'travelSpeed',
      key: 'travelSpeed',
      render: (text) => <p>{text}</p>,
    },
    {
      title: <p style={{ color: 'white', fontWeight: '700' }}>miningSpeed</p>,
      dataIndex: 'miningSpeed',
      key: 'miningSpeed',
      render: (text) => <p>{text}</p>,
    },
    {
      title: <TableHeaderName name={'Position'} size={'small'} />,
      dataIndex: 'x',
      key: 'x',
      render: (text, record) => <p>{`${record.x},${record.y}`}</p>,
    },
    {
      title: <TableHeaderName name={'Status'} size={'small'} />,
      dataIndex: 'status',
      key: 'status',
      render: (text) => <p>{minerStatus[text]}</p>,
    }
  ]

  return (planet &&
    <BasicTableDataDialog
    loading={loading}
    title={`List of miners of ${planet.name}`}
    columns={planetMinersTableColumns}
    dataSource={miners}
    isOpen={isOpen}
    onCancel={() => {
      setIsOpen(false);
    }}
  />
  )
}

export default PlanetMinersDialog;

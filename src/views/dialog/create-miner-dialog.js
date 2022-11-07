import {Modal, Form, Input, Select, Button, Row, Col, InputNumber, Alert} from 'antd'
import React, {useEffect, useState} from "react";
import '../../assets/create-miner-dialog.scss'
import {createOneMiner, getAllMiners} from "../../api/miners";
import {getAllPlanets, updateOnePlanet} from "../../api/planets";

const CreateMinerForm = (props) => {

  const { planet } = props;
  // console.log(planet)
  const [form] = Form.useForm();
  // const [minerNameRepeated, setMinerNameRepeated] = useState('');
  const checkNameRepeated = (rule, value, callback) => {
    getAllMiners().then(res => {
      const repeatVal = res.data.filter(miner => miner.name === value)
      if (repeatVal.length > 0) {
        callback('This name is already taken.')
      } else {
        callback();
      }
    })
  }
  return (
    <div className={'form-wrapper'}>
      <Form
        layout='vertical'
        form={form}
        autocomplete='off'
      >
        <Form.Item
          name={'name'}
          label={<span style={{color: '#9499C3'}}>Name</span>}
          validateTrigger='onSubmit'
          rules={[{
            validator: checkNameRepeated
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'planet'} label={<span style={{color: '#9499C3'}}>Planet</span>}>
          <Select
            options={[
              {
                value: planet._id,
                label: planet.name
              }
            ]}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'center', fontSize: '16px', color: '#FFFFFF', fontFamily: 'Lato' }}>
            Assign points
          </div>
        </Form.Item>
        <div style={{ display:'flex', gap: '12px' }}>
          <Form.Item
            style={{ flex: 1 }}
            name={'carryCapacity'}
            label={<span style={{color: '#9499C3'}}>carryCapacity</span>}
          >
            <InputNumber min={1} max={200} />
          </Form.Item>
          <Form.Item
            style={{ flex: 1 }}
            name={'travelSpeed'}
            label={<span style={{color: '#9499C3'}}>travelSpeed</span>}
          >
            <InputNumber min={1} max={200} />
          </Form.Item>
          <Form.Item
            style={{ flex: 1 }}
            name={'miningSpeed'}
            label={<span style={{color: '#9499C3'}}>miningSpeed</span>}
          >
            <InputNumber min={1} max={200} />
          </Form.Item>
        </div>
        <Form.Item
          style={{
            marginBottom: 0,
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            className='save-btn'
            onClick={() => {
              form.validateFields(['name']).then(result => {
                const formData = form.getFieldsValue(['name', 'planet', 'carryCapacity', 'travelSpeed', 'miningSpeed'])
                createOneMiner({
                  ...formData,
                  ...planet.position,
                  angle: 0,
                  status: 0,
                  minerals: 0,
                  target: planet._id,
                  targetType: 'Planet'
                }).then(res => {
                  if (res.status === 200) {
                    getAllPlanets().then(res => {
                      console.log(res)
                      if (res.status === 200) {
                        let curPlanet = res.data.find(item => item._id === planet._id);
                        if (curPlanet) {
                          console.log(curPlanet)
                          updateOnePlanet(planet._id, { ...curPlanet, minerals: curPlanet.minerals - 1000}).then(res => {
                            if (res.status === 200) {
                              props.cancelModal();
                              props.setCreateMinerSuccessful(true)
                            }
                          })
                        }
                      }
                    });
                  }
                })
              }).catch(e => {
                console.log(e)
              })
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const CreateMinerDialog = (props) => {

  const { planetAvailableOptions, isOpen, onCancel } = props;
  // console.log(planetAvailableOptions)
  // useEffect(() => {}, [planetAvailableOptions._id])
  const [createMinerSuccessful, setCreateMinerSuccessful] = useState(false)
  return (
    <>
      <Modal
        className="modal"
        title={<span className="flex-center">Create a miner</span>}
        open={isOpen}
        footer={false}
        onCancel={onCancel}
        centered={true}
        closeIcon={<i className="icon-delete icon-delete-in-modal"></i>}
      >
        <CreateMinerForm
          planet={planetAvailableOptions}
          cancelModal={onCancel}
          setCreateMinerSuccessful={setCreateMinerSuccessful}
        />
      </Modal>
      {
        createMinerSuccessful &&
        <Alert
          message="The miner was successfully created"
          type="info"
          closable
        />
      }
    </>
  )
}
export default CreateMinerDialog;

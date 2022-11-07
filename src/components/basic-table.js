import {Table} from "antd";
import React from "react";

const BasicTable = ({columns, data, onRow}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={onRow}
      scroll={{x: '100%'}}
    />
  )
}
export default BasicTable

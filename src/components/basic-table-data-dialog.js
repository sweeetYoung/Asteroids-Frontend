import { Modal, Table, Spin } from 'antd'
import React, {useEffect, useRef, useState} from "react";
import '../assets/basic-table-data-dialog.scss';
import classNames from 'classnames';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';


const VirtualTable = (props) => {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }
    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  const readValueForVirtualCol = (record, dataIndex) => {
    return Array.isArray(dataIndex) ?
      readValueFromIndexArray(record, dataIndex) : record[dataIndex];
  }

  const readValueFromIndexArray = (rowData, indexArray) => {
    let curValue = rowData[indexArray[0]];
    indexArray.forEach((curIndex, index) => {
      if (index > 0) {
        curValue = curValue[curIndex];
      }
    })
    return curValue;
  }

  useEffect(() => resetVirtualGrid, [tableWidth]);
  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {mergedColumns[columnIndex].hasOwnProperty('render') ? (
              mergedColumns[columnIndex].render(readValueForVirtualCol(rawData[rowIndex], mergedColumns[columnIndex].dataIndex), rawData[rowIndex])
            ) : (
              readValueForVirtualCol(rawData[rowIndex], mergedColumns[columnIndex].dataIndex)
            )}
          </div>
        )}
      </Grid>
    );
  };



  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

const BasicTableDataDialog = (props) => {

  const { loading, title, columns, dataSource, isOpen, onCancel } = props;

  return (
    <>
      <Modal
        className="modal"
        width={'auto'}
        title={<span className="flex-center">{title}</span>}
        open={isOpen}
        footer={false}
        onCancel={onCancel}
        centered={true}
        closeIcon={<i className="icon-delete"></i>}
      >

        {loading ?
          <Spin className="flex-center" />
          :
          dataSource.length > 500 ? (
            <div
              className='table-inner'
            >
              <VirtualTable
                columns={columns}
                dataSource={dataSource}
                scroll={{
                  y: 600,
                  x: '50vw'
                }}
              />
            </div>
          ) : (
            <Table
              className='table-inner'
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              rowKey={item => item._id}
            />
          )
        }
      </Modal>
    </>
  )
}

export default BasicTableDataDialog;

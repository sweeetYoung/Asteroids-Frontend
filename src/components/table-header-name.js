

const TableHeaderName = (props) => {

  const { name, size } = props;

  return (
    <p
      className={'table-header-name' + (size === 'small' ? ' table-header-name-small' : '')}
    >
      {name}
    </p>
  );
}

export default TableHeaderName;

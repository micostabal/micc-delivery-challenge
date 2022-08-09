
const ElementContainer = ({child}) => {
  return (
    <div style={
      {
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "space-around",
        "padding": "15px"
      }
    }>
      {child}
    </div>
  );
};
  
const getDisplayMessage = (resultLength) => {
  if (resultLength === 1) {
    return "Ok";
  } else if (resultLength === 0) {
    return "No results for address";
  }  else {
    return `Too many results (${resultLength}) for address`;
  }
}

export {
  ElementContainer,
  getDisplayMessage
}
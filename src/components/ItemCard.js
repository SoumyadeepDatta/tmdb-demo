import React from "react";

function ItemCard(props) {
  const data = props.data;
  return <div>{JSON.stringify(data)}</div>;
}

export default ItemCard;

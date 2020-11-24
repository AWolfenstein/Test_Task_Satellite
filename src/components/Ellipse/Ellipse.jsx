import React from "react";
import { TYPE_ELLIPSE } from "../../constants/types";

const Ellipse = ({ style, onDragStart }) => {
  const body = (
    <div
      draggable
      style={style}
      onDragStart={(e) => onDragStart(e, TYPE_ELLIPSE)}></div>
  );
  return body;
};

export default Ellipse;

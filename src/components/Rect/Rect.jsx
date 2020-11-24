import React from "react";
import { TYPE_RECT } from "../../constants/types";

const Rect = ({ style, onDragStart }) => {
  const body = (
    <div
      draggable
      style={style}
      onDragStart={(e) => onDragStart(e, TYPE_RECT)}></div>
  );
  return body;
};

export default Rect;

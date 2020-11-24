import React from "react";
import { connect } from "react-redux";
import { figureWidth, figureHeight } from "../../constants/styles";
import {
  deleteFigure,
  addFigure,
  setFigures,
} from "../../actions/actions_figures";

const Canvas = ({
  canvasColRef,
  figures,
  size,
  canvasRef,
  setMouse,
  mouse,
  setSelected,
  selected,
  deleteFigure,
  addFigure,
  setFigures,
}) => {
  const isCursorInFigure = (x, y, figure) => {
    return (
      x > figure.x &&
      x < figure.x + figureWidth &&
      y > figure.y &&
      y < figure.y + figureHeight
    );
  };
  const onMouseDown = (e) => {
    e.stopPropagation();
    let isCursorOnAnyFigure = false;
    setMouse((prevMouse) => ({ ...prevMouse, down: true }));
    figures.forEach((figure) => {
      if (isCursorInFigure(mouse.x, mouse.y, figure)) {
        const newFigure = figure;
        setSelected(figure);
        deleteFigure(figure);
        addFigure(newFigure);
        isCursorOnAnyFigure = true;
      }
    });

    if (!isCursorOnAnyFigure) {
      setSelected(false);
    }
  };

  const onMouseUp = (e) => {
    e.stopPropagation();
    setMouse((prevMouse) => ({ ...prevMouse, down: false }));
  };
  const onMouseOut = (e) => {
    if (mouse.down && selected) {
      deleteFigure(selected);
      setMouse((prevMouse) => ({
        ...prevMouse,
        out: true,
      }));
    }
  };

  const onMouseMove = (e) => {
    e.stopPropagation();
    const x = e.pageX - canvasColRef.current.offsetLeft;
    const y = e.pageY - canvasColRef.current.offsetTop;
    setMouse((prevMouse) => ({
      ...prevMouse,
      x,
      y,
      out: false,
    }));

    if (selected && mouse.down) {
      setFigures(
        figures.map((figure) => {
          if (figure === selected) {
            figure.x = mouse.x - figureWidth / 2;
            figure.y = mouse.y - figureHeight / 2;
          }
          return figure;
        })
      );
    }
  };

  const onMouseOver = (e) => {
    e.stopPropagation();
    if (selected && mouse.down) {
      addFigure(selected);
      setMouse((prevMouse) => ({
        ...prevMouse,
        out: false,
      }));
    }
  };

  const onDrop = (e) => {
    e.stopPropagation();
    let type = e.dataTransfer.getData("type");
    const draggedFigure = {
      x: mouse.x - figureWidth / 2,
      y: mouse.y - figureHeight / 2,
      type,
    };
    addFigure(draggedFigure);
    setSelected(draggedFigure);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    const x = e.pageX - canvasColRef.current.offsetLeft;
    const y = e.pageY - canvasColRef.current.offsetTop;
    setMouse((prevMouse) => ({
      ...prevMouse,
      x,
      y,
    }));
  };

  const body = (
    <canvas
      width={size.width}
      height={size.height}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      onDragOver={onDragOver}
      onDrop={onDrop}
      ref={canvasRef}></canvas>
  );
  return body;
};
const mapStateToProps = (state) => ({
  figures: state.reducer_figures.figures,
});

export default connect(mapStateToProps, {
  deleteFigure,
  addFigure,
  setFigures,
})(Canvas);

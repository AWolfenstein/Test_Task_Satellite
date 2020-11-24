import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./layout.css";
import {
  deleteFigure,
  loadFigure,
  clearState,
} from "../actions/actions_figures";
import { downloadJsonFile } from "../functions/downloadJson";
import { loadFile } from "../functions/loadJson";
import Canvas from "../components/Canvas/Canvas";
import Ellipse from "../components/Ellipse/Ellipse";
import Rect from "../components/Rect/Rect";
import {
  figureWidth,
  figureHeight,
  styleEllipse,
  styleRect,
} from "../constants/styles";
import { TYPE_RECT, TYPE_ELLIPSE } from "../constants/types";

const Layout = ({ figures, deleteFigure, clearState, loadFigure }) => {
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });
  const [selected, setSelected] = useState(false);
  const [mouse, setMouse] = useState({});

  const canvasColRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasColRef.current) {
      setSize({
        ...size,
        height: canvasColRef.current.offsetHeight,
        width: canvasColRef.current.offsetWidth,
      });
    }
  }, [canvasColRef]);

  const onMouseUpContent = (e) => {
    if (selected && mouse.down && mouse.out) {
      setSelected(false);
      setMouse((prevMouse) => ({
        ...prevMouse,
        down: false,
      }));
    }
  };

  const onDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const drawFigure = (figure, ctx) => {
    ctx.lineWidth = 1;
    if (figure === selected) {
      ctx.lineWidth = 4;
    }
    ctx.strokeStyle = "black";
    switch (figure.type) {
      case TYPE_RECT:
        ctx.fillStyle = styleRect.background;
        ctx.fillRect(figure.x, figure.y, figureWidth, figureHeight);
        ctx.strokeRect(figure.x, figure.y, figureWidth, figureHeight);
        ctx.stroke();
        break;
      case TYPE_ELLIPSE:
        ctx.fillStyle = styleEllipse.background;
        ctx.ellipse(
          figure.x + figureWidth / 2,
          figure.y + figureHeight / 2,
          figureWidth / 2,
          figureHeight / 2,
          0,
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        break;
    }
  };
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, size.width, size.height);
    ctx.beginPath();

    figures.forEach((figure) => {
      drawFigure(figure, ctx);
    });

    document.onkeydown = (e) => {
      if (e.key === "Delete" && selected) {
        deleteFigure(selected);
        setSelected(false);
      }
    };
  }, [size, selected, figures, mouse]);

  const body = (
    <div className="fullscreen" onMouseUp={onMouseUpContent}>
      <Container>
        <Row className="headTable">
          <Col className="borderT" sm={4} md={4} lg={4}>
            Figures
          </Col>
          <Col className="borderT" sm={8} md={8} lg={8}>
            Canvas
          </Col>
        </Row>
        <Row className="contentBlock">
          <Col className="borderT" sm={4} md={4} lg={4}>
            <Row className="justify-content-md-center" style={{ padding: 10 }}>
              <Ellipse style={styleEllipse} onDragStart={onDragStart} />
            </Row>
            <Row className="justify-content-md-center" style={{ padding: 10 }}>
              <Rect style={styleRect} onDragStart={onDragStart} />
            </Row>
            <Row className="justify-content-md-center" style={{ padding: 10 }}>
              <Button variant="warning" onClick={clearState}>
                Clear Local Storage
              </Button>
            </Row>
            <Row className="justify-content-md-center" style={{ padding: 10 }}>
              <Button variant="success" onClick={downloadJsonFile}>
                Export to Json
              </Button>
            </Row>
            <Row className="justify-content-md-center" style={{ padding: 10 }}>
              <Form.File
                label="Import from Json"
                accept="application/json"
                custom
                onChange={(e) => loadFile(e,loadFigure)}
              />
            </Row>
          </Col>
          <Col
            className="borderT "
            style={{ padding: 0 }}
            sm={8}
            md={8}
            lg={8}
            ref={canvasColRef}>
            {!!canvasColRef ? (
              <Canvas
                canvasColRef={canvasColRef}
                size={size}
                canvasRef={canvasRef}
                mouse={mouse}
                setMouse={setMouse}
                selected={selected}
                setSelected={setSelected}
              />
            ) : (
              "Canvas not Load"
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
  return body;
};
const mapStateToProps = (state) => ({
  figures: state.reducer_figures.figures,
});

export default connect(mapStateToProps, {
  deleteFigure,
  clearState,
  loadFigure,
})(Layout);

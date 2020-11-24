import {
  ADD_FIGURE,
  DELETE_FIGURE,
  SET_FIGURES,
  CLEAR_STATE,
  LOAD_FIGURES,
} from "../constants/types";

const deleteFigureActionCreator = (figure) => ({
  type: DELETE_FIGURE,
  payload: figure,
});
const clearStateFigureActionCreator = () => ({
  type: CLEAR_STATE,
});

const addFigureActionCreator = (figure) => ({
  type: ADD_FIGURE,
  payload: figure,
});

const loadFigureActionCreator = (figure) => ({
  type: LOAD_FIGURES,
  payload: figure,
});

const setFiguresActionCreator = (figures) => ({
  type: SET_FIGURES,
  payload: figures,
});

export const deleteFigure = (figure) => (dispatch) => {
  dispatch(deleteFigureActionCreator(figure));
};

export const addFigure = (figure) => (dispatch) => {
  dispatch(addFigureActionCreator(figure));
};

export const loadFigure = (figure) => (dispatch) => {
  dispatch(loadFigureActionCreator(figure));
};

export const setFigures = (figures) => (dispatch) => {
  dispatch(setFiguresActionCreator(figures));
};

export const clearState = () => (dispatch) => {
  dispatch(clearStateFigureActionCreator());
};

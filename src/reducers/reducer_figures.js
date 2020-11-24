import {
  ADD_FIGURE,
  DELETE_FIGURE,
  SET_FIGURES,
  CLEAR_STATE,
  LOAD_FIGURES,
} from "../constants/types";
const localFigures = JSON.parse(localStorage.getItem("figures"));
const initialState = {
  figures: localFigures ? localFigures : [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_FIGURE:
      localStorage.setItem(
        "figures",
        JSON.stringify(state.figures.filter((figure) => figure !== payload))
      );
      return {
        ...state,
        figures: state.figures.filter((figure) => figure !== payload),
      };
    case ADD_FIGURE:
      localStorage.setItem(
        "figures",
        JSON.stringify([...state.figures, payload])
      );
      return {
        ...state,
        figures: [...state.figures, payload],
      };
    case SET_FIGURES:
      return {
        ...state,
        figures: payload,
      };
    case LOAD_FIGURES:
      localStorage.clear();
      localStorage.setItem("figures", JSON.stringify(payload));
      return {
        ...state,
        figures: payload,
      };
    case CLEAR_STATE:
      localStorage.clear();
      return {
        ...state,
        figures: [],
      };

    default:
      return {
        ...state,
      };
  }
};

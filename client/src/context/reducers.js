import { useReducer } from "react";
import {
  UPDATE_STEAM_APPID,
  UPDATE_STORED_GAME_INFO,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STEAM_APPID:
      console.log("UPDATE_STEAM_APPID dispatched");
      return {
        ...state,
        appId: action.appId,
      };
    case UPDATE_STORED_GAME_INFO:
      console.log("UPDATE_STORED_GAME_INFO dispatched");
      return {
        ...state,
        appId: action.appId
      }
    default:
      return state;
  }
};

export function useAccountReducer(initialState) {
  return useReducer(reducer, initialState);
}

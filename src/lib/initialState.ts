import { FilterTypes, IState } from "./types";

export const InitialState: IState = {
  events: [],
  currentFilter: FilterTypes.all,
};

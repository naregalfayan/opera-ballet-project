import { useEffect, useReducer } from "react";
import { EventList } from "./components/EventList";
import { Filter } from "./components/Filter";
import { InitialState } from "./lib/initialState";
import { reducer } from "./lib/reducer";
import { EventContext } from "./lib/Context";
import { getAllEvents } from "./lib/api";
import { ActionTypes } from "./lib/types";
import { AddEvent } from "./components/AddEvent";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  useEffect(() => {
    getAllEvents(state.currentFilter).then((response) => {
      dispatch({ type: ActionTypes.setEvents, payload: response });
    });
  }, [state, state.currentFilter]);

  return (
    <>
      <EventContext.Provider value={{ state, dispatch }}>
        <AddEvent />
        <Filter />
        <EventList />
      </EventContext.Provider>
    </>
  );
}

export default App;

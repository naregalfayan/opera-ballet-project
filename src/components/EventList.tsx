import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { EventContext } from "../lib/Context";
import { CopyModal } from "./CopyModal";
import { IEvent } from "../lib/types";

export const EventList: React.FC = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("Out of Provider");
  }
  const { state, dispatch } = context;
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const handleOpenCopyModal = (event: IEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseCopyModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <h1>Event List</h1>
      <div className="list">
        {state.events.map((event) => (
          <div key={event.id}>
            <img src={event.cover} alt={event.title} />
            <p>{event.title}</p>
            <small>
              {event.type} by <strong>{event.composer}</strong>
            </small>
            <p>
              {event.date} at {event.time}
            </p>
            <Button onClick={() => handleOpenCopyModal(event)}>Copy</Button>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <CopyModal
          open={!!selectedEvent}
          handleClose={handleCloseCopyModal}
          event={selectedEvent}
          dispatch={dispatch}
          currentFilter={state.currentFilter}
        />
      )}
    </>
  );
};

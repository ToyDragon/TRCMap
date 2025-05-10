import React, { JSX } from "react";
import { TRCEvent } from "./use_all_events";

export default function EventSelector({allEvents, setSelectedEvent, makeEventChange}: {
    allEvents: TRCEvent[],
    setSelectedEvent: (event: TRCEvent) => void,
    makeEventChange: (id: number | null, newData: TRCEvent) => void,
}): JSX.Element {
    return <div>
        {allEvents.map((e) => {
            return <div onClick={() => setSelectedEvent(e)}>{e.id} - {e.name}</div>
        })}
        <div>---</div>
        <div onClick={() => makeEventChange(null, {
            id: 0,
            // TODO: add some way for the user to input the location and name of the event
            name: "",
            lat: 0,
            lng: 0,
            heading: 0,
            zoom: 20,
            hidden: false,
        })}>Create new event</div>
    </div>;
}

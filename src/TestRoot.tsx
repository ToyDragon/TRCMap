import React, { useState } from 'react';
import GapiAuth from './utils/gapi_auth';
import useSheetsMetadata from './utils/use_sheets_metadata';
import useAllEvents, { TRCEvent } from './utils/use_all_events';
import MapDisplay from './utils/map_display';
import useAllLocations from './utils/use_all_locations';
import EventSelector from './utils/event_selector';


export default function App() {
    const [errorText, setErrorText] = useState("");
    const onErrorCB = () => setErrorText("Error occurred!");
    const [gapiToken, setGapiToken] = useState<null | GoogleApiOAuth2TokenObject>(null);
    const [sheetMetadata] = useSheetsMetadata(gapiToken !== null, onErrorCB);
    const [allEvents] = useAllEvents(sheetMetadata, onErrorCB);
    const [selectedEvent, setSelectedEvent] = useState<TRCEvent | null>(null);
    const [eventLocations] = useAllLocations(sheetMetadata, selectedEvent, onErrorCB);


    return <>
        { errorText }
        { <GapiAuth gapiToken={gapiToken} setGapiToken={setGapiToken} /> }
        { !selectedEvent && allEvents && allEvents.length &&
            <EventSelector
                allEvents={allEvents} 
                makeEventChange={(id: number | null, newData: TRCEvent) => {console.log(id, newData)}}
                setSelectedEvent={setSelectedEvent}
            />
        }
        { selectedEvent && <MapDisplay trcEvent={selectedEvent} locations={eventLocations} /> }
    </>;
}
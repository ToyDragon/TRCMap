import React, { useState } from 'react';
import GapiAuth from './utils/gapi_auth';
import useSheetsMetadata from './utils/use_sheets_metadata';
import useAllEvents from './utils/use_all_events';
import MapDisplay from './utils/map_display';
import useAllLocations from './utils/use_all_locations';


export default function App() {
    const [errorText, setErrorText] = useState("");
    const onErrorCB = () => setErrorText("Error occurred!");
    const [gapiToken, setGapiToken] = useState<null | GoogleApiOAuth2TokenObject>(null);
    const [sheetMetadata] = useSheetsMetadata(gapiToken !== null, onErrorCB);
    const [allEvents] = useAllEvents(sheetMetadata, onErrorCB);
    const firstEvent = allEvents && allEvents.length > 0 ? allEvents[0] : null;
    const [eventLocations] = useAllLocations(sheetMetadata, firstEvent, onErrorCB);


    return <>
        { errorText }
        { <GapiAuth gapiToken={gapiToken} setGapiToken={setGapiToken} /> }
        { firstEvent && <MapDisplay trcEvent={firstEvent} locations={eventLocations} /> }
    </>;
}
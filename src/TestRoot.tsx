import React, { useState } from 'react';
import GapiAuth from './utils/gapi_auth';
import useSheetsMetadata from './utils/use_sheets_metadata';
import useAllEvents from './utils/use_all_events';
import MapDisplay from './utils/map_display';


export default function App() {
    const [gapiToken, setGapiToken] = useState<null | GoogleApiOAuth2TokenObject>(null);
    const [sheetMetadata] = useSheetsMetadata(gapiToken !== null, () => {});
    const [allEvents] = useAllEvents(sheetMetadata, () => {});

    return <>
        { <GapiAuth gapiToken={gapiToken} setGapiToken={setGapiToken} /> }
        { allEvents && allEvents.length > 0 && <MapDisplay trcEvent={allEvents[0]} /> }
    </>;
}
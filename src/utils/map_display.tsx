import React, { JSX, useState } from 'react';
import { GAPI_KEY } from './gapi_auth';
import { TRCEvent } from './use_all_events';
import { TRCLocation } from './use_all_locations';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Booth from '../components/booth';


export default function MapDisplay({trcEvent, locations}: {trcEvent: TRCEvent, locations: TRCLocation[] | null}): JSX.Element {
    const [zoom, setZoom] = useState(trcEvent.zoom);
    const [center, setCenter] = useState<[number, number]>([trcEvent.lat, trcEvent.lng]);
    return <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
        <APIProvider apiKey={GAPI_KEY}>
            <Map
                style={{width: "100%", height: "100%", position: "absolute"}}
                defaultCenter={{lat: trcEvent.lat, lng: trcEvent.lng}}
                defaultZoom={trcEvent.zoom}
                heading={trcEvent.heading}
                gestureHandling={"greedy"}
                mapTypeId={"satellite"}
                disableDefaultUI={true}
                onZoomChanged={(e) => setZoom(e.map.getZoom()!)}
                onCenterChanged={(e) => setCenter([e.map.getCenter()!.lat(), e.map.getCenter()!.lng()])}
            />
        </APIProvider>
        { locations && locations.map((loc) => <Booth location={loc} zoom={zoom} center={center} />) }
    </div>;
}
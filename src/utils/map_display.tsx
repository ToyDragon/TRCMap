import React, { JSX, useState } from 'react';
import { GAPI_KEY } from './gapi_auth';
import { TRCEvent } from './use_all_events';
import { TRCLocation } from './use_all_locations';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const ftPerDegree = 362778;

function LocationPosition([lat, lng]: [number, number], zoom: number, location: TRCLocation): React.CSSProperties {
    const ftPerPixel = (156543.03392 * 3.28084) * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom);
    const centerX = window.innerWidth * .5;
    const centerY = window.innerHeight * .5;
    const pxPerDegree = ftPerDegree/ftPerPixel;
    console.log(`ftPerDegree=${ftPerDegree},ftPerPixel=${ftPerPixel}`);
    return {
        left: centerX + (location.lng - lng)*pxPerDegree*Math.cos(lat) - .5*location.width/ftPerPixel,
        bottom: centerY + (location.lat - lat)*pxPerDegree - .5*location.width/ftPerPixel,
        width: location.width/ftPerPixel,
        height: location.width/ftPerPixel,
        boxSizing: "border-box",
    };
} 

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
        {
            locations && locations.map((loc) => {
                return <div style={{
                    position: "absolute",
                    backgroundColor: `rgb(${255*loc.colorR}, ${255*loc.colorG}, ${255*loc.colorB})`,
                    border: `3px solid rgb(${255*loc.colorR*.8}, ${255*loc.colorG*.8}, ${255*loc.colorB*.8})`,
                    ...LocationPosition(center, zoom, loc),
                }}>{loc.label}</div>
            })
        }
    </div>;
}
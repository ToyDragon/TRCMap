import React, { JSX } from 'react';
import { GAPI_KEY } from './gapi_auth';
import { TRCEvent } from './use_all_events';
import { TRCLocation } from './use_all_locations';

const ftPerDegree = 362778;

function LocationPosition(trcEvent: TRCEvent, location: TRCLocation): React.CSSProperties {
    const ftPerPixel = (156543.03392 * 3.28084) * Math.cos(trcEvent.lat * Math.PI / 180) / Math.pow(2, trcEvent.zoom);
    const centerX = window.innerWidth * .5;
    const centerY = window.innerHeight * .5;
    const pxPerDegree = ftPerDegree/ftPerPixel;
    console.log(`ftPerDegree=${ftPerDegree},ftPerPixel=${ftPerPixel}`);
    return {
        left: centerX + (location.lng - trcEvent.lng)*pxPerDegree*Math.cos(trcEvent.lat) - .5*location.width/ftPerPixel,
        bottom: centerY + (location.lat - trcEvent.lat)*pxPerDegree - .5*location.width/ftPerPixel,
        width: location.width/ftPerPixel,
        height: location.width/ftPerPixel,
        boxSizing: "border-box",
    };
} 

export default function MapDisplay({trcEvent, locations}: {trcEvent: TRCEvent, locations: TRCLocation[] | null}): JSX.Element {
    return <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
        <iframe
            style={{border:0, position: "absolute", width: "100%", height: "100%"}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/view?key=${GAPI_KEY}&center=${trcEvent.lat},${trcEvent.lng}&zoom=${trcEvent.zoom}&maptype=satellite`}>
        </iframe>
        {
            locations && locations.map((loc) => {
                return <div style={{
                    position: "absolute",
                    backgroundColor: `rgb(${255*loc.colorR}, ${255*loc.colorG}, ${255*loc.colorB})`,
                    border: `3px solid rgb(${255*loc.colorR*.8}, ${255*loc.colorG*.8}, ${255*loc.colorB*.8})`,
                    ...LocationPosition(trcEvent, loc),
                }}>{loc.label}</div>
            })
        }
    </div>;
}
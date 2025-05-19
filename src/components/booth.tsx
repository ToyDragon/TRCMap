import React, { JSX } from 'react';
import { TRCLocation } from '../utils/use_all_locations';

export default function Booth({location, zoom, center}: {location: TRCLocation, zoom: number, center: [number, number]}): JSX.Element {
    const [lat, lng] = center;
    const ftPerDegree = 362778;
    const ftPerPixel = (156543.03392 * 3.28084) * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom);
    const centerX = window.innerWidth * .5;
    const centerY = window.innerHeight * .5;
    const pxPerDegree = ftPerDegree/ftPerPixel;

    return <div style={{
        position: "absolute",
        backgroundColor: `rgb(${255*location.colorR}, ${255*location.colorG}, ${255*location.colorB})`,
        border: `3px solid rgb(${255*location.colorR*.8}, ${255*location.colorG*.8}, ${255*location.colorB*.8})`,
        left: centerX + (location.lng - lng)*pxPerDegree*Math.cos(lat) - .5*location.width/ftPerPixel,
        bottom: centerY + (location.lat - lat)*pxPerDegree - .5*location.width/ftPerPixel,
        width: location.width/ftPerPixel,
        height: location.width/ftPerPixel,
        boxSizing: "border-box",
    }}>{location.label}</div>
}
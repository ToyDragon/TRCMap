import { useRef, useState } from "react";
import { SheetsMetadata } from "./use_sheets_metadata";
import { TRCEvent } from "./use_all_events";


export enum Shape {
    Square = 1,
    Circle,
}

export interface TRCLocation {
    id: number;
    lat: number;
    lng: number;
    rotation: number;
    label: string;
    shape: Shape;
    width: number;
    height: number;
    colorR: number;
    colorG: number;
    colorB: number;
}

export default function useAllLocations(metadata: SheetsMetadata | null, event: TRCEvent | null, onError: () => void): [TRCLocation[] | null] {
    const [eventLocations, setEventLocations] = useState<TRCLocation[] | null>(null);
    const lastRequestedEvent = useRef<number | null>(null);

    if ((!event || !metadata) && eventLocations !== null) {
        lastRequestedEvent.current = null;
        setEventLocations(null);
    }

    if (event && metadata && lastRequestedEvent.current != event.id) {
        lastRequestedEvent.current = event.id;
        try {
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: metadata.mapItemsSheet,
                range: `${event.id}!A1:K`,
            }).then((response) => {
                if (lastRequestedEvent.current !== event.id) {
                    return;
                }
                const data = JSON.parse(response.body);
                const locations: TRCLocation[] = [];
                for (let i = 1; i < data.values.length; i++) {
                    const row = data.values[i];
                    locations.push({
                        id: Number(row[0]),
                        lat: Number(row[1]),
                        lng: Number(row[2]),
                        rotation: Number(row[3]),
                        label: row[4],
                        shape: Number(row[5]),
                        width: Number(row[6]),
                        height: Number(row[7]),
                        colorR: Number(row[8]),
                        colorG: Number(row[9]),
                        colorB: Number(row[10]),
                    });
                }
                setEventLocations(locations);
            });
        } catch (err) {
            console.error(err);
            onError();
        }
    }
    return [eventLocations];
}
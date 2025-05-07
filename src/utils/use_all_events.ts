import { useRef, useState } from "react";
import { SheetsMetadata } from "./use_sheets_metadata";

export interface TRCEvent {
    id: number;
    name: string;
    locationSheet: string;
    lat: number;
    lng: number;
    heading: number;
    zoom: number;
    hidden: boolean;
}

export default function useAllEvents(metadata: SheetsMetadata | null, onError: () => void): [TRCEvent[] | null] {
    const [allEvents, setAllEvents] = useState<TRCEvent[] | null>(null);
    const hasRequested = useRef(false);

    if (metadata && !hasRequested.current) {
        hasRequested.current = true;
        try {
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: metadata.eventsSheet,
                range: "Events!A1:H",
            }).then((response) => {
                const data = JSON.parse(response.body);
                const events: TRCEvent[] = [];
                console.log(data);
                for (let i = 1; i < data.values.length; i++) {
                    const row = data.values[i];
                    console.log(row);
                    events.push({
                        id: Number(row[0]),
                        name: row[1],
                        locationSheet: row[2],
                        lat: Number(row[3]),
                        lng: Number(row[4]),
                        heading: Number(row[5]),
                        zoom: Number(row[6]),
                        hidden: (row[7] as string).toLowerCase() === "true",
                    });
                }
                setAllEvents(events);
            });
        } catch (err) {
            console.error(err);
            onError();
        }
    }
    return [allEvents];
}
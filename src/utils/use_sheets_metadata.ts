import { useRef, useState } from "react";

export interface SheetsMetadata {
    mapItemsSheet: string;
    eventsSheet: string;
}

export default function useSheetsMetadata(gapiReady: boolean, onError: () => void): [SheetsMetadata | null] {
    const [metadata, setMetadata] = useState<SheetsMetadata | null>(null);
    const hasRequested = useRef(false);

    if (gapiReady && !hasRequested.current) {
        hasRequested.current = true;
        try {
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: "1gxvbmiHvucGcFV6cKdTS7AizvEIBZ1RbxLhEEf5_J8U",
                range: "Metadata!A1:B",
            }).then((response) => {
                const dataRows = JSON.parse(response.body);
                const dataDict: Record<string, string> = {};
                for (const [key, value] of dataRows.values) {
                    dataDict[key] = value;
                }
                if (dataDict["MapItemsDatabase"] && dataDict["EventsDatabase"]) {
                    console.log("set metadata");
                    setMetadata({
                        mapItemsSheet: dataDict["MapItemsDatabase"],
                        eventsSheet: dataDict["EventsDatabase"],
                    });
                } else {
                    onError();
                }
            });
        } catch (err) {
            console.error(err);
            onError();
        }
    }
    return [metadata];
}
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

export const GAPI_KEY = "AIzaSyDIHBOQ1RJUevjCW-s5HZAPftdudwtuERw";
const CLIENT_ID = '98922625190-807sm5s9oh3a8b2djpth3gkii7cuf3g9.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

export default function GapiAuth({ gapiToken, setGapiToken }: {
    gapiToken: null | GoogleApiOAuth2TokenObject,
    setGapiToken: Dispatch<SetStateAction<null | GoogleApiOAuth2TokenObject>>
}) {
    const [gapiClientLoaded, setGapiClientLoaded] = useState(false);
    const tokenClientRef = useRef<google.accounts.oauth2.TokenClient>(null);
    useEffect(() => {
        gapi.load("client", () => {
            tokenClientRef.current = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: () => setGapiToken(gapi.client.getToken()),
            });

            gapi.client.init({
                apiKey: GAPI_KEY,
                discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            }).then(() => setGapiClientLoaded(true));
        });
    }, []);

    const requestNewToken = useCallback(() => {
        const prompt = gapi.client.getToken() === null ? "consent" : "";
        tokenClientRef.current!.requestAccessToken({ prompt: prompt });
    }, []);

    if (gapiToken) {
        return <></>;
    }
    return (
        <div>
            <button onClick={requestNewToken} disabled={!gapiClientLoaded}>Authorize</button>
        </div>
    );
}
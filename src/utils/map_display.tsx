import React, { JSX } from 'react';
import { GAPI_KEY } from './gapi_auth';
import { TRCEvent } from './use_all_events';

export default function MapDisplay({trcEvent}: {trcEvent: TRCEvent}): JSX.Element {
    return <div>
        <iframe
            width="600"
            height="450"
            style={{border:0}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/view?key=${GAPI_KEY}&center=${trcEvent.lat},${trcEvent.lng}&zoom=${trcEvent.zoom}&maptype=satellite`}>
        </iframe>
    </div>;
}
import React from 'react';

import Marker from './Marker';
import CSSClasses from './Lane.module.css';

export default ({ title, bars, dates }) => {
    return (
        <div className="lane">
            <div className="laneHeader">{title}</div>
            <div className={CSSClasses.underBars}>
                {dates.map((date, i) => (
                    <Marker key={i} flexWidth={100 / 12}>
                        <div  className={CSSClasses.dateMarker}></div>
                    </Marker>
                ))}
            </div>
            {bars.map((ele, ind) => (
                <div key={ind}>A am a Bar, Start: {ele.start} and End: {ele.end}</div>
            ))}
        </div>
    )

};
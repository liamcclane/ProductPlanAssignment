import React from 'react';

import Marker from './Marker';
import CSSClasses from './Lane.module.css';

export default ({ title, laneId, dates, bars, onDragEnter }) => {

    // console.log("title", title);
    console.log("onDragEnter");
    console.log(onDragEnter !== null ? onDragEnter : "this is null")
    let content;

    if (title === "Lane") {
        // console.log("HEREEEEEEEEEEE!!! outline lane");
        content = (<div className="lane dropHere">
            <div>
                Drop Here
            </div>
        </div>);
    } else {
        content = (<div className="lane">
            <div className={CSSClasses.laneHeader}>
                <div className={CSSClasses.triangle}></div>
                {title}
            </div>
            <div className={CSSClasses.barWrapper}>
                <div className={CSSClasses.underBars}>
                    {dates.map((date, i) => (
                        <Marker key={i} flexWidth={100 / 12}>
                            <div className={CSSClasses.dateMarker}></div>
                        </Marker>
                    ))}
                </div>
                <div className={CSSClasses.overBars}>
                    {bars.map((ele, ind) => {
                        const barStyle = { minWidth: "200px", height: "50px" };
                        return (
                            <div style={barStyle} className={CSSClasses.bar} key={ind}>A am a Bar, Start: {ele.start} and End: {ele.end}</div>
                        );
                    })}
                </div>
            </div>
        </div>);
    }
    return content;
};
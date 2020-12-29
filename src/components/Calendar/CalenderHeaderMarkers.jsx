import React from "react";

import Marker from './Marker';

import CSSClasses from './CalenderHeaderMarker.module.css';

export default props => {
    const len = 100 / props.arr.length;
    return (
        <div className="lane-markers">
            {props.arr.map((marker, i) => (
                <Marker key={i} flexWidth={len}>
                    {marker.quarterMarker
                        ? marker.quarterMarker
                        : ""}
                    <br />*
                </Marker>
            ))}
        </div>
    );
};


import React from 'react';

import CSSClasses from './Marker.module.css';


export default props => {
    const flexStyle = {
        width: props.flexWidth + "%",
    };
    return (
        <div style={flexStyle}>
            {props.children}
        </div>
    )
};
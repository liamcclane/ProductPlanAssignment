import React from 'react';

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
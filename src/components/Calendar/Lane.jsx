import React from 'react';


export default ({title, bars})=> {


    return (
        <>
            <div className="lane">
                <div className="laneHeader">{title}</div>
                {bars.map((ele, ind) => (
                    <div key={ind}>A am a Bar, Start: {ele.start} and End: {ele.end}</div>
                ))}
            </div>
        </>
    )

};
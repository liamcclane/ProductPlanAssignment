import React, { useState } from 'react';

import Marker from './Marker';
import CSSClasses from './Lane.module.css';

export default ({ title, laneId, dates, bars,
    dragEnterFunction, dragLeaveFunction, changeTitle, deleteLane }) => {

    let content;
    const [editing, setEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const openEditor = e => { setEditing(true) };

    const save = (e) => {
        e.preventDefault();
        if (editTitle.length > 2 && editTitle != "lane") {
            changeTitle(laneId, editTitle);
            setEditing(false);
        } else {
            alert("you cannot name your lane that");
        }
    };


    const editDiv = (
        <form onSubmit={save}>
            <input type="text" placeholder={title} onChange={e => setEditTitle(e.target.value)} />
            <input type="submit" />
        </form>
    );

    if (title === "Lane") {
        content = (
            <div className="lane dropHere">
                <div>
                    Drop Here
                </div>
            </div>
        );
    } else {
        content = (
            <div className="lane"
                onDragEnter={dragEnterFunction !== null
                    ? e => dragEnterFunction(e, { laneId: laneId }) : null}
                onDragLeave={dragLeaveFunction !== null ?
                    e => dragLeaveFunction(e, { laneId: laneId }) : null}
            >
                <div className={CSSClasses.laneHeader}>
                    <div className={CSSClasses.laneHeaderLeft}>
                        <div className={CSSClasses.triangle}></div>
                        {editing
                            ? editDiv
                            : <div onDoubleClick={e => openEditor(e)}>{title}</div>
                        }
                    </div>
                    <div onClick={e => deleteLane(e,laneId)}>X</div>
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
                            const barStyle = { minWidth: "25%", height: "50px" };
                            return (
                                <div style={barStyle} className={CSSClasses.bar} key={ind}>
                                    I am a BAR
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    return content;
};
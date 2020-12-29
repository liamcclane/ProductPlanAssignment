import React, { useState, useRef } from "react";

import CalenderHeaderMarkers from "./CalenderHeaderMarkers";
import Lane from './Lane'

import DragIcon from "./../../static/images/add-icon.png";

export default props => {
    const dates = [
        { "date": "2020-11", "quarterMarker": "2020" },
        { "date": "2020-12" },
        { "date": "2021-1", "quarterMarker": "Q1 2021" },
        { "date": "2021-2" },
        { "date": "2021-3" },
        { "date": "2021-4", "quarterMarker": "Q2 2021" },
        { "date": "2021-5" },
        { "date": "2021-6" },
        { "date": "2021-7", "quarterMarker": "Q3 2021" },
        { "date": "2021-8" },
        { "date": "2021-9" },
        { "date": "2021-10", "quarterMarker": "Q4 2021" },
    ];
    const blankNewLane = { "title": "Lane", "bars": [] };
    const [lanes, setLanes] = useState([
        { "title": "Lane 1", "bars": [
            {"start" : "something", "end" : "something else"},
            {"start" : "something", "end" : "something else"}
        ] }
    ]);
    const [dragging, setDragging] = useState(false);
    const whichAdd = useRef();
    const dragNode = useRef();
    const laneIndexAdd = useRef();

    const addNewLane = (e) => {
        e.preventDefault();
        let len = lanes.length;
        if (len === 0) {
            setLanes([{ "title": "Lane 1", "bars": [] }]);
            return;
        } else {
            let deepCopy = JSON.parse(JSON.stringify(lanes));
            let newLane = JSON.parse(JSON.stringify(blankNewLane));
            newLane["title"] +=  " " + (len + 1);
            deepCopy.push(newLane);
            setLanes(deepCopy);
        }
    };
    const addNewBar = (e, params) => {
        console.log("AddingBar");
    };


    const dragStartLane = (e) => {
        e.preventDefault();
        console.log("starting drag for lane");
        whichAdd.current = "lane";
        e.target.addEventListener('dragend', dragEndHandel);
        console.log(whichAdd.current, "start function");
        console.log(dragNode.current, "start function");
        setDragging(true);
    };
    const dragEndHandel = (e, params) => {
        console.log("ENDING DRAG");
        console.log(whichAdd.current);
        dragNode.current.removeEventListener('dragend', dragEndHandel);
        if (whichAdd.current === "lane") {
            addNewLane(e);
        } else {
            addNewBar(e, params);
        }
        setDragging(false);
        whichAdd.current = null;
    };
    const dragStartBar = (e) => {
        e.preventDefault();
        whichAdd.current = "bar";
        console.log("starting drag for BARR");
        setDragging(true);
    };


    return (
        <div className="main">
            <div draggable className="calenderArea">
                <CalenderHeaderMarkers arr={dates} />
                {lanes.map((ele, ind) => (
                    <Lane title={ele.title} dates={dates} bars={ele.bars} key={ind} />
                ))}
            </div>
            <div className="dragArea">
                <div className="dragButtons" onClick={e => addNewLane(e)}>
                    <div className="hamburger"></div>
                    <div>Add Lane</div>
                </div>
                <div className="dragButtons" onClick={e => addNewBar(e, { laneInd: 0 })}>
                    <div className="hamburger"></div>
                    <div>Add Bar</div>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useRef, useEffect } from "react";

import CalenderHeaderMarkers from "./CalenderHeaderMarkers";
import Lane from './Lane'
import Instruction from "./Instruction";

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
    const [lanes, setLanes] = useState([
        {
            "title": "Lane", "bars": [
                { "start": "something", "end": "something else" },
                { "start": "something", "end": "something else" }
            ]
        }
    ]);
    const [instructionalPanel, setInstructionalPanel] = useState({
        isOpen: false,
        instructions: "lane"
    });
    const blankNewLane = { "title": "Lane", "bars": [] };
    const shakeBtnStyle = ["drageButtons", "shaking"].join(" ");
    const [dragging, setDragging] = useState(false);
    const whichAdd = useRef();
    const dragNode = useRef();
    const holdLanes = useRef();
    const laneIndexAdd = useRef();

    // useEffect(() => {
    //     setTimeout(() => {
    //         setInstructionalPanel({
    //             isOpen: true,
    //             instructions: "lane"
    //         })
    //     }, 2000);
    // }, []);



    // instructional panel functions
    /**
     * 
     * @param {*} e 
     */
    const closePanel = (e, moveTo) => {
        e.preventDefault();
        setInstructionalPanel({ isOpen: false, instructions: moveTo });
    };
    /**
     * 
     * @param {*} e 
     */
    const setBarInstructions = e => {
        e.preventDefault();
        let old = instructionalPanel;
        old.instructions = "bar";
        old.isOpen = true;
        setBarInstructions(old);
    }

    // state manipulation of lanes
    /**
     * 
     * @param {*} e 
     */
    const finalizeLane = (e) => {
        e.preventDefault();
        let len = lanes.length;
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy.pop();
        let newestLane = blankNewLane;
        newestLane.title += " " + (len + 1);
        holdLanes.current.push(newestLane);
        console.log("hold lane");
        console.log(holdLanes.current);
        setLanes(holdLanes.current);
        // holdLanes.current = null;
    };
    /**
     * 
     * @param {*} e 
     * @param {*} params 
     */
    const addNewBar = (e, params) => {
        console.log("AddingBar");
    };

    // 




    // drag start functions
    /**
     * 
     * @param {event} e 
     */
    const dragStartLane = (e) => {
        console.log("starting drag for lane");
        whichAdd.current = "lane";
        dragNode.current = e.target;
        holdLanes.current =  JSON.parse(JSON.stringify(lanes));
        dragNode.current.addEventListener('dragend', dragEndHandel);
        console.log(whichAdd.current, "start function");
        console.log(dragNode.current, "start function");
        setTimeout(() => { setDragging(true); }, 0);
    };
    /**
     * 
     * @param {*} e 
     */
    const dragStartBar = (e) => {
        e.preventDefault();
        whichAdd.current = "bar";
        console.log("starting drag for BARR");
        setDragging(true);
    };

    // drag enter functions
    /**
     * 
     * @param {*} e 
     */
    const ghostLaneHandel = e => {
        console.log("GHOSTLANEHANDLE")
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy.push(blankNewLane);
        setLanes(deepCopy);
    };
    const ghostBarHandle = e => {

    };

    // drag leave functions
    /**
     * 
     * @param {*} e 
     */
    const dissipateGhostLane = e => {
        console.log("DISAPPATE");
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy.pop();
        setLanes(deepCopy);
    };


    //drag end function
    /**
     * 
     * @param {*} e 
     * @param {*} params 
     */
    const dragEndHandel = (e, params) => {
        console.log("ENDING DRAG");
        console.log(whichAdd.current);
        dragNode.current.removeEventListener('dragend', dragEndHandel);
        if (whichAdd.current === "lane") {
            finalizeLane(e);
        } else {
            addNewBar(e, params);
        }
        setDragging(false);
        holdLanes.current = null;
        whichAdd.current = null;
    };



    return (
        <div className="main">
            <div className="calenderArea"
                onDragEnter={dragging && whichAdd.current === "lane"
                    ? e => ghostLaneHandel(e) : null}
                onDragLeave={dragging && whichAdd.current === "lane"
                    ? e => dissipateGhostLane(e) : null}
            >
                <CalenderHeaderMarkers arr={dates} />
                {lanes.map((ele, ind) => (
                    <Lane key={ind} title={ele.title} laneId={ind} dates={dates} bars={ele.bars}
                        onDragEnter={dragging && whichAdd.current === "lane"
                            ? e => ghostLaneHandel(e)
                            : dragging && whichAdd.current === "bar" ? e => ghostBarHandle(e) : null}
                    />
                ))}
            </div>

            {instructionalPanel.isOpen === true
                ? <Instruction closePanel={closePanel} instructions={instructionalPanel.instructions} />
                : ""}
            <div className="dragArea">
                <div className={dragging && whichAdd.current === "lane" ? shakeBtnStyle : "dragButtons"}
                    draggable onDragStart={e => dragStartLane(e)} >
                    <div className="hamburger"></div>
                    <div>Add Lane</div>
                </div>
                <div className={dragging && whichAdd.current === "bar" ? shakeBtnStyle : "dragButtons"}
                    draggable onDragStart={e => dragStartBar(e)}>
                    <div className="hamburger"></div>
                    <div>Add Bar</div>
                </div>
            </div>
        </div>
    );
}
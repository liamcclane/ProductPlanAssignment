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
        // {
        //     "title": "Lane 1", "bars": [
        //         // { "start": "something", "end": "something else" },
        //         // { "start": "something", "end": "something else" }
        //     ]
        // }
    ]);
    const [instructionalPanel, setInstructionalPanel] = useState({
        isOpen: false,
        instructions: "lane"
    });
    const blankNewLane = { "title": "Lane", "bars": [] };
    const blankNewBar = { "start": "stageBar", "end": "none" };
    const shakeBtnStyle = ["dragButtons", "shake"].join(" ");
    const [dragging, setDragging] = useState(false);
    const whichAdd = useRef();
    const dragNode = useRef();
    const holdLanes = useRef();
    const laneIndexAdd = useRef();

    useEffect(() => {
        setTimeout(() => {
            setInstructionalPanel({
                isOpen: true,
                instructions: "lane"
            })
        }, 2000);
    }, []);

    /***instructional panel functions***/
    /**
     * 
     * @param {event} e 
     */
    const changePanelIsOpen = (e, isOpen) => {
        e.preventDefault();
        let old = instructionalPanel.instructions;
        setInstructionalPanel({ isOpen: isOpen, instructions: old });
    };
    /**
     * 
     * @param {event} e 
     */
    const setBarInstructionsPanel = e => {
        e.preventDefault();
        setInstructionalPanel({ isOpen: true, instructions: "bar" });
    };
    /**
     * 
     * @param {event} e 
     */
    const setLastInstructionsPanel = e => {
        e.preventDefault();
        setInstructionalPanel({ isOpen: true, instructions: "last" });
    };




    /*********LANE functions**************/
    /**
     * 
     * @param {event} e 
     */
    const dragStartLane = (e) => {
        // console.log("starting drag for lane");
        whichAdd.current = "lane";
        dragNode.current = e.target;
        holdLanes.current = JSON.parse(JSON.stringify(lanes));
        dragNode.current.addEventListener('dragend', dragEndHandel);
        setDragging(true); 
        // setTimeout(() => { 
        // }, 0);
    };
    /**
     * 
     * @param {event} e 
     */
    const ghostLaneHandel = e => {
        // console.log("ghost LANE handle");
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy.push(blankNewLane);
        setLanes(deepCopy);
    };
    /**
     * 
     * @param {event} e 
     */
    const dissipateGhostLane = e => {
        // console.log("dissipate ghost lane");
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy.pop();
        setLanes(deepCopy);
    };
    /**
     * 
     * @param {event} e 
     */
    const finalizeLane = (e) => {
        e.preventDefault();
        let len = lanes.length;
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy.pop();
        let newestLane = blankNewLane;
        newestLane.title += " " + (len + 1);
        holdLanes.current.push(newestLane);
        // console.log("hold lane");
        // console.log(holdLanes.current);
        setLanes(holdLanes.current);
    };
    /**************************************/


    /************BAR Functions*************/
    /**
     * drag start 
     * @param {event} e 
     */
    const dragStartBar = (e) => {
        console.log("starting drag for BARR");
        whichAdd.current = "bar";
        dragNode.current = e.target;
        holdLanes.current = JSON.parse(JSON.stringify(lanes));
        dragNode.current.addEventListener('dragend', dragEndHandel);
        setDragging(true); 
        // setTimeout(() => { 
        // }, 0);
    };
    /**
     * drag enter function
     * @param {event} e 
     * @param {*} params 
     */
    const ghostBarHandle = (e, params) => {
        console.log("ENTER!!! ghost BAR handle");
        laneIndexAdd.current = null;
        laneIndexAdd.current = params.laneId;
        console.log(laneIndexAdd.current, "After <= LANE INDEX ID");
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy[params.laneId].bars.push(blankNewBar);
        setLanes(deepCopy);
    };
    /**
     * drag leave function
     * @param {event} e 
     * @param {*} params 
     */
    const dissipateGhostBar = (e, params) => {
        console.log("dissipate ghost bar");
        console.log("laneIndexAdd.current   => ", laneIndexAdd.current);
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy[params.laneId].bars.pop();
        setLanes(deepCopy);
    };
    // state manipulation of lanes
    /**
     * 
     * @param {event} e 
     * @param {*} params 
     */
    const finalizeBar = (e, params) => {
        e.preventDefault();
        console.log("AddingBar");
        console.log("******holdLanes.current BEFORE*******");
        console.log(holdLanes.current);
        console.log("laneIndexAdd.current", laneIndexAdd.current);
        if(laneIndexAdd.current === undefined || laneIndexAdd.current === null ) {
            return;
        }
        holdLanes.current[laneIndexAdd.current].bars.push({ "start": "something", "end": "something else" });
        console.log("******holdLanes.current AFTER*******");
        console.log(holdLanes.current);
        setLanes(holdLanes.current);
        if (!instructionalPanel.isOpen && instructionalPanel.instructions === "bar") {
            setLastInstructionsPanel(e);
        }
    };
    /**************************************/

    /**
     * drag end function
     * @param {event} e 
     * @param {*} params 
     */
    const dragEndHandel = (e, params) => {
        console.log("ENDING DRAG");
        dragNode.current.removeEventListener('dragend', dragEndHandel);
        if (whichAdd.current === "lane") {
            finalizeLane(e);
        } else {
            console.log("whichAdd.current", whichAdd.current);
            console.log("Calling finalizeBar function");
            finalizeBar(e, params);
            laneIndexAdd.current = null;
        }
        setDragging(false);
        holdLanes.current = null;
        whichAdd.current = null;
        if (instructionalPanel.isOpen === false && instructionalPanel.instructions === "lane") {
            setTimeout(() => {
                setBarInstructionsPanel(e);
            }, 1000);
        } else if (instructionalPanel.isOpen === false && instructionalPanel === "bar") {
            setTimeout(() => {
                setLastInstructionsPanel(e);
            }, 1000);
        }
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
                        dragEnterFunction={dragging && whichAdd.current === "bar"
                            ? ghostBarHandle : null}
                        dragLeaveFunction={dragging && whichAdd.current === "bar"
                            ? dissipateGhostBar : null}
                    />
                ))}
            </div>

            {instructionalPanel.isOpen === true
                ? <Instruction changePanelIsOpen={changePanelIsOpen} instructions={instructionalPanel.instructions} />
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
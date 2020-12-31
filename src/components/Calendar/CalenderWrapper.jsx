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
        //         { "start": "something", "end": "something else" },
        //         { "start": "something", "end": "something else" }
        //     ]
        // }
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
    const changePanelIsOpen = (e, isOpen) => {
        e.preventDefault();
        let old = instructionalPanel.instructions;
        setInstructionalPanel({ isOpen: isOpen , instructions: old});
    };
    /**
     * 
     * @param {*} e 
     */
    const setBarInstructionsPanel = e => {
        e.preventDefault();
        setInstructionalPanel({isOpen : true, instructions: "bar"});
    };
    /**
     * 
     * @param {*} e 
     */
    const setLastInstructionsPanel = e => {
        e.preventDefault();
        setInstructionalPanel({isOpen : true, instructions: "last"});
    };
    

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
        // console.log("hold lane");
        // console.log(holdLanes.current);
        setLanes(holdLanes.current);
    };
    /**
     * 
     * @param {*} e 
     * @param {*} params 
     */
    const addNewBar = (e, params) => {
        // console.log("AddingBar");
    };



    // drag start functions
    /**
     * 
     * @param {event} e 
     */
    const dragStartLane = (e) => {
        // console.log("starting drag for lane");
        whichAdd.current = "lane";
        dragNode.current = e.target;
        holdLanes.current =  JSON.parse(JSON.stringify(lanes));
        dragNode.current.addEventListener('dragend', dragEndHandel);
        // console.log(whichAdd.current, "start function");
        // console.log(dragNode.current, "start function");
        setTimeout(() => { setDragging(true); }, 0);
    };
    /**
     * 
     * @param {*} e 
     */
    const dragStartBar = (e) => {
        e.preventDefault();
        console.log("starting drag for BARR");
        whichAdd.current = "bar";
        dragNode.current = e.target;
        holdLanes.current =  JSON.parse(JSON.stringify(lanes));
        dragNode.current.addEventListener('dragend', dragEndHandel);
        setTimeout(() => { setDragging(true); }, 0);
    };

    // drag enter functions
    /**
     * 
     * @param {*} e 
     */
    const ghostLaneHandel = e => {
        // console.log("GHOSTLANEHANDLE")
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy.push(blankNewLane);
        setLanes(deepCopy);
    };
    const ghostBarHandle = (e, params) => {
        console.log("e.target GHOST BAR FUNCTION");
        console.log(e.target);
        let deepCopy = JSON.parse(JSON.stringify(lanes));
        deepCopy[params.laneId]["bars"].push({ "start": "something", "end": "something else" });
        setLanes(deepCopy);
    };

    // drag leave functions
    /**
     * 
     * @param {*} e 
     */
    const dissipateGhostLane = e => {
        // console.log("DISAPPATE");
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
        // console.log("ENDING DRAG");
        // console.log(whichAdd.current);
        dragNode.current.removeEventListener('dragend', dragEndHandel);
        if (whichAdd.current === "lane") {
            finalizeLane(e);
        } else {
            addNewBar(e, params);
        }
        setDragging(false);
        holdLanes.current = null;
        whichAdd.current = null;
        if(instructionalPanel.isOpen === false && instructionalPanel.instructions === "lane") {
            // console.log(instructionalPanel," line 187");
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
                    ? e => ghostLaneHandel(e) 
                    : dragging && whichAdd.current === "bar" 
                        ? e => ghostBarHandle(e, {laneId :0}) :null}
                onDragLeave={dragging && whichAdd.current === "lane"
                    ? e => dissipateGhostLane(e) 
                    : null}
            >
                <CalenderHeaderMarkers arr={dates} />
                {lanes.map((ele, ind) => (
                    <Lane key={ind} title={ele.title} laneId={ind} dates={dates} bars={ele.bars}
                        onDragEnter={dragging && whichAdd.current === "lane"
                            ? e => ghostLaneHandel(e)
                            : dragging && whichAdd.current === "bar" ? e => ghostBarHandle(e, { laneId : ind}) : null}
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
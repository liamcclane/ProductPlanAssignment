import React from 'react';

import CSSClasses from './Instruction.module.css';

import LaneImg from './../../static/images/addLane-icon.png';
import BarImg from './../../static/images/addBar-icon.png';
import EX from './../../static/images/ex-icon.png';



export default ({ changePanelIsOpen, instructions }) => {
    const laneInstructions = (
        <>
            <img className={CSSClasses.centerImg} src={LaneImg}></img>
            <h3>We'll start with a lane</h3>
            <p>lane represent high level of Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Iste hic porro magni accusantium optio
            aliquid exercitationem doloremque odit temporibus excepturi,
                repellat, magnam rem odio vel? Possimus id dignissimos ut doloremque.</p>
        </>
    );
    const barInstructions = ((
        <>
            <img className={CSSClasses.centerImg} src={BarImg}></img>
            <h3>Awesome! Now let's add a few bars.</h3>
            <p>Bars are your specific initiabe. Use them Lorem,
            ipsum dolor sit amet consectetur adipisicing elit.
            Tempore molestias at quam consectetur ratione doloribus,
            dicta alias dolore fuga a minus eum sint veritatis
                similique aut ex optio eligendi ullam?</p>
        </>
    ));
    const lastInstruction = (
        <>
            <h3>Alright let's set up a couple more</h3>
            <p>Once they''re added you can share out your roadmap with your team</p>
        </>
    );
    let content;
    // console.log("instructions in instructions.jsx =>", instructions);
    if (instructions === "lane") {
        content = laneInstructions;
    } else if (instructions == "bar") {
        content = barInstructions;
    } else {
        content = lastInstruction;
    }
    
    return (
        <div className={CSSClasses.overlay}>
            <div id={CSSClasses.text}>
                <div className={CSSClasses.iconWrapper}>
                    <img onClick={e => changePanelIsOpen(e, false)} className="ex-icon" src={EX}></img>
                </div>
                {content}
                <div className="btn btn-primary" onClick={e => changePanelIsOpen(e, false)} >Got iT</div>
            </div>
            <div className={CSSClasses.triangleRight}></div>
        </div>
    )
}
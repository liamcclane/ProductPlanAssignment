import React from 'react';

import CSSClasses from './Instruction.module.css';

import LaneImg from './../../static/images/addLane-icon.png';
import BarImg from './../../static/images/addBar-icon.png';
import EX from './../../static/images/ex-icon.png';



export default ({ closePanel, children, instructions }) => {
    // console.log();
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
    // switch instructions:
    //     case "lane":
    //         content = laneInstructions;
    //         break;
    switch (instructions) {
        case "lane":
            content = laneInstructions;
            break;
        case "bar":
            content = barInstructions;
            break;
        default:
            content = lastInstruction;
            break;
    };


    return (
        <div className={CSSClasses.overlay}>
            <div id={CSSClasses.text}>
                <div className={CSSClasses.iconWrapper}>
                    <img className="ex-icon" src={EX}></img>
                </div>
                {content}
                <div className="btn btn-primary" onClick={e => closePanel(e)} >Got iT</div>
            </div>
            <div className={CSSClasses.triangleRight}></div>
        </div>
    )
}
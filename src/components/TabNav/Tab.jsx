import React from 'react';

import CSSClasses from './Tab.module.css';

export default ({ label, isActive }) => {
    let classe = ["nav-link", CSSClasses.ppNavItem ];
    if (isActive) { classe.push("active"); }
    classe = classe.join(" ");
    
    return (
        <>
            <li className={["nav-item"].join(" ")}>
                <a className={classe} aria-current="page" href="#">{label}</a>
            </li>
        </>
    )
}
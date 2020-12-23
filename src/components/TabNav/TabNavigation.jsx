import React, { useState } from 'react';

import Tab from "./Tab";

export default props => {
    const [navItems, setNavItems] = useState([
        { "label": "Roadmap", "isActive": true },
        { "label": "Planing board", "isActive": false },
        { "label": "Parking lot", "isActive": false },
    ]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Product roadmap</h1>
                    <div className="" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {navItems.map((ele, ind) => (
                                <Tab label={ele.label} isActive={ele.isActive} key={ind} />
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
};

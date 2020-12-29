import React from 'react';

import Logo from './../static/images/productplan-favicon.png';
import SearchIcon from './../static/images/search-icon.png';
import CSSClasses from './Header.module.css';

export default props => {
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className={["navbar-brand", CSSClasses.brandBox].join(" ")}>
                        <img src={Logo} alt="ProductPlan" />
                        <div className={CSSClasses.bolded}>ProductPlan</div>
                        <div className={CSSClasses.divider}>Candidate Roadmap</div>
                    </div>
                    <form className="d-flex">
                        <img src={SearchIcon} alt="search" height="40" />
                    </form>
                </div>
            </nav>
        </>
    )
}
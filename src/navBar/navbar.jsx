import React from "react"
import "./navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {

    return ( 
        <div className="BigMom">
        <div className="Navmom">

            <div>TIME<span>MANGER</span></div>

            <div className="Navlist">
                <div>Home</div>
                <div>Tasks</div>
                <div>Note Pad</div>
                <div>Minteur</div>
            </div>

            <div className="user-icon">
                <FontAwesomeIcon icon={faCircleUser} />
            </div>

        </div>
        
        </div>
    )
    
}

export default Navbar;
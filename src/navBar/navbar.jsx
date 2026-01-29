import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {

    return ( 

        <div>
            <div>TIME<span>MANGER</span></div>
            <div>
                <div>Home</div>
                <div>TASKS</div>
                <div>Note Pad</div>
                <div>Minteur</div>
            </div>
            <div>
                <FontAwesomeIcon icon={faCircleUser} />
            </div>
        </div>
    )
    
}
//exporting navbar
export default Navbar;
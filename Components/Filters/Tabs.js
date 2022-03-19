import { useState } from 'react';
import Image from 'next/image'
import { Filters } from './Filters';
import { context } from '../../Context/HandleContext';

// =======================================================

import styles from './Filters.module.css';
import FilterIcon from '../assets/filter_icon.svg'

export default function Tabs  () {
    const { 
        btn_filter,  
        fltr_cm, 
        filter_relative,
        links,
        active,
        icon,
    } = styles;

    const [ showMenu, setShowMenu ] = useState(false);
    const { status, handleStatus, selectUpcomingRides, selectPastRides } = context()

    // handle classes
    const nearestRide = status === "" ? active : null
    const upcoming = status === "upcoming" ? active : null
    const past = status === "past" ? active : null

    // get rides length
    const upcomingCount = selectUpcomingRides().length;

    const pastCount = selectPastRides().length;
    
    return (
        <div>
            <div className = { styles.filter_container }>
                <ul className = { links } >
                    <li 
                    onClick = { () => handleStatus("") }
                    className = { nearestRide }>
                        Nearest rides
                    </li>

                    <li 
                    onClick = { () => handleStatus("upcoming") }
                    className = { upcoming }>
                        <span>Upcoming rides {`(${ upcomingCount })`}</span>
                    </li>

                    <li 
                    onClick = { () => handleStatus("past") }
                    className = { past }>
                        <span>Past rides {`(${ pastCount })`}</span>
                    </li>
                </ul>

                <div className = { filter_relative }>
                    <div 
                    onClick = { () => setShowMenu( prev=> !prev ) }
                    className = { btn_filter } 
                    role = "button">
                        <span className = { icon }>
                            <FilterIcon />
                        </span>
                        Filters
                    </div>
                    { 
                        showMenu && 
                        <Filters setShowMenu = { setShowMenu } />  
                    }
                </div>
            </div>

        </div>
    );
};
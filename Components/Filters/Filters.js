import { useRef, useEffect } from 'react';
import styles from './Filters.module.css';
import { context } from '../../Context/HandleContext';


function useOutsideAlerter(ref, setShowMenu) {
    useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowMenu(false)
        }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("click", handleClickOutside);
    };
    }, [ref]);
}
export const Filters = ({ setShowMenu }) => {

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setShowMenu);
    const { dataStates, dataCities, filters, handleFilters } = context();

    
    return (
        <div>
        <ul className = { styles.menu } ref={wrapperRef}>
            <li>Filters</li>
            
            <li>
                <select 
                onChange = { e => handleFilters({ ...filters, state: e.target.value }) } 
                value = { filters.state }
                className = { styles.control }>
                    <option value = "">State</option>
                    {
                        dataStates?.map((st)=>{
                            return(
                                <option value = {st}>{st}</option>
                            )
                        })
                    }
                </select>
            </li>
            
            <li>
                <select 
                onChange = { e => handleFilters({ ...filters, city: e.target.value }) }
                value = { filters.city } 
                className = { styles.control }>
                    <option value = "">City</option>
                    {
                        dataCities?.map((st)=>{
                            return(
                                <option value = {st}>{st}</option>
                            )
                        })
                    }
                </select>
            </li>
        </ul>
        </div>
    );
};
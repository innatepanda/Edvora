import axios from 'axios';
import React, { useState, useContext, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';


const ApiContext = createContext();

export const context = () => useContext( ApiContext );


export default function HandleContext({ children }) {
    
    const [ user, setUser ] = useState({});
    const [ ride, setRides ] = useState([]); 
    const [ filters, setFilters ] = useState({ state:"", city: "" });
    const [ dataStates, setStates ] = useState([]);
    const [ dataCities, setCities ] = useState([]);
    const [ status, setStatus ] = useState(""); // upcoming, past

    useEffect(() => {
        toast.info("Loading data")
        getUserData();
        getRideData();
        
    }, [])
    const getUserData = () =>{
        axios.get('https://assessment.api.vweb.app/user')
        .then((response)=>{
            setUser(response.data);
        }).catch((e)=>{
            toast.error("Error occured")
            console.log(e)
        })

    }
    const getRideData = () =>{
        axios.get('https://assessment.api.vweb.app/rides')
        .then((response)=>{
            var res = response.data;
            var arr = []; var k = 0; var crr = []; var l = 0;
            for( var i=0; i< res.length; i++)
            {
                if( !arr.includes(res[i].state) )
                    arr[k++] = res[i].state;
                if( !crr.includes(res[i].city) )
                    crr[l++] = res[i].city;
            }
            setStates(arr);
            setCities(crr);
            setRides(res);
        }).catch(e=>{
            toast.error("Error occured")
            console.log(e);
        })
        
    }


    useEffect(() => {
        if(dataStates)
            toast.dismiss()
    }, [ride, user])

    //  Upcoming ride: It shows all rides which has date in future. 
    //we have to filter the data by applying filter on state and city
    function selectUpcomingRides() {
        const current = new Date().getTime();
        return ride.filter( obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity  = filters.city  ? obj.city === filters.city : !filters.city;
            const dt = new Date(obj.date);
            return ( dt.getTime()>= current) && filterState && filterCity
        });
    }


     //Past ride: rides with dates earlier than present
    function selectPastRides() {
        const current = new Date().getTime();
        return ride.filter(obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity = filters.city ? obj.city === filters.city : !filters.city;
            const dt = new Date(obj.date);
            return (dt.getTime() < current) && filterState && filterCity;
        });
    }


    function selectAllRides() {
        return ride.filter( obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity  = filters.city  ? obj.city === filters.city : !filters.city;
            return filterState && filterCity
        });
    }

    
    /* return Ride by selected ( status ) // upcoming, past and "" ( for all rides )  
     * Apply the Filter by: state and city*/

    const getRides = () => {

        switch(status) {
            case "upcoming": return selectUpcomingRides();

            case "past": return selectPastRides();

            default: return selectAllRides();
        }
    }

    //handle status of state and filter state
    const handleStatus = (state) => {
        setStatus( state );
    }
    const handleFilters = (obj) => {
        setFilters( obj );
    } 

    
    const value = {
        handleStatus,
        handleFilters,
        selectUpcomingRides,
        selectPastRides,
        getRides,
        dataStates,
        dataCities,
        filters,
        status,
        ride,
        user,
    };


    return (
        <ApiContext.Provider value = { value } >
            { children }
        </ApiContext.Provider>
    )
}

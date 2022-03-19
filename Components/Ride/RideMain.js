import { context } from '../../Context/HandleContext';
import  Ride from './Ride';
import styles from './RideMain.module.css'
import  { sortByNearest } from './distance';

export default function RideMain () {
    const { user, getRides } = context();
    const nearest = sortByNearest( getRides(), user.station_code )
    
    return (
        <div>
            { nearest && nearest.length ? 
                nearest.map(( data, index ) => 
                (
                    <Ride key = {index} user_station_code = {user.station_code} details = {data} /> 
                )
            
            ) :
                <div className = { styles.infotext } >No results found</div>
            }
        </div>
    );
};
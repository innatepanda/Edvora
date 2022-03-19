import styles from './RideMain.module.css'
import { calcDistance } from './distance';
import default_map from '../assets/default_map.png'
import Image from 'next/image'

export default function Ride ({details, user_station_code}) {

    
    //to change date format to json
    const dt = new Date(details.date);
    var d = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
   
    const _date = d.toDateString().split(" ");

    const _time = d.toTimeString().substring(0, 5)
    const txtDate =  `${ _date[2] }th ${ _date[1] } ${ _date[3] } ${ _time }` ;
    const distance = details.station_path? calcDistance( details.station_path,  user_station_code ):0;

    return (
        <div className='container'>
            <div className = { styles.ride }>
                <div className = { styles.map }>
                    <Image src = {default_map} alt = "map"/>            
                </div>

                <div className = { styles.ride_d }>
                    <p>
                        Ride Id : {" "}
                        <span 
                        className = { styles.text }>
                            { details.id }
                        </span>
                    </p>

                    <p>
                        Origin Station : {" "}
                        <span 
                        className = { styles.text }>
                            { details.origin_station_code }
                        </span>
                    </p>

                    <p>
                        Station_path : {" "}
                        <span 
                        className = { styles.text }>
                            { `[${ details.station_path?.join(", ") }]` }
                        </span>
                    </p>

                    <p>
                        Date: {" "}
                        <span 
                        className = { styles.text }>
                            { txtDate }
                        </span>
                    </p>
                    
                    <p>
                        Distance: {" "}
                        <span 
                        className = { styles.text }>
                            { distance }
                        </span>
                    </p>
                </div>


                <div className = { styles.badges }>
                    <span className = { styles.badge } >{ details.city }</span>
                    <span className = { styles.badge } >{ details.state }</span>
                </div>
            </div>
        </div>
    );
};
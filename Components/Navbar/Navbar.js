import styles from './Navbar.module.css';
import {context} from '../../Context/HandleContext'

export default function NavBar () {

    
    const { user } = context();
    return (
        <div className = { styles.navbar } >                 
            <div className = {styles.logo} >
                Edvora
            </div>
            {
                <div className = { styles.userdets }>
                    <p className = { styles.name } >{user.name}</p>

                    <div className = { styles.pic } >
                        <img src ={user.url} alt = "profile pic"  width="100%"/>
                    </div>
                </div>
            }             
        </div>
    );
}
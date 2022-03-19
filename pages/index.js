import styles from '../styles/Home.module.css'
import {useEffect} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// COMPONENTS ===============================================
import Navbar from '../Components/Navbar/Navbar'
import RideMain from '../Components/Ride/RideMain'
import Tabs from '../Components/Filters/Tabs'



export default function Home() {

  useEffect(() => {
    toast.configure();
  }, [])

  return (
    <div >
      <Navbar />
      <div className={styles.container}>
            <Tabs />
            <RideMain />
      </div>
    </div>
  )
}

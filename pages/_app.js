import '../styles/globals.css'
import HandleContext from '../Context/HandleContext'
function MyApp({ Component, pageProps }) {
  return (
  <HandleContext>
      <Component {...pageProps} />
  </HandleContext>
  )
  
}

export default MyApp

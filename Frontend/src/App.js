import { useLocation } from 'react-router';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import AllRoutes from './Routes/AllRoutes';

function App() {
  const location = useLocation();
  const loginpage=location.pathname==="/";
  return (
    <div >
       <div
          style={{
            marginLeft: loginpage ? "0" : "50px",
            padding:
              location.pathname === "/" ||
              location.pathname === "/dashboard" ||
              location.pathname === "/employee" 
             
                ? "0"
                : "15px",
          }}
        >
     {!loginpage && <Navbar />}   
     <AllRoutes />
    </div>
    </div>
  );
}

export default App;


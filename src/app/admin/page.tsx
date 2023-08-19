
import Hamburger from "../component/Hamburger";
import ChartComponent from "../component/Chart";
import PrivateRoute from "@/app/component/PrivateRoute";


export default function Admin (){

    return(
        <>
        <PrivateRoute >
         <Hamburger/>
      
        <div className="w-full h-full">
          <ChartComponent />        
        </div>
        </PrivateRoute>
        </>
    );
}
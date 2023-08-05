import Hamburger from "../component/Hamburger";
import ChartComponent from "../component/Chart";

export default function Admin (){
    return(
        <>
         <Hamburger/>
      
        <div className="w-full h-full">
          <ChartComponent />
            
        </div>
        </>
    );
}
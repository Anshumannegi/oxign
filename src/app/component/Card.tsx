
import Image from 'next/image'


const Card = (props:any) => {

  const {resData} = props;

  const {testName, price ,expectedResults, image} = resData;
//   console.log(resData);

    return(
      
<div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5 hover:scale-110 duration-500">
    
    <Image src={image} alt={testName} width="300" height="200"  className="rounded-t-lg"  />
  
    <div className="p-5">
           <div className='flex justify-between'>
           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{testName}</h5>
           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">$ {price}</h5>
           </div>
            
        
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet.</p>

        <div className='flex justify-between'>
           <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">Expected Results</h5>
           <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">{expectedResults}</h5>
           </div>


        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
    </div>
</div>

    );
} 

export default Card;
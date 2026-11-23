import {FaLocationDot} from 'react-icons/fa6'
import { TbBedFilled } from "react-icons/tb";
import { BiBath } from "react-icons/bi";
export default function PropertiesCard(){
    return(
        <div className="border flex flex-col items-center  max-w-2xs rounded-2xl py-8 shadow-xl  gap-2 ">
            <div className='w-full  flex justify-center' >
               <img src={'/property.jpg'}  className="w-[80%] rounded-3xl" />
            </div>
            
            <div className="flex flex-row text-gray-500 text-sm justify-between w-[90%] mt-4 ">
                <span>Cansandra</span>
                <span>124.56 sq.ft</span>
            </div>
            <span className='w-full font-semibold pl-4 text-xl'>$ 14845859</span>
            <div className='flex flex-row justify-between w-[90%] text-gray-500 text-sm '>
                <div className='flex flex-row items-center gap-1'>
                    <FaLocationDot className='text-xl'/>
                    <span className='pt-1'> BayArea</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='flex flex-row items-center gap-1'> 
                    <TbBedFilled/>
                    <span> 5  </span>
                    </div>
                     <span className='border-l-2 border-gray-500'/>
                     <div className='flex flex-row items-center gap-1'>
                        <BiBath/>
                        <span>4</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
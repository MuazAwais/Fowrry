import pizza from "../../../../assets/pizza.png"
import cake from "../../../../assets/cake.png"
import pickBox from "../../../../assets/Pick_box.png"
import groBag from "../../../../assets/bag_of_groceries.png"
import bgImg from "../../../../assets/grey_bg.png"
import { AiOutlineAim } from 'react-icons/ai'
import { FaSearch } from "react-icons/fa"

const Hero = () => {
  return (
    <div className=' w-full bg-cover ' style={{backgroundImage : `url(${bgImg.src})`}}>
    <div className='bg-dark/10'>
        <div className='container flex flex-col md:flex-row justify-between items-center'>
        <div className='w-[523px] text-center'>
            <div className='h-[57px] border rounded-full w-full flex px-5 gap-x-5 items-center'>
                <input type="text" placeholder="Enter your loction or Address"  className='max-w-[298px] w-full bg-secondary/0 outline-none'/>
                <div className='p-2 rounded-full text-[#fff] bg-[#2d7bbc]'><AiOutlineAim size={28} /></div>
            <button className='py-[9px] rounded-full px-[35px] text-[16px] bg-primary/45 text-[#fff]'>Search</button>
            </div>
            <div className='m-6 text-[24px]'>Find Your Menu</div>
            <div className='h-[53px] border rounded-full w-full flex gap-x-4 items-center justify-around'>
                <div className="text-[#99a] text-[14px] ">Meal type</div>
                <div className="text-[#99a] text-[14px] ">Dish/Cusine</div>
                <div className="text-[#99a] text-[14px] ">Food Type</div>
                <div className="hover:cursor-pointer "><FaSearch /></div>
            </div>
            <button className='py-[9px] rounded-full px-[20px] text-[14px] mt-4 bg-primary text-[#fff]'>View All Menu</button>
        </div>
        <div className='grid grid-cols-2'>
            <img src={pizza.src} alt="pizza" />
            <img src={cake.src} alt="Cake" />
            <img src={groBag.src} alt="Groceries" />
            <img src={pickBox.src} alt="" />
        </div>
        </div>
    </div>
    </div>
  )
}

export default Hero
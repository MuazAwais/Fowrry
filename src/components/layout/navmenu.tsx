'use client'
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const Navmenu = () => {
 const [isOpen, setIsOpen] = useState(false)

 const toggleMenu = () => {
    setIsOpen(!isOpen)
 }

    return (
    <div>
        <div className="" onClick={toggleMenu}><FiMenu size={24} /></div>
        {isOpen ? <div className="">
            <ul>
                <li>Login</li>
                <li>Track Order</li>
                <li>Favourites</li>
                <li>Offers</li>
                <li>Electronics</li>
                <li>Fruits & Vegetables</li>
                <li>Restaurants</li>
            </ul>
        </div>: ""}

    </div>
  )
}

export default Navmenu
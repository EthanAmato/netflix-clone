import NavbarItem from "./navbarItem";
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import MobileMenu from "./mobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./accountMenu";

//Y-offset that we will begin to add a transparency effect to navbar as user scrolls
const TOP_OFFSET = 66;


const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY >= TOP_OFFSET) {
            setShowBackground(true);
        } else {
            setShowBackground(false)
        }
      }

      window.addEventListener('scroll', handleScroll)
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    }, [])
    

    const toggleMobileMenu = useCallback(
        () => {
            setShowMobileMenu((curr) => !curr);
        },
        [],
    )
    const toggleAccountMenu = useCallback(
        () => {
            setShowAccountMenu((curr) => !curr);
        },
        [],
    )


    return (
        <nav className="w-full fixed z-40">
            <div
            // only show background when we are below the Y-Offset
                className={`
                    px-4
                    md:px-16
                    py-6
                    flex
                    flex-row
                    items-center
                    transition
                    duration-500
                    ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            `}>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
                {/* On big screens it's display flex but under that this menu is hidden for responsivity */}
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" alt="Profile" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav >
    )
}
// changed images folder name
export default Navbar;
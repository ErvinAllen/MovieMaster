import { Link } from "react-router-dom"
import logo from '../assets/logo.png';

function NavBar() {
  return (
    <nav className="w-full h-24 fixed z-50 bg-neutral-950 bg-opacity-50 backdrop-blur-sm top-0 p-4 px-4 flex items-center justify-between scrollbar-hide">
      <ul className="flex flex-row items-center text-white text-nowrap">
        <a href="/discoverMore"><img src={logo} alt="Logo" className="mr-8" width={64} height={64} /></a>
        <Link to={'/'} className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100 hidden md:flex px-2">Home</Link>
        <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100 hidden md:flex px-2">TV Shows</li>
        <Link to={'/discoverMore'} className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100 hidden md:flex px-2">Movies</Link>
        <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100 hidden md:flex px-2">News & Popular</li>
        <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100 hidden md:flex px-2">My List</li>
      </ul>
      
      <ul className="flex flex-row items-center gap-x-4">
        <button className="btn btn-outline">Sing up</button>
        <button className="btn btn-ghost">Log In</button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <div className="avatar online placeholder cursor-pointer">
              <div className="bg-neutral-900 text-neutral-content w-16 rounded-full">
                <span className="text-xl">G</span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-neutral-900 rounded-box z-[1] mt-4 w-52 p-2 shadow">
            <li><a><img src="/src/assets/profile.svg" width={16} alt="" />Profile</a></li>
            <li><a><img src="/src/assets/notification.svg" width={16} alt="" />Notifications</a></li>
            <li><a><img src="/src/assets/language.svg" width={16} alt="" />Language Preferences</a></li>
            <li><a><img src="/src/assets/setting.svg" width={16} alt="" />Settings</a></li>
            <li><Link to={'/'}><img src="/src/assets/logOut.svg" width={16} alt="" />Log Out</Link></li>
          </ul>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar
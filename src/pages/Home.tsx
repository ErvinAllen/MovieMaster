
import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const navBarIcon = (
    <label className="btn btn-circle swap swap-rotate md:hidden backdrop-blur-xl p-0">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onClick={() => { setIsSideBarOpen(!isSideBarOpen) }} />
      
        {/* hamburger icon */}
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      
        {/* close icon */}
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
  )
  return (
    <div className="w-screen h-screen">
      <motion.div 
      initial={{
        x: -192
      }}
      animate={{
        x: isSideBarOpen ? 0 : -192
      }}
      transition={{
        type: 'tween',
        duration: 0.15
      }}
      className={`bg-neutral-900 bg-opacity-60 backdrop-blur-md h-screen fixed z-30 flex flex-col p-8 pt-16 gap-y-8 md:hidden w-48`}>
        <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">About Us</a>
        <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">Contact Us</a>
        <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">Privacy Policy</a>
        <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">Terms of Service</a>
        <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">FAQ</a>
      </motion.div>
        <div className="w-full h-full bg-[url('./assets/backGround.jpg')] bg-cover bg-center flex justify-center items-center">
        
        <nav className="z-20 w-full h-auto fixed bg-gradient-to-b from-stone-950 bg-opacity-70 top-0">
          <ul className="flex md:flex-row h-24  text-nowrap items-center p-8 justify-between text-white text-lg">
            <a href="/"><img src="src/assets/logo.png" width={64} height={64} /></a>
            {navBarIcon}
            <ul className="md:flex hidden md:flex-row gap-4 px-4">
              <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">About Us</a>
              <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">Contact Us</a>
              <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">Privacy Policy</a>
              <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">Terms of Service</a>
              <a href="/" className="hover:scale-110 hover:text-red-400 transition-all ease-in-out">FAQ</a>
            </ul>
          </ul>
        </nav>

          <div className="border border-stone-700 p-8 mx-[30%] z-10 bg-zinc-950 bg-opacity-50 backdrop-blur-md rounded-lg mt-24">
            <h1 className="text-white text-nowrap text-xl text-center sm:text-2xl md:text-3xl font-bold">Welcome to MovieMaster</h1>
            <p className="text-white/70 text-center text-sm py-6">Please log in to explore movies, watch trailers, and discover your next favorite film. Dive into the world of cinema with MovieMaster!</p>
            <div className="border border-black/40 w-full" />
            <form className="pt-8 flex flex-col gap-1" action="">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username" />
            </label>

              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" className="grow" placeholder="Password" />
              </label>

              <div className="flex flex-col gap-1">
                <button className="btn btn-block bg-red-500 text-white hover:bg-red-900">Log In</button>
                <button className="btn btn-block bg-red-500 text-white hover:bg-red-900">Sign Up</button>
                <Link to="/discoverMore"><button className="btn btn-block border-none bg-blue-600 text-white hover:bg-blue-900">Log In as a Guest</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Home
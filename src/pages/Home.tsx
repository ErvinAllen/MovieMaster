import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="w-screen h-screen">
        <div className="w-full h-full bg-[url('./assets/backGround.jpg')] bg-cover bg-center flex justify-center items-center">

        <nav className="z-20 w-full h-auto fixed bg-gradient-to-b from-stone-950 bg-opacity-70 top-0">
          <ul className="flex md:flex-row flex-col text-nowrap items-center p-8 justify-between text-white text-lg">
            <li className="text-4xl font-serif"><a href="/">Movie<span className="text-red-500">Master</span></a></li>
            <ul className="md:flex hidden md:flex-row gap-4 px-4">
              <a href="/" className="">About Us</a>
              <a href="/" className="">Contact Us</a>
              <a href="/" className="">Privacy Policy</a>
              <a href="/" className="">Terms of Service</a>
              <a href="/" className="">FAQ</a>
            </ul>
          </ul>
        </nav>

          <div className="border border-stone-700 p-8 w-full m-8 mx-[10%] z-10 bg-zinc-950 bg-opacity-25 backdrop-blur-md rounded-3xl mt-16">
            <h1 className="text-white text-nowrap text-center text-3xl pb-4">Welcome to MovieMaster!</h1>
            <p className="text-white/70 text-center py-6">Please log in to explore movies, watch trailers, and discover your next favorite film. Dive into the world of cinema with MovieMaster!</p>
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
                <button className="btn btn-block">Log In</button>
                <button className="btn btn-block">Sign Up</button>
                <Link to="/discover"><button className="btn btn-block border-none bg-blue-600 text-white hover:bg-blue-900">Log In as a Guest</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Home
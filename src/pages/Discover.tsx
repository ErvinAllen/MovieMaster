import { useEffect , useState } from "react";
import { Link } from "react-router-dom";

const searchInput = (
  <label className="input input-bordered flex items-center gap-2 bg-transparent">
  <input type="text" className="grow" placeholder="Search" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
    </svg>
  </label>
)

const darkToggle = (
  <label className="swap swap-rotate">
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" />

  {/* sun icon */}
  <svg
    className="swap-on h-10 w-10 fill-neutral-950"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  {/* moon icon */}
  <svg
    className="swap-off h-10 w-10 fill-neutral-950"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>
)

function Discover() {
  const [notification, setNotification] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzNkYWZiODJlMGZlOTJiODU4ZjhhM2M2ZDAyNzE1ZCIsIm5iZiI6MTczMTU4NTY3My4wNDk5OTE4LCJzdWIiOiI2NmM5Y2MxYTFiODkyNDFjNTA4NzdkM2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WroRlLDU83P3NKxCXu5ASqRfFcegs_GPYUiEgIFGc64'
    }
  };

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

  // useEffect(() => {
  //   fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .finally(() => console.log('API Called again'))
  //   .catch(err => console.error(err));
  // }, [])
  
  return (
    <>
      <div className="w-screen h-screen bg-[url('./assets/alienPoster.jpg')] bg-cover bg-center">
        <div className="w-full h-full bg-black/65" />

        <nav className="w-full h-24 fixed top-0 p-4 px-8 flex items-center justify-between">
          <ul className="flex flex-row gap-4 items-center text-white text-nowrap">
            <a href="/discover"><img src="./src/assets/logo.png" alt="Logo" className="mr-8" width={64} height={64} /></a>
            <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100">Home</li>
            <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100">TV Shows</li>
            <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100">Movies</li>
            <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100">News & Popular</li>
            <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100">My List</li>
            <li className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100">Browse By Languages</li>
          </ul>
          
          <ul className="flex flex-row items-center gap-4">
            {searchInput}
            {darkToggle}
            <img src={ notification ? 'src/assets/filledBell.png' : 'src/assets/bell.png' } onClick={() => setNotification((prev) => !prev)} className="cursor-pointer" width={32} height={32} alt="" />
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
            <div className="avatar online placeholder cursor-pointer">
              <div className="bg-neutral-950 text-neutral-content w-16 rounded-full">
                <span className="text-xl">G</span>
              </div>
            </div>
            </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-neutral-900 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                <li><a><img src="src/assets/user.png" width={16} alt="" />Profile</a></li>
                <li><a><img src="src/assets/bell.png" width={16} alt="" />Notifications</a></li>
                <li><a><img src="src/assets/language.png" width={16} alt="" />Language Preferences</a></li>
                <li><a><img src="src/assets/setting.png" width={16} alt="" />Settings</a></li>
                <li><Link to={'/'}><img src="src/assets/log-out.png" width={16} alt="" />Log Out</Link></li>
              </ul>
            </div>
          </ul>

          </nav>
  
      </div>
    </>
  )
}

export default Discover
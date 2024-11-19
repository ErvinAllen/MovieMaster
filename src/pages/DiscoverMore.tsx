import NavBar from "../components/NavBar"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

interface Movie {
  title: string,
  overview: string,
  vote_average: number,
  vote_count: number,
  backdrop_path: string,
  release_date: string,
  genre_ids: Array<number>
}

interface Data {
  results: Array<Movie>,
}

interface Genre {
  id: number;
  name: string;
}

interface Genres {
  genres: Array<Genre>
}

function DiscoverMore() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [data, setData] = useState<Data>();
  const [genres, setGenres] = useState<Genres>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzNkYWZiODJlMGZlOTJiODU4ZjhhM2M2ZDAyNzE1ZCIsIm5iZiI6MTczMTg0OTIwMC4xNjA2NTMsInN1YiI6IjY2YzljYzFhMWI4OTI0MWM1MDg3N2QzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ysHb0cMIPsG8Wwyz17gVTfUYjhUnft-WHbzXTKhmPjc'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`, options)
    .then(res => res.json())
    .then(res => {
      setData(res);
    })
    .catch(err => console.log(err));
  }, [pageNumber])
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options)
    .then(res => res.json())
    .then(res => {
      setGenres(res);
    })
    .catch(err => console.log(err));
  }, [])

  const navBarIcon = (
    <label className="btn btn-circle swap swap-rotate p-0">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onClick={() => { setIsSideBarOpen((prev) => !prev) }} />
      
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

  const pages = [1,1,2,3];
  for(let i = 1; i <= pageNumber + 3; i++) {
    pages.push(i);
    pages.shift()
  }
  
  return (
    <>
      <NavBar />
      <section className="w-screen h-screen bg-neutral-900 overflow-x-hidden">
        <motion.div animate={{
          width: isSideBarOpen ? 256 : 96
        }}
        className="bg-neutral-950 h-screen mt-24 fixed z-10 flex flex-col gap-y-6 justify-start p-5 rounded-r-lg">
          {navBarIcon}
          <button className="bg-zinc-900 hover:bg-black hover:scale-110 active:scale-90 transition-transform duration-200 rounded-lg flex gap-4 items-center h-12 px-4 text-nowrap ">
            <img src="src/assets/trending.svg" alt="" />
            <motion.span className={isSideBarOpen ? '' : 'hidden'}  animate={isSideBarOpen ? { opacity: 1 } : { opacity: 0, }} transition={{ duration: 0.1 }}>
              Trending Now
            </motion.span>
          </button>
          <button className="bg-zinc-900 hover:bg-black hover:scale-110 active:scale-90 transition-transform duration-200 rounded-lg flex gap-4 items-center h-12 px-4 text-nowrap">
            <img src="src/assets/topRated.svg" alt="" />
            <motion.span className={isSideBarOpen ? '' : 'hidden'}  animate={isSideBarOpen ? { opacity: 1 } : { opacity: 0, }} transition={{ duration: 0.1 }}>
              Top Rated Now
            </motion.span>
          </button>
          <button className="bg-zinc-900 hover:bg-black hover:scale-110 active:scale-90 transition-transform duration-200 rounded-lg flex gap-4 items-center h-12 px-4 text-nowrap">
            <img src="src/assets/bookmark.svg" alt="" />
            <motion.span className={isSideBarOpen ? '' : 'hidden'}  animate={isSideBarOpen ? { opacity: 1 } : { opacity: 0, }} transition={{ duration: 0.1 }}>
              Watchlist
            </motion.span>
          </button>
          <button className="bg-zinc-900 hover:bg-black hover:scale-110 active:scale-90 transition-transform duration-200 rounded-lg flex gap-4 items-center h-12 px-4 text-nowrap">
            <img src="src/assets/collections.svg" alt="" />
            <motion.span className={isSideBarOpen ? '' : 'hidden'}  animate={isSideBarOpen ? { opacity: 1 } : { opacity: 0, }} transition={{ duration: 0.1 }}>
              Collections
            </motion.span>
          </button>
          <button className="bg-zinc-900 hover:bg-black hover:scale-110 active:scale-90 transition-transform duration-200 rounded-lg flex gap-4 items-center h-12 px-4 text-nowrap">
            <img src="src/assets/comingSoon.svg" alt="" />
            <motion.span className={isSideBarOpen ? '' : 'hidden'}  animate={isSideBarOpen ? { opacity: 1 } : { opacity: 0, }} transition={{ duration: 0.1 }}>
              Coming Soon
            </motion.span>
          </button>
        </motion.div>

        <section className="grid  2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-4 ml-24 mt-24">
          <div className="navbar bg-base-100 w-full h-24 rounded-xl md:col-span-2 lg:col-span-3 2xl:col-span-4 mt-8">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">Reset Filters</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li className="flex flex-row">
                  <details>
                    <summary className="text-lg p-4 mx-4">Genre</summary>
                    <ul className="bg-base-100 rounded-t-none p-2 z-50">
                      {
                        genres?.genres.map((genre, index) => (
                          <li key={index}><a>{genre.name}</a></li>
                        ))
                      }
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
          {
            data?.results.map((movie, index) => (
              <div key={index} className="border border-black grid rounded-xl hover:shadow-2xl hover:scale-105 transition-transform  duration-100 bg-neutral-950">
                <img className="rounded-xl w-full"  src={imageBaseUrl.concat(movie.backdrop_path)} /> 
                <div className="flex flex-col gap-2 justify-between p-4">
                  <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-semibold text-white">{movie.title.slice(0,24)}</h1>
                    <img src="src/assets/bookmarkWhite.png" className="cursor-pointer" width={24} alt="" />
                  </div>
                  <ul className="flex flex-row items-center">
                    <h1>{movie.release_date.slice(0,4)}</h1>
                  </ul>
                </div>
                <p className="px-4 font-bold flex flex-row items-center gap-2"><img src="src/assets/imdb.png" width={32} alt="" />{movie.vote_average.toFixed(1)}/10<span className="text-sm font-normal">{movie.vote_count} Votes</span></p>
                <p className="px-4 p-4">{movie.overview.slice(0, 128).concat('...')}</p>
                <div className="flex flex-row p-4 gap-4">
                  <button className="btn w-auto hover:bg-red-600 bg-red-500 text-black">Watch Now<img src="src/assets/playButton.png" width={16} alt="" /></button>
                  <button className="btn w-auto hover:bg-red-600 bg-red-500 text-black">Details <img src="src/assets/arrow.png" width={16} alt="" /></button>
                </div>
              </div>
            ))
          }
          <div className="join col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4  flex justify-center mb-8">
            <button className="join-item btn btn-ghost" onClick={() => setPageNumber((prev) => prev - 1 === 0 ? prev = 1 : prev - 1)}>Previous</button>
            {
              pages.map((item) => (
                <input key={item} className="join-item btn btn-square hidden sm:flex" checked={pageNumber === item} type="radio" name="options" aria-label={`${item}`} onChange={() => (setPageNumber(item))} />
              ))
            }
            <button className="join-item btn btn-disabled hidden sm:flex">...</button>
            <button className="join-item btn btn-ghost" onClick={() => setPageNumber((prev) => prev + 1)}>Next</button>
          </div>
        </section>
      </section>
    </>
    
  )
}


export default DiscoverMore
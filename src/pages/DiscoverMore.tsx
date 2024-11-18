import NavBar from "../components/NavBar"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

interface Movie {
  original_title: string,
  overview: string,
  vote_average: number,
  vote_count: number,
  backdrop_path: string,
  release_date: string,
  genre_ids: Array<number>
}

interface data {
  results: Array<Movie>,
}

function DiscoverMore() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [data, setData] = useState<data>();
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
  
  return (
    <div className="scrollbar-hide">
      <NavBar />
      <section className="w-screen h-screen bg-neutral-900 overflow-x-hidden">
        <motion.div animate={{
          width: isSideBarOpen ? 256 : 96
        }}
        className="bg-neutral-950 h-screen mt-24 fixed z-10 flex flex-col gap-y-8 justify-start p-6 rounded-r-lg">
          {navBarIcon}
          <button className="btn"></button>
          <button className="btn"></button>
          <button className="btn"></button>
          <button className="btn"></button>
          <button className="btn"></button>
          <button className="btn"></button>
        </motion.div>
        <section className="grid  2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-4 ml-24 mt-24">
          <div className="w-full bg-neutral-950 h-24 rounded-xl md:col-span-2 lg:col-span-3 2xl:col-span-4 mt-8 p-6 flex items-center">
            <p className="text-2xl text-white">Filters</p>
          </div>
          {
            data?.results.map((movie, index) => (
              <div key={index} className="border border-black rounded-xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform  duration-100 bg-neutral-950">
                <img className="rounded-xl w-full"  src={imageBaseUrl.concat(movie.backdrop_path)} /> 
                <div className="flex flex-row justify-between p-4">
                  <h1 className="text-2xl font-semibold text-white">{movie.original_title}</h1>
                  <h1>{movie.release_date.slice(0,4)}</h1>
                </div>
                <p className="px-4 font-bold flex flex-row items-center gap-2"><img src="src/assets/imdb.png" width={32} alt="" />{movie.vote_average.toFixed(1)}/10<span className="text-sm font-normal">{movie.vote_count} Votes</span></p>
                <p className="px-4 p-4">{movie.overview.slice(0, 128).concat('...')}</p>
              </div>
            ))
          }
          <div className="join col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4  flex justify-center mb-8">
            <button className="join-item btn btn-ghost" onClick={() => setPageNumber((prev) => prev - 1 === 0 ? prev = 1 : prev - 1)}>Previous</button>
            <button className="join-item btn" onClick={event => {setPageNumber(Number(((event.target) as HTMLButtonElement).innerHTML))}}>1</button>
            <button className="join-item btn" onClick={event => {setPageNumber(Number(((event.target) as HTMLButtonElement).innerHTML))}}>2</button>
            <button className="join-item btn" onClick={event => {setPageNumber(Number(((event.target) as HTMLButtonElement).innerHTML))}}>3</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn" onClick={event => {setPageNumber(Number(((event.target) as HTMLButtonElement).innerHTML))}}>99</button>
            <button className="join-item btn" onClick={event => {setPageNumber(Number(((event.target) as HTMLButtonElement).innerHTML))}}>100</button>
            <button className="join-item btn btn-ghost" onClick={() => setPageNumber((prev) => prev + 1)}>Next</button>
          </div>
        </section>
      </section>
    </div>
    
  )
}


export default DiscoverMore
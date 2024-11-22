import NavBar from "../components/NavBar"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>();
  const [imdbRating, setImdbRating] = useState<number>(4);

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

  interface Match {
    title: string;
    genres: Array<string>;
  }
  
  const MovieWithGenres: Array<Match> = [];
  
  const matchGenres = () => {
    const Movies = data?.results;
    const Genres = genres?.genres;
  
    Movies?.forEach((movie) => {
      const matchedGenres: Array<string> = [];
  
      Genres?.forEach((genre) => {
        if (movie.genre_ids.includes(genre.id)) {
          matchedGenres.push(genre.name); // Collect genre names
        }
      });
  
      // Push the movie and its matched genres to the array
      MovieWithGenres.push({
        title: movie.title,
        genres: matchedGenres,
      });
    });
  };

  matchGenres();

  useEffect(() => {
  const results = data?.results.filter((movie) => (
  selectedGenre !== undefined ? movie.genre_ids.includes(selectedGenre) : true ))
  .filter((movie) => (
    movie.vote_average >= imdbRating
  ))
  setFilteredMovies(results)
  }, [selectedGenre, data, imdbRating]);

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
      <section className="w-screen h-screen bg-neutral-900 overflow-x-hidden scrollbar-hide">
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

        <section className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-4 ml-24 mt-24">
          <div className="navbar bg-base-100 w-full h-24 rounded-xl col-span-full mt-8">
            <div className="flex-1">
              <button onClick={() => { setFilteredMovies(data?.results); setSelectedGenre(undefined); setImdbRating(4) }} className="btn btn-ghost text-xl">Reset Filters</button>
            </div>
            <Box 
            sx={{ 
            width: 500,
            marginRight: 8,
            marginTop: 2,
            "& .MuiSlider-markLabel" : {
               color: "gray"
              }
            }}>
              <Slider
                sx={{
                  color: "gold"
                }}
                value={imdbRating}
                onChange={(event, newValue) => {
                  setImdbRating(newValue as number)
                }}
                aria-label="Imdb Rating Filter"
                defaultValue={4}
                valueLabelDisplay="auto"
                marks={[{value: 4, label: '4/10'}, {value: 9.9, label: '9.9/10'}, {value: 7, label: 'IMDB Rating'}]}
                step={0.1}
                min={4}
                max={9.9}
              />
            </Box>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li className="flex flex-row">
                  <details>
                    <summary className="text-lg p-4 mx-4">Genre</summary>
                    <ul className="bg-base-100 rounded-t-none p-2 z-50">
                      {
                        genres?.genres.map((genre, index) => (
                          <li onClick={() => setSelectedGenre(genre.id)} key={index}><a>{genre.name}</a></li>
                        ))
                      }
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
          {
           filteredMovies?.length ? filteredMovies.map((movie, index) => (
              <div key={index} className="border border-black grid rounded-xl hover:shadow-2xl hover:scale-105 transition-transform  duration-100 bg-neutral-950">
                <img className="rounded-xl w-full"  src={imageBaseUrl.concat(movie.backdrop_path)} /> 
                <div className="flex flex-col gap-2 justify-between px-4 ">
                  <div className="flex flex-row items-center justify-between pt-4">
                    <h1 className="text-2xl font-semibold text-white">{movie.title}</h1>
                    <img src="src/assets/bookmarkWhite.png" className="cursor-pointer" width={24} alt="" />
                  </div>
                  <ul className="flex flex-col gap-x-4">
                    <h1 className="font-semibold text-lg">{movie.release_date.slice(0,4)}</h1>
                    <div className="grid grid-cols-3 gap-x-4">
                      {MovieWithGenres[index].genres.map((genre, index) => (
                        <span className="text-sm" key={index}>{genre}</span>
                      ))}
                    </div>
                  </ul>
                </div>
                <p className="px-4 pb-2 font-bold flex flex-row items-center gap-2"><img src="src/assets/imdb.png" width={32} alt="" />{movie.vote_average.toFixed(1)}/10<span className="text-sm font-normal">{movie.vote_count} Votes</span></p>
                <p className="px-4">{movie.overview.slice(0, 128).concat('...')}</p>
                <div className="flex flex-row p-4 gap-4">
                  <button className="btn w-auto hover:bg-red-600 bg-red-500 text-black">Watch Now<img src="src/assets/playButton.png" width={16} alt="" /></button>
                  <button className="btn w-auto hover:bg-red-600 bg-red-500 text-black">Details <img src="src/assets/arrow.png" width={16} alt="" /></button>
                </div>
              </div>
            )) : 
            <div role="alert" className="alert col-span-full alert-error">
              <span>No Result Found!</span>
            </div>
          } 
          <div className="join col-span-full flex justify-center mb-8">
            <button className="join-item btn btn-ghost" onClick={() => setPageNumber((prev) => prev - 1 === 0 ? prev = 1 : prev - 1)}>Previous</button>
            {
              pages.map((item) => (
                <input key={item} className="join-item btn btn-square hidden sm:flex" checked={pageNumber === item} type="radio" name="options" aria-label={`${item}`} onChange={() => {(setPageNumber(item))}} />
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
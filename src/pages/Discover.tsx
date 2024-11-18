import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'
import { Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";
import DiscoverMore from "./DiscoverMore";


interface Movie {
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface posterData {
  results: Movie[];
}

const ping = (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700"></span>
  </span>
)

function Discover() { 
  const [discoverData, setDiscoverData] = useState<posterData | null>(); 
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; 

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzNkYWZiODJlMGZlOTJiODU4ZjhhM2M2ZDAyNzE1ZCIsIm5iZiI6MTczMTY2ODg3OC44MjcxOTMsInN1YiI6IjY2YzljYzFhMWI4OTI0MWM1MDg3N2QzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GLHBSV6zr3PNqhaFzryOOOQfNpedH9v4zI952OUpPTE'
    }
  };
 
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    .then(res => res.json())
    .then(res => setDiscoverData(res))
    .catch(err => console.error(err));
  }, [])

  
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center overflow-x-hidden bg-[url('./assets/alienPosterDarkened.jpg')] bg-cover bg-center scrollbar-hide">
        <NavBar />
        <div>
          <div className="lg:w-[60%] text-white mt-[60%] lg:mt-[40%] px-8 lg:px-16 py-2 lg:py-8 text-sm">
            <h1 className="text-4xl lg:text-6xl font-semibold">Alien: Romulus</h1>
            <ol className="flex flex-row gap-4 py-2 text-sm">
              <li>2024</li>
              <li>|</li>
              <li>R</li>
              <li>|</li>
              <li>1h 59m</li>
            </ol>
            <p>Horror, Sci-Fi, Thriller</p>
            <span className="flex flex-row items-center gap-2 text-lg font-semibold"><img src="src/assets/imdb.png" width={48} alt="" />7.3/10 <span className="text-sm">163K votes</span></span>
            <p className="lg:text-lg">While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.</p>
            <div className="flex flex-row py-4 gap-4">
              <button className="btn w-auto hover:bg-red-100 bg-neutral-100 text-black">{ping} Watch Now<img src="src/assets/playButton.png" width={16} alt="" /></button>
              <button className="btn w-auto hover:bg-red-100 bg-neutral-100 text-black">Details <img src="src/assets/arrow.png" width={16} alt="" /></button>
            </div>
          </div>
        </div>

        
  
        <div className="mx-8 lg:mx-16">
          <h1 className="font-semibold px-2 lg:text-2xl text-white">Trending Movies</h1>
          <Swiper slidesPerView={6}
            scrollbar={{
              hide: true
            }} 
            modules={[Scrollbar]} >
            {
              discoverData?.results.map((movie, index) => (
                <SwiperSlide className="p-6 min-w-32 px-2 mb-2">
                  <img key={index} src={imageBaseUrl.concat(movie.poster_path)} className="hover:scale-110 cursor-grab active:cursor-grabbing active:scale-95 transition-transform duration-150 rounded-xl border border-black" />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
          <Link to={'/discoverMore'} className="btn mx-8 lg:mx-16 mb-4 bg-red-500 text-white hover:bg-red-950 border-none">Discover & Watch</Link>
      </div>
    </>
  )
}

export default Discover


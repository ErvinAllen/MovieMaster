import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'
import { Scrollbar } from "swiper/modules";
import { useParams } from "react-router-dom";

interface Credits {
  id: number,
  cast: {
    name: string,
    profile_path: string,
    character: string
  }[]
}
interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  status: string;
  genres: Array<genre>
  runtime: number
}
interface genre {
  name: string,
  id: number
}
interface posterData {
  results: Movie[];
}
interface ReviewData {
  results: {
    author: string;
    author_details: {
      rating: number;
    }
    content: string;
    created_at: string;
  }[]
}

function Discover() { 
  const [discoverData, setDiscoverData] = useState<posterData | undefined>(); 
  const [movieCredits, setMovieCredits] = useState<Credits>();
  const [movieToDiscover, setMovieToDiscover] = useState<Movie>();
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const [reviewData, setReviewData] = useState<ReviewData>();
  const { id } = useParams();
  
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const imageBaseUrlOriginal = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=373dafb82e0fe92b858f8a3c6d02715d`)
    .then(res => res.json())
    .then(res => setDiscoverData(res))
    .catch(err => console.error(err));
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=373dafb82e0fe92b858f8a3c6d02715d`)
    .then(res => res.json())
    .then(res => {
      setMovieToDiscover(res);
      setBackgroundImage(imageBaseUrlOriginal.concat(res.backdrop_path).concat('?api_key=373dafb82e0fe92b858f8a3c6d02715d'))
    })
    .catch(err => console.error(err));
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=373dafb82e0fe92b858f8a3c6d02715d`)
    .then(res => res.json())
    .then(res => {
      setMovieCredits(res);
    })
    .catch(err => console.error(err));
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1&api_key=373dafb82e0fe92b858f8a3c6d02715d`)
    .then(res => res.json())
    .then(res => setReviewData(res))
    .catch(err => console.error(err))
  }, [])

  console.log(reviewData)

  return (
    <>
      <div className={`w-full h-auto flex flex-col justify-center bg-cover bg-fixed bg-center bg-blend-multiply bg-black/25 scrollbar-hide`} style={{ backgroundImage: `url(${backgroundImage}` }}>
        <NavBar />
          <div className="lg:w-[60%] z-10 text-white flex flex-col justify-end h-screen px-8 lg:px-16 py-8 text-sm">
            <h1 className="text-4xl lg:text-6xl font-semibold">{movieToDiscover?.title}</h1>
            <ol className="flex flex-row gap-4 py-2 text-sm">
              <li>{movieToDiscover?.release_date.slice(0,4)}</li>
              <li>|</li>
              <li>{movieToDiscover?.status}</li>
              <li>|</li>
              <li>{movieToDiscover?.runtime}m</li>
            </ol>
            <div className="flex flex-row gap-x-2">{movieToDiscover?.genres.map((genre, index) => <p key={index}>{genre.name}</p> )}</div>
            <span className="flex flex-row items-center gap-2 text-lg font-semibold"><img src="/src/assets/imdb.png" width={48} alt="" />{movieToDiscover?.vote_average.toFixed(1)}/10 <span className="text-sm">{movieToDiscover?.vote_count} votes</span></span>
            <p className="lg:text-lg sm:block hidden">{movieToDiscover?.overview}</p>
            <p className="lg:text-lg sm:hidden">{movieToDiscover?.overview.slice(0,128).concat('...')}</p>
            <div className="flex flex-row py-4 gap-4">
              <button className="btn w-auto hover:bg-red-100 bg-neutral-100 text-black border-none">Watch Now<img src="/src/assets/playButton.png" width={16} alt="" /></button>
              <button className="btn w-auto hover:bg-red-100 bg-neutral-100 text-black border-none">Watch Later <img src="/src/assets/bookmarkFilled.png" width={20} alt="" /></button>
            </div>
          </div>

        <div className="w-full">
          <h1 className="mx-8 lg:mx-16 text-2xl text-white border-b py-4 font-semibold">Cast</h1>
          <div className="mx-8 gap-8 lg:mx-16 grid 2xl:grid-cols-4 md:grid-cols-2 my-8">
            {
              movieCredits?.cast.slice(0,4).map((cast , index) => (
                <div key={index} className=" flex flex-row gap-4">
                  <img  src={imageBaseUrl.concat(cast.profile_path)} className="rounded-full w-24 md:w-48 h-auto ring ring-offset-2" />
                  <div className="flex flex-col w-full h-full justify-center text-center items-center">
                    <h1 className="text-white text-2xl">{cast.name}</h1>
                    <p className="text-gray-100">As {cast.character}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
  
        <div className="px-8 lg:px-16">
          <h1 className="px-2 font-semibold lg:text-2xl text-lg text-white border-b py-4">Trending Movies</h1>
          <Swiper slidesPerView={6}
            breakpoints={{
              0: {
                slidesPerView: 2
              },
              640: {
                slidesPerView: 4
              },
              1024: {
                slidesPerView: 6
              }
            }}
            scrollbar={{
              hide: true
            }} 
            modules={[Scrollbar]} >
            {
              discoverData?.results.map((movie, index) => (
                <SwiperSlide key={index} className="p-6 min-w-32 px-2 mb-2">
                  <a href={`/discover/${movie.id}`}><img src={imageBaseUrl.concat(movie.poster_path)} className="hover:scale-105 cursor-pointer active:scale-95 transition-transform duration-150 rounded-xl" /></a>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <div className="px-8 lg:px-16 mb-8">
          <p className="text-white text-2xl border-b py-4 mb-4">Comments</p>
          {
            reviewData?.results.length ? reviewData?.results.map((comment, index) => (
              <div key={index} className="Comment flex flex-row">
                <div className="flex flex-col items-center gap-4 my-2 border-l-2 border-red-500 bg-black/80 backdrop-blur-sm rounded-lg p-4 w-full">
                  <div className="flex flex-row items-center gap-4 w-full">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-900 text-neutral-content w-16 rounded-full">
                        <span>User</span>
                      </div>
                    </div>
                    <p className="text-lg underline">{comment.author}</p>
                    <p className="font-semibold text-yellow-400">{comment.author_details.rating}/10 Rated</p>
                    <p className="hidden sm:block">{comment.created_at}</p>
                  </div>

                  <p className="w-full">{comment.content}</p>
                </div>
              </div>
            )) : <p className="h-24 text-gray-200">No Comment for this Movie yet</p>
          }
        </div>

      </div>
    </>
  )
}

export default Discover


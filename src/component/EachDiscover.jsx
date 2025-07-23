

import { RiPlayCircleLine } from '@remixicon/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { showMovie } from '../rtk_querys/MovieReducer/showMovie';


const EachDiscover = () => {
  const { id, type } = useParams();
 
  const { data, isLoading, isError } = showMovie.useAllMovieQuery({
    endpoint: `${type}/${id}`,
  });

  console.log(data)
  const { data: credits } = showMovie.useAllMovieQuery({ endpoint: `${type}/${id}/credits` });
  const { data: videoData, isLoading: videoLoading } = showMovie.useMovieVideoQuery({ id, type });


  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading || videoLoading) return <p className="text-white">Loading movie details...</p>;
  if (isError || !data) return <p className="text-white">Error loading movie details.</p>;


  
  const trailer = videoData?.results?.find(
    (vid) => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser')
  );

  const openModal = () => {
    if (trailer) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

 
 






  return (
    <>
 <div className="relative  text-white">
    {/* Backdrop Image */}
    <div className="relative w-full overflow-hidden rounded-b-lg shadow-lg">
      <img
        className="w-full h-[600px] object-cover mt-5 opacity-60 transition-all duration-300 rounded-lg blur-xs blur-none"
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title || data.name}
      />
    </div>

    {/* Details */}
    <div className="max-w-7xl mx-auto  flex flex-col md:flex-row gap-10 -mt-120 z-10 relative">
      {/* Poster */}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <img
          className="rounded-lg shadow-lg "
          src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
          alt={data.title || data.name}
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-bold">
          {data.title || data.name}{' '}
          <span className="text-gray-300 text-2xl">
            ({(data.release_date || data.first_air_date)?.slice(0, 4)})
          </span>
        </h1>

        <p className="text-sm text-gray-300">
          {(data.release_date || data.first_air_date)} •{' '}
          {data.genres?.map((g) => g.name).join(', ')} •{' '}
          {data.runtime
            ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
            : data.episode_run_time
            ? `${data.episode_run_time[0]} mins/ep`
            : ''}
        </p>

        {data.tagline && <p className="italic text-purple-100">{data.tagline}</p>}

        {/* Overview */}
        <div>
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-gray-100 leading-relaxed">{data.overview}</p>
        </div>

        {/* User Score */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
            {Math.round(data.vote_average * 10)}
          </div>
          <span className="text-sm">User Score</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          {trailer && (
            <button
              onClick={openModal}
              className="flex items-center gap-2 bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-100 font-semibold"
            >
              <RiPlayCircleLine size={24} />
              Play Trailer
            </button>
          )}
        </div>

        {/* Crew */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {credits?.crew
            ?.filter((c) => ['Director', 'Screenplay', 'Writer'].includes(c.job))
            .slice(0, 3)
            .map((crew, index) => (
              <div key={index}>
                <h3 className="font-semibold">{crew.name}</h3>
                <p className="text-sm text-gray-300">{crew.job}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>

  {/* Trailer Modal (Optional) */}
  {isModalOpen && trailer && (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl">
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={closeModal}
        >
          ✕
        </button>
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  )}



      <h2 className="line-title text-2xl font-semibold text-white mt-15 mb-5">Top Billed Cast</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        grabCursor={true}
        className="custom-carousel"
      >
        {credits.cast.slice(0, 15).map((cast) => (
          <SwiperSlide
            key={cast.id}
            style={{ width: '160px' }}
            className="rounded-md shadow-md bg-slate-300"
          >
            <div className="rounded-md overflow-hidden">
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Image'
                }
                alt={cast.name}
                className="w-full h-[240px] object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-sm text-black truncate">
                  {cast.name}
                </h3>
                <p className="text-xs text-gray-600 truncate">
                  {cast.character || '—'}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>



    
   

      {/* <div className=' mt-10 ml-10 mr-10 '> */}
      
      

        {/* <figure className="relative  transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
          <a href="#">
         

          </a>
          <figcaption className="absolute px-4 text-lg text-white bottom-6">

            <div className="content">
              <img
                src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                className=" w-55  shadow-gray-950 shadow-xl size-80 rounded-xl "
                alt={data.title}
              />
              <div className="name">{data.title}</div>
              <div className='w-6xl mt-4 mb-5'>
                <div className="des text-white font-bold">{data.overview}</div>
              </div>
              <div className="btn">
                <button>See More</button>
                <button>Subscribe</button>
              </div>
            </div>
          </figcaption>
        </figure> */}

{/* 
        <a className="block max-w-[1600px] mt-10 mb-10 mx-auto p-6 bg-[#7a7977] border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title || data.name}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400"> {data.release_date || data.first_air_date} <span className='ml-2 mr-2'>▪️</span> {data.status}  </p>

          <div className='mt-2'>
            {
              data.genres.map((ele) => (
                <span key={ele.id} className="bg-indigo-100  text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{ele.name}</span>
              ))
            }

            <p className='mt-2'>{data.overview}</p>


          </div>

        </a>


        <div className="relative">

         
          {trailer ? (
            <>
              <h1 className='text-2xl text-white m-5'>Trailers</h1>
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                  alt=""
                  className="rounded-2xl object-cover"
                />
                <button
                  className="absolute bottom-4 left-3"
                  onClick={openModal}
                  aria-label="Play Trailer"
                >
                  <RiPlayCircleLine className="size-14 text-white hover:text-red-500 transition" />
                </button>

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                    <button
                      onClick={closeModal}
                      className="absolute top-6 right-10 text-white text-4xl font-bold hover:text-red-500"
                      aria-label="Close Trailer"
                    >
                      &times;
                    </button>
                    <div className="w-screen h-screen">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
                        title="YouTube Trailer"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <span className="bg-red-100 text-red-800 text-md font-medium mt-10 px-8 py-3 ml-5 rounded-full  dark:bg-red-900 dark:text-red-300">!No Trailer Available</span>
          )}


        </div>

        <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 mt-10 '>
          <div>
            <a className="block w-full p-6 bg-[#7a7977] text-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

              <h5 className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Watch Offline</h5>
              <h5 className="mb-3 text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">Available to download</h5>

              <p className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Gneres</p>
              <p className="mb-3 text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">
                {
                  data.genres.map((ele) => (
                    <span key={ele.id} className="bg-indigo-100  text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{ele.name}</span>
                  ))
                }
              </p>
              <p className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Language</p>

              {data.spoken_languages.map((ele) => (

                <h5 key={ele.id} className="mb-3 text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">{ele.name}</h5>
              ))
              }
            </a>
          </div>

          <div>
            <a className="block w-full p-6 bg-[#7a7977] text-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

              <h5 className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Audio</h5>
              {data.spoken_languages.map((ele) => (

                <h5 key={ele.id} className="mb-3 text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">{ele.name} - Audio Description, {ele.name}[original]</h5>

              ))

              }


              <p className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Subtitles</p>

              {data.spoken_languages.map((ele) => (

                <h5 key={ele.id} className="mb-3 text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">{ele.name}</h5>

              ))

              }

            </a>
          </div>



          <div>
            <a className="block w-full p-6 bg-[#7a7977] text-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

 
              <p className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Cast</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {
                  credits.cast.map((ele, index) => {
                    if (index >= 10) return null;
                    return (
                      <span key={ele.id || index}>
                        {ele.name}
                        {index < 9 && ', '}
                      </span>
                    );
                  })
                }
              </p>
            </a>
          </div>

        </div>





        <h1 className='text-2xl text-white mt-5 '>Cast</h1>
        <p className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Cast
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-12 gap-6">
          {credits.cast.slice(0, 12).map((cast) => (
            <div
              key={cast.id}
              className="w-24  gap-0 flex flex-col items-center text-center"
            >
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Image'
                }
                alt={cast.name}
                className="rounded-full mb-2 object-cover w-24 h-24"
              />

              <p className="text-gray-100 font-semibold text-sm text-wrap truncate">{cast.name}</p>
              <p className="text-white font-semibold text-sm text-wrap truncate">{cast.character}</p>
            </div>
          ))}
        </div>



      </div> */}





    </>
  );
};

export default EachDiscover;
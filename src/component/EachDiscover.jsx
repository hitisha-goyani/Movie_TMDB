

import { RiPlayCircleLine } from '@remixicon/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { showMovie } from '../rtk_querys/MovieReducer/showMovie';

const EachDiscover = () => {
  const { id, type } = useParams();

  const { data, isLoading, isError } = showMovie.useAllMovieQuery({
    endpoint: `${type}/${id}`,
  });

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

      <div className=" mx-auto max-w-sm mt-10   shadow-xs" role="group">
        <button type="button" className="px-7 py-2 text-sm  text-gray-400 font-medium  bg-[#090808] border-0 rounded-s-full hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white  dark:focus:ring-blue-500 dark:focus:text-white">
          Trailers
        </button>
        <button type="button" className="px-7 py-2 text-sm text-gray-400  font-medium  bg-[#090808] border-0 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white  dark:focus:ring-blue-500 dark:focus:text-white">
          More To Watch
        </button>
        <button type="button" className="px-7 py-2 text-sm  text-gray-400 font-medium  bg-[#090808] border-0 rounded-e-full hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white  dark:focus:ring-blue-500 dark:focus:text-white">
          Plans
        </button>
      </div>

      <div className=' mt-10 ml-10 mr-10 '>
      
      

        <figure className="relative  transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
          <a href="#">
            <img className="rounded-3xl w-full h-200 object-cover" src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt={data.title} />

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
        </figure>


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



      </div>





    </>
  );
};

export default EachDiscover;
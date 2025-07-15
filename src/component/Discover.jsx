import React, { useEffect, useState } from 'react'
import { showMovie } from '../rtk_querys/MovieReducer/showMovie'
import Card from './Card'
import Pagination from './Pagination'
import MovieGeners from './MovieGeners'
import Language from './Language'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleType } from '../reduxToolkit/reducer/typeSlice'

const Discover = () => {
    const [page,setPage] = useState(1)
    const [list,setList] = useState([])
    const[lang,setLang] = useState(() => localStorage.getItem('selectedLang') || "");

    const { data, isLoading, error} = showMovie.useAllMovieQuery({endpoint:`discover/movie`,page:page,lang:lang,list:list})
    console.log(data)


      const dispatch = useDispatch();
      const type = useSelector((state) => state.typeToggle.type);

      
    useEffect(() => {
    localStorage.setItem('selectedLang', lang);
  }, [lang]);


    const handleToggleType = () => {
        dispatch(toggleType());
    setPage(1);
  };

    if (isLoading) return <div>Loading movies...</div>;
  if (error) return <div>Failed to load movies.</div>;
  if (!data || !data.results) return <div>No movies found.</div>;
  
  return (


    <>
    <Navbar toggleType={handleToggleType} type={type} />
    <Language setLang={setLang} />
   <MovieGeners setList={setList} list={list}/>
    <h1 className='font-bold text-white text-center'>Discover</h1>
    <div class=" max-w-7xl mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">

{
    data?.results.map((ele) =>(

    <Card key={ele.id} ele={ele} type={type}/>
   
    ))

}

</div>
    <Pagination page={page} setPage={setPage}/>
   
    </>
  )
}

export default Discover

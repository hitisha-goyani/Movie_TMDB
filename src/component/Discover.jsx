import React, { useState } from 'react'
import { showMovie } from '../rtk_querys/MovieReducer/showMovie'
import Card from './Card'
import Pagination from './Pagination'
import MovieGeners from './MovieGeners'

const Discover = () => {
    const [page,setPage] = useState(1)
    const [list,setList] = useState([])
    const {data} = showMovie.useAllMovieQuery({endpoint:`discover/movie`,page:page,list:list})
    console.log(data)

  
  return (


    <>
   <MovieGeners setList={setList} list={list}/>
    <h1 className='font-bold text-white text-center'>Discover</h1>
    <div class=" max-w-7xl mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">

{
    data?.results.map((ele) =>(

    <Card key={ele.id} ele={ele}/>
   
    ))

}

</div>
    <Pagination page={page} setPage={setPage}/>
   
    </>
  )
}

export default Discover

import React from 'react'
import { showMovie } from '../rtk_querys/MovieReducer/showMovie'

const MovieGeners = ({list,setList}) => {
    const {data} = showMovie.useAllMovieQuery({endpoint:"genre/movie/list"});
    console.log("list",data)

    function isGenres(id){
        return list.includes(id)
    }

    isGenres(99)

    function handleGeners(id){
        if(list.includes(id)){
            let newlist = list.filter((e) => e.id)
            setList(newlist)
        }

        else{
            setList([...list,id])
        }
    }
  return (
    <div>
        {
            data?.genres?.map((ele)=>(

                <button key={ele.id} onClick={()=>handleGeners(ele.id)} className={`border border-rose-400 text-rose-900  text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  ${
                    (ele.id) ? `bg-rose-400 text-black` : `bg-transparent`} `}>{ele.name}</button>
         
            ))
        }
      
    </div>
  )
}

export default MovieGeners

import React, { useEffect, useState } from "react";
import { FetchData } from "../Fetchdata";
import Card from "../Card/Card";
import HorizontalScroll from "../HorizontalScroll"
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from "../SkeletonCard";
import { Link } from "react-router-dom";

const MovieList = ({ type }) => {
  const [movieData, setMovieData] = useState([])
  const [isLoading, setIsLoding] = useState(true)
  const movieListApi = `https://api.themoviedb.org/3/movie/${type}?api_key=9d5b8e25ecd3e4f7d23376aee2eda565&language=en-US&page=2`
  useEffect(() => {
    FetchData(movieListApi).then((data) => {
      setMovieData(data)
      setIsLoding(false)
    }).catch((err) => {
      setIsLoding(false)
      alert(err)
    })
  }, [])
  return (<>
    <div className="App">
      <div className="polular-container">
        <Link to={`/movie/${type}`} style={{ textDecoration: " none ", color: "white" }}>  <h2 className="popular-heading"> {type.toUpperCase()} MOVIES</h2></Link>
      </div>
      {isLoading ? <SkeletonCard /> : movieData ?
        <HorizontalScroll>
          {movieData.map((item, index) => {
            return (<Card
              key={index}
              type='movie'
              id={item.id}
              image={item.poster_path}
              title={item.title}
              rate={item.vote_average
              }
              lang={item.original_language} />)
          })}</HorizontalScroll> : <SkeletonCard />}
    </div>

  </>)

}

export default MovieList;






















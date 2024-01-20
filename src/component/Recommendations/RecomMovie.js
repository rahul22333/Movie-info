import React, { useEffect, useState } from "react";
import { FetchData } from "../Fetchdata";
import Card from "../Card/Card";
import HorizontalScroll from "../HorizontalScroll";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from "../SkeletonCard";
import { Link } from "react-router-dom";

const RecomMovie = ({ id }) => {
  const [ids, setIds] = useState('')
  const [recomMovieData, setrecomMovieData] = useState([])
  const [isLoading, setIsLoding] = useState(true)
  useEffect(() => {
    setIds(id)
  }, [id])
  useEffect(() => {
    let recomMovieApi = `https://api.themoviedb.org/3/movie/${ids}/recommendations?api_key=9d5b8e25ecd3e4f7d23376aee2eda565&language=en-US`
    if (ids) {
      FetchData(recomMovieApi).then((data) => {
        setrecomMovieData(data)
        setIsLoding(false)
      }).catch((err) => {
        setIsLoding(false)
      })
    }
  }, [ids])
  if (recomMovieData.length) {
    return (<><div className=".popular-container">
      <Link to="/home" style={{ textDecoration: " none ", color: "white" }}>  <h3 className="popular-heading"> Recommendated Movies</h3></Link>
    </div>
      {isLoading ? <SkeletonCard /> : recomMovieData ?
        <HorizontalScroll>
          {recomMovieData.map((item, index) => {
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

    </>)
  }
  else return null;

}

export default RecomMovie;
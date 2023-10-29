import React, { useEffect, useState } from "react";
import { FetchData } from "../Fetchdata";
import Card from "../Card/Card";
import HorizontalScroll from "../HorizontalScroll";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from "../SkeletonCard";
import { Link } from "react-router-dom";

const SimilarMovie = ({ id }) => {
  const [ids, setIds] = useState('')
  const [similarMovieData, setSimilarMovieData] = useState([])
  const [isLoading, setIsLoding] = useState(true)
  useEffect(() => {
    setIds(id)
  }, [id])
  useEffect(() => {
    const similarMovieApi = `https://api.themoviedb.org/3/movie/${ids}/similar?api_key=9d5b8e25ecd3e4f7d23376aee2eda565&language=en-US`
    if (ids) {
      FetchData(similarMovieApi).then((data) => {
        setSimilarMovieData(data)
        setIsLoding(false)
      }).catch((err) => {
        setIsLoding(false)
      })
    }
  }, [ids])
  if (similarMovieData.length) {
    return (<><div className=".popular-container">
      <Link to="/home" style={{ textDecoration: " none ", color: "white" }}>  <h3 className=".popular-heading"> Similar Movies</h3></Link>
    </div>
      {isLoading ? <SkeletonCard /> : similarMovieData ?
        <HorizontalScroll>
          {similarMovieData.map((item, index) => {
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

export default SimilarMovie;
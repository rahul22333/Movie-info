import React, { useEffect, useState } from "react";
import { FetchData } from "../Fetchdata";
import Card from "../Card/Card";
import HorizontalScroll from "../HorizontalScroll";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from "../SkeletonCard";
import { Link } from "react-router-dom";

const RecomTvShow = ({ id }) => {
  const [ids, setIds] = useState('')
  const [recomTvData, setrecomTvData] = useState([])
  const [isLoading, setIsLoding] = useState(true)
  useEffect(() => {
    setIds(id)
  }, [id])
  useEffect(() => {
    const recomTvApi = `https://api.themoviedb.org/3/tv/${ids}/recommendations?api_key=9d5b8e25ecd3e4f7d23376aee2eda565&language=en-US`
    if (ids) {
      FetchData(recomTvApi).then((data) => {
        setrecomTvData(data)
        setIsLoding(false)
      }).catch((err) => {
        setIsLoding(false)
      })
    }
  }, [ids])
  if (recomTvData.length) {
    return (<><div className=".popular-container">
      <Link to="/home" style={{ textDecoration: " none ", color: "white" }}>  <h3 className="popular-heading">Recommendeted Tv Show</h3></Link>
    </div>
      {isLoading ? <SkeletonCard /> : recomTvData ?
        <HorizontalScroll>
          {recomTvData.map((item, index) => {
            return (<Card
              key={index}
              id={item.id}
              type='tv'
              image={item.poster_path}
              title={item.name}
              rate={item.vote_average
              }
              lang={item.original_language} />)
          })}</HorizontalScroll> : <SkeletonCard />}
    </>)
  }
  else return null

}

export default RecomTvShow;
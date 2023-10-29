import React, { useEffect, useState } from "react";
import { FetchData } from "./Fetchdata";
import Card from "./Card/Card";
import HorizontalScroll from "./HorizontalScroll"
import SkeletonCard from "./SkeletonCard";
import { Link } from "react-router-dom";

const TvShowList = ({ type }) => {
  const [TvShowData, setTvShowData] = useState([])
  const [isLoading, setIsLoding] = useState(true)
  const TvShowListApi = `https://api.themoviedb.org/3/tv/${type}?api_key=9d5b8e25ecd3e4f7d23376aee2eda565&language=en-US&page=3`
  useEffect(() => {
    FetchData(TvShowListApi).then((data) => {
      setTvShowData(data)
      setIsLoding(false)
    }).catch((err) => {
      setIsLoding(false)
      alert(err)
    })
  }, [])
  return (<>
    <div className="App">
      <div className="polular-container">
        <Link to={`/tv/${type}`} style={{ textDecoration: " none ", color: "white" }}>  <h2 className="popular-heading"> {type.toUpperCase()} Tv Show</h2></Link>
      </div>
      {isLoading ? <SkeletonCard /> : TvShowData ?
        <HorizontalScroll>
          {TvShowData ? TvShowData.map((item, index) => {
            return (<Card
              key={index}
              id={item.id}
              type='tv'
              image={item.poster_path}
              title={item.name}
              rate={item.vote_average
              }
              lang={item.original_language}
            />)
          }) : null}
        </HorizontalScroll> : <SkeletonCard />}
    </div>

  </>)

}

export default TvShowList;



















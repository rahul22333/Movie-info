import React from "react";
import { useNavigate } from "react-router-dom";
const Cards = ({ image, title, rate, lang, id, type }) => {
  const navigate = useNavigate()
  const handleCard = (id, type) => {
    navigate(`/movieinfo/${id}`, { state: { type } })
    window.scrollTo(0, 0)
  }
  return (
    <div className="card" onClick={() => handleCard(id, type)}>
      <div>
        <img src={image ? `https://image.tmdb.org/t/p/w200/${image}` : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"} alt="img" className="image" />
      </div>
      <div className="details">
        <h5 className="title">{title.length > 15 ? title.slice(0, 10) : title} </h5>
        {type === "movie" ? <h6>{lang ? lang === "en" ? 'English Movie' : 'Original Movie' : "Original Movie"}</h6> : <h6>{lang ? lang === "en" ? 'English Tvshow' : 'Original Movie' : "Original Tvshow"}</h6>}
        <h6 className="rating">{rate ? rate : ""}</h6>
      </div>
    </div>
  )
}
export default Cards;











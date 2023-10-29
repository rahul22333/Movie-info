import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import SkeletonCard from "../component/SkeletonCard";
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RecomMovie from "../component/Recommendations/RecomMovie";
import RecomTvShow from "../component/Recommendations/RecomTv";
import SimilarMovie from "../component/Similar/SimilarMovie";
import SimilarTvShow from "../component/Similar/SimilarTvShow";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const MoviesInfo = () => {
    const [movieInfo, setMovieInfo] = useState({})
    const [isLoading, setIsLoding] = useState(true)
    const [ids, setIds] = useState('')
    const [types, setType] = useState('')
    const { id } = useParams()
    const location = useLocation();
    const type = location.state.type
    useEffect(() => {
        setIds(id)
        setType(type)
    }, [id])
    useEffect(() => {
        let movieInfoApi = `https://api.themoviedb.org/3/${types}/${ids}?api_key=9d5b8e25ecd3e4f7d23376aee2eda565&language=en-US`
        if (ids) {
            fetch(movieInfoApi).then((data) => {
                return data.json()
            }).then((result) => {
                setMovieInfo(result)
                setIsLoding(false)
            }).catch((err) => {
                console.log(err)
                setIsLoding(true)
            })
        }

    }, [ids, types])
    return (<>{(isLoading) ? <SkeletonCard /> : movieInfo ? <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={movieInfo.backdrop_path ? `https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}` : "https://media.istockphoto.com/id/1482176963/photo/dark-blue-background-with-confetti-horizontal.webp?b=1&s=170667a&w=0&k=20&c=XHZ8uohnIG_atY7DVstPcFY6LjP-aBfn-K3Q3T_9A2k="} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={movieInfo ? `https://image.tmdb.org/t/p/w200/${movieInfo.poster_path}` : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        {
                            type === "movie" ?
                                <div className="movie__name">{movieInfo ? movieInfo.original_title : ""}
                                </div> : <div className="movie__name">{movieInfo ? movieInfo.original_name : ""}
                                </div>
                        }
                        <div className="movie__tagline">{movieInfo ? movieInfo.tagline : ""}</div>
                        <div className="movie__rating">
                            {movieInfo ? movieInfo.vote_average : ""}
                            <span className="movie__voteCount">{movieInfo ? "(" + movieInfo.vote_count + ") votes" : ""}</span>
                        </div>
                        <div className="movie__runtime">{movieInfo ? movieInfo.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{movieInfo ? "Release date: " + movieInfo.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                movieInfo && movieInfo.genres
                                    ?
                                    movieInfo.genres.map(genre => (
                                        <span className="movie__genre" key={genre.id}>{genre.name}</span>
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{movieInfo ? movieInfo.overview : ""}</div>
                    </div>

                </div>
            </div>
        </div>
        {
            types === "movie" ? <RecomMovie id={ids} /> : <RecomTvShow id={ids} />}
        {types === "movie" ? <SimilarMovie id={ids} /> : <SimilarTvShow id={ids} />}
    </ThemeProvider> : <SkeletonCard />}</>
    )
}
export default MoviesInfo;









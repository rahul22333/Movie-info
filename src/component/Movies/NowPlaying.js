import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container } from '@mui/material';
import AllCards from '../Card/AllCards';
import SkeletonCard from '../SkeletonCard';
import { FetchData } from "../Fetchdata";

export default function NowPlaying() {
  const [recentListData, setRecentListData] = useState([])
  const [page, setPage] = useState(2)
  const [isLoading, setIsLoding] = useState(true)
  const recentListApi = `https://api.themoviedb.org/3/movie/now_playing?api_key=9d5b8e25ecd3e4f7d23376aee2eda565&language=en-US&page=${page}`
  useEffect(() => {
    FetchData(recentListApi).then((data) => {
      setRecentListData((pev) => [...pev, ...data])
      setIsLoding(false)
    }).catch((err) => {
      setIsLoding(false)
      alert(err)
    })
  }, [page])
  const handleInfineScroll = async () => {
    try {

      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
      ) {
        setPage((pev) => pev + 1)
      }
    } catch (err) {
      console.log(err)
      setIsLoding(true)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleInfineScroll)
    return () => window.removeEventListener("scroll", handleInfineScroll)
  }, [])
  return (
    <>
      <Typography variant="h4" align="center" >
        Now Playing
      </Typography>
      <main>
        <Container sx={{ py: 5 }} maxWidth="md">
          <Grid container spacing={3}  >
            {isLoading ? <SkeletonCard /> : recentListData ?
              recentListData.map((item, index) => (
                <AllCards
                  key={index}
                  type='movie'
                  id={item.id}
                  image={item.poster_path}
                  title={item.title}
                  rate={item.vote_average
                  }
                  lang={item.original_language} />
              )) : <SkeletonCard />}
          </Grid>
        </Container>
      </main>
    </>
  );
}












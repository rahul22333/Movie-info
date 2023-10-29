import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AllCards from '../../component/Card/AllCards';
import SkeletonCard from '../../component/SkeletonCard';
import { FetchData } from '../../component/Fetchdata';
import { useParams } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const TvShowList = () => {
  const { title } = useParams()
  const [tvShowListData, setTvShowListData] = useState([])
  const [page, setPage] = useState(2)
  const [isLoading, setIsLoding] = useState(true)
  const tvShowListApi = `https://api.themoviedb.org/3/tv/${title}?api_key=9d5b8e25ecd3e4f7d23376aee2eda565&language=en-US&page=${page}&language=en-US`
  useEffect(() => {
    FetchData(tvShowListApi).then((data) => {
      setTvShowListData((pev) => [...pev, ...data])
      setIsLoding(false)
    }).catch((err) => {
      setIsLoding(false)
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
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleInfineScroll)
    return () => window.removeEventListener("scroll", handleInfineScroll)
  }, [])
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Typography variant="h4" align="center" >
          {title ? title.toUpperCase() + " " + "    TV SHOW " : "Tv SHOW list"}
        </Typography>
        <main>
          <Container sx={{ py: 5 }} maxWidth="md">
            <Grid container spacing={3} >
              {isLoading ? <SkeletonCard /> : tvShowListData ?
                tvShowListData.map((item, index) => (
                  <AllCards
                    key={index}
                    id={item.id}
                    type='tv'
                    image={item.poster_path}
                    title={item.name}
                    rate={item.vote_average
                    }
                    lang={item.original_language} />
                )) : <SkeletonCard />}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
}

export default TvShowList;



















import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MovieList from '../component/Movies/MovieList';
import NowPlaying from '../component/Movies/NowPlaying';
import TvShowList from '../component/TvShowList';
import NavBar from '../component/NavBar';
import { useLocation } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar />
      <MovieList type='popular' />
      <MovieList type='top_rated' />
      <MovieList type='upcoming' />
      <TvShowList type='popular' />
      <TvShowList type='airing_today' />
      <NowPlaying />
    </ThemeProvider>
  );
}
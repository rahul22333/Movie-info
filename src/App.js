import React, { useEffect, useState } from 'react';
import  { Suspense, lazy } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import SkeletonCard from './component/SkeletonCard';
import Navbar from './component/NavBar';
const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/signUp/Login'));
const SignupPage = lazy(() => import('./pages/signUp/SignUp'));
const UserInfo = lazy(() => import('./pages/signUp/UserInfo'));
const MoviesList = lazy(()=> import('./pages/AllList/AllMovieList'));
const TvShowList = lazy (()=> import('./pages/AllList/AllTvShow'));
const NoMatch = lazy(()=>import('./pages/NoMatchPage'));
const MoviesInfo = lazy (()=>import('./pages/MovieInfo'))
const SearchList = lazy(()=>import('./pages/SearchList'))

function App() {
  // use token for rendering login page or home page
  const [isToken, setIsToken] = useState(false)
  useEffect(() => {
    // parsing the localstorage the for storing in array or object format
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
    const gmailInfo = JSON.parse(localStorage.getItem("gmailinfo"))
    if (loginInfo||gmailInfo) {
      setIsToken(true)
    }
  }, [])
  /* on the basis condition router has been set for rendering home or login page having path or route for navigate to different page  */
  return (
    <>
       <Navbar tokenValue={isToken}/>
      {(isToken) ?
        <Suspense fallback={<SkeletonCard/>}>
       <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/home' element={<HomePage />} />
        <Route exact path='/movie/:title' element={<MoviesList />} />
        <Route exact path='/tv/:title' element={<TvShowList />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/userinfo" element={<UserInfo />} />
        <Route exact path="/movieinfo/:id" element={<MoviesInfo/>}/>
        <Route exact path="/searchlist" element={<SearchList/>}/>
        <Route exact path="*" element={<NoMatch />} />
      </Routes>
        </Suspense>
       :
       <Suspense fallback={<SkeletonCard/>}>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path='/home' element={<HomePage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/userinfo" element={<UserInfo />} />
          <Route exact path='/movie/:title' element={<MoviesList />} />
          <Route exact path='/tv/:title' element={<TvShowList />} />
          <Route exact path="/movieinfo/:id" element={<MoviesInfo/>}/>
          <Route exact path="*" element={<NoMatch />} />
        </Routes>
          </Suspense>}


    </>
  );
}

export default App;


























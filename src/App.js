import React, { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SkeletonCard from "./component/SkeletonCard";
import UserContext from "./Context";
import Protected from "./component/Protected"
const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/signUp/Login"));
const SignupPage = lazy(() => import("./pages/signUp/SignUp"));
const UserInfo = lazy(() => import("./pages/signUp/UserInfo"));
const MoviesList = lazy(() => import("./pages/AllList/AllMovieList"));
const TvShowList = lazy(() => import("./pages/AllList/AllTvShow"));
const NoMatch = lazy(() => import("./pages/NoMatchPage"));
const MoviesInfo = lazy(() => import("./pages/MovieInfo"));
const SearchList = lazy(() => import("./pages/SearchList"));

function App() {
  const [loggedData,setLoggedData] = useState({
    userData:JSON.parse(localStorage.getItem("loginInfo")),
    userGmail: JSON.parse(localStorage.getItem("gmailinfo")),
  })
  return (
    <> 
    <UserContext.Provider value={{loggedData,setLoggedData}}> 
      <Suspense fallback={<SkeletonCard />}>
        <Routes>
          <Route exact path="/" element={ <Protected > <Home/></Protected>} />
          <Route exact path="/home" element= { <Protected> <Home /> </Protected>}/>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/movie/:title" element={<MoviesList />} />
          <Route exact path="/tv/:title" element={<TvShowList />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/userinfo" element={<UserInfo />} />
          <Route exact path="/movieinfo/:id" element={<MoviesInfo />} />
          <Route exact path="/searchlist" element={<SearchList />} />
          <Route exact path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
      </UserContext.Provider>
    </>
  );
}

export default App;



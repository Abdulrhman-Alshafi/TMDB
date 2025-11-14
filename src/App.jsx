import Header from "./components/Header";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./request";
import Trending from "./components/Trending";
import PercentageCircle from "./components/PercentageCircle";
import Footer from "./components/Footer";
function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchTrending() {
      const res = await axios.get(requests.fetchTrendingToday);
      setMovies(res.data.results);
    }
    fetchTrending();
  }, []);
  //trung
  console.log(movies);
  return (
    <>
      <Header />
      <Banner />
      <Trending title="Trending TV Shows" type="tv" theme="light" />
      <Trending title="Trending Movies" type="movie" theme="dark" />
      <Footer />
    </>
  );
}

export default App;

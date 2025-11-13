import Header from "./components/Header";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./request";
import Trending from "./components/Trending";
import PercentageCircle from "./components/PercentageCircle";
function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchTrending() {
      const res = await axios.get(requests.fetchTrendingToday);
      setMovies(res.data.results);
    }
    fetchTrending();
  }, []);
  console.log(movies);
  return (
    <>
      <Header />
      <Banner />
      <Trending />
      <main style={{ height: "200vh" }}></main>
    </>
  );
}

export default App;

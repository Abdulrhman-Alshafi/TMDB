import Banner from "../components/Banner"

import Trending from "../components/Trending"

const Home = () => {
    return (
        <>
            <Banner />
            <Trending title="Trending TV Shows" type="tv" theme="light" />
            <Trending title="Trending Movies" type="movie" theme="dark" />
        </>
    )
}

export default Home
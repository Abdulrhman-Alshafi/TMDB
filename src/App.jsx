import PercentageCircle from "./components/PercentageCircle";
import ButtonGroup from "./components/ButtonGroup";
import Header from "./components/Header";
import Banner from "./components/Banner";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <main style={{ height: "200vh" }}></main>{" "}
      <PercentageCircle percent={80} size={100} />
      <ButtonGroup />
    </>
  );
}

export default App;

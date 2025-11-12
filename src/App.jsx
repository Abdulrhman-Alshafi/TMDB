import PercentageCircle from "./components/PercentageCircle";
import ButtonGroup from "./components/ButtonGroup";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main style={{ height: "200vh" }}></main>{" "}
      <PercentageCircle percent={80} size={100} />
      <ButtonGroup />
    </>
  );
}

export default App;

import "./App.css";
import Graph from "./Container/component/Graph";
import Information from "./Container/component/Information";

function App() {
  return (
    <div className="App">
      <h1 className="heading">TEAM CHEMOTRIX DASHBOARD</h1>
      <div className="graph">
        <Graph />
      </div>

      <Information />
    </div>
  );
}

export default App;

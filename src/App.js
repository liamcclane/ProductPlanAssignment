import DragIcon from './static/images/add-icon.png';

import './App.css';

import { useState } from 'react';
import Header from './components/Header';
import CalenderHeaderMarkers from './components/Calendar/CalenderHeaderMarkers';
import Instruction from './components/Calendar/Instruction';
import Marker from './components/Calendar/Marker';
import TabNavigation from './components/TabNav/TabNavigation';
import Lane from "./components/Calendar/Lane";

function App() {
  const [lanes, setLanes] = useState([
    {
      "title": "lane 1",
      "bars": []
    },
    {
      "title": "lane 2",
      "bars": []
    },
    {
      "title": "lane 3",
      "bars": [
        { "start": "2021-1", "end": "2021-5" },
        { "start": "2021-6", "end": "2021-12" }
      ]
    }
  ]);
  const dates = [
    { "date": "2020-11", "quarterMarker": "2020" },
    { "date": "2020-12" },
    { "date": "2021-1", "quarterMarker": "Q1 2021"  },
    { "date": "2021-2" },
    { "date": "2021-3" },
    { "date": "2021-4", "quarterMarker": "Q2 2021"  },
    { "date": "2021-5" },
    { "date": "2021-6" },
    { "date": "2021-7", "quarterMarker": "Q3 2021"  },
    { "date": "2021-8" },
    { "date": "2021-9" },
    { "date": "2021-10", "quarterMarker": "Q4 2021"   },
    { "date": "2021-11"},
  ];
  // const quarterMarkers = ["2020", "Q1 2021", "Q2", "Q3", "Q4"];

  return (
    <div className="wrapper">
      <Header />
      <TabNavigation />
      {/* <Instruction /> */}
      <div className="main">
        <div className="calenderArea">
          {/* <CalenderHeaderMarkers arr={quarterMarkers}/> */}
          <CalenderHeaderMarkers arr={dates} />
          {lanes.map((ele, ind) => (
            <Lane title={ele.title} dates={dates} bars={ele.bars} key={ind} />
          ))}
        </div>
        <div className="dragArea">
          <div className="dragButtons">
            <img src={DragIcon} alt="drag-icon"></img>
            Add A Line
            </div>
          <div className="dragButtons">
            <img src={DragIcon} alt="drag-icon"></img>
            Add A Bar</div>
        </div>
      </div>
    </div>
  );
}

export default App;

{/* <div className="lane dropHere">Drop Here</div> */ }
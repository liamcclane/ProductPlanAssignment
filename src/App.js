import DragIcon from './static/images/add-icon.png';

import './App.css';

import { useState } from 'react';
import Header from './components/Header';
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
  const [dates, setDates] = useState([
    {"date": "2021-1"},
    {"date": "2021-2"},
    {"date": "2021-3"},
    {"date": "2021-4"},
    {"date": "2021-5"},
    {"date": "2021-6"},
    {"date": "2021-7"},
    {"date": "2021-8"},
    {"date": "2021-9"},
    {"date": "2021-10"},
    {"date": "2021-11"},
    {"date": "2021-12"},
  ])

  return (
    <div className="wrapper">
      <Header />
      <TabNavigation />
      <div className="main">
        <div className="calenderArea">
          <div>

          </div>
          <div className="lane dropHere">Drop Here</div>
          {lanes.map((ele, ind) => (
            <Lane title={ele.title} bars={ele.bars} key={ind} />
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

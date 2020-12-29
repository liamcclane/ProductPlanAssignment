import DragIcon from './static/images/add-icon.png';

import './App.css';

import Header from './components/Header';
import TabNavigation from './components/TabNav/TabNavigation';
import CalenderWrapper from './components/Calendar/CalenderWrapper';

function App() {
 
  return (
    <div className="wrapper">
      <Header />
      <TabNavigation />
      {/* <Instruction /> */}
      <CalenderWrapper />
    </div>
  );
}

export default App;

{/* <div className="lane dropHere">Drop Here</div> */ }
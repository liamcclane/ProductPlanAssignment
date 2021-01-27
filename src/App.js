import './App.css';

import Header from './components/Header';
import TabNavigation from './components/TabNav/TabNavigation';
import CalenderWrapper from './components/Calendar/CalenderWrapper';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <TabNavigation />
      <CalenderWrapper />
    </div>
  );
}

export default App;
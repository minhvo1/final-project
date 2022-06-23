import './App.scss';
import Sidebar from './components/Sidebar';
import PortfolioMain from './components/PortfolioMain/index';
import Header from './components/Header/index'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-container">
        <Header />
        <PortfolioMain />

      </div>
    </div>
  );
}

export default App;

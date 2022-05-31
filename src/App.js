import { ReactComponent as Logo } from './images/logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './Redux/connection'
import Details from './movieDetails'
import { Provider } from 'react-redux';
import storeDetails from './Redux/store';

const App = () => {
  return (
    <div className='mainMargin'>
      <div className='flex navBarGap alignCenter '>
        <Logo />
        <h3>MovieSearch</h3>
      </div>
      <Provider store={storeDetails}>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path='/SCB_Task' element={<Search />} />
              <Route path='/SCB_Task/:id' element={<Details />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>


    </div>
  );
}

export default App;

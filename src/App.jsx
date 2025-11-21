import Header from './layout/header';
import { Footer } from './layout/Footer';
import { GetProducts } from './components/GetProducts';
import { Route, Routes } from 'react-router-dom';
import { Product } from './components/Product';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path='/' element={<GetProducts/>}/>
        <Route path='/products/:id' element={<Product/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;

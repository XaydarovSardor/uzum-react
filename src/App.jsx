import Header from './layout/Header';
import { Footer } from './layout/Footer';
import { GetProducts } from './components/GetProducts';
import { Route, Routes } from 'react-router-dom';
import { Product } from './components/Product';
import { Cart } from './components/Cart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path='/' element={<GetProducts />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/savat' element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;

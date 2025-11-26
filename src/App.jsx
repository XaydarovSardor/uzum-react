import { Footer } from './layout/Footer';
import { GetProducts } from './components/GetProducts';
import { Route, Routes } from 'react-router-dom';
import { Product } from './components/Product';
import { Cart } from './components/Cart';
import { Header } from './layout/header';

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

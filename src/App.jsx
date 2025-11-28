import { Footer } from './layout/Footer';
import { GetProducts } from './components/GetProducts';
import { Route, Routes } from 'react-router-dom';
import { Product } from './components/Product';
import { Cart } from './components/Cart';
import { Header } from './layout/header';
import { Porfile } from './components/Porfile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("")
  return (
    <div className="wrapper">
      <Header setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<GetProducts search={search}/>} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/savat' element={<Cart />} />
        <Route path='/profile' element={<Porfile />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App;

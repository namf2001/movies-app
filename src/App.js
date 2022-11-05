import React from 'react'
import './App.scss';
import 'swiper/swiper.min.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';
import NotFound from './pages/NotFound.jsx';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path='/:category/search/:keyword'
          element={<Catalog />}
        />
        <Route
          path='/:category/:id'
          element={<Detail />}
        />
        <Route
          path='/:category'
          element={<Catalog />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
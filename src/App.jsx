import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Registration from './components/Registration'
import Login from './components/Login'
import HotelListByDistrict from './components/HotelListByDistrict'
import HotelDetails from './components/HotelDetails'
import Profile from './components/Profile'


function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/account/register" element={<Registration />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/profile" element={<Profile/>} />
          <Route path="/hotels/:slug" element={<HotelListByDistrict/>} />
          <Route path="/hotel/:district/:slug" element={<HotelDetails/>} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
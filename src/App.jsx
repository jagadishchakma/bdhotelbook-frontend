import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Registration from './components/Registration'
import Login from './components/Login'
import HotelListByDistrict from './components/HotelListByDistrict'
import HotelDetails from './components/HotelDetails'
import Profile from './components/Profile'
import Deposit from './components/Deposit'
import Contact from './components/Contact'
import About from './components/About'


function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/account/register" element={<Registration />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/profile" element={<Profile/>} />
          <Route path="/account/deposit" element={<Deposit/>} />
          <Route path="/hotels/:slug" element={<HotelListByDistrict/>} />
          <Route path="/hotel/:district/:slug" element={<HotelDetails/>} />
        </Routes>
      <Footer />
    </Router>
  )
}

export default App

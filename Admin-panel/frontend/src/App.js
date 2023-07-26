import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Panel from './Panel'
import Header from './Header';
import Footer from './Footer';
import Signup1 from './Signup1';
import Otp1 from './Otp1';
import Entries1 from './Entries1';
import Login1 from './Login1';
import Account from './Account'
function App() {
  return (
 <Routes>
  
  <Route path="panel" element={<Panel />} />
  
  <Route path="Header" element={<Header />} />
  <Route path="Footer" element={<Footer />} />
  <Route path="Signup1" element={<Signup1 />} />
  <Route path="Otp1" element={<Otp1 />} />
  <Route path="Entries1" element={<Entries1 />} />
  <Route path="Login1" element={<Login1 />} />
  <Route path="account" element={<Account />} />
  </Routes>
  );
}

export default App;

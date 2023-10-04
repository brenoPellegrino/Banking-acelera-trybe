import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateAcc from '../pages/CreateAcc';
import Login from '../pages/login';
import Home from '../pages/home';
import EditAcc from '../pages/EditAcc';

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<CreateAcc />}/>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='editAcc' element={<EditAcc />}/>
    </Routes>
    </BrowserRouter>
  )
}
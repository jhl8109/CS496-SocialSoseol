import './App.css';
import Novel from './component/Novel';
import Sign from './component/Sign';
import {Route, Routes, BrowserRouter, useRoutes, Router} from 'react-router-dom';
import Navbar from './component/Navbar';
import Poem from './component/Poem';
import Paging from './component/Pagination';
import Writing from './component/Writing';

function App() {
  return ( 
    <BrowserRouter>
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Sign />} />
        <Route path="/novel" element={<Novel/>} />
        <Route path='/relay/novel' element={<Paging/>}/>
        <Route path='/poem' element={<Poem/>}/>
        <Route path='/write' element={<Writing/>}></Route>
      </Routes>
    </BrowserRouter>
  )


}

export default App;
import './App.css';
import Novel from './component/Novel';
import Sign from './component/Sign';
import {Route, Routes, BrowserRouter, useRoutes, Router} from 'react-router-dom';
import Navbar from './component/Navbar';
import PostList from './component/table/PostList';
import Poem from './component/Poem';

function App() {
  return ( 
    <BrowserRouter>
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Sign />} />
        <Route path="/novel" element={<Novel/>} />
        <Route path='/relay/novel' element={<PostList/>}/>
        <Route path='/poem' element={<Poem/>}/>
      </Routes>
    </BrowserRouter>
  )


}

export default App;

import './App.css';
import Novel from './component/Novel';
import Sign from './component/Sign';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Navbar from './component/Navbar';
import Paging from './component/Pagination';
import PagingPoem from './component/PaginationPoem';
<<<<<<< HEAD
import PagingPersonalNovel from './component/PaginationNovelPersonal';
import PagingPersonalPoem from './component/PaginationPoemPersonal';
=======
import Writing from './component/Writing';
>>>>>>> aeed59843410c9fd8563636c4dd36a0648670f2c

function App() {
  return ( 
    <BrowserRouter>
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Sign />} />
<<<<<<< HEAD
        <Route path="/novel" element={<Novel/>} />
        <Route path='/relay/novel' element={<Paging/>}/>
        <Route path='/relay/poem' element={<PagingPoem/>}/>
        <Route path='/personal/novel' element={<PagingPersonalNovel/>}/>
        <Route path='/personal/poem' element={<PagingPersonalPoem/>}/>
=======
        <Route path="/novel"  element={<Paging/>}/>
        <Route path="/poem"  element={<PagingPoem/>}/>
        <Route path='/relay/novel' element={<Novel/>}/>
        <Route path='/relay/poem' />
        {/* <Route path='/poem' element={<Poem/>}/> */}
        <Route path='/write' element={<Writing/>}/>
>>>>>>> aeed59843410c9fd8563636c4dd36a0648670f2c
      </Routes>
    </BrowserRouter>
  )


}

export default App;
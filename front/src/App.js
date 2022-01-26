import './App.css';
import Novel from './component/Novel';
import Sign from './component/Sign';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Navbar from './component/Navbar';
import Poem from './component/Poem';
import Paging from './component/Pagination';
import PagingPoem from './component/PaginationPoem';
import PagingPersonalNovel from './component/PaginationNovelPersonal';
import PagingPersonalPoem from './component/PaginationPoemPersonal';
import Writing from './component/Writing';

function App() {
  return ( 
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Sign />} />
        <Route path="/novel/:id" element={<Novel/>} />
        <Route path='/poem/:id' element={<Poem/>}/>
        <Route path='/novel' element={<Paging/>}/>
        <Route path='/poem' element={<PagingPoem/>}/>
        <Route path='/personal/novel' element={<PagingPersonalNovel/>}/>
        <Route path='/personal/poem' element={<PagingPersonalPoem/>}/>
        <Route path='/write/:category' element={<Writing/>}/>
      </Routes>
    </BrowserRouter>
  )


}

export default App;
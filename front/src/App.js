import './App.css';
import Novel from './component/Novel';
import Sign from './component/Sign';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Navbar from './component/Navbar';
import Paging from './component/Pagination';
import PagingPoem from './component/PaginationPoem';
import Writing from './component/Writing';

function App() {
  return ( 
    <BrowserRouter>
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Sign />} />
        <Route path="/novel"  element={<Paging/>}/>
        <Route path="/poem"  element={<PagingPoem/>}/>
        <Route path='/relay/novel' element={<Novel/>}/>
        <Route path='/relay/poem' />
        {/* <Route path='/poem' element={<Poem/>}/> */}
        <Route path='/write' element={<Writing/>}/>
      </Routes>
    </BrowserRouter>
  )


}

export default App;
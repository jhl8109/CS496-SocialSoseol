import React, { useState } from "react";
import "./Pagination.css";
import { Pagination, Typography, Grid } from "@mui/material";
import RelayPoem from './RelayPoem';

function Paging() {

  const [poemList,setPoemList] =useState([0,1,2,3,4,5,6,7,8,9,10,11,12]);
  const [state, setState] = useState([false,false,false,false,false,false]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  function handleChangePage(event, value) {
    setPage(value);
    setState([false,false,false,false,false,false]);
  }

  return (
    <div className="App">
        {
            <div>
                {<RelayPoem poemList={poemList.slice(Number((page - 1) * itemsPerPage),Number(itemsPerPage * Number(page)))} setPoemList={setPoemList} 
                state={state} setState={setState} page = {page} setPage = {setPage}/>}
            </div>
        }
      <Pagination
          style={{display:'flex',justifyContent:'center',alignItems:'center'}}
          count={
            // aqui eu divido o tamanho do array pela quantidade de itens exibidos
            // mas pense comigo
            // 20/6 = 3.333...
            // logo preciso arrendodar para cima o número de páginas
            // 20/6 = 4
            // para arredondar uso a função do JS Math.ceil() para cima
            // ou Math.floor() para baixo
            Math.ceil(poemList.length / itemsPerPage)
          }
          onChange={handleChangePage}
        />
      
    </div>
  );
}

export default Paging

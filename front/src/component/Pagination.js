import React, { useState, useEffect } from "react";
import "./Pagination.css";
import { Pagination, Typography, Grid } from "@mui/material";
import RelayNovel from './RelayNovel';
import { set } from "mongoose";

function Paging() {
  const [novelList,setNovelList] =useState([]);
  const [contentList,setContentList] =useState([]);
  const [state, setState] = useState([false,false,false,false,false,false]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = "";

  useEffect(()=>{
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    var obj = new Object();
    
    fetch("http://localhost:80/categorybook?category=릴레이소설", requestOptions)
    .then(response => response.text())
    .then(result => {
      obj = JSON.parse(result);
      console.log(obj.categorybook);
      setNovelList(obj.categorybook);
      console.log("novelList");
      console.log(novelList);
      
    })  
    .catch(error => console.log('error', error));
    
},[])
  
 


  function handleChangePage(event, value) {
    setPage(value);
    setState([false,false,false,false,false,false]);
  }

  return (
    <div className="App">
        {
            <div>
                {<RelayNovel novelList={novelList.slice(Number((page - 1) * itemsPerPage),Number(itemsPerPage * Number(page)))} setNovelList={setNovelList} 
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
            Math.ceil(novelList.length / itemsPerPage)
          }
          onChange={handleChangePage}
        />
      
    </div>
  );
}

export default Paging
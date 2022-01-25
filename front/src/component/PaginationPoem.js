import React, { useState, useEffect } from "react";
import "./PaginationPoem.css";
import { Pagination, Typography, Grid } from "@mui/material";
import RelayPoem from './RelayPoem';
import { set } from "mongoose";

function Paging() {
  const [poemList,setPoemList] =useState([]);
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
    
    fetch("http://localhost:80/categorybook?category=개인시", requestOptions)
    .then(response => response.text())
    .then(result => {
      obj = JSON.parse(result);
      console.log(obj.categorybook);
      setPoemList(obj.categorybook);
      console.log("poemList");
      console.log(poemList);
      
    })  
    .catch(error => console.log('error', error));
    
},[])
  
 


  function handleChangePage(event, value) {
    setPage(value);
    setState([false,false,false,false,false,false]);
  }

  return (
    <><div className="App">
      {<div>
        {<RelayPoem poemList={poemList.slice(Number((page - 1) * itemsPerPage), Number(itemsPerPage * Number(page)))} setPoemList={setPoemList}
          state={state} setState={setState} page={page} setPage={setPage} />}
      </div>}
    </div>
    <Pagination
          style={{display:'flex',justifyContent:'center',alignItems:'center'}}
          count={
            Math.ceil(poemList.length / itemsPerPage)
          }
          onChange={handleChangePage}
        />
    <div className="Button">
        <button>글쓰기</button>
    </div></>

  );
}

export default Paging

import React, { useState, useEffect } from "react";
import "./Pagination.css";
import { Pagination, Typography, Grid } from "@mui/material";
import PersonalNovel from './PersonalNovel';
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
    
    fetch("http://localhost:80/categorybook?category=개인소설", requestOptions)
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
  
const writingPage = () => {
  window.location.href = "/write/개인소설"
}


  function handleChangePage(event, value) {
    setPage(value);
    setState([false,false,false,false,false,false]);
  }

  return (
    <><div className="App"  style={{justifyContent:'center',alignItems:'center'}}>
        {
            <div>
                {<PersonalNovel novelList={novelList.slice(Number((page - 1) * itemsPerPage),Number(itemsPerPage * Number(page)))} setNovelList={setNovelList} 
                state={state} setState={setState} page = {page} setPage = {setPage}/>}
            </div>
        }
        </div>
      <Pagination
          style={{display:'flex',justifyContent:'center',alignItems:'center'}}
          count={
            Math.ceil(novelList.length / itemsPerPage)
          }
          onChange={handleChangePage}
        />
      <div>
        <button className = "Button" onClick={writingPage} >글쓰기</button>
        </div></> 
    

  );
}

export default Paging

import React, {useState,useEffect} from "react";
import { Card,Typography, CardHeader,CardContent, IconButton,Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import {DeleteOutlined} from '@mui/icons-material';
import {AiOutlineHeart, AiTwotoneHeart} from 'react-icons/ai';

function NovelPaper(props) {
    const [auth, setAuth] = useState({});
    const {id} = props;
    const [heart,setHeart] = useState([]);
    const {novelList, setNovelList} = props;
    const cardStyle = {'margin' : '10px', 'width' : '1000px', 'backgroundImage':'url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99738F355C6D05C42A)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
};


useEffect(()=>{
    fetch("/auth", {credentials : 'include'})
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setAuth(res);
        })
        .catch(error => console.log('error', error));
        /************************************/ 
},[])
useEffect(()=>{
    let arr = new Array();
    for (var i = 0; i < novelList.length; i++) {
        fetch("/getlikenode?nodefrom="+novelList[i].nodeid+"&writer="+auth.nickname)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            console.log(res.like);
            arr.push(res.like);
            setHeart(arr);
            console.log(heart);
        })
        .catch(error => console.log('error', error));  
    }
},[novelList])
useEffect(()=>{
    
},[heart])


    function heartClick(e,index) {
        e.stopPropagation();
        console.log(auth.nickname);
        let arr = new Array();
        for (let i = 0; i < heart.length;i++) {
            if (i === index) {
                if(heart[i] == true) {
                    var requestOptions = {
                        method: 'DELETE',
                        headers: myHeaders,
                        redirect: 'follow'
                      };
                      arr.push(!heart[i]);
                      fetch("/dislikenode?nodefrom="+novelList[i].nodeid+"&writer="+auth.nickname, requestOptions)
                      .then(response => response.text())
                      .then(result => {
                        console.log(result)
                        
                        setHeart(arr);
                        let arr2 = new Array();
                        var obj = new Object();
                        for (var i = 0; i < novelList.length; i++) {
                            obj = novelList[i];
                            obj.likes = obj.likes-1;
                            arr2.push(obj);
                        }
                        setNovelList(arr2);
                      })
                      .catch(error => console.log('error', error));              
                    
                } else { // heart[i] == false              
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var raw = JSON.stringify({
                        "nodefrom": novelList[i].nodeid, // props로 book에서 클릭시 받아오기
                        "writer" : auth.nickname
                      });
              
                      var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                      };
                      arr.push(!heart[i]);
                      fetch("/likenode", requestOptions)
                      .then(response => response.text())
                      .then(result => {
                        console.log(result)
                        
                        setHeart(arr);
                        let arr2 = new Array();
                        var obj = new Object();
                        for (var i = 0; i < novelList.length; i++) {
                            obj = novelList[i];
                            obj.likes = obj.likes+1;
                            arr2.push(obj);
                        }
                        setNovelList(arr2);
                      })
                      .catch(error => console.log('error', error));    
                }
            }
            else {arr.push(heart[i]);}
        }
        
        //httpHeart(index);

    }
    function httpHeart(index) {
        var requestOptions = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"}
            };
            var obj = new Object();
            fetch("/viewbook/?bookid="+novelList[index].bookid, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result); 
                obj = JSON.parse(result);
                console.log(obj.loginSuccess);
            
            })
            .catch(error => console.log('error', error));
    }
    const showNovelList = novelList.map( (card, index) => {
        return (novelList[index] !== undefined ?
            <div key={index}>
                <Accordion style = {cardStyle}>
                    <AccordionSummary title="Title 1">
                        <div style = {{fontFamily:"title111", fontWeight:"bold", fontSize: "30px"}}>{card.writer}</div>
                        <IconButton aria-label="settings" onClick={(e)=>heartClick(e,index)}>
                        {heart[index] === false?  <AiOutlineHeart/>: <AiTwotoneHeart color="red"/>}
                        <Typography variant="h5" style={{fontWeight : "bold"}}>{card.likes}</Typography>
                        </IconButton>
                        
                    </AccordionSummary>  
                    <AccordionDetails style = {{fontFamily:"shy", fontWeight:"bold", fontSize:  "22px"}}>  
                        {card.content}
                    </AccordionDetails>
                </Accordion>
            </div>
            : <></>)
        }
    )
    return(
        <div>
            {showNovelList}
        </div>
    )
}


export default NovelPaper;

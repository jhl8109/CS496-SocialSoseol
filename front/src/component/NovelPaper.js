import React, {useState,useEffect} from "react";
import { Card,Typography, CardHeader,CardContent, IconButton,Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import {DeleteOutlined} from '@mui/icons-material';
import {AiOutlineHeart, AiTwotoneHeart} from 'react-icons/ai';

function NovelPaper(props) {
    const [auth, setAuth] = useState({});
    const {id} = props;
    const [heart,setHeart] = useState([false,]);
    const {novelList, setNovelList} = props;
    const cardStyle = {'margin' : '10px', 'width' : '1000px', 'backgroundImage':'url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99738F355C6D05C42A)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
};


useEffect(()=>{
    let arr = new Array();
    for (var i = 0; i < novelList.length; i++) {
        arr.push(false);
    }
    setHeart(arr);
    fetch("/auth", {credentials : 'include'})
        .then(response => response.text())
        .then(result => {
            console.log(result);
            setAuth(result);
        })
        .catch(error => console.log('error', error));
},[])
useEffect(()=>{
    let arr = new Array();
    for (var i = 0; i < novelList.length; i++) {
        arr.push(false);
    }
    setHeart(arr);
},[novelList])


    function heartClick(e,index) {
        e.stopPropagation();
        let arr = new Array();
        for (let i = 0; i < heart.length;i++) {
            if (i === index) arr.push(!heart[i]);
            else arr.push(heart[i]);
        }
        setHeart(arr);
        console.log(heart);
        //httpHeart(index);

    }
    function httpHeart(index) {
        var requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "nodefrom":novelList[index].nodeid,
                "writer":novelList[index].writer
            })
            };
            var obj = new Object();
            fetch("/login", requestOptions)
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

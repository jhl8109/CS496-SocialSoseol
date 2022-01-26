import React, {useState,useEffect} from "react";
import {Typography, CardHeader,CardContent, IconButton,Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import {AiOutlineHeart, AiTwotoneHeart} from 'react-icons/ai';

function PoemPaper(props) {
    const [auth, setAuth] = useState({});
    const [bookHeart,setBookHeart] = useState();
    const {id} = props;
    const [heart,setHeart] = useState([]);
    const {poemList, setPoemList} = props;
    const cardStyle = {'margin' : '10px', 'width' : '1000px', 'backgroundImage':'url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99738F355C6D05C42A)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'};


useEffect(()=>{
    fetch("/auth", {credentials : 'include'})
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            console.log(res);
            setAuth(res);
            fetch("http://localhost:80/getlikebook?bookfrom="+id+"&writer="+res.nickname)
            .then(response => response.text())
            .then(result => {
                var res = JSON.parse(result);
                console.log(res.like);
                setBookHeart(res.like);
            })
            .catch(error => console.log('error', error));        

            })
            .catch(error => console.log('error', error));


        
        /************************************/ 
},[])
useEffect(()=>{
    console.log("poemList : "+poemList);
    let arr = new Array();
    for (var i = 0; i < poemList.length; i++) {
        fetch("/getlikenode?nodefrom="+poemList[i].nodeid+"&writer="+auth.nickname)
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
},[poemList])


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
                      fetch("/dislikenode?nodefrom="+poemList[i].nodeid+"&writer="+auth.nickname, requestOptions)
                      .then(response => response.text())
                      .then(result => {
                        console.log(result)
                        
                        setHeart(arr);
                        let arr2 = new Array();
                        var obj = new Object();
                        for (var i = 0; i < poemList.length; i++) {
                            obj = poemList[i];
                            if (i == index) {
                                obj.likes = obj.likes-1;
                            }
                            arr2.push(obj);
                        }
                        setPoemList(arr2);
                        console.log(poemList);
                      })
                      .catch(error => console.log('error', error));              
                    
                } else { // heart[i] == false              
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var raw = JSON.stringify({
                        "nodefrom": poemList[i].nodeid, // props로 book에서 클릭시 받아오기
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
                        for (var i = 0; i < poemList.length; i++) {
                            obj = poemList[i];
                            if (i == index) {
                                obj.likes = obj.likes+1;
                            }
                            arr2.push(obj);
                        }
                        setPoemList(arr2);
                      })
                      .catch(error => console.log('error', error));    
                }
            }
            else {arr.push(heart[i]);}
        }
        
        //httpHeart(index);

    }
    const clickBookHeart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (bookHeart == true) {     
            console.log("dislike")             
            var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            fetch("http://localhost:80/dislikebook?bookfrom="+id+"&writer="+auth.nickname, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                setBookHeart(!bookHeart);
            })
            .catch(error => console.log('error', error));
        } else { // bookHeart == false
            console.log("like")
            var raw = JSON.stringify({
                "bookfrom": id, // props로 book에서 클릭시 받아오기
                "writer" : auth.nickname
                });
                  
                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
                fetch("http://localhost:80/likebook", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    setBookHeart(!bookHeart);
                    // if(result == "Success") {
                    //     setBookHeart(bookHeart+1);
                    // }
                })
                .catch(error => console.log('error', error));
        }
            
    }
    const showPoemList = poemList.map( (card, index) => {
        console.log(poemList[index]);
        console.log(heart);
        console.log(heart[index]);
        return (poemList[index] !== undefined ?
            <div key={index}>
                <Accordion style = {cardStyle}>
                    <AccordionSummary title="Title 1">
                        <div style = {{fontFamily:"title111", fontWeight:"bold", fontSize: "30px"}}>{card.writer}</div>
                        <IconButton aria-label="settings" onClick={(e)=>heartClick(e,index)}>
                        {(heart[index] == false|| heart[index] == undefined) ?  <AiOutlineHeart/>: <AiTwotoneHeart color="red"/>}
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
            <IconButton aria-label="settings" onClick={clickBookHeart}>
                {bookHeart === false ?  <AiOutlineHeart/>: <AiTwotoneHeart color="red"/>}
                <Typography variant="h5" style={{fontWeight : "bold"}}>likes</Typography>
            </IconButton> 
            {showPoemList}  
        </div>
    )
}


export default PoemPaper;

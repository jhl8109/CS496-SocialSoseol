import MainSwipe from './Swiper';
import NovelPaper from './NovelPaper';
import AddPaper from './AddPaper';
<<<<<<< HEAD
import React, {useState} from "react";
import Comment from './addComment'
import {useParams} from 'react-router-dom';
=======
import React, {useState,useEffect} from "react";
import Twittler from './comment_react';
>>>>>>> a772292622e54782f34458149bfa0519f439be3b


function Novel(props) {
    let {id}= useParams();
    const [novelList,setNovelList] = useState([]);
    const [nodeList, setNodeList] = useState([]);
    return (
        <div>
            <div style = {{display:"flex", flexDirection:"column", alignItems:"center"}} elevation={3}>
<<<<<<< HEAD
                <NovelPaper novelList = {novelList} setNovelList = {setNovelList} id = {id}/>
                <MainSwipe novelList = {novelList} setNovelList = {setNovelList} nodeList = {nodeList} setNodeList = {setNodeList} id = {id}/>
                <AddPaper novelList = {novelList} setNovelList = {setNovelList} nodeList = {nodeList} setNodeList = {setNodeList} id = {id}/>
                <Comment id = {id}/>
=======
                <NovelPaper novelList = {novelList} setNovelList = {setNovelList}/>
                <Twittler></Twittler>
                <MainSwipe novelList = {novelList} setNovelList = {setNovelList}/>
                <AddPaper novelList = {novelList} setNovelList = {setNovelList}/>
>>>>>>> a772292622e54782f34458149bfa0519f439be3b
            </div>
        </div>
        
    )
}

export default Novel;
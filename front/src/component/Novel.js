import MainSwipe from './Swiper';
import NovelPaper from './NovelPaper';
import AddPaper from './AddPaper';
import React, {useState} from "react";
import Twittler from './comment_react'
import {useParams} from 'react-router-dom';


function Novel(props) {
    let {id}= useParams();
    const [novelList,setNovelList] = useState([]);
    const [nodeList, setNodeList] = useState([]);
    return (
        <div style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
            <div style = {{display:"flex", flexDirection:"column", alignItems:"center"}} elevation={3}>
                <NovelPaper novelList = {novelList} setNovelList = {setNovelList} id = {id}/>
                <MainSwipe novelList = {novelList} setNovelList = {setNovelList} nodeList = {nodeList} setNodeList = {setNodeList} id = {id}/>
                <AddPaper novelList = {novelList} setNovelList = {setNovelList} nodeList = {nodeList} setNodeList = {setNodeList} id = {id}/>
                <Twittler id = {id}/>
            </div>
        </div>
        
    )
}

export default Novel;
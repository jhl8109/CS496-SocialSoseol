import MainSwipe from './Swiper';
import NovelPaper from './NovelPaper';
import AddPaper from './AddPaper';
import React, {useState,useEffect} from "react";
import Twittler from './comment_react';


function Novel(props) {
    var bookfrom = 1;
    var postid = 0;
    const [novelList,setNovelList] = useState([]);
    const [nodeList, setNodeList] = useState([]);
    return (
        <div>
            <div style = {{display:"flex", flexDirection:"column", alignItems:"center"}} elevation={3}>
                <NovelPaper novelList = {novelList} setNovelList = {setNovelList}/>
                <Twittler></Twittler>
                <MainSwipe novelList = {novelList} setNovelList = {setNovelList}/>
                <AddPaper novelList = {novelList} setNovelList = {setNovelList}/>
            </div>
        </div>
        
    )
}

export default Novel;
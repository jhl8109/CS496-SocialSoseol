import PoemSwipe from './PoemSwiper';
import PoemPaper from './PoemPaper';
import AddPoemPaper from './AddPoemPaper';
import React, {useState} from "react";
import Twittler from './comment_react'
import {useParams} from 'react-router-dom';


function Poem(props) {
    let {id}= useParams();
    const [poemList,setPoemList] = useState([]);
    const [nodeList, setNodeList] = useState([]);
    return (
        <div style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
            <div style = {{display:"flex", flexDirection:"column", alignItems:"center"}} elevation={3}>
                <PoemPaper poemList = {poemList} setPoemList = {setPoemList} id = {id}/>
                <PoemSwipe poemList = {poemList} setPoemList = {setPoemList} nodeList = {nodeList} setNodeList = {setNodeList} id = {id}/>
                <AddPoemPaper poemList = {poemList} setPoemList = {setPoemList} nodeList = {nodeList} setNodeList = {setNodeList} id = {id}/>
                <Twittler id = {id}/>
            </div>
        </div>
        
    )
}

export default Poem;
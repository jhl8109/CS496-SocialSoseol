import MainSwipe from './Swiper';
import NovelPaper from './NovelPaper';
import AddPaper from './AddPaper';
import React, {useState,useEffect} from "react";


function Novel() {
    const [novelList,setNovelList] = useState([{subTitle : "제호의 자기 소개 타임",writer:"jeho",content:"안녕하세요."},{writer:"jeho2",content:"안녕하세요2."}]);
    useEffect(()=>{
        console.log(novelList);
    },[novelList,setNovelList])

    return (
        <div>
            <div style = {{display:"flex", flexDirection:"column", alignItems:"center"}} elevation={3}>
                <NovelPaper novelList = {novelList} setNovelList = {setNovelList}/>
                <MainSwipe novelList = {novelList} setNovelList = {setNovelList}/>
                <AddPaper/>
            </div>
        </div>
        
    )
}

export default Novel;
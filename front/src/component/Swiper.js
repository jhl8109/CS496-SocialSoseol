import React, {useState,useEffect} from "react";
import SwiperCore, {Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import {Swiper, SwiperSlide} from "swiper/react";
import { Card,Typography, CardHeader,CardContent, IconButton, Grid } from '@mui/material';
import {AiOutlineHeart, AiTwotoneHeart} from 'react-icons/ai';

function CustomCard(props) {

    const [heart,setHeart] = useState(false);
    
    

    const cardStyle = {'margin' : '10px', 'width' : '95%'};

    function heartClick(e) {
        e.stopPropagation();
        setHeart(!heart);
        console.log("heart");
    }

    return (
        <div>
            <Card style={cardStyle}>
                <CardHeader
                    action={
                        <div>
                            <IconButton >
                                {heart === false?  <AiOutlineHeart onClick={heartClick} />: <AiTwotoneHeart color="red" onClick={heartClick}/>}
                            </IconButton>
                        </div>
                    }
                    title = {props.writer}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                    {props.content}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

function MainSwipe(props) {
    const {novelList, setNovelList} = props;
    const [nodeList,setNodeList] = useState([]);
    const [nodeId, setNodeId] = useState(0);
    const [bookId, setBookId] = useState(0);
    const cardStyle = {'margin' : '10px', 'width' : '600px'};

    useEffect(()=>{
        /* postman */
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = '{"bookfrom":1, "postid":99}';
        const obj = JSON.parse(raw);

        var url = new URL("http://localhost:80/getnextnode"),
            params = obj
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            result = JSON.parse(result);
            var resArr = result.getnextnode;
            setBookId(resArr[0].bookfrom);            
            setNodeList(result.getnextnode);
        })
        .catch(error => console.log('error', error));
    },[])

    const showNodeList = nodeList.map((card, index) => {
        return (nodeList[index] !== undefined ? <SwiperSlide key={index} onClick={()=>makeNovel(index)} > 
        <CustomCard content = {card.content} writer = {card.writer} ></CustomCard>
        </SwiperSlide > : <></>)
        }
    )

    function makeNovel(index) {
        console.log("hello");
        setNodeId(nodeList[index].nodeid);
        setNovelList([...novelList,nodeList[index]]);
        setNodeList([]);
    }

    SwiperCore.use([Navigation]);

    return (
        <div style={{'padding' : '10px', 'marginTop':'30px'}}>
            <Swiper 
            style={cardStyle}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides
            > 
                {showNodeList}
            </Swiper>
        </div>
      );
};

export default MainSwipe;
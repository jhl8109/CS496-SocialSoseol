import React, {useState,useEffect} from "react";
import SwiperCore, {Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import {Swiper, SwiperSlide} from "swiper/react";
import { Card,Typography, CardHeader,CardContent, IconButton, Grid } from '@mui/material';
import {AiOutlineHeart, AiTwotoneHeart} from 'react-icons/ai';

function CustomCard(props) {
    const [heart,setHeart] = useState(false);   
    const {index,nodeList, setNodeList} = props;
    const [auth,setAuth] = useState({});
    const cardStyle = {'margin' : '10px', 'width' : '95%'};

    useEffect(()=>{
        fetch("/auth", {credentials : 'include'})
            .then(response => response.text())
            .then(result => {
                var res = JSON.parse(result);
                console.log(res);
                setAuth(res);
                fetch("http://localhost:80/getlikenode?nodefrom="+nodeList[index].nodeid+"&writer="+res.nickname)
                .then(response => response.text())
                .then(result => {
                    var res = JSON.parse(result);
                    console.log(res.like);
                    setHeart(res.like);
                })
                .catch(error => console.log('error', error));        
    
                })
            .catch(error => console.log('error', error));
    },[])
    useEffect(()=>{
        fetch("/auth", {credentials : 'include'})
            .then(response => response.text())
            .then(result => {
                var res = JSON.parse(result);
                console.log(res);
                setAuth(res);
                fetch("http://localhost:80/getlikenode?nodefrom="+nodeList[index].nodeid+"&writer="+res.nickname)
                .then(response => response.text())
                .then(result => {
                    var res = JSON.parse(result);
                    console.log(res.like);
                    setHeart(res.like);
                })
                .catch(error => console.log('error', error));        
    
                })
            .catch(error => console.log('error', error));
    },[nodeList])


    function heartClick(e) {
        e.stopPropagation();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (heart == true) {     
            console.log("dislike")             
            var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            fetch("http://localhost:80/dislikenode?nodefrom="+nodeList[index].nodeid+"&writer="+auth.nickname, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                if (result == "Success") {
                    setHeart(!heart);
                    var arr = new Array();
                    for (var i = 0; i < nodeList.length; i++) {
                        if (i !== index) arr.push(nodeList[i]);
                        else {
                            var obj = nodeList[i];
                            obj.likes--;
                            arr.push(obj);
                        }
                    }
                    setNodeList(arr);
                }
                
            })
            .catch(error => console.log('error', error));
        } else { // bookHeart == false
            console.log("like")
            var raw = JSON.stringify({
                "nodefrom": nodeList[index].nodeid, // props로 book에서 클릭시 받아오기
                "writer" : auth.nickname
                });
                  
                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
                fetch("http://localhost:80/likenode", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    if (result == "Success") {
                        setHeart(!heart);
                        var arr = new Array();
                        for (var i = 0; i < nodeList.length; i++) {
                            if (i !== index) arr.push(nodeList[i]);
                            else {
                                var obj = nodeList[i];
                                obj.likes++;
                                arr.push(obj);
                            }
                        }
                        setNodeList(arr);
                    }
                    
                })
                .catch(error => console.log('error', error));
        setHeart(!heart);
        console.log("heart");
    }
}
    return (
        <div>
            <Card style={cardStyle}>
                <CardHeader
                    action={
                        <div>
                            <IconButton >
                                {heart === false?  <AiOutlineHeart onClick={heartClick} />: <AiTwotoneHeart color="red" onClick={heartClick}/>}
                                <Typography variant="h5" style={{fontWeight : "bold"}}>{nodeList[index].likes}</Typography>
                            </IconButton>
                        </div>
                    }
                    title = {nodeList[index].writer}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                    {nodeList[index].content}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

function PoemSwipe(props) {
    const {id} = props;
    const {poemList, setPoemList} = props;
    const {nodeList,setNodeList} = props;
    const cardStyle = {'margin' : '10px', 'width' : '600px'};

    useEffect(()=>{
        /* postman */
        getNodeList();
    },[])

    useEffect(() => {
        console.log(nodeList);
    }, [nodeList])

    useEffect(()=>{
        console.log(poemList);
        if(poemList.length > 0)
            getNodeList();
    },[poemList])

    const getNodeList = () => {
       
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var tmp = 0;
        if (poemList.length != 0) tmp = poemList[poemList.length-1].nodeid;

        var raw = `{"bookfrom":${id}, "postid":${tmp}}`;
        const obj = JSON.parse(raw);

        var url = new URL("http://localhost:80/getnextnode"),
            params = obj
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);   
            console.log(res);    
            if (res.getnextnode !== undefined) setNodeList(res.getnextnode);
            else setNodeList([]);
        })
        .catch(error => console.log('error', error));
    }

    

    const showNodeList = nodeList.map((card, index) => {
        return (nodeList[index] !== undefined ? <SwiperSlide key={index} onClick={()=>makePoem(index)} > 
        <CustomCard index = {index} nodeList = {nodeList} setNodeList = {setNodeList}></CustomCard>
        </SwiperSlide > : <></>)
        }
    )

    function makePoem(index) {

        var arr = new Array();
        for (var i = 0; i < poemList.length; i++) {
            arr.push(poemList[i]);
        }

        arr.push(nodeList[index]);
        console.log(arr);
        setPoemList(arr);
        setNodeList(new Array());
        // getNodeList(arr);
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
                {nodeList!==undefined ? showNodeList : <></>}
            </Swiper>
        </div>
      );
};

export default PoemSwipe;
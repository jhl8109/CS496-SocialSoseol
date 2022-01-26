import React, { useState, useEffect } from 'react'
import {Swiper, SwiperSlide} from "swiper/react";
import { makeStyles } from '@mui/styles';
import { Paper, Grid, Typography, TextField,Button, Switch,CardHeader,CardContent, IconButton,Card} from '@mui/material';
import SwiperCore, {Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
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

function Comment(props) {
  const cardStyle = {'margin' : '10px', 'width' : '600px'};
  const btnStyle = {margin:'8px 0'}
  const textStyle = {margin:'8px 0'};
  const textProps = {maxLength: "300", step: "1"};
  const [commentList, setCommentList] = useState([]);
  const paperStyle={padding : 20, height:'400px',width:"1000px", margin: "20px auto"};
  var writer;
  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = `{"bookfrom":1}`;
    const obj = JSON.parse(raw);

    var url = new URL("http://localhost:80/getcommentbook"),
      params = obj
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
    .then(response => response.text())
    .then(result => {
      console.log(result)
      var res = JSON.parse(result);
      var resArr = res.getcommentbook;
      console.log(resArr);
      console.log(resArr[0].writer);
      setCommentList(resArr);
    })
    .catch(error => console.log('error', error));
  },[])

  const useStyles = makeStyles(() => ({
    input1: {
      fontFamily: "title111",
      fontWeight:"bold",
      fontSize : "30px"
    },
    input2: {
      height: 500,
      width : "60vh",
      maxLength:300, step: "1",
      fontFamily: "shy",
      fontWeight:"bold",
      fontSize : "23px"
    }
  }));
  
  const classes = useStyles();

  const [commentValue, setcommentValue] = useState("");

  const handleClick = (event) => {
    setcommentValue(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "writer":"minwoo",
      "bookfrom":1,
      "content":commentValue
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:80/commentbook", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }
  const showCommentList = commentList.map( (card, index) => {
    return (commentList[index] !== undefined ? <SwiperSlide key={index}> 
    <CustomCard writer = {card.writer} content = {card.content}/>
    </SwiperSlide > : <></>)
    }
)

  return (
    <div>
      <br />
      <hr />

      {/* Comment Lists */}

      {/* Root Comment Form */}

      <Grid style={{ 'padding' : '10px', 'marginTop' : '10px' }}>
        <Paper elevation={4} style = {paperStyle}>
          <Grid align="center">
            <Typography variant="h5">책이 어땠나요?</Typography>
          </Grid>
          <TextField multiline value = {commentValue} rows={8}  variant='standard' style = {textStyle} label='댓글' placeholder="최대 100자 입니다." InputProps={{ classes: { input: classes.input2 }}} inputProps={textProps} onChange={handleClick} fullWidth required/>
          <Button type='submit' color='primary' variant="contained" style={btnStyle} onClick={onSubmit} fullWidth>등록</Button>
        </Paper>
      </Grid>

      <div style={{'padding' : '10px', 'marginTop':'30px'}}>
            <Swiper 
            style={cardStyle}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides
            > 
                {showCommentList}
            </Swiper>
        </div>
    </div>
  )
}

export default Comment
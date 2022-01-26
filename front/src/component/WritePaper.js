import React, {useState, useEffect, useRef} from "react";
import { Paper, Grid, Typography, TextField,Button, Switch} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useParams} from 'react-router-dom';

function WritePaper(props) {
  const {category} = props; 
  const paperStyle={padding : 20,width:"1000px", margin: "20px auto"};
  const btnStyle = {margin:'8px 0'}
  const textStyle = {margin:'8px 0'}
  const [textValue, setTextValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const textProps = {maxLength : "300",step: "1"};
  const {status} = props;
  const [auth, setAuth] = useState({});
  const inputProps = {minLength: "1", maxLength: "20", step: "1"};

    
  useEffect(()=>{
    fetch("/auth", {credentials : 'include'})
    .then(response => response.text())
    .then(result => {
      var res = JSON.parse(result);
      setAuth(res);
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

    let textChange = (e) => {
      setTextValue(e.target.value); // text 받기
    }
    let titleChange = (e) => {
      setTitleValue(e.target.value); // text 받기
  }

    let btnSubmit = (e) => {
      e.preventDefault();
      makebook();
    }
    let makebook = () => {
      var raw = JSON.stringify({
        "bookname": titleValue, 
        "writer" : auth.nickname,
        "category": category,
        "genre": status, 
        "content": textValue 
      });
    console.log(raw);
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("/book", requestOptions)
      .then(response => response.text())
      .then(result => {
        var res = JSON.parse(result);
        console.log(res);
        makeNode(res.bookid);
      })
      .catch(error => console.log('error', error)); 
    }  
    let makeNode = (id) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "bookfrom": id, // props로 book에서 클릭시 받아오기
        "postid" : 0,
        "writer": auth.nickname,
        "content": textValue // db에 보낼 텍스트
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("/node", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        var res = JSON.parse(result);
        //setNodeList([...nodeList,res]);
        
        setTitleValue('');
        setTextValue('');
        var next;
        switch(category) {
          case "릴레이소설" :
            next = '/novel'
            break;
          case "릴레이시" :
            next = '/poem'
            break;  
          case "개인소설" :
            next = '/personal/poem'
            break;  
          case "개인시" :
            next = '/personal/novel'
            break;  
        }
        window.location.href = next;
      })
      .catch(error => console.log('error', error));
    }
    

    return (
        <Grid style={{ 'padding' : '10px', 'marginTop':'10px'}}>
            <Paper elevation={4} style = {paperStyle}>
                <Grid align="center">
                    <Typography variant="h5">글쓰기</Typography> 
                </Grid>
                <TextField helperText = {"제목"} variant='standard' value = {titleValue} style = {textStyle} label='제목' placeholder="최대 20자 입니다."  InputProps={{ classes: { input: classes.input1 }}} inputProps={inputProps} onChange={e=>titleChange(e)} fullWidth required/>
                <TextField multiline value = {textValue} rows={35}  variant='standard' style = {textStyle} label='본문' placeholder="최대 300자 입니다." InputProps={{ classes: { input: classes.input2 }}} inputProps={textProps} onChange={e=>textChange(e)} fullWidth required/>   
                <Button type='submit' color='primary' variant="contained" style={btnStyle} onClick={btnSubmit} fullWidth>등록</Button>
            </Paper>
        </Grid>
      );
};

export default WritePaper;
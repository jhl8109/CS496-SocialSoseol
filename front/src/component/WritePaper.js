import React, {useState, useEffect, useRef} from "react";
import { Paper, Grid, Typography, TextField,Button, Switch} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ToggleButton from 'react-toggle-button'

function WritePaper(props) {
  const paperStyle={padding : 20,width:"1000px", margin: "20px auto"};
  const btnStyle = {margin:'8px 0'}
  const textStyle = {margin:'8px 0'}
  const [textValue, setTextValue] = useState('');
  const textProps = {step: "1"};
  let loginid, nickname,userlevel;

    
  useEffect(()=>{
    fetch("/auth", {credentials : 'include'})
    .then(response => response.text())
    .then(result => {
      var res = JSON.parse(result);
      loginid = res.loginid;
      nickname = res.nickname;
      userlevel = res.userlevel;
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

    let btnSubmit = (e) => {
      e.preventDefault();
      console.log(textValue);
      setTextValue("");
    }
      
      
    

    return (
        <Grid style={{ 'padding' : '10px', 'marginTop':'10px'}}>
            <Paper elevation={4} style = {paperStyle}>
                <Grid align="center">
                    <Typography variant="h5">글쓰기</Typography> 
                </Grid>
                <TextField multiline value = {textValue} rows={35}  variant='standard' style = {textStyle} label='본문' placeholder="최대 300자 입니다." InputProps={{ classes: { input: classes.input2 }}} inputProps={textProps} onChange={e=>textChange(e)} fullWidth required/>   
                <Button type='submit' color='primary' variant="contained" style={btnStyle} onClick={btnSubmit} fullWidth>등록</Button>
            </Paper>
        </Grid>
      );
};

export default WritePaper;
import React, {useState, useRef} from "react";
import { Paper, Grid, Typography, TextField,Button} from '@mui/material';
import { makeStyles } from '@mui/styles';

function AddPaper(props) {
    const paperStyle={padding : 20, height:'400px',width:"1000px", margin: "20px auto"};
    const btnStyle = {margin:'8px 0'}
    const textStyle = {margin:'8px 0'}
    const [textValue, setTextValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const textProps = {maxLength: "300", step: "1"};
    const {novelList,setNovelList} = props

    const inputProps = {minLength: "1", maxLength: "20", step: "1"};
    
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
      console.log(textValue);

      /* postman code */
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "bookfrom": 1,
        "writer": "사랑꾼",
        "content": textValue // db에 보낼 텍스트
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://143.248.75.68:80/node", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        /* postman code */
        setTextValue("");
        setTitleValue("");
        var tmp = novelList;
        setNovelList([...novelList,true]);
    }

    return (
        <Grid style={{ 'padding' : '10px', 'marginTop':'10px'}}>
            <Paper elevation={4} style = {paperStyle}>
                <Grid align="center">
                    <Typography variant="h5">릴레이 소설</Typography> 
                </Grid>
                <TextField helperText = {"브랜치 소제목"} variant='standard' value = {titleValue} style = {textStyle} label='소제목' placeholder="최대 20자 입니다."  InputProps={{ classes: { input: classes.input1 }}} inputProps={inputProps} onChange={e=>titleChange(e)} fullWidth required/>
                <TextField multiline value = {textValue} rows={8}  variant='standard' style = {textStyle} label='본문' placeholder="최대 300자 입니다." InputProps={{ classes: { input: classes.input2 }}} inputProps={textProps} onChange={e=>textChange(e)} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnStyle} onClick={btnSubmit} fullWidth>등록</Button>
            </Paper>
        </Grid>
      );
};

export default AddPaper;
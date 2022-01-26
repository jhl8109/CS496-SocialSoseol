import React, {useState, useEffect, useRef} from "react";
import { Paper, Grid, Typography, TextField,Button, Switch} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ToggleButton from 'react-toggle-button'

function AddPoemPaper(props) {
  const {id} = props;
  const paperStyle={padding : 20, height:'400px',width:"1000px", margin: "20px auto"};
  const btnStyle = {margin:'8px 0'}
  const textStyle = {margin:'8px 0'}
  const [textValue, setTextValue] = useState('');
  const textProps = {maxLength: "300", step: "1"};
  const {poemList,setPoemList} = props
  const {nodeList,setNodeList} = props
  const [toggle, setToggle] = useState(true)
  const [disabled, setDisabled] = useState(true);
  const [auth , setAuth] = useState({});

    
  useEffect(()=>{
    fetch("/auth", {credentials : 'include'})
    .then(response => response.text())
    .then(result => {
      var res = JSON.parse(result);
      console.log(res.nickname);
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

    let btnSubmit = (e) => {
      e.preventDefault();
      console.log(textValue);
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
     

      if (toggle === true) { // 노드에 추가(세로)
        var postid = 0;
        if (poemList.length !== 0) postid = poemList[poemList.length-1].nodeid;
        var raw = JSON.stringify({
          "bookfrom": id, // props로 book에서 클릭시 받아오기
          "postid" : postid,
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
          setNodeList([...nodeList,res]);
        })
        .catch(error => console.log('error', error));
        
        setTextValue("");
      } else { // 브랜치에 추가 (가로)
        var postid = 0;
        postid = nodeList[0].postid;
        var raw = JSON.stringify({
          "bookfrom": id, // props로 book에서 클릭시 받아오기
          "postid" : postid,
          "writer": auth.nickname,
          "content": textValue // db에 보낼 텍스트
        });
        
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        setNodeList([...nodeList,{"writer":auth.nickname, "content": textValue}]);
        fetch("/node", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      }
      setTextValue("");
    }
      
      
    

    return (
        <Grid style={{ 'padding' : '10px', 'marginTop':'10px'}}>
            <Paper elevation={4} style = {paperStyle}>
              <Typography variant="body2">OFF : 브랜치 / ON : 노드
                <ToggleButton
                  value={toggle}
                  onToggle={(value) => {
                    setToggle(!toggle)
                    if ((nodeList.length === 0 && !toggle) || (nodeList.length !== 0 && toggle)) {
                      setDisabled(false);
                    } else {
                      setDisabled(true);
                    }
                  }} /></Typography> 
                <Grid align="center">
                    <Typography variant="h5">릴레이 소설</Typography> 
                </Grid>
                <TextField multiline value = {textValue} rows={8}  variant='standard' style = {textStyle} label='본문' placeholder="최대 300자 입니다." InputProps={{ classes: { input: classes.input2 }}} inputProps={textProps} onChange={e=>textChange(e)} fullWidth required/>   
                <Button disabled = {disabled} type='submit' color='primary' variant="contained" style={btnStyle} onClick={btnSubmit} fullWidth>등록</Button>
            </Paper>
        </Grid>
      );
};

export default AddPoemPaper;
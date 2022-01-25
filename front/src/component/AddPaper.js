import React, {useState, useEffect} from "react";
import { Paper, Grid, Typography, TextField,Button, FormControlLabel,Switch } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';



function AddPaper(props) {
    const paperStyle={padding : 20, height:'400px',width:"1000px", margin: "20px auto"};
    const btnStyle = {margin:'8px 0'}
    const textStyle = {margin:'8px 0'}
    const [textValue, setTextValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const textProps = {maxLength: "300", step: "1"};
    const {novelList,setNovelList} = props
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
      setNovelList([...novelList,{"writer":nickname, "content": textValue}]);

      /* postman code */
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "bookfrom": 1, // props로 book에서 클릭시 받아오기
        "writer": nickname,
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
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }

    const Android12Switch = styled(Switch)(({ theme }) => ({
      padding: 8,
      '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 16,
          height: 16,
        },
        '&:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
          )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
          left: 12,
        },
        '&:after': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
          )}" d="M19,13H5V11H19V13Z" /></svg>')`,
          right: 12,
        },
      },
      '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
      },
    }));

    return (
        <Grid style={{ 'padding' : '10px', 'marginTop':'10px'}}>
            <Paper elevation={4} style = {paperStyle}>
                <FormControlLabel
                  control={<Android12Switch defaultChecked />}
                  label="브랜치/노드"
                />  
                <Grid align="center">
                    <Typography variant="h5">릴레이 소설</Typography> 
                </Grid>
                <TextField multiline value = {textValue} rows={8}  variant='standard' style = {textStyle} label='본문' placeholder="최대 300자 입니다." InputProps={{ classes: { input: classes.input2 }}} inputProps={textProps} onChange={e=>textChange(e)} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnStyle} onClick={btnSubmit} fullWidth>등록</Button>
            </Paper>
        </Grid>
      );
};

export default AddPaper;
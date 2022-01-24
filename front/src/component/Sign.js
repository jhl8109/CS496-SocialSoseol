import React, {useState,useEffect} from "react";
import { Paper, Grid, Avatar, Typography, TextField, FormControlLabel,Checkbox, Button, Link} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios'

const inputProps = {minLength: "6", maxLength: "15", step: "1"};

function SignIn(props) {
    const paperStyle={padding : 20, height:'60vh',width:500, margin: "20px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnStyle = {margin:'8px 0'}
    const textStyle = {margin:'8px 0'}
    const {setSign} = props;
    const [idErr, setIdErr] = useState(false);
    const [pwErr, setPwErr] = useState(false);
    const [idErrMsg, setIdErrMsg] = useState(null);
    const [pwErrMsg, setPwErrMsg] = useState(null);
    const [idValue, setIdValue] = useState('');
    const [pwValue, setPwValue] = useState(''); 


    useEffect(()=>{
        fetch("/auth", {credentials : 'include'})
        .then(response => response.text())
        .then(result => {console.log(result)})
        .catch(error => console.log('error', error));
    },[])


    let idChange = (e) => {
        setIdValue(e.target.value);
    }

    let pwChange = (e) => {
        setPwValue(e.target.value);
    }

    
    let btnSign = (e) => {
        e.preventDefault();
        setSign(1);
        console.log(1);
    }



    let btnSubmit = (e) => {
        var json_result;
        e.preventDefault();
        setIdValue('');
        setPwValue('');

        var requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "loginid":idValue,
            "password":pwValue,
        })
        };
        var obj = new Object();
        fetch("/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result); 
            obj = JSON.parse(result);
            let index = [];
            console.log("login : ",obj.loginSuccess);
            var message;
            for (let x in obj) {
                index.push(x);
            }
            if (obj.message === "Id doesn't exists") {
                console.log("id err");
                setIdErr(true);
                setPwErr(false);
                setIdErrMsg(obj.message);
                setPwErrMsg(null);
            } else if (obj.message === "wrong password") {
                console.log("pw error");
                setIdErr(false);
                setPwErr(true);
                setIdErrMsg(null);
                setPwErrMsg(obj.message);
            } else if (obj.loginSuccess === true) {
                console.log("bbbb");
                window.location.href = "/novel";
            }
        })
        .catch(error => console.log('error', error));
        
    }

    return (
        <Grid style={{ 'padding' : '10px', 'marginTop':'70px'}}>
            <Paper elevation={8} style = {paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockIcon/></Avatar>
                    <Typography variant="h5">로그인</Typography> 
                </Grid>
                <TextField error = {idErr===true?true:false} helperText = {idErrMsg!=null?idErrMsg : ""} variant='standard' value = {idValue} style = {textStyle} label='아이디' placeholder="Enter ID"  inputProps={inputProps} onChange={e=>idChange(e)} fullWidth required/>
                <TextField error = {pwErr===true?true:false} helperText = {pwErrMsg!=null?pwErrMsg : ""} variant='standard' value = {pwValue} style = {textStyle} label='비밀번호' placeholder="Enter password" type='password' inputProps={inputProps} onChange={e=>pwChange(e)} fullWidth required/>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                            />
                    }
                    label="ID 기억하기"
                />
                <Button type='submit' color='primary' variant="contained" style={btnStyle} onClick={btnSubmit}fullWidth>로그인</Button>
                <Typography style = {textStyle}> 계정이 없으신가요? 
                    <Link href="#" onClick={btnSign}>회원가입</Link>
                </Typography>
            </Paper>
        </Grid>
      );
};

function SignUp(props) {
    const paperStyle={padding : 20, height:'50vh',width:500, margin: "20px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnStyle = {margin:'8px 0'}
    const textStyle = {margin:'8px 0'}
    const [nameValue, setNameValue] = useState('');
    const [idValue, setIdValue] = useState('');
    const [pwValue, setPwValue] = useState('');
    const [idErr,setIdErr] = useState(false);
    const [pwErr,setPwErr] = useState(false);
    const {setSign} = props;

    function handleClick() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("withCredentials", true);

        var raw = JSON.stringify({
            "loginid":idValue,
            "password":pwValue,
            "nickname":nameValue,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            credentials: "same-origin"
            };

        fetch("/register", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setSign(0);
    }
    let nameChange = (e) => {
        setNameValue(e.target.value);
    }
    let idChange = (e) => {
        setIdValue(e.target.value);
        if (idValue.length < 6) {
            setIdErr(true);
        } else {
            setIdErr(false);
        }
    }

    let pwChange = (e) => {
        setPwValue(e.target.value);
        if (pwValue.length < 6) {
            setPwErr(true);
        } else {
            setPwErr(false);
        }
    }
    return (
        <Grid style={{ 'padding' : '10px', 'marginTop':'70px'}}>
            <Paper elevation={8} style = {paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockIcon/></Avatar>
                    <Typography variant="h5">회원가입</Typography> 
                </Grid>
                <TextField style = {textStyle} label='닉네임' placeholder="Enter NickName" inputProps={inputProps} onChange={(e) => nameChange(e)} fullWidth required/>
                <TextField style = {textStyle} label='아이디' placeholder="Enter ID" inputProps={inputProps} onChange={(e) => idChange(e)} error={idErr === true ? true : false}  fullWidth required/>
                <TextField style = {textStyle} label='비밀번호' placeholder="Enter password" type='password' onChange={(e) => pwChange(e)} error={pwErr === true ? true : false} inputProps={inputProps} fullWidth required/>
                <Button onClick = {handleClick} type='submit' color='primary' variant="contained" style={btnStyle} disabled={(idErr || pwErr) ? true : false} fullWidth>회원가입</Button>
            </Paper>
        </Grid>
      );
};

function Sign() {
    const [sign, setSign] = useState(0);

    return(
        <>
            {sign === 0? <SignIn setSign={setSign}/> : <SignUp setSign={setSign}/>}
        </>
    )
};

export default Sign;
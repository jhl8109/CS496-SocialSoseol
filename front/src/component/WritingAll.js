import React from 'react';
import {ToggleButtonGroup, ToggleButton, Grid, Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import WritePaper from './WritePaper';
import WritePaperAll from './WritePaperAll';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: 'gray',
      height: 500
    },
    filter: {
      display: "flex",
      alignItems: "center"
    },
    lblFilter: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      marginRight: theme.spacing(2)
    },
    btnFilter: {
      height: theme.spacing(5),
      fontSize: "0.75rem",
      minWidth: 135
    }
  }));

function Writing(props) {
    const [status, setStatus] = React.useState("action");

    const handleStatus = (event, newStatus) => {
        if (newStatus === null) {
          return;
        }
        setStatus(newStatus);
        console.log(newStatus);
      };

        
  return (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",  flexDirection:"column"}}>
            <Box className={useStyles.filter}>
                <ToggleButtonGroup value={status} exclusive onChange={handleStatus}>
                    <ToggleButton className={useStyles.btnFilter} value="action">
                        액션
                    </ToggleButton>
                    <ToggleButton className={useStyles.btnFilter} value="scared">
                        공포/스릴러
                    </ToggleButton>
                    <ToggleButton className={useStyles.btnFilter} value="SF">
                        SF
                    </ToggleButton>
                    <ToggleButton className={useStyles.btnFilter} value="fantasy">
                        판타지
                    </ToggleButton>
                    <ToggleButton className={useStyles.btnFilter} value="romance">
                        로맨스
                    </ToggleButton>
                    <ToggleButton className={useStyles.btnFilter} value="comedy">
                        코미디
                    </ToggleButton>
                </ToggleButtonGroup>
          </Box>
          <WritePaperAll/>
            
          
      </div>
    
  )
};

export default Writing;
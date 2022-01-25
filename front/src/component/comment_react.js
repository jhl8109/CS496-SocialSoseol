
import React from 'react';
import SingleTweet from './SingleTweet';
import { Paper, Grid, Typography, TextField,Button, FormControlLabel,Switch } from '@mui/material';

class Twittler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [
        {
          uuid: 1,
          writer: "노민우",
          date:"2022-01-25",
          content:"hihihi"
        },
        {
          uuid: 2,
          writer: "이제호",
          date: "2022-01-25",
          content: "bababa"
        }
      ]
    }
    this.addTweet = this.addTweet.bind(this);
  }
  addTweet() {
    let value = document.querySelector('#new-tweet-content').value;
    this.setState({tweets: [...this.state.tweets, {
      uuid: this.state.tweets.length + 1,
      writer: "정우진",
      date: new Date().toISOString().slice(0, 10),
      content: value
    }]})
  }
  render() {
    const textStyle = {margin: '8px 0'}
    return (
      <div id="root">
        <div>
          <div>작성자: 노민우</div>
          <Grid style={{ 'padding' : '10px', 'marginTop' : '10px' }}>
          <div id="writing-area">
            <textarea id="new-tweet-content" style = {textStyle}></textarea>
            <button id="submit-new-tweet" onClick={this.addTweet}>새 글 쓰기</button>
          </div>
          </Grid>
          <ul id="tweets">
            {
              this.state.tweets.map(tweet => {
                return <SingleTweet key={tweet.uuid} tweet={tweet}/>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Twittler;
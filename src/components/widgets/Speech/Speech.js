/*
 * @Author: TanJing 
 * @Date: 2018-03-29 17:45:37 
 * @Last Modified by: TanJing
 * @Last Modified time: 2018-05-16 11:42:41
 * @Description:  百度语音识别UI,按住说话，松开结束，通过getspeech导出识别结果
 */

import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import * as basr from './index';
import io from 'socket.io-client';

let voice;
const socket = io.connect('http://localhost:8082/voice');
const TokenDeadline = 1000 * 60 * 60 * 24 * 28;// token有效期28天
const token_url = '/oauth/2.0/token?grant_type=client_credentials&client_id=' + 'DPO4bfPkGztjojfsunRsCCtb' + '&client_secret=' + '5cfe5eebf65a6fb03d24e84ce4cc44d8';
export default class Speech extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    function vaildToken() {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('token')) {
          // 如果没有缓存的token，重新获取
          reject();
        } else {
          // 判断是否过期
          const [token, timestamp] = [localStorage.getItem('token'), localStorage.getItem('token')];
          const delta = new Date() - new Date(timestamp);
          delta > TokenDeadline ? reject() : resolve(token);
        }
      });
    }
    function saveToken(token) {
      localStorage.setItem('token', token);
      localStorage.setItem('timestamp', new Date());
    }
    function fetchToken() {
      fetch(token_url).then(res => res.json()).then((data) => {
        const token = data.access_token;
        saveToken(token);
        initBasr(token);
      });
    }
    function initBasr(token) {
      basr
        .authorize({
          token,
          url: '/server_api'
        })
        .then(ready, error);
    }
    function ready() {
      console.log('准备好录音了');
      socket.on('voice-recieve', (data) => {
        console.log(data);
      });
    }
    function error() {
      alert('如要使用语音识别，请授权语音操作');
    }
    vaildToken().then((token) => {
      initBasr(token);
    }, fetchToken);
  }
  onMouseDown() {
    console.log('I\'m listenning');
    voice = basr.start();
  }
  onMouseUp() {
    console.log('speech ending');
    const that = this;
    voice
      .end()
      .result()
      .then(
        (res) => {
          console.log(`Result: ${res}`);
          that.props.getspeech(res);
        },
        (error) => {
          console.error(`Error: ${JSON.stringify(error)}`);
        }
      )
      .then(() => {
        // status = 0;
      });
    // let wav = voice.wav();
    // let audio = document.createElement('audio');
    // audio.setAttribute('autoplay', 'autoplay');
    // audio.src = URL.createObjectURL(new Blob(wav, { type: 'audio/wav' }));
    // document.body.appendChild(audio);
  }
  render() {
    return (
      <Button
style={this.props.style}
type='primary'
shape='circle'
icon='meh-o'
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp.bind(this)}
      />
    );
  }
}

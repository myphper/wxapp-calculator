//index.js
var app = getApp()
var util = require('../../utils/util.js'); 
Page({
  data: {
    content: 0,
    lastTap: 0,
    opt: 0,
    lastNum: 0,
    power:1
  },
  onLoad: function () {
    this.clear();
  },
  clear:function(){
    this.output(0);
  },
  clearAll:function(){
    this.output(0);
    this.setData({
      content: 0,
      lastTap: 0,
      lastNum: 0
    });
  },
  calculator:function(){
    if(isNaN(this.data.lastNum)){
      this.data.lastNum = 0;
    }
    if(isNaN(this.data.content)){
      this.data.content = 0;
    }
    var first = 1*this.data.lastNum;
    var second = 1*this.data.content;
    
    var opt = this.data.opt;
    switch(opt){
      case '÷':
        if(second != 0){
          this.output(first/second);
        }
        break;
      case 'x':
        if(second != 0){
          this.output(first*second);
        }
        break;
      case '+':
        if(second != 0){
          this.output(first+second);
        }
        break;
      case '-':
        if(second != 0){
          this.output(first-second);
        }
        break;
    }
  },
  setLastTap:function(content){
    console.log(this.data);
    this.setData({
      lastTap:content
    });
  },
  setLastNum:function(content){
    console.log(this.data);
    this.setData({
      lastTap:content,
      opt:content,
      lastNum:this.data.content
    });
  },
  bindViewTapInput:function (e){
    var content = e.currentTarget.id;
    //console.log(content);
    this.getNumber(content);
    this.setLastTap(content);
  },
  bindViewTapOpt:function (e){
    var content = e.currentTarget.id;
    //console.log(content);
    switch(content){
      case 'c':
          this.clear();
          break;
      case 't':
          this.output(util.formatTime(new Date()));
          break;
      case 'of':
          this.clearAll();
          this.setData({
            power:0-this.data.power
          });
          this.output(0);
          break;
      case 'ac':
          this.clearAll();
          break;
      case '=':
          this.calculator();
          break;
      default:
          this.setLastNum(content);
          this.output(content);
          break;
    }
  },
  getNumber:function(content){
    var old = this.data.content;
    var lastTap = this.data.lastTap;
    console.log(isNaN(old));
    var newNum;
    if(isNaN(old) || old ==0){
      newNum = content;
    }else{
      newNum = old+content;
    }
    this.output(newNum);
  },
  output:function(content){
    if(this.data.power <= 0){
        content = '';
    }
    this.setData({
        content:content
    });
  }
})

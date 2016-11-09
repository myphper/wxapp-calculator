//index.js
var app = getApp()
var util = require('../../utils/util.js'); 
Page({
  data: {
    layout:[
    [{
	    opt:"bindViewTapOpt",
    	type:"warn",
	    id:"of",
	    value:"ON/OFF",
    },
    {
	    opt:"bindViewTapOpt",
	    type:"warn",
	    id:"t",
	    value:"Time",
    },
    {
	    opt:"bindViewTapOpt",
	    type:"warn",
	    id:"c",
	    value:"C",
    },
    {
	    opt:"bindViewTapOpt",
	    type:"warn",
	    id:"ac",
	    value:"AC",
    }],
    [{
    	opt:"bindViewTapInput",
    	type:"default",
    	id:"7",
    	value:"7",
    },
    {
    	opt:"bindViewTapInput",
    	type:"default",
    	id:"8",
    	value:"8",
    },
    {
    	opt:"bindViewTapInput",
    	type:"default",
    	id:"9",
    	value:"9",
    },
    {
    	opt:"bindViewTapOpt",
    	type:"primary",
    	id:"÷",
    	value:"÷",
    }],
    [{
    	opt:"bindViewTapInput",
    	type:"default",
    	id:"4",
	    value:"4",
    },
    {
    	opt:"bindViewTapInput",
    	type:"default",
    	id:"5",
	    value:"5",
    },
    {
	    opt:"bindViewTapInput",
    	type:"default",
    	id:"6",
    	value:"6",
    },
    {
    	opt:"bindViewTapOpt",
    	type:"primary",
    	id:"×",
    	value:"×",
    }],
    [{
    	opt:"bindViewTapInput",
    	type:"default",
    	id:"1",
    	value:"1",
    },
    {
    	opt:"bindViewTapInput",
    	type:"default",
    	id:"2",
    	value:"2",
    },
    {
    	opt:"bindViewTapInput",
    	type:"default",
    	id:"3",
    	value:"3",
    },
    {
    	opt:"bindViewTapOpt",
    	type:"primary",
    	id:"-",
    	value:"-",
    }],
    [{
	    opt:"bindViewTapInput",
	    type:"default",
	    id:"0",
	    value:"0",
    },
    {
	    opt:"bindViewTapInput",
	    type:"default",
	    id:".",
	    value:".",
    },
    {
	    opt:"bindViewTapOpt",
	    type:"warn",
	    id:"=",
	    value:"=",
    },
    {
	    opt:"bindViewTapOpt",
	    type:"primary",
	    id:"+",    
	    value:"+",
    }]],
    lines: [
      123,
      "+",
      34,
      "",
      157
    ],
    power:1,
    line:"------------------------------------------------",
    tmpRes:0
  },
  onLoad: function () {
    this.clear();
  },
  clear:function(){
    this.output(["","","","",0],true);
  },
  clearAll:function(){
    this.output(["","","","",0],true);
    this.setData({
      tmpRes: 0,
    });
  },
  calculator:function(){
    var lines = this.data.lines;
    var optlines = [];
    for(var index in lines){
      optlines.unshift(lines[index]);
    }
    //console.log(optlines);
    var res = 0;
    var a = parseInt(optlines.shift());
    //console.log(a);
    if(isNaN(a)){
      res = optlines.shift();
      if(isNaN(res)){
        console.log('error');
      }
    }else{
      var b = optlines.shift();
      if(isNaN(b) && b != this.data.line){
        //var c = 1*optlines.shift();
        var c = 1*this.data.tmpRes;
        if(isNaN(c)){
          console.log('error');
        }
        switch(b){
          case '÷':
            if(a != 0){
              res = c/a;
            }else{
              console.log('error');
            }
            break;
          case '×':
              res = c*a;
            break;
          case '+':
              res = c+a;
            break;
          case '-':
              res = c-a;
            break;
        }
      }else{
        res = a;
        console.log('error');
      }
    }
    this.setTmpRes(res);
    return res;
  },
  setTmpRes:function(content){
    this.setData({
      tmpRes:content
    });
  },
  bindViewTapInput:function (e){
    var content = e.currentTarget.id;
    //console.log(content);
    this.getNumber(content);
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
          this.setData({
            power:0-this.data.power
          });
          this.clearAll();
          break;
      case 'ac':
          this.clearAll();
          break;
      case '=':
          var res = this.calculator();
          this.output([this.data.line,res],true);
          break;
      default:
          var res = this.calculator();
          this.output([content],true);
          break;
    }
  },
  getNumber:function(content){
    var lines = this.data.lines;
    var move = false;
    var old =  lines[(lines.length-1)]; 
    var newNum;
    if(isNaN(old) || old ==0){
      newNum = content;
      move = true;
    }else{
      newNum = old+content;
    }
    this.output([newNum],move);
  },
  output:function(content,move){
    var lines = this.data.lines;
    if(move){
      for(var index in content){
        lines.shift();
        lines.push(content[index]);
      }
    }else{
      lines[(lines.length-1)] =  content[0];
    }
    
    if(this.data.power <= 0){
        lines = ["","","","",""];
    }
    this.setData({
        lines:lines
    });
    //console.log(this.data);
  }
})

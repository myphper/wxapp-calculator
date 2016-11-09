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
    var res = 0;
    var a = parseFloat(optlines.shift());
    if(isNaN(a)){
      res = optlines.shift();
      if(isNaN(res)){
        //console.log('error');
      }
    }else{
      var b = optlines.shift();
      if(isNaN(b) && b != this.data.line){
        var c = parseFloat(this.data.tmpRes);
        if(isNaN(c)){
          //console.log('error');
        }
        switch(b){
          case '÷':
            if(a != 0){
              res = util.floatDiv(c,a);
            }else{
              //console.log('error');
            }
            break;
          case '×':
              res = util.floatMul(c,a);
            break;
          case '+':
              res = util.floatAdd(c,a);
            break;
          case '-':
              res = util.floatSub(c,a);
            break;
        }
      }else{
        res = a;
        //console.log('error');
      }
    }
    res = parseFloat(res);
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
    var old =  lines[(lines.length-1)].toString(); 
    var newNum;
    if(content=="." && old.indexOf(".")!=-1){
    //当原字符串有小数点时再输入小数点无反应
        return false;
    }
    if(content=="0" && old=="0"){
    //当原字符串等于0再输入0无反应
        return false;
    }
    if(isNaN(old) && old != "0."){
    //当原字符串是非数字即操作符(+-×÷)时新字符串另起一行为新数字
    //需要排除 0.  这个不是字符,但是需要继续拼接
      if(content=="."){
        content = "0.";
      }
      newNum = content;
      //另起一行的标志
      move = true;
    }else{
      if(old == "0" && content != "."){
        //当原字符串是0的时候又不是小数,需要把0去掉
        old = "";
      }
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

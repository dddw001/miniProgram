// pages/index/index.js
let qr = require('../../util/qrcode.js')
let size = {};
Page({
  data:{
    text:''
  },
  //页面加载
  onLoad(){
    let size=this.getCanvasSize();
    this.createQRCode(size,'');
  },
  handleCreate(){
    this.createQRCode(size,this.data.text);
  },
  //获取input值
  handleInput(e){
    //console.log(e.detail.value);
    this.setData({
      text: e.detail.value
    })
  },
  //拿到canvas尺寸信息
  getCanvasSize(){
    let res=wx.getSystemInfoSync();
    let scale=686/750;
    let  width=res.windowWidth*scale;
    let height=width;
    size.w=width;
    size.h=height;
    return size;
  },
  //生成二维码
  createQRCode(size,text){
    var qrcode = new qr('myCanvas', {
      text: text,
      width: size.w,
      height: size.h,
      colorDark: "#000000",
      colorLight: "#ffffff"
    });
  }
})
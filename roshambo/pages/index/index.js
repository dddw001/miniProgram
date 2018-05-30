//index.js
//获取应用实例
const app = getApp()
let timer=null;
let picIndex=0;
Page({
  data: {
    srcs:[
        '/resources/stone.png',
        '/resources/scissors.png',
        '/resources/cloth.png'
    ],
    machineUrl:'/resources/stone.png',
    chooseUrl:'/resources/choose.png',
    winNum: wx.getStorageSync('winNum')||0,
    resultText:'',
    buttonText:'出拳',
    canClick:true
  },
  //页面加载完成
  onLoad(){
    this.timerGo();
  },
  onUnload(){
    timer=null;
  },
  //动态改变机器人的出拳图片
  timerGo(){
    timer=setInterval(()=>{
      picIndex++;
      if (picIndex > 2) {
        picIndex = 0;
      }
      this.setData({
        machineUrl:this.data.srcs[picIndex]
      })
    },300)
  },
  //选中出拳
  handleChoose(e){
    //console.log(e.target.id);
    if(!this.data.canClick){
      return;
    }
    clearInterval(timer);
    this.setData({
      chooseUrl: this.data.srcs[e.target.id]
    })
    this.setData({
      resultText: this.judge()
    })
    this.setData({
      canClick: false,
      buttonText: '再来一次'
    })
  },
  //判断输赢
  judge(){
    let ai=this.data.machineUrl;
    let user=this.data.chooseUrl;
    let userIndex,aiIndex;
    let num=this.data.winNum;
    for(let i=0;i<this.data.srcs.length;i++){
      if (user == this.data.srcs[i]){
        userIndex=i;
      }
      if(ai==this.data.srcs[i]){
        aiIndex=i;
      }
    }
    let str='你赢了';
    if(aiIndex<userIndex){
      str='你输了';
    }
    else if(aiIndex==userIndex){
      str='平局';
    }
    else{
      this.setData({
        winNum:++num,
      })
      wx.setStorage({
        key: 'winNum',
        data: num,
      })
    }
    return str;
  },
  //再来一次
  handleAgain(){
    if(this.data.canClick){
      return;
    }
    this.timerGo();
    this.setData({
      canClick:true,
      resultText:''
    })
  }
})

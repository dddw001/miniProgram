// pages/welcome/welcome.js
Page({
  handleTap(){
    //redirectTo 2个页面平级，没有返回

    //跳转到选项卡只能用switchTab
    wx.switchTab({
      url:'../posts/posts'
    })
  }
})
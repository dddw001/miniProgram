// pages/posts/post-detail/post-detail.js
var postsData=require('../../../resources/data/posts.js')
var app=getApp()
Page({
  data:{
    isPlayingMusic: false
  },
  onLoad(option){
    var globalData = app.globalData;
    var postId=option.id;
    var postData=postsData.postList[postId];
    this.setData({
      postData,
      postCurrentIndex:postId
    })

    // var postCollected={
    //   1:"true",
    //   2:"false",
    //   3:"false"
    // }
    var postCollected = wx.getStorageSync('post_collected');
    if(postCollected){
      var collected=postCollected[postId];
      if(collected){
        this.setData({
          collected: collected
        })
      }
      else{
        this.setData({
          collected: false
        })
      }
    }
    else{
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync('post_collected', postsCollected);
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId==postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
  },
  handleCollect(e){
    var postsCollected = wx.getStorageSync('post_collected');
    var postCollected=postsCollected[this.data.postCurrentIndex];
    //取反
    postCollected=!postCollected;
    //存storage
    postsCollected[this.data.postCurrentIndex]=postCollected;
    wx.setStorageSync('post_collected', postsCollected);
    //更新data
    this.setData({
      collected:postCollected
    })
    wx.showToast({
      title: postCollected?'收藏成功':'取消收藏'
    })
  },
  handleShare(e){
    var itemList=[
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor:"#405f80",
      success(res){
        //res.cancel 用户是否点击了取消按钮
        //res.tapIndex 点击的元素的序号，从0开始
        wx.showModal({
          title: '用户'+itemList[res.tapIndex],
          content: '暂时不能分享，请点击取消'
        })
      }
    })
  },
  handleMusic(e){
    var isPlaying=this.data.isPlayingMusic;
    if(isPlaying){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }
    else{
      this.setData({
        isPlayingMusic: true
      })
      const backgroundAudioManager = wx.getBackgroundAudioManager()
      backgroundAudioManager.title = this.data.postData.music.title
      backgroundAudioManager.coverImgUrl = this.data.postData.music.coverImg
      backgroundAudioManager.src = this.data.postData.music.url
    }

    this.setMusicMonitor();
  },
  setMusicMonitor(){
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_currentMusicPostId = this.data.postCurrentIndex;
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic=false;
      app.globalData.g_currentMusicPostId=null;
    })
    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic=false;
      app.globalData.g_currentMusicPostId=null;
    })
  }
})
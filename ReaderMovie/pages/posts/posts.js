// pages/posts/posts.js
//只能用相对路径
var postsData=require('../../resources/data/posts.js');
Page({
  data:{
  },
  onLoad(){
    this.setData({
      post_content:postsData.postList
    })
  },
  handleDetail(e){
    //console.log(e.currentTarget.dataset.postid);
    var postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
  handleSwiperTap(e){
    //target 当前点击的组件
    //currentTarget 事件捕获的组件
    var postId = e.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})
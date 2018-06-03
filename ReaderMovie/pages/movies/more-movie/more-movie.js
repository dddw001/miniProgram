// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js')
var app = getApp();
Page({
  data:{
    totalCount:0,
    isEmpty:true
  },
  onLoad(options){
    var category=options.category;
    this.setData({
      category:category
    });
    var dataUrl='';
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.setData({
      requestUrl:dataUrl
    });
    util.http(dataUrl,(data)=>{
      this.processDoubanData(data);
    });
  },
  onReady(){
    wx.setNavigationBarTitle({
      title:this.data.category
    })
  },
  processDoubanData(moviesData) {
    var movies = [];
    for (let subject of moviesData.subjects) {
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        movieId: subject.id,
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    //如果不是第一次加载把之前的连接起来
    var totalMovies={};
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(movies);
    }
    else{
      totalMovies=movies;
      this.data.isEmpty=false;
    }
    this.setData({
      movies:totalMovies,
      totalCount: this.data.totalCount+20
    });
    wx.hideNavigationBarLoading();
  },
  //滚动到底触发加载更多
  handleScrollLower(e){
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+'&count=20';
    util.http(nextUrl, (data) => {
      this.processDoubanData(data);
    });
    wx.showNavigationBarLoading();
  },
  handleMovieTap(e) {
    var movieId = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  }
})
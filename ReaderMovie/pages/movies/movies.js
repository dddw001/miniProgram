// pages/movies/movies.js
var util=require('../../utils/util.js')
var app=getApp();
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    containerShow:true,
    searchPanelShow:false
  },
  onLoad(){
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?'+'start=0&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?' + 'start=0&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250?' + 'start=0&count=3';
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },
  //请求数据
  getMovieListData(url,settedKey,categoryTitle){
    var that=this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "content-type": "application/xml"
      },
      success(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle);
      }
    })
  },
  //处理数据
  processDoubanData(moviesData, settedKey, categoryTitle){
    var movies=[];
    for(let subject of moviesData.subjects){
      var title=subject.title;
      if(title.length>6){
        title=title.substring(0,6)+'...';
      }
      var temp={
        movieId:subject.id,
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var readyData={};
    readyData[settedKey]={
      categoryTitle: categoryTitle,
      movies:movies
    }
    this.setData(readyData);
  },
  //更多电影
  handleMore(e){
    var categroy=e.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+categroy,
    })
  },
  handleFocus(){
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  handleCancel(e){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },
  handleChange(e) {
    var text=e.detail.value;
    var searchUrl = app.globalData.doubanBase +'/v2/movie/search?q='+text;
    this.getMovieListData(searchUrl,"searchResult","");
  },
  handleMovieTap(e){
    var movieId = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId
    })
  }
})
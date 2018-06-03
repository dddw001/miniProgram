// pages/movies/movie-detail/movie-detail.js
var app=getApp();
var util=require('../../../utils/util.js');
Page({
  data:{
    movie:{}
  },
  onLoad(options){
    var movieId=options.id;
    var detailUrl = app.globalData.doubanBase+'/v2/movie/subject/'+movieId;
    util.http(detailUrl,this.processDoubanData);
  },
  processDoubanData(data){
    var director={
      avatar:'',
      name:'',
      id:''
    }
    if(data.directors[0]!=null){
      if(data.directors[0].avatars!=null){
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie={
      movieImg:data.images?data.images.large:'',
      country:data.countries[0],
      title:data.title,
      original_title: data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      genres:data.genres.join('、'),
      stars: util.convertToStarsArray(data.rating.stars),
      score:data.rating.average,
      director:director,
      casts:util.convertToCastString(data.casts),
      castsInfo:util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie
    })
  },
  viewMoviePostImg(e){
    var src=e.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls: [src],
    })
  }
})
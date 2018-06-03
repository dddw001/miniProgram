function convertToStarsArray(stars){
  var num=stars/10;
  var decimal=stars%10;
  var arr=[];
  for(let i=1;i<=5;i++){
    if(i<=num){
      arr.push(1);
    }
    else if(decimal!=0){
      arr.push(0.5);
      decimal=0;
    }
    else{
      arr.push(0);
    }
  }
  return arr;
}

function http(url,callback){
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "content-type": "application/xml"
    },
    success(res) {
      callback(res.data);
    }
  })
}

function convertToCastString(casts){
  var castsjoin='';
  for(let idx in casts){
    castsjoin=castsjoin+casts[idx].name+'/';
  }
  return castsjoin.substring(0,castsjoin.length-2);
}

function convertToCastInfos(casts){
  var castsArray=[];
  for(let idx in casts){
    var cast={
      img:casts[idx].avatars?casts[idx].avatars.large:'',
      name:casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports={
  convertToStarsArray:convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
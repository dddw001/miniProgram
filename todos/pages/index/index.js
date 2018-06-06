// pages/index/index.js
Page({
  data:{
    todo:'',
    todoList:[]
  },
  handleConfirm(e){
    //console.log(e.detail.value);
    var list=this.data.todoList;
    var obj = {};
    obj.text = e.detail.value;
    obj.status='unfinished';
    list.push(obj);
    this.setData({
      todoList:list,
      todo:''
    })
  },
  handleFinish(e){
    var index=e.target.dataset.index;
    var list=this.data.todoList;
    list[index].status='finished';
    this.setData({
      todoList:list
    })
  }
})
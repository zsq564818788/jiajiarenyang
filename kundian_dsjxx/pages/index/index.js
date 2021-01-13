//index.js
//获取应用实例
var a = new getApp(), e = a.siteInfo.uniacid;
// var util = require('../../utils/util.js');
Page({  
  data:{
    SystemInfo: a.globalData.sysData,
    tarbar: a.tarbar,
  },
  

  indexpage01: function(e){
    wx.navigateTo({ 
      url: '../index01/index01' 
    })
  },
  indexpage02: function(e){
    wx.navigateTo({ 
      url: '../index02/index02' 
    })
  },
  onLoad: function () {  
    // // 调用函数时，传入new Date()参数，返回值是日期和时间  
    // var time = util.formatTime(new Date());  
    // // 再通过setData更改Page()里面的data，动态更新页面的数据  
    // this.setData({  
    //   time: time  
    // });  

  },
 


  
  
})
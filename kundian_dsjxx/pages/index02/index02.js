// kundian_dsjxx//pages/index02/index02.js
var a = new getApp(), e = a.siteInfo.uniacid;
// var util = require('../../utils/util.js');
Page({
   
  data:{
    SystemInfo: a.globalData.sysData,
    tarbar: a.tarbar,
  },





  indexpage: function(e){
    wx.navigateTo({ 
      url: '../index/index' 
    })
  },
  indexpage01: function(e){
    wx.navigateTo({ 
      url: '../index01/index01' 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var time = util.formatTime(new Date());  
    // // 再通过setData更改Page()里面的data，动态更新页面的数据  
    // this.setData({  
    //   time: time  
    // });  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// kundian_dsjxx//pages/hxfx/hxfx.js
import * as echarts from '../../components/ec-canvas/echarts';
const app = getApp();

function initChart(canvas, width, height, dpr) {



  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  

  const option = {
    tooltip: {
 trigger: 'axis'
},
textStyle: {
  color: "#ebf8ac" //X轴文字颜色
},
 angleAxis: {
 },
 radiusAxis: {
     type: 'category',
     data: ['一', '二', '三', '四'],
     z: 10
 },
 polar: {
 },
 series: [{
     type: 'bar',
     data: [1, 2, 3, 4],
     coordinateSystem: 'polar',
     name: 'A',
     stack: 'a'
 }, {
     type: 'bar',
     data: [2, 4, 6, 8],
     coordinateSystem: 'polar',
     name: 'B',
     stack: 'a'
 }, {
     type: 'bar',
     data: [1, 2, 3, 4],
     coordinateSystem: 'polar',
     name: 'C',
     stack: 'a'
 }],
 legend: {
     show: true,
     data: ['A', 'B', 'C'],
     textStyle: {
      color: "#01FCE3" //X轴文字颜色
  }
 }
};


  chart.setOption(option);
  return chart;
}










Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
// kundian_dsjxx//pages/dtfx/dtfx.js
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
    grid:{
      left:'15%',
      // y:0,
      // x2:5,
      // y2:0,
      // borderWidth:1
   },

      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['一', '二', '三', '四', '五', '六', "日"],
          axisLabel: {
            formatter: '{value}',
            show: true,
            textStyle: {
                color: "#ebf8ac" //X轴文字颜色
            }
        },
        axisLine: {
            lineStyle: {
                color: '#01FCE3'
            }
        },
      },
      yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} ',
            textStyle: {
                color: "#2EC7C9" //X轴文字颜色
            }
        },
        axisLine: {
            lineStyle: {
                color: '#01FCE3'
            }
        },

      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1200],
          type: 'line',
          markPoint: {
              data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
              ]
          },
          areaStyle: {}
      }]
  }
  


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
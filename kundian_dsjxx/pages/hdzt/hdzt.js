// kundian_dsjxx//pages/hdzk/hdzk.js
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
    legend: {
        textStyle: {
            color: "#01FCE3" //X轴文字颜色
        }
    },
    tooltip: {},
    dataset: {
        source: [
            ['product', '2012', '2013', '2014', '2015'],
            ['一', 41.1, 30.4, 65.1, 93.3],
            ['二', 86.5, 92.1, 85.7, 103.1],
            ['三', 24.1, 67.2, 79.5, 106.4]
        ]
    },
    xAxis: {
        type: 'category',
        gridIndex: 0,
        axisLabel: {
            formatter: '{value}%',
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
        gridIndex: 0,
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
    // grid: [
    //     {bottom: '55%'},
    //     {top: '55%'}
    // ],
    series: [
        // These series are in the first grid.
        {type: 'bar', seriesLayoutBy: 'row'},
        {type: 'bar', seriesLayoutBy: 'row'},
        {type: 'bar', seriesLayoutBy: 'row'},
        // These series are in the second grid.
    ]
    
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
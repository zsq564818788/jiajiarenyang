// kundian_dsjxx//pages/fwly/fwly.js
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
   
    color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
    legend: {
      orient: 'vertical',
      left: 10,
        textStyle : {
            color : '#ffffff',

        },
         data : ['第一','第二','第三','第四',],
    },
    calculable : false,
    tooltip : {
        trigger: 'axis',
    },
    yAxis: [
          {
              type: 'value',
              axisLine : {onZero: false},
              axisLine:{
                  lineStyle:{
                      color: '#01FCE3'
                  },
              },

              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "k条"
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              }
              
          }
      ],
      xAxis: [
          {
              type: 'category',
              data : ['8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'],
              axisLine:{
                  lineStyle:{
                      color: '#01FCE3'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + ""
                  },
              },
              splitLine:{
                  lineStyle:{
                    color: '#01FCE3',
                      width:0,
                      type:'solid'
                  }
              },
          }
      ],
      grid:{
              left: '5%',
              top: '30%',
              right: '5%',
              bottom: '5%',
              containLabel: true
      },
      series : [
        {
            name:'第一',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[15, 0, 20, 45, 22.1, 25, 70, 55, 76]
        },
        {
            name:'第二',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[25, 10, 30, 55, 32.1, 35, 80, 65, 76]
        },
        {
            name:'第三',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[35, 20, 40, 65, 42.1, 45, 90, 75, 96]
        },
        {
            name:'第四',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[45, 30, 50, 75, 52.1, 55, 100, 85, 106]
        }
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
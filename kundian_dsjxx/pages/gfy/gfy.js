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
        data:['第一', '第二','第三','第四'],
        textStyle : {
            color : '#ffffff',

        }
    },
    calculable :false,
      grid:{
        left: '5%',
        top: '30%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },

    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        }
    },

    xAxis : [
        {
            type : 'value',
            splitLine:{
              lineStyle:{
                  width:0,
                  type:'solid'
              }
          },
          axisLine:{
            lineStyle:{
                color: '#01FCE3'
            },
          },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            },
            
            

        }
    ],

    yAxis : [
        {
            type : 'category',
            data:['人数(人)', '人次(人)','费用(元)'],
            axisLine:{
              lineStyle:{
                  color: '#01FCE3'
              },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                },
            },
            
        }
    ],

    series : [
        {
            name:'第一',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[320, 302, 301]
        },
        {
            name:'第二',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[120, 132, 101]
        },
        {
            name:'第三',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[220, 182, 191]
        },
        {
            name:'第四',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[150, 212, 201]
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
// kundian_dsjxx//pages/sjl/sjl.js
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
        // y : '260',
        // x : 'center',
        orient: 'vertical',
        left: 15,
        textStyle : {
            color : '#ffffff',

        },
         data : ['第一','第二','第三','第四',],
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a}\n{b}\n{c}G ({d}%)"
    },
    calculable : false,
    series : [
        {
            name:'采集数据量',
            type:'pie',
            radius : ['40%', '70%'],
            center : ['50%', '60%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                }
                
            },
            data:[
                {value:335, name:'第一'},
                {value:310, name:'第二'},
                {value:234, name:'第三'},
                {value:135, name:'第四'}

            ]
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
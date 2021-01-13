// pages/clfx/clfx.js
import * as echarts from '../../components/ec-canvas/echarts';
// let chart = null;

const app = getApp();


function initChart(canvas, width, height, dpr) {

  var data = [110, 20, 36, 10, 50, 80, 100, 60];
  var sum = 0;
  var percentdata = [];
  for (var i = 0; i < data.length; i++) {
      sum += data[i];
  };
  for (var j = 0; j < data.length; j++) {
      percentdata.push((((data[j] / sum) * 100).toFixed(2)));
  };

  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  

  const option = {
    color: ['#0035f9', '#f36f8a', '#ffff43', '#25f3e6'],
    grid: {
        left: '8%',
        right: '10%',
        top: '12%',
        bottom: '18%',
        containLabel: true
    },
    yAxis: {
        data: ["白菜", "西红柿", "茄子",
            "辣椒", "大蒜", "莴笋", "洋芋",
            "藕",
        ],
        axisTick: {
            show: false
        },
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
    xAxis: {
        axisTick: {
            show: false
        },
        type: 'value',
        // max: 100,
        splitNumber: 5,
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
    series: [{
        name: '销量',
        type: 'bar',
        itemStyle: {
            normal: {
                barBorderRadius: 5,
                color: 
                new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "#25f3e6"
                    },
                    {
                        offset: 1,
                        color: "#4693EC"
                    }
                ])
            }
        },
        barWidth: '55%',
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{c}%',
                textStyle: {
                    color: '#ffffff'
                }
            }
        },
        data: percentdata
    }]
};


  chart.setOption(option);
  return chart;
}



Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },

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


})
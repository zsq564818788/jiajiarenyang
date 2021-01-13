import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var    option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            },
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['耕地面积', '种植地面积', '土地变动'],
        textStyle: {
            color: '#fff'
        }
    },
    xAxis: [{
        type: 'category',
        data: [
            '2015年',
            '2016年',
            '2017年',
            '2018年',
            '2019年',
        ],
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisPointer: {
            type: 'shadow'
        }
    }],
    yAxis: [{
        type: 'value',
        name: '单位：万平米',
        min: 0,
        max: 1000,
        interval: 200,
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            formatter: '{value}'
        }
    }, {
        type: 'value',
        name: '单位：%',
        min: 0,
        max: 100,
        interval: 200,
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            formatter: '{value}'
        }
    }],
    series: [{
        name: '耕地面积',
        type: 'bar',
        color: '#fff',
        barMaxWidth: 12, //最大宽度
        data: [
            50,
            700,
            348,
            234,
            120,
        ],
        itemStyle: {
            color: '#0b7062',
            borderColor: '#15fed1'
        }
    }, {
        name: '种植地面积',
        type: 'bar',
        barMaxWidth: 12, //最大宽度
        data: [
            200,
            400,
            700,
            12,
            500,
        ],
        itemStyle: {
            color: '#ca8e15',
            borderColor: '#fca805'
        }
    }, {
        name: '土地变动',
        type: 'line',
        yAxisIndex: 1,
        data: [
            42.00,
            69.00,
            34.00,
            28.00,
            77.00,
        ],
        lineStyle: {
            color: '#ff0c0c',
            width: 3
        }
    }]
};;


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
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});

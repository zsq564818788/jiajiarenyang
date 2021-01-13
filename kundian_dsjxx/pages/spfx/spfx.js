// pages/spfx/spfx.js
import * as echarts from '../../components/ec-canvas/echarts';
function getBarOption() {
    return {
        tooltip: {
            trigger: 'axis'
        },
          radar: [{
            indicator: [{
                text: '生鲜水果',
                max: 3,
                value: 0,
                color: '#fff'
            }, {
                text: '畜牧水产',
                max: 3,
                value: 0,
                color: '#fff'
            }, {
                text: '粮油米面',
                max: 3,
                value: 0,
                color: '#fff'
            }, {
                text: '绿色蔬菜',
                max: 3,
                value: 0,
                color: '#fff'
            }, {
                text: '干果炒货',
                max: 3,
                value: 0,
                color: '#fff'
            }, {
                text: '农家特产',
                max: 3,
                value: 2,
                color: '#fff'
            }, {
                text: '蜜饯糕点',
                max: 3,
                value: 1,
                color: '#fff'
            }, ],
            center: ['50%', '56%'],
            radius: 75,
            startAngle: 90,
            // name: {
            //   //  formatter: '{value}1655',
            //   formatter: function(value, indicator) {
            //     return value + indicator.value;
            //   },
            //   color: '#f00',
            //   borderColor: '#f00',
            //   //  borderWidth:1
            // },
            axisLine: {
                lineStyle: {
                    //  borderWidth: 0
                    color: 'transparent'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['#10293f', '#134469', '#012e5b', '#134266', '#033363']
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#0b83c8'
                }
            }
        }],
        series: [{
            name: '',
            type: 'radar',
            label: {
                show: true
            },
            lineStyle: {
                width: 1
            },
            tooltip: {
                trigger: 'item'
            },
            itemStyle: {
                normal: {
                    areaStyle: {
                        color: 'rgba(220,222,74,0.8)'
                    },
                    color: '#dce048',

                }
            },
            data: [{
                value: [0,0, 0,0,0,2,1,
                ]
            }]
        }]
    };
  }


      Page({
        data: {
          ec: {
            // onInit: initChart,
            // disableTouch: true,
            onInit: function (canvas, width, height, dpr) {
                const barChart = echarts.init(canvas, null, {
                  width: width,
                  height: height,
                  devicePixelRatio: dpr // new
                });
                canvas.setChart(barChart);
                barChart.setOption(getBarOption());
        
                return barChart;
              }
          }
        },
      
        onReady() {
        }
      });  
      
      

    
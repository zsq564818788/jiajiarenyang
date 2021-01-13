// pages/clfx/clfx.js
import * as echarts from '../../components/ec-canvas/echarts';
// let chart = null;

const app = getApp();


function initChart(canvas, width, height, dpr) {

    // const labelOption = {
    //     normal: {
    //         show: true,
    //         formatter: '{c}%',
    //         fontSize: 12
    //     }
    // };
    
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
//   chart.resize()
  canvas.setChart(chart);

  

  const  option = {
    series: [{
        value: 20,
        name: '20%',
        type: 'pie',
        startAngle: 180,
        itemStyle: {
            color: '#fff'
        },
        label: {
            show: true,
            normal:{
                // position:'left bottom',
                // formatter:'{d}%',
                formatter(v) {
                    let text =  v.name
                    if(text.length <= 3)
                    {
                        return text;
                    }else if(text.length > 3 && text.length <= 16){
                        return text = `${text.slice(0,8)}\n${text.slice(8)}`
                    }else if(text.length > 16 && text.length <= 24){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16)}`
                    }else if(text.length > 24 && text.length <= 30){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24)}`
                    }else if(text.length > 30){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24,30)}\n${text.slice(30)}`
                    }
                },
                textStyle : {
                    fontSize : 12
                }
            }
        },
        labelLine: {
            show: true,
            length: 15,
            length2: 15
        },
        radius: ['60%', '65%'],
        center: ['55%', '0%'],
        data: [{
            value: 50,
            itemStyle: {
                color: 'rgba(0,0,0,0)'
            }
        }, {
            value: 100 - 50,
            name: '20%',
            itemStyle: {
                color: '#20b182'
            }
        }]
    }, {
        name: '10%',
        type: 'pie',
        startAngle: 180,
        avoidLabelOverlap: false,
        label: {
            normal:{
                formatter(v) {
                    let text = v.name
                    if(text.length <= 3)
                    {
                        return text;
                    }else if(text.length > 3 && text.length <= 16){
                        return text = `${text.slice(0,8)}\n${text.slice(8)}`
                    }else if(text.length > 16 && text.length <= 24){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16)}`
                    }else if(text.length > 24 && text.length <= 30){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24)}`
                    }else if(text.length > 30){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24,30)}\n${text.slice(30)}`
                    }
                },
                textStyle : {
                    fontSize : 12
                }
            }
        },
        labelLine: {
            show: true,
            length: 15,
            length2: 15
        },
        radius: ['46%', '51%'],
        center: ['55%', '0%'],
        data: [{
            value: 60,
            itemStyle: {
                color: 'rgba(0,0,0,0)'
            }
        }, {
            value: 100 - 60,
            name: '20%',
            itemStyle: {
                color: '#1acca8'
            }
        }]
    }, {
        name: '20%',
        type: 'pie',
        startAngle: 180,
        label: {
            normal:{
                formatter(v) {
                    let text =v.name
                    if(text.length <= 3)
                    {
                        return text;
                    }else if(text.length > 3 && text.length <= 16){
                        return text = `${text.slice(0,8)}\n${text.slice(8)}`
                    }else if(text.length > 16 && text.length <= 24){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16)}`
                    }else if(text.length > 24 && text.length <= 30){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24)}`
                    }else if(text.length > 30){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24,30)}\n${text.slice(30)}`
                    }
                },
                textStyle : {
                    fontSize : 12
                }
            }
        },
        labelLine: {
            show: true,
            length: 15,
            length2: 15,
            lineStyle: {
                //  type:'dotted'
            }
        },
        radius: ['32%', '37%'],
        center: ['55%', '0%'],
        data: [{
            value: 80,
            itemStyle: {
                color: 'rgba(0,0,0,0)'
            }
        }, {
            value: 100 - 80,
            name: '20%',
            itemStyle: {
                color: '#15aefe'
            }
        }]
    }, {
        name: '20%',
        type: 'pie',
        startAngle: 180,
        label: {
            normal:{
                formatter(v) {
                    
                    let text =  v.name
                    console.log(text.length)
                    if(text.length <= 3)
                    {
                        return text;
                    }else if(text.length > 3 && text.length <= 16){
                        return text = `${text.slice(0,8)}\n${text.slice(8)}`
                    }else if(text.length > 16 && text.length <= 24){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16)}`
                    }else if(text.length > 24 && text.length <= 30){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24)}`
                    }else if(text.length > 30){
                        return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24,30)}\n${text.slice(30)}`
                    }
                },
                textStyle : {
                    fontSize : 12
                }
            }
        },
        labelLine: {
            show: true,
            length: 15,
            length2: 15,
            lineStyle: {
                //  type:'dotted'
            }
        },
        radius: ['18%', '23%'],
        center: ['55%', '0%'],
        data: [{
            value: 85,
            itemStyle: {
                color: 'rgba(0,0,0,0)'
            }
        }, {
            value: 100 - 85,
            name: '20%',
            itemStyle: {
                color: '#38c9fe'
            }
        }]
    }]
};


    

  chart.setOption(option);
  return chart;
}



function initChart01(canvas, width, height, dpr) {

    const labelOption = {
        normal: {
            show: true,
            formatter: '{c}%',
            fontSize: 12
        }
    };
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  

  const   option = {
    title: {
        text: '作物分类',
        x: 'center',
        y: '18%',
        textStyle: {
            color: '#fff',
            fontWeight: 400,
            fontSize: 13
        }
    },
    legend: {
        data: ['水果类', '油料类', '蔬菜类', '饲料类', '药用类', '粮食类', '其他类'],
        top: '48%',
        left: '20%',
        width: '160',
        padding: 5,
        textStyle: {
            color: '#fff',

        }
    },
    series: [{
        type: 'pie',
        radius: ['30%', '45%'],
        center: ['50%', '22%'],
        data: [{
            value: 0,
            name: '水果类',
            label: labelOption,
            itemStyle: {
                color: '#31dd3d'
            }
        }, {
            value: 0,
            name: '油料类',
            label: labelOption,
            itemStyle: {
                color: '#0576fe'
            }
        }, {
            value: 0,
            name: '蔬菜类',
            label: labelOption,
            itemStyle: {
                color: '#fd8cf1'
            }
        }, {
            value: 0,
            name: '饲料类',
            label: labelOption,
            itemStyle: {
                color: '#ff6023'
            }
        }, {
            value: 0,
            name: '药用类',
            label: labelOption,
            itemStyle: {
                color: '#c4ff77'
            }
        }, {
            value: 0,
            name: '粮食类',
            label: labelOption,
            itemStyle: {
                color: '#ffc000'
            }
        }, {
            value: 0,
            name: '其他类',
            label: labelOption,
            itemStyle: {
                color: '#22d2fd'
            }
        }]
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

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    ec01: {
      onInit: initChart01
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
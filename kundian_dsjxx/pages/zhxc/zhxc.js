// pages/zhxc/zhxc.js
import * as echarts from '../../components/ec-canvas/echarts';

import chinajson from './chinamap.js';
import nmgjson from './nmg.js';

// import geoJson from './china.js';
const app = getApp();

function initChart(canvas, width, height, dpr) {

  var chinaGeoCoordMap = {
    '黑龙江': [127.9688, 45.368],
    '内蒙古': [110.3467, 41.4899],
    "吉林": [125.8154, 44.2584],
    '北京市': [116.4551, 40.2539],
    "辽宁": [123.1238, 42.1216],
    "河北": [114.4995, 38.1006],
    "天津": [117.4219, 39.4189],
    "山西": [112.3352, 37.9413],
    "陕西": [109.1162, 34.2004],
    "甘肃": [103.5901, 36.3043],
    "宁夏": [106.3586, 38.1775],
    "青海": [101.4038, 36.8207],
    "新疆": [87.9236, 43.5883],
    "西藏": [91.11, 29.97],
    "四川": [103.9526, 30.7617],
    "重庆": [108.384366, 30.439702],
    "山东": [117.1582, 36.8701],
    "河南": [113.4668, 34.6234],
    "江苏": [118.8062, 31.9208],
    "安徽": [117.29, 32.0581],
    "湖北": [114.3896, 30.6628],
    "浙江": [119.5313, 29.8773],
    "福建": [119.4543, 25.9222],
    "江西": [116.0046, 28.6633],
    "湖南": [113.0823, 28.2568],
    "贵州": [106.6992, 26.7682],
    "云南": [102.9199, 25.4663],
    "广东": [113.12244, 23.009505],
    "广西": [108.479, 23.1152],
    "海南": [110.3893, 19.8516],
    '上海': [121.4648, 31.2891]
};
var chinaDatas = [
    {
        name: '黑龙江',
        value: 0
    },
    {
        name: '内蒙古',
        value: 0
    },
    {
        name: '吉林',
        value: 0
    },
    {
        name: '辽宁',
        value: 0
    },
    {
        name: '河北',
        value: 0
    },
    {
        name: '天津',
        value: 0
    },
    {
        name: '山西',
        value: 0
    },
    {
        name: '陕西',
        value: 0
    },
    {
        name: '甘肃',
        value: 0
    },
    {
        name: '宁夏',
        value: 0
    },
    {
        name: '青海',
        value: 0
    },
    {
        name: '新疆',
        value: 0
    },
    {
        name: '西藏',
        value: 0
    },
    {
        name: '四川',
        value: 0
    },
    {
        name: '重庆',
        value: 0
    },
    {
        name: '山东',
        value: 0
    },
    {
        name: '河南',
        value: 0
    },
    {
        name: '江苏',
        value: 0
    },
    {
        name: '安徽',
        value: 0
    },
    {
        name: '湖北',
        value: 0
    },
    {
        name: '浙江',
        value: 0
    },
    {
        name: '福建',
        value: 0
    },
    {
        name: '江西',
        value: 0
    },
    {
        name: '湖南',
        value: 0
    },
    {
        name: '贵州',
        value: 0
    },
    {
        name: '云南',
        value: 0
    },
    {
      name: '广东',
      value: 0
    },
    {
        name: '广西',
        value: 0
    },
    {
        name: '海南',
        value: 0
    },
    {
        name: '上海',
        value: 1
    }
];
var chinaDatassss = [
  [{
      name: '黑龙江',
      value: 0
  }],
  [{
      name: '内蒙古',
      value: 0
  }],
 [{
      name: '吉林',
      value: 0
  }],
  [{
      name: '辽宁',
      value: 0
  }],
  [{
      name: '河北',
      value: 0
  }],
  [{
      name: '天津',
      value: 0
  }],
  [{
      name: '山西',
      value: 0
  }],
  [{
      name: '陕西',
      value: 0
  }],
  [{
      name: '甘肃',
      value: 0
  }],
  [{
      name: '宁夏',
      value: 0
  }],
  [{
      name: '青海',
      value: 0
  }],
  [{
      name: '新疆',
      value: 0
  }],
  [{
      name: '西藏',
      value: 0
  }],
  [{
      name: '四川',
      value: 0
  }],
  [{
      name: '重庆',
      value: 0
  }],
  [{
      name: '山东',
      value: 0
  }],
  [{
      name: '河南',
      value: 0
  }],
  [{
      name: '江苏',
      value: 0
  }],
  [{
      name: '安徽',
      value: 0
  }],
  [{
      name: '湖北',
      value: 0
  }],
  [{
      name: '浙江',
      value: 0
  }],
  [{
      name: '福建',
      value: 0
  }],
  [{
      name: '江西',
      value: 0
  }],
  [{
      name: '湖南',
      value: 0
  }],
  [{
      name: '贵州',
      value: 0
  }],
  [{
      name: '广西',
      value: 0
  }],
  [{
      name: '海南',
      value: 0
  }],
  [{
      name: '上海',
    value: 1
  }]
];
var lineList=[
    [ [127.9688, 45.368], [116.4551, 40.2539]],
    [ [110.3467, 41.4899],[116.4551, 40.2539]],
    [ [125.8154, 44.2584],[116.4551, 40.2539]],
    [ [116.4551, 40.2539],[116.4551, 40.2539]],
    [ [123.1238, 42.1216],[116.4551, 40.2539]],
    [ [114.4995, 38.1006],[116.4551, 40.2539]],
    [ [117.4219, 39.4189],[116.4551, 40.2539]],
    [ [112.3352, 37.9413],[116.4551, 40.2539]],
    [ [109.1162, 34.2004],[116.4551, 40.2539]],
    [ [103.5901, 36.3043],[116.4551, 40.2539]],
    [ [106.3586, 38.1775],[116.4551, 40.2539]],
    [ [101.4038, 36.8207],[116.4551, 40.2539]],
    [ [87.9236, 43.5883],[116.4551, 40.2539]],
    [ [91.11, 29.97],[116.4551, 40.2539]],
    [ [103.9526, 30.7617],[116.4551, 40.2539]],
    [ [108.384366, 30.439702],[116.4551, 40.2539]],
    [ [117.1582, 36.8701],[116.4551, 40.2539]],
    [ [113.4668, 34.6234],[116.4551, 40.2539]],
    [ [118.8062, 31.9208],[116.4551, 40.2539]],
    [ [117.29, 32.0581],[116.4551, 40.2539]],
    [ [114.3896, 30.6628],[116.4551, 40.2539]],
    [ [119.5313, 29.8773],[116.4551, 40.2539]],
    [ [119.4543, 25.9222],[116.4551, 40.2539]],
    [ [116.0046, 28.6633],[116.4551, 40.2539]],
    [ [113.0823, 28.2568],[116.4551, 40.2539]],
    [ [106.6992, 26.7682],[116.4551, 40.2539]],
    [ [102.9199, 25.4663],[116.4551, 40.2539]],
    [ [113.12244, 23.009505],[116.4551, 40.2539]],
    [ [108.479, 23.1152],[116.4551, 40.2539]],
    [ [110.3893, 19.8516],[116.4551, 40.2539]],
    // [ [121.4648, 31.2891],[116.4551, 40.2539]],
]

function randomValue() {
  return Math.round(Math.random()*1000);
}
// 射线
  var convertDataline = function(data) {
    console.log(data)
      var res = [];
      for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = chinaGeoCoordMap[dataItem[0].name];
          var toCoord = [116.4551, 40.2539];
          if (fromCoord && toCoord) {
              res.push([{
                  coord: fromCoord,
                  value: dataItem[0].value
              }, {
                  coord: toCoord,
              }]);
          }
      }
      return res;
  };
var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
      var geoCoord = chinaGeoCoordMap[data[i].name];
      
      if (geoCoord) {
          res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
          });
      }
  }
  return res;
};
var item = ['北京市', chinaDatas]
var items = ['北京市', chinaDatassss]
console.log(item[1])
console.log(items)

  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  echarts.registerMap('China', chinajson);

  const option = {
    tooltip: {
             
           trigger: 'item',
              showDelay: 0,
              show : false,
      }  ,
      geo: {
        map: 'China',
        zoom: 1.2,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false, //是否允许缩放
        itemStyle: {
            normal: {
                color: 'rgba(51, 69, 89, .5)', //地图背景色
                borderColor: '#516a89', //省市边界线00fcff 516a89
                borderWidth: 1
            },
            emphasis: {
                color: 'rgba(37, 43, 61, .5)' ,//悬浮背景
            }
        }
    },
     series:[
        {
                type: 'lines',
                name: "射线",
                effect: {
                      show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'arrow', //箭头图标
                    symbolSize: 5, //图标大小
                },

                // symbol: 'arrow',
                // period: 10, //箭头指向速度，值越小速度越快
                //     trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                //     symbolSize: 10, //图标大小
                lineStyle: {
                    normal: {
                        width: 1, //尾迹线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: .3, //尾迹线条曲直度
                        color: "#00eaff"
                    },
                   
                },
                label: {
                  textStyle: {
                    color: "#00eaff"
                },
                },
                //  data: lineList
                data: convertDataline(items[1])

            },
            {
              type: 'lines',
              name: "射线红色",
              effect: {
                    show: true,
                  period: 4, //箭头指向速度，值越小速度越快
                  trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: 'arrow', //箭头图标
                  symbolSize: 5, //图标大小
              },
              lineStyle: {
                  normal: {
                      width: 1, //尾迹线条宽度
                      opacity: 1, //尾迹线条透明度
                      curveness: .3, //尾迹线条曲直度
                      color: "#f00"
                  },
                 
              },
              data: [[ [121.4648, 31.2891],[116.4551, 40.2539]]]

          },
     {
             type: 'effectScatter',
             name: "散点",
             coordinateSystem: 'geo',
             symbolSize: 5,  // 散点的大小
             geoIndex: 0,
             rippleEffect: { //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: 'stroke', //波纹绘制方式 stroke, fill
              scale: 4 ,//波纹圆环最大限制，值越大波纹越大
              color: "#00eaff"//散点的颜色
          },
          label: {
            normal: {
                show: true,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params) { //圆环显示文字
                    return params.data.name;
                },
                textStyle: {
                  color: "#00eaff"
              },
                fontSize: 13
            },
            emphasis: {
                show: true
            }
        },
        
        symbol: 'circle',
        symbolSize: function(val) {
            return 5 + val[2] * 5; //圆环大小
        },
        itemStyle: {
            normal: {
                show: false,
                color: '#00eaff'
            }
        },
             
             
             data: convertData(chinaDatas),
             
       
    },{
      type: 'scatter',
      name: "北京",
      coordinateSystem: 'geo',
      rippleEffect: {
          period: 4,
          brushType: 'stroke',
          scale: 4
      },
      label: {
          normal: {
              show: true,
              position: 'right',
              //offset:[5, 0],
              color: '#0f0',
              formatter: '{b}',
              textStyle: {
                  color: "#0f0"
              }
          },
          emphasis: {
              show: true,
              color: "#f60"
          }
      },
      itemStyle: {
        normal: {
            show: false,
            color: '#f44336'
        }
    },
      symbol: 'pin',
      symbolSize: 50,
      data: [{
          name: item[0],
          value: chinaGeoCoordMap[item[0]].concat([10]),
      }],
  }
  ]
   
  };

  chart.setOption(option);

  return chart;
}




function initChartnmg(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  echarts.registerMap('nmg', nmgjson);

  const option = {
    tooltip: {
      trigger: 'item',
              showDelay: 0,
              show : false,
              // enterable: true,
              // formatter: '{b}: {c}'
              formatter: function(params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value[params.seriesIndex + 1];
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }
    },

   
    
    series: [{
      type: 'map',
      mapType: 'nmg',
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff' //原来的颜色
          }
        },
        emphasis: {
          textStyle: {
            color: '#ff0000' //点击变成红字
          }
        }
      },
      itemStyle: {

        normal: {
          
          areaColor: '#334559',//地图背景色
          // color: 
          borderColor: '#516a89', //省市边界线00fcff 516a89
          borderWidth: 1
        },
        emphasis: {
          areaColor: 'rgba(37, 43, 61, .5)',
          
          // borderWidth: 0
        }
      },
      animation: false,

      data: [
        {
          name:   '呼和浩特市',
          value: 100,
           
      }
      ]

    }],

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
    data: {
      ec: {
        onInit: initChart
      },
      ecnmg: {
        onInit: initChartnmg
      },
      msgList: [
        { sysrz: 25, rz: 29 ,id: 0},
        { sysrz: 26, rz: 30 ,id: 1},
        { sysrz: 28, rz: 31 ,id: 2}]
    },
  
    onReady() {
    },
    
  });


// kundian_farm/pages/shop/classification/index.js
var a = new getApp(), t = require("../../../utils/util.js"), e = a.siteInfo.uniacid;
// var t = new getApp(), a = require("../../../utils/util.js"), o = t.siteInfo.uniacid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SystemInfo: a.globalData.sysData, //tabbar
    // isIphoneX: a.globalData.isIphoneX,
    typeDataIndex: 0, //左侧菜单索引默认为0
    typeData: [], // 左侧菜单
    recommendData: [], // 右侧菜单
    page: 1,
    is_tarbar: !1,
    farmSetData: [],
    tarbar: wx.getStorageSync("kundianFarmTarbar"),
    typeid:[] //左侧菜单对应的id

    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    console.log(this)
    var n = this,s = t.is_tarbar || !1, o = wx.getStorageSync("kundianFarmTarbar");
   
     // 发送异步请求
     
    n.setData({
        tarbar: o,
        is_tarbar: s,
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    });
    //  this.getSlide();
    var r = wx.getStorageSync("uid_" + e);
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading'
    //  }),
    wx.showLoading({
        title: "玩命加载中..."
    }), 
    a.util.request({
        url: "entry/wxapp/class",
        data: {
            control: "shop",
            op: "index",
            // uniacid: e,
            // uid: r
        },
        success: function(a) {
          console.log(a)
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
            var t = a.data, e = t.typeData, s = t.recommendData, typeid =  e.id
            n.setData({
                typeData: e,
                typeid: typeid
            })
            
        }
    }), a.util.setNavColor(e);
    
    var i = t.user_uid;
    void 0 != i && 0 != i && (a.loginBindParent(i, r), n.setData({
        user_uid: i
    }));
// 右侧菜单商品
    wx.showLoading({
      title: "玩命加载中..."
  }), a.util.request({
      url: "entry/wxapp/class",
      data: {
          control: "shop",
          op: "getGoodsList",
          type_id: 3,
      },
      success: function(a) {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
          var t = a.data; e = t.goodsData;
          n.setData({
            recommendData: e
          })
          // wx.showToast({
          //   // title: ‘请求成功’,
          //   icon: "none"
          //  })
      }
      
    });
    
    
},
  // 搜索
  selectGoods: function(a) {
      wx.navigateTo({
          url: "../search/index"
      });
  },
  // 切换商品分类显示不同的商品
  intoGoodsList: function(a) {
    console.log(a)
    console.log("点击")
    var that = this
    // 获取当前索引值
    const {index} = a.currentTarget.dataset;
    const {typeid} = a.currentTarget.dataset;


    var t = new getApp(); var a = require("../../../utils/util.js"); var o = t.siteInfo.uniacid;
    var e =[];
    t.util.request({
      url: "entry/wxapp/class",
      data: {
          control: "shop",
          op: "getGoodsList",
          type_id: typeid,
      },
      success: function(t) {
        console.log(t)
        // var n = this;
          var t = t.data; e = t.goodsData;
          that.setData({
            typeDataIndex : index,
            recommendData: e,
            typeid:typeid
          })
          
      }
    })

},


//图片点击切换页面
intoGoodsDetail: function(t) {

  var a = t.currentTarget.dataset.goodsid;
  wx.navigateTo({
      url: "../prodeteils/index?goodsid=" + a
  });
},

// 滚动
loadMor:function(e){
  this.onReachBottom()
},
  /**
   * 页面上拉触底事件的处理函数bindscrolltolower
   */
  onReachBottom: function (t) {
    console.log("页面刷新")
    // 下拉刷新
  var that = this;
  var e = this, s = e.data, r = s.typeid, d = s.page, i = s.recommendData;
  console.log(e)
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getGoodsList",
                type_id: r,
                uniacid: e,
                page: d
            },
            success: function(t) {
                if (t.data.goodsData != '') {
                  console.log("有东西")
                    for (var a = t.data.goodsData, e = 0; e < a.length; e++) i.push(a[e]);
                    that.setData({
                        type_id: r,
                        recommendData: i,
                        page: parseInt(d) + 1
                    });
                }else{
                  wx.showToast({
                    title: '没有了！！！',           
                  });
                }
            }
        });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
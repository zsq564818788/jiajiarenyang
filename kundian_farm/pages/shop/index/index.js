var a = new getApp(), t = require("../../../utils/util.js"), e = a.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        classify: 1,
        Adopt: [],
        typeData: [],
        recommendData: [],
        user_id: 0,
        newGoodsData: [],
        page: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function(t) {
        var n = this, s = t.is_tarbar || !1, o = wx.getStorageSync("kundianFarmTarbar");
        n.setData({
            tarbar: o,
            is_tarbar: s,
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), this.getSlide();
        var r = wx.getStorageSync("uid_" + e);
        wx.showLoading({
            title: "玩命加载中..."
        }), a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "index",
                uniacid: e,
                uid: r
            },
            success: function(a) {
                var t = a.data, e = t.typeData, s = t.recommendData;
                n.setData({
                    typeData: e,
                    recommendData: s
                }), wx.hideLoading();
            }
        }), a.util.setNavColor(e);
        var i = t.user_uid;
        void 0 != i && 0 != i && (a.loginBindParent(i, r), n.setData({
            user_uid: i
        }));
    },
    getSlide: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "slide",
                op: "getSlide",
                type: "shop"
            },
            success: function(a) {
                t.setData({
                    Adopt: a.data.slide
                });
            }
        });
    },
    onShow: function(t) {
        var n = this, s = this.data.user_uid, o = wx.getStorageSync("uid_" + e);
        void 0 != s && 0 != s && (a.loginBindParent(s, o), n.setData({
            user_uid: s
        }));
    },
    intoGoodsList: function(a) {
        var t = a.currentTarget.dataset, e = t.typeid;
        t.urltype;
        wx.navigateTo({
            url: "../proList/index?type_id=" + e
        });
    },
    selectGoods: function(a) {
        wx.navigateTo({
            url: "../search/index"
        });
    },
    intoGoodsDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + t
        });
    },
    intoDetailSlide: function(a) {
        var t = a.currentTarget.dataset, e = t.linktype, n = t.linkparam;
        0 == n || "" == n ? wx.navigateTo({
            url: "/" + e
        }) : wx.navigateTo({
            url: "/" + n
        });
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_setData");
        return {
            path: "/kundian_farm/pages/shop/index/index?&user_uid=" + wx.getStorageSync("uid_" + e),
            success: function(a) {},
            title: a.share_shop_title
        };
    },
    onPullDownRefresh: function(n) {
        var s = this, o = wx.getStorageSync("uid_" + e);
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                uniacid: e,
                op: "getCommonData"
            },
            success: function(n) {
                var r = n.data, i = r.tarbar, d = r.farmSetData;
                wx.setStorageSync("kundianFarmTarbar", i), wx.setStorageSync("kundian_farm_setData", d), 
                s.setData({
                    tarbar: i,
                    farmSetData: d
                }), a.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "shop",
                        op: "index",
                        uniacid: e,
                        uid: o
                    },
                    success: function(a) {
                        var e = a.data, n = e.slideData, o = e.typeData, r = e.recommendData;
                        s.setData({
                            Adopt: n,
                            typeData: o,
                            recommendData: r
                        }), t.computeHeight(s, r, 2), wx.stopPullDownRefresh();
                    }
                }), wx.stopPullDownRefresh(), wx.hideLoading();
            }
        });
    },
    changeType: function(a) {
        var t = a.currentTarget.dataset.index;
        this.getGoodsData(1, t), this.setData({
            classify: t
        });
    },
    getGoodsData: function(t, n, s) {
        var o = this, r = o.data, i = r.recommendData, d = r.newGoodsData;
        if (1 != s) if (1 == n) {
            if (i.length > 0) return !1;
        } else if (d.length > 0) return;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getNewGoods",
                uniacid: e,
                page: t,
                classify: n
            },
            success: function(a) {
                if (1 == s) if (1 == n) {
                    var e = o.data.recommendData;
                    a.data.recommendData.map(function(a) {
                        e.push(a);
                    }), o.setData({
                        recommendData: e,
                        page: parseInt(t) + 1
                    });
                } else {
                    var r = o.data.newGoodsData;
                    a.data.newGoodsData.map(function(a) {
                        r.push(a);
                    }), o.setData({
                        newGoodsData: r,
                        page: parseInt(t) + 1
                    });
                } else 1 == n ? o.setData({
                    recommendData: a.data.recommendData,
                    page: 1
                }) : o.setData({
                    newGoodsData: a.data.newGoodsData,
                    page: 1
                });
            }
        });
    },
    onReachBottom: function(a) {
        var t = this.data.classify, e = parseInt(this.data.page) + 1;
        this.getGoodsData(e, t, 1);
    }
});
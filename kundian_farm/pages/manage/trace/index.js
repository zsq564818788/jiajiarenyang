var e = require("../../../../wxParse/wxParse.js"), a = new getApp();

Page({
    data: {
        config: [],
        isSelect: !1,
        current: 1,
        goodsData: [],
        sourceLi: [],
        source: [],
        about: [],
        source_code: ""
    },
    onLoad: function(e) {
        var a = wx.getStorageSync("kundian_farm_setData");
        this.setData({
            config: a
        }), e.source_code && this.setData({
            source_code: e.source_code
        });
    },
    getText: function(e) {
        this.setData({
            source_code: e.detail.value
        });
    },
    saoma: function() {
        var e = this;
        wx.scanCode({
            success: function(a) {
                var t = a.path.split("=");
                e.setData({
                    source_code: t[1]
                });
            }
        });
    },
    selectSource: function() {
        wx.showLoading({
            title: "正在查询..."
        });
        var t = this, o = t.data.source_code;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSourceCode",
                control: "shop",
                source_code: o
            },
            success: function(a) {
                if (wx.hideLoading(), -1 != a.data.code) {
                    var o = a.data, s = o.goodsData, r = o.source, c = o.sourceLi, n = o.about;
                    t.setData({
                        goodsData: s,
                        source: r,
                        sourceLi: c,
                        about: n,
                        isSelect: !0
                    }), "" != n.farm_desc && e.wxParse("article", "html", n.farm_desc, t, 5);
                } else wx.showToast({
                    title: a.data.msg,
                    icon: "none"
                });
            }
        });
    },
    changeTar: function(e) {
        this.setData({
            current: e.currentTarget.dataset.current
        });
    },
    previewImg: function(e) {
        wx.previewImage({
            urls: [ e.currentTarget.dataset.src ],
            current: e.currentTarget.dataset.src
        });
    },
    goHome: function() {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index"
        });
    },
    goBuy: function() {
        var e = this.data.goodsData;
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/prodeteils/index?goodsid=" + e.id
        });
    }
});
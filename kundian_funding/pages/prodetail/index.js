var t = new getApp(), e = t.util.url("entry/wxapp/funding") + "m=kundian_farm_plugin_funding", a = require("../../../wxParse/wxParse.js"), i = t.siteInfo.uniacid;

Page({
    data: {
        isShow: !1,
        animationData: {},
        currentId: "",
        success: !1,
        isBuy: !1,
        chooseNum: 1,
        proDetail: [],
        spec: [],
        currentSpec: [],
        farmSetData: [],
        progressList: [],
        funding_set: [],
        bottom: 0
    },
    onLoad: function(i) {
        this.videoContext = wx.createVideoContext("myVideo", this);
        var n = this, o = i.pid;
        wx.request({
            url: e,
            data: {
                op: "getProDetail",
                control: "project",
                pid: o
            },
            success: function(t) {
                var e = t.data, i = e.proDetail, o = e.spec, r = e.progress, s = e.funding_set;
                n.setData({
                    proDetail: i,
                    spec: o,
                    progressList: r,
                    funding_set: s,
                    currentSpec: o[0],
                    currentId: o[0].id
                }), "" != i.project_detail && a.wxParse("article", "html", i.project_detail, n, 5);
                var u = wx.createAnimation({
                    transformOrigin: "50% 50%",
                    duration: 1e3,
                    timingFunction: "ease",
                    delay: 0
                });
                u.width(i.progress + "%").step({
                    duration: 1e3
                }), n.setData({
                    animationData: u.export()
                });
            }
        });
        var r = 0;
        t.globalData.sysData.model.indexOf("iPhone X") > -1 && (r = 68);
        var s = wx.getStorageSync("kundian_farm_setData");
        this.setData({
            farmSetData: s,
            bottom: r
        });
    },
    showVideo: function() {
        this.setData({
            isShow: !0
        }), this.videoContext.play();
    },
    hiddenVideo: function() {
        this.setData({
            isShow: !1
        }), this.videoContext.pause();
    },
    chooseLevel: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        this.data.spec.map(function(t) {
            t.id == a && e.setData({
                currentSpec: t
            });
        }), this.setData({
            currentId: a
        });
    },
    buyNow: function() {
        this.setData({
            isBuy: !0
        });
    },
    close: function() {
        this.setData({
            isBuy: !1
        });
    },
    preventTouchMove: function() {},
    reduce: function() {
        var t = this.data.chooseNum;
        if (1 === t) return !1;
        t > 1 && this.setData({
            chooseNum: t - 1
        });
    },
    add: function() {
        var t = this.data.chooseNum;
        this.setData({
            chooseNum: t + 1
        });
    },
    goHome: function(t) {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index?is_tarbar=true"
        });
    },
    sureSelect: function(t) {
        var e = this.data, a = e.currentSpec, n = e.chooseNum;
        if (wx.getStorageSync("uid_" + i)) if ("" != a) {
            var o = JSON.stringify(a), r = this.data.proDetail;
            wx.navigateTo({
                url: "../confrimOrder/index?count=" + n + "&spec=" + o + "&pid=" + r.id
            });
        } else wx.showToast({
            title: "请选择档位"
        }); else wx.navigateTo({
            url: "/kundian_farm/pages/login/index"
        });
    },
    progressHistory: function(t) {
        var e = this.data.proDetail.id;
        wx.navigateTo({
            url: "../progress/index?pid=" + e
        });
    },
    onShareAppMessage: function(t) {
        var e = this.data.proDetail;
        return {
            path: "kundian_funding/pages/prodetail/index?pid=" + e.id,
            success: function(t) {},
            title: e.project_name
        };
    },
    intoReturnDetail: function(t) {
        wx.navigateTo({
            url: "../return/index"
        });
    },
    intoContract: function(t) {
        wx.navigateTo({
            url: "/kundian_farm/pages/common/agreement/index?type=5"
        });
    }
});
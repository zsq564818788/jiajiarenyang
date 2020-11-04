var a = new getApp(), t = a.siteInfo.uniacid;

Page({
    data: {
        bgColor: a.bgColor,
        currentState: "1",
        allLands: [],
        currentLand: [],
        page: 1,
        landData: [],
        currentIndex: "全部",
        is_load: !0
    },
    onLoad: function(n) {
        this.setData({
            currentLand: this.data.allLands,
            bgColor: a.bgColor
        });
        var e = this, d = wx.getStorageSync("uid_" + t);
        e.data.currentState;
        0 != d ? e.getLandData() : wx.redirectTo({
            url: "../../../login/index"
        }), a.util.setNavColor();
    },
    getLandData: function() {
        var n = this, e = wx.getStorageSync("uid_" + t), d = n.data.currentState;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getMineLand",
                control: "land",
                uid: e,
                uniacid: t,
                current: d
            },
            success: function(a) {
                a.data.landData.length > 0 ? n.setData({
                    landData: a.data.landData,
                    is_load: !0
                }) : n.setData({
                    is_load: !1
                });
            }
        });
    },
    changeState: function(a) {
        var t = this, n = [], e = a.currentTarget.dataset.state;
        t.data.allLands.map(function(a) {
            "1" === e ? n.push(a) : "2" === e ? a.plant.length > 0 && n.push(a) : "3" === e && 0 == a.plant.length && n.push(a);
        }), t.setData({
            currentState: e,
            currentLand: n
        }), t.getLandData();
    },
    intoMineLandDetail: function(a) {
        var t = a.currentTarget.dataset.lid;
        if (2 == a.currentTarget.dataset.landstatus) return wx.showModal({
            title: "提示",
            content: "您的土地已过期",
            showCancel: !1
        }), !1;
        wx.navigateTo({
            url: "/kundian_farm/pages/land/mineLandDetail/index?lid=" + t
        });
    },
    gotoBuy: function(a) {
        wx.navigateTo({
            url: "../../../land/landList/index"
        });
    },
    onReachBottom: function(n) {
        var e = this, d = wx.getStorageSync("uid_" + t), r = e.data, i = r.currentState, l = r.page, u = r.landData;
        a.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getMineLand",
                uid: d,
                uniacid: t,
                current: i,
                page: l
            },
            success: function(a) {
                if (a.data.landData) {
                    for (var t = a.data.landData, n = 0; n < t.length; n++) u.push(t[n]);
                    e.setData({
                        landData: u,
                        page: parseInt(l) + 1
                    });
                }
            }
        });
    },
    intoBag: function(a) {
        var t = a.detail.formId;
        wx.navigateTo({
            url: "/kundian_farm/pages/land/seedBag/index?formid=" + t
        });
    }
});
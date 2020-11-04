var t = new getApp(), e = t.siteInfo.uniacid, a = require("../../../wxParse/wxParse.js"), i = t.util.getNewUrl("entry/wxapp/class", "kundian_farm_plugin_active");

Page({
    data: {
        sign: [],
        activeList: [],
        isShow: !1,
        selectNum: 1,
        total: 0,
        active: [],
        farmSetData: [],
        sign_order: [],
        isIphoneX: t.globalData.isIphoneX
    },
    onLoad: function(n) {
        var s = this, c = n.activeid, o = wx.getStorageSync("uid_" + e), r = wx.getStorageSync("kundian_farm_setData");
        wx.request({
            url: i,
            data: {
                action: "active",
                op: "getActiveDetail",
                uniacid: e,
                active_id: c,
                uid: o
            },
            success: function(t) {
                var e = t.data, i = e.active, n = e.spec, c = e.sign_user, o = e.sign_count, u = e.sign_order;
                s.setData({
                    active: i,
                    spec: n,
                    sign: c,
                    sign_count: o,
                    farmSetData: r,
                    sign_order: u
                }), "" != t.data.active.detail && a.wxParse("article", "html", t.data.active.detail, s, 5);
            }
        }), t.util.setNavColor(e);
    },
    call: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.active.phone.toString()
        });
    },
    gotomap: function() {
        var t = this.data.active;
        wx.openLocation({
            latitude: parseFloat(t.latitude),
            longitude: parseFloat(t.longitude),
            address: t.address,
            scale: 28
        });
    },
    preventDefault: function() {},
    selectItem: function(t) {
        var e = [ t.currentTarget.dataset.id, this.data.spec ], a = e[0], i = e[1];
        i.map(function(t) {
            t.select = !1, t.id == a && (t.select = !0);
        }), this.setData({
            spec: i
        }), this.sumPrice();
    },
    reduce: function() {
        var t = this.data.selectNum;
        t <= 1 || (t -= 1, this.setData({
            selectNum: t
        }), this.sumPrice());
    },
    add: function() {
        var t = this.data.selectNum;
        t += 1, this.setData({
            selectNum: t
        }), this.sumPrice();
    },
    sumPrice: function() {
        var t = [ this.data.selectNum, this.data.spec, 0 ], e = t[0], a = t[1], i = t[2];
        a.map(function(t) {
            t.select && (i = t.price * e);
        }), this.setData({
            total: i.toFixed(2)
        });
    },
    close: function() {
        this.setData({
            isShow: !1
        });
    },
    signUp: function() {
        this.setData({
            isShow: !0
        });
    },
    toPay: function(t) {
        var a = this;
        if (wx.getStorageSync("uid_" + e)) {
            var i = a.data, n = i.selectNum, s = i.active, c = i.spec;
            if (s.count > 0 && s.count - s.person_count < n) return wx.showModal({
                title: "提示",
                content: "当前余票不足！剩余" + (s.count - s.person_count) + "张"
            }), !1;
            var o = [];
            if (c.map(function(t) {
                t.select && (o = t);
            }), 0 == o.length) wx.showToast({
                title: "请选择规格！"
            }); else {
                var r = a.data, u = r.active, d = r.total;
                wx.navigateTo({
                    url: "../signform/index?activeid=" + u.id + "&total=" + d + "&selectNum=" + n + "&spec=" + JSON.stringify(o)
                });
            }
        } else wx.navigateTo({
            url: "/kundian_farm/pages/login/index"
        });
    },
    goHome: function() {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index?is_tarbar=true"
        });
    },
    intoSignInfo: function(t) {
        var e = t.currentTarget.dataset.activeid;
        wx.navigateTo({
            url: "../signInfo/index?active_id=" + e
        });
    },
    openQrcode: function(t) {
        var e = this.data.sign_order;
        wx.navigateTo({
            url: "../ticket/index?order_id=" + e.id
        });
    },
    onShareAppMessage: function(t) {
        var e = this.data.active;
        return {
            path: "kundian_active/pages/details/index?activeid=" + e.id,
            success: function(t) {},
            title: e.title
        };
    }
});
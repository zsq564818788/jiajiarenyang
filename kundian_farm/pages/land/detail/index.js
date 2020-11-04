var t = require("../../../../wxParse/wxParse.js"), e = new getApp(), a = e.siteInfo.uniacid;

Page({
    data: {
        bottom: e.bottom,
        bgColor: e.bgColor,
        assistColor: e.assistColor,
        isReturn: !1,
        isShow: !0,
        seed: [],
        spec: [],
        total_price: 0,
        farmSetData: wx.getStorageSync("kundian_farm_setData"),
        icon: [],
        is_loading: !0,
        uid: "",
        scrollShow: !1,
        land_num: "",
        showDeadline: !1,
        showdeliveryTime: !1,
        lid: 0,
        device: []
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "土地详情"
        });
        var i = t.lid, s = t.user_uid, n = wx.getStorageSync("uid_" + a);
        this.setData({
            lid: i
        }), e.loginBindParent(s, n), e.util.setNavColor(), this.init(i), this.getWebThing();
    },
    init: function(i) {
        var s = this, n = wx.getStorageSync("uid_" + a);
        wx.showLoading({
            title: "玩命加载中..."
        }), e.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "detail",
                id: i,
                control: "soil"
            },
            success: function(e) {
                var a = e.data, i = a.land, o = a.spec, l = a.icon, d = a.seed;
                s.setData({
                    land: i,
                    seed: d,
                    spec: o,
                    icon: l,
                    uid: n
                }), i.land_desc && t.wxParse("article", "html", i.land_desc, s, 5), wx.hideLoading();
            }
        });
    },
    getWebThing: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/class",
            method: "GET",
            data: {
                control: "soil",
                op: "getWebThing",
                id: t.data.lid
            },
            success: function(e) {
                e.data.landDeviceInfo && t.setData({
                    device: e.data.landDeviceInfo
                });
            }
        });
    },
    onPageScroll: function(t) {
        var e = !1;
        t.scrollTop > 200 && (e = !0), this.setData({
            isReturn: e
        }), t.scrollTop >= 350 ? this.data.scrollShow || this.setData({
            scrollShow: !0
        }) : this.data.scrollShow && this.setData({
            scrollShow: !1
        });
    },
    returnTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    showVideo: function() {
        this.setData({
            isShow: !0
        });
    },
    hideVideo: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    select: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data, i = a.spec, s = a.land_num, n = a.total_price;
        i.map(function(t) {
            if (t.id === e) {
                var a = t.select;
                t.select = !a, s = t.land_num, n = t.cost;
            } else t.select = !1;
        }), this.setData({
            spec: i,
            land_num: s,
            total_price: n
        });
    },
    toPay: function(t) {
        var e = this.data, i = e.land, s = e.spec, n = [];
        if (wx.getStorageSync("uid_" + a)) return s.map(function(t) {
            t.select && n.push(t);
        }), n.length > 0 ? parseFloat(n.cost) <= 0 ? void wx.showToast({
            title: "当前选择的地块还未设置价格，请稍后进行购买",
            icon: "none"
        }) : (wx.setStorageSync("selectSpec", n), void wx.navigateTo({
            url: "./confirm?land_id=" + i.id
        })) : (wx.showModal({
            title: "提示",
            content: "请选择土地面积",
            showCancel: !1
        }), !1);
        wx.navigateTo({
            url: "../../login/index"
        });
    },
    intoSeedDetail: function(t) {
        var e = t.currentTarget.dataset.sid;
        wx.navigateTo({
            url: "../seedDetails/index?sid=" + e
        });
    },
    play: function(t) {
        this.setData({
            is_loading: !1
        });
    },
    onShow: function(t) {
        this.setData({
            is_loading: !0,
            bgColor: e.bgColor,
            assistColor: e.assistColor
        });
    },
    getAuthUserInfo: function(t) {
        var a = this;
        e.getAuthUserInfo(t).then(function(t) {
            a.setData({
                uid: t
            }), a.toPay();
        }).then(function() {});
    },
    onShareAppMessage: function(t) {
        var e = this.data.landDetail, i = wx.getStorageSync("uid_" + a), s = "/kundian_farm/pages/land/landDetails/index?lid=" + e.id;
        return i && (s = "/kundian_farm/pages/land/landDetails/index?user_uid=" + i + "&lid=" + e.id), 
        {
            path: s,
            success: function(t) {},
            title: "实时监控"
        };
    },
    showDeadline: function(t) {
        this.setData({
            showDeadline: !this.data.showDeadline
        });
    },
    showdeliveryTime: function(t) {
        this.setData({
            showdeliveryTime: !this.data.showdeliveryTime
        });
    }
});
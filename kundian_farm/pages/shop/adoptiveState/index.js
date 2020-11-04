var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        adoptData: [],
        statusData: [],
        adopt_id: "",
        page: 1,
        state: 1,
        isslaugHter: !1,
        farmSetData: [],
        isShow: !1,
        is_loading: !0,
        src_xy: []
    },
    onLoad: function(s) {
        var i = s.adopt_id;
        this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            adopt_id: i
        }), this.getInit(i), t.util.setNavColor(a);
    },
    onShow: function() {
        this.getInit(this.data.adopt_id);
    },
    getInit: function(s) {
        var i = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "getAdoptDetail",
                uniacid: a,
                adopt_id: s
            },
            success: function(t) {
                var a = t.data, s = a.adoptData, e = a.statusData, n = s.live_src, o = [];
                n && (o = n.split(":")), i.setData({
                    adoptData: s,
                    statusData: e,
                    src_xy: o
                });
            }
        });
    },
    onReachBottom: function(s) {
        var i = this, e = i.data, n = e.adopt_id, o = e.statusData, r = e.page;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "getStatusData",
                uniacid: a,
                adopt_id: n,
                page: r
            },
            success: function(t) {
                if (t.data.statusData) {
                    for (var a = t.data.statusData, s = 0; s < a.length; s++) o.push(a[s]);
                    i.setData({
                        statusData: o,
                        page: parseInt(r) + 1
                    });
                }
            }
        });
    },
    preImg: function(t) {
        for (var a = this.data.statusData, s = t.currentTarget.dataset, i = s.sid, e = s.index, n = [], o = 0; o < a.length; o++) a[o].id == i && (n = a[o].src);
        wx.previewImage({
            current: n[e],
            urls: n
        });
    },
    kellSend: function(t) {
        var a = this.data.adopt_id;
        wx.navigateTo({
            url: "../../user/confirmOrder/index?adopt_id=" + a
        });
    },
    slaugHter: function() {
        this.setData({
            isslaugHter: !0
        });
    },
    preventTouchMove: function() {},
    showVideo: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    play: function(t) {
        this.setData({
            is_loading: !1
        });
    },
    lookOrder: function(t) {
        var a = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/Group/orderDetails/index?order_id=" + a
        });
    }
});
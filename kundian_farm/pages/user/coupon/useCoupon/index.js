var t = new getApp(), e = t.siteInfo.uniacid;

wx.getStorageSync("uid_" + e);

Page({
    data: {
        isUsed: !1,
        userCoupon: [],
        type: 1
    },
    onLoad: function(a) {
        var o = this, s = a.type, n = wx.getStorageSync("uid_" + e), u = a.totalPrice;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getUseCoupon",
                uniacid: e,
                uid: n,
                type: s,
                totalPrice: u
            },
            success: function(t) {
                o.setData({
                    userCoupon: t.data.userCoupon,
                    type: s
                });
            }
        }), t.util.setNavColor(e);
    },
    isUsed: function() {
        var t = this.data.isUsed;
        this.setData({
            isUsed: !t
        }), wx.navigateBack({
            delta: 1
        });
    },
    useCoupon: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data.userCoupon, o = new Array();
        a.map(function(t) {
            t.id == e && (o = t);
        }), wx.setStorageSync("user_coupon", o), wx.navigateBack({
            delta: 1
        });
    }
});
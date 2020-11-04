var t = new getApp(), a = t.siteInfo.uniacid;

wx.getStorageSync("uid_" + a);

Page({
    data: {
        currenType: 1,
        couponData: [],
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(o) {
        var e = this, n = 1;
        n = o.type ? o.type : e.data.currenType;
        var u = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getCouponList",
                uniacid: a,
                type: n,
                uid: u
            },
            success: function(t) {
                e.setData({
                    couponData: t.data.couponData,
                    currenType: n
                });
            }
        }), t.util.setNavColor(a);
    },
    changeType: function(o) {
        var e = this, n = o.currentTarget.dataset.index, u = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getCouponList",
                uniacid: a,
                type: n,
                uid: u
            },
            success: function(t) {
                e.setData({
                    couponData: t.data.couponData,
                    currenType: n
                });
            }
        });
    },
    getCoupon: function(o) {
        var e = this, n = o.currentTarget.dataset.cid, u = e.data.couponData, c = wx.getStorageSync("uid_" + a);
        0 != c ? t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getCoupon",
                cid: n,
                uid: c,
                uniacid: a
            },
            success: function(t) {
                1 == t.data.code ? (wx.showToast({
                    title: "领取成功"
                }), u.map(function(t) {
                    t.id == n && (t.isget = 0);
                }), e.setData({
                    couponData: u
                })) : 2 == t.data.code ? wx.showToast({
                    title: "领取失败"
                }) : 3 == t.data.code ? wx.showToast({
                    title: "已领取过了"
                }) : 4 == t.data.code ? wx.showModal({
                    title: "提示",
                    content: "优惠券已被领完"
                }) : wx.showToast({
                    title: "请稍后重试"
                });
            }
        }) : wx.navigateTo({
            url: "../../../login/index"
        });
    },
    onShow: function(o) {
        t.globalData.uid = wx.getStorageSync("uid_" + a);
    }
});
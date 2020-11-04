var a = new getApp(), t = a.siteInfo.uniacid;

Page({
    data: {
        integralData: [],
        page: 1,
        isContent: !0
    },
    onLoad: function(e) {
        wx.getStorageSync("uid_" + t);
        this.getIntegralOrder(!1), a.util.setNavColor(t);
    },
    getIntegralOrder: function(e) {
        var r = this, n = wx.getStorageSync("uid_" + t), i = r.data, d = i.page, o = i.integralData;
        e && (d = parseInt(d) + 1), a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "integral",
                op: "getIntegralRecord",
                uid: n,
                uniacid: t,
                page: d
            },
            success: function(a) {
                var t = a.data.orderData;
                if (e) {
                    for (var n = 0; n < t.length; n++) o.push(t[n]);
                    r.setData({
                        integralData: o,
                        page: d
                    });
                } else a.data.orderData ? r.setData({
                    integralData: a.data.orderData
                }) : r.setData({
                    isContent: !1
                });
            }
        });
    },
    onReachBottom: function(a) {
        this.getIntegralOrder(!0);
    },
    pay: function(t) {
        var e = t.currentTarget.dataset.orderid, r = a.siteInfo.uniacid, n = wx.getStorageSync("uid_" + r);
        a.util.request({
            url: "entry/wxapp/pay",
            data: {
                op: "getIntegralPayOrder",
                orderid: e,
                uniacid: r,
                file: "integral"
            },
            cachetime: "0",
            success: function(t) {
                if (t.data && t.data.data && !t.data.errno) {
                    var i = t.data.data.package;
                    wx.requestPayment({
                        timeStamp: t.data.data.timeStamp,
                        nonceStr: t.data.data.nonceStr,
                        package: t.data.data.package,
                        signType: "MD5",
                        paySign: t.data.data.paySign,
                        success: function(t) {
                            wx.showLoading({
                                title: "加载中"
                            }), a.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    control: "integral",
                                    op: "sendMsg",
                                    order_id: e,
                                    uniacid: r,
                                    prepay_id: i,
                                    uid: n
                                },
                                success: function(a) {
                                    wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function() {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            });
                                        }
                                    }), wx.hideLoading();
                                }
                            });
                        },
                        fail: function(a) {
                            wx.redirectTo({
                                url: "../orderList/index"
                            });
                        }
                    });
                } else wx.redirectTo({
                    url: "../orderList/index"
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.redirectTo({
                            url: "../orderList/index"
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {}
});
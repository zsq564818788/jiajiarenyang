var t = new getApp(), a = t.siteInfo.uniacid, e = "kundian_farm_plugin_active";

Page({
    data: {
        bgColor: t.bgColor,
        assistColor: t.assistColor,
        currentIndex: "1",
        orderList: [],
        page: 1
    },
    onLoad: function(e) {
        this.getOrderData(1, 1, 0), t.util.setNavColor(a);
    },
    getOrderData: function(r, n, i) {
        var d = this, s = t.util.url("entry/wxapp/class") + "m=" + e, o = wx.getStorageSync("uid_" + a);
        wx.request({
            url: s,
            data: {
                action: "order",
                op: "getOrderList",
                uniacid: a,
                uid: o,
                page: n,
                current: r
            },
            success: function(t) {
                if (t.data.orderList) {
                    var a = d.data.orderList, e = t.data.orderList;
                    1 == i ? e.map(function(t) {
                        a.push(t);
                    }) : (a = e, n = 1), d.setData({
                        orderList: a,
                        page: n
                    });
                }
            }
        });
    },
    changeIndex: function(t) {
        var a = t.currentTarget.dataset.index;
        this.getOrderData(a, 1, 0), this.setData({
            currentIndex: t.currentTarget.dataset.index
        });
    },
    onReachBottom: function(t) {
        var a = this.data.changeIndex, e = parseInt(this.data.page) + 1;
        this.getOrderData(a, e, 1);
    },
    onPullDownRefresh: function(t) {
        var a = this.data.changeIndex;
        this.getOrderData(a, 1, 1);
    },
    cancelOrder: function(r) {
        var n = this, i = this.data.changeIndex, d = wx.getStorageSync("uid_" + a), s = r.currentTarget.dataset.orderid, o = t.util.url("entry/wxapp/class") + "m=" + e;
        wx.showModal({
            title: "提示",
            content: "确认取消订单吗？",
            success: function(t) {
                t.confirm && wx.request({
                    url: o,
                    data: {
                        action: "order",
                        op: "cancelOrder",
                        uniacid: a,
                        order_id: s,
                        uid: d
                    },
                    success: function(t) {
                        1 == t.data.code ? wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1,
                            success: function(t) {
                                n.getOrderData(i, 1, 0);
                            }
                        }) : wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1
                        });
                    }
                });
            }
        });
    },
    nowPay: function(r) {
        var n = r.currentTarget.dataset.orderid;
        t.util.request({
            url: "entry/wxapp/activePay",
            data: {
                orderid: n,
                uniacid: a
            },
            cachetime: "0",
            success: function(r) {
                if (r.data && r.data.data && !r.data.errno) {
                    var i = r.data.data.package;
                    wx.requestPayment({
                        timeStamp: r.data.data.timeStamp,
                        nonceStr: r.data.data.nonceStr,
                        package: r.data.data.package,
                        signType: "MD5",
                        paySign: r.data.data.paySign,
                        success: function(r) {
                            var d = t.util.url("entry/wxapp/active") + "m=" + e;
                            wx.request({
                                url: d,
                                data: {
                                    op: "notify",
                                    uniacid: a,
                                    uid: uid,
                                    orderid: n,
                                    prepay_id: i
                                },
                                success: function(t) {
                                    wx.hideLoading(), wx.showToast({
                                        title: "支付成功",
                                        success: function(t) {
                                            wx.redirectTo({
                                                url: "../payforResult/index?status=true&order_id=" + n
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        fail: function(t) {
                            wx.showModal({
                                title: "提示",
                                content: "您取消了支付",
                                showCancel: !1
                            });
                        }
                    });
                }
                "JSAPI支付必须传openid" == r.data.message && wx.navigateTo({
                    url: "../../login/index"
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "系统提示",
                    content: t.data.message ? t.data.message : "错误",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                });
            }
        });
    },
    seeTicket: function(t) {
        var a = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../ticket/index?order_id=" + a
        });
    }
});
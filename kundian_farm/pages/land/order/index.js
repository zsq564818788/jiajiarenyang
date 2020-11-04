var t = new getApp(), e = t.siteInfo.uniacid, a = require("../../../../util/util"), n = {};

Page({
    data: {
        navbar: 1,
        order: [],
        isContent: !0
    },
    onLoad: function(t) {
        var e = t.navbar || 1;
        this.setData({
            navbar: e
        }), this.soilOrder(e);
    },
    tabSelect: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            navbar: e
        }), this.soilOrder(e);
    },
    soilOrder: function(r) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var i = this, o = wx.getStorageSync("uid_" + e);
        i.data.order.map(function(t, e) {
            clearInterval(n["time" + e]);
        }), i.setData({
            order: []
        }), t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "soil",
                op: "soilOrder",
                uid: o,
                order_type: r
            },
            success: function(e) {
                var s = e.data.order;
                0 != Object.keys(s).length ? (1 == r && s.map(function(e, d) {
                    0 == e.is_cancel && (n["time" + d] = setInterval(function() {
                        var c = a.countDown(e.order_expay_time);
                        e.hour = c.hour, e.min = c.min, e.sec = c.sec, 0 == c.day && 0 == c.hour && 0 == c.sec && 0 == c.min && (e.is_cancel = 1, 
                        clearInterval(n["time" + d]), t.util.request({
                            url: "entry/wxapp/class",
                            data: {
                                control: "soil",
                                op: "operationOrder",
                                type: "cancel",
                                id: e.id,
                                uid: o
                            },
                            success: function(t) {
                                i.soilOrder(r);
                            }
                        })), s[d] = e, i.setData({
                            order: s,
                            isContent: !0
                        });
                    }, 1e3));
                }), i.setData({
                    order: s,
                    isContent: !0
                }), wx.hideLoading()) : i.setData({
                    isContent: !1
                });
            }
        });
    },
    onHide: function() {
        var t = this.data.order;
        t && t.length > 0 && t.map(function(t, e) {
            clearInterval(n["time" + e]);
        });
    },
    orderDel: function(t) {
        var a = {
            control: "soil",
            op: "operationOrder",
            type: "delete",
            id: t.currentTarget.dataset.id,
            uid: wx.getStorageSync("uid_" + e)
        };
        this.sendRequest(a, "确认删除该订单吗？");
    },
    orderCancel: function(t) {
        var a = {
            control: "soil",
            op: "operationOrder",
            type: "cancel",
            id: t.currentTarget.dataset.id,
            uid: wx.getStorageSync("uid_" + e)
        };
        this.sendRequest(a, "确认取消该订单吗？");
    },
    sendRequest: function(e, a) {
        var r = this, i = r.data, o = i.navbar, s = i.order;
        wx.showModal({
            title: "提示",
            content: a,
            success: function(a) {
                a.confirm && (s && s.length > 0 && s.map(function(t, e) {
                    clearInterval(n["time" + e]);
                }), t.util.request({
                    url: "entry/wxapp/class",
                    data: e,
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            success: function() {
                                if (0 == t.data.code) var e = setTimeout(function() {
                                    clearTimeout(e), r.soilOrder(o);
                                }, 1500);
                            }
                        });
                    }
                }));
            }
        });
    },
    payFor: function(a) {
        var r = this, i = a.currentTarget.dataset.id, o = r.data, s = o.navbar, d = o.order, c = {
            op: "soilPay",
            control: "soil",
            orderid: i,
            uniacid: e
        };
        t.util.request({
            url: "entry/wxapp/pay",
            data: c,
            cachetime: "0",
            success: function(e) {
                if (e.data && e.data.data && !e.data.errno) {
                    var a = e.data.data.package;
                    wx.requestPayment({
                        timeStamp: e.data.data.timeStamp,
                        nonceStr: e.data.data.nonceStr,
                        package: e.data.data.package,
                        signType: "MD5",
                        paySign: e.data.data.paySign,
                        success: function(e) {
                            wx.showLoading({
                                title: "加载中"
                            }), t.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    op: "sendMsg",
                                    control: "soil",
                                    order_id: i,
                                    prepay_id: a
                                },
                                success: function() {
                                    d && d.length > 0 && d.map(function(t, e) {
                                        clearInterval(n["time" + e]);
                                    }), wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function() {
                                            r.soilOrder(s);
                                        }
                                    }), wx.hideLoading();
                                }
                            });
                        },
                        fail: function(t) {
                            wx.showModal({
                                title: "系统提示",
                                content: "您取消了支付!",
                                showCancel: !1,
                                success: function(t) {
                                    wx.redirectTo({
                                        url: jump_url
                                    });
                                }
                            }), wx.hideLoading();
                        }
                    });
                } else console.log("fail1");
            },
            fail: function(t) {
                "JSAPI支付必须传openid" == t.data.message ? wx.navigateTo({
                    url: "/kundian_farm/pages/login/index"
                }) : wx.showModal({
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
    toDetail: function(t) {
        var e = t.currentTarget.dataset, a = e.id;
        1 != e.refund && wx.navigateTo({
            url: "./detail?order_id=" + a
        });
    },
    toSeedDetail: function(t) {
        var e = t.currentTarget.dataset, a = e.id;
        1 != e.refund && wx.navigateTo({
            url: "./seed?order_id=" + a
        });
    },
    tabOldVersion: function() {
        wx.navigateTo({
            url: "/kundian_farm/pages/land/personLand/index"
        });
    }
});
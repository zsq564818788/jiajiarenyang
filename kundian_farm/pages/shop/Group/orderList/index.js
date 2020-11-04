var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        bgColor: t.bgColor,
        currentIndex: "1",
        proJect: [],
        orderData: [],
        page: 1
    },
    onLoad: function(e) {
        var r = this, o = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupList",
                uid: o,
                uniacid: a
            },
            success: function(t) {
                r.setData({
                    orderData: t.data.orderData
                });
            }
        }), t.util.setNavColor(), r.setData({
            bgColor: t.bgColor
        });
    },
    getOrderData: function() {
        var e = this, r = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupList",
                uid: r,
                uniacid: a
            },
            success: function(t) {
                e.setData({
                    orderData: t.data.orderData
                });
            }
        });
    },
    changeIndex: function(e) {
        var r = e.currentTarget.dataset.index, o = this;
        this.setData({
            currentIndex: r
        });
        var o = this, s = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupList",
                uid: s,
                uniacid: a,
                status: r
            },
            success: function(t) {
                o.setData({
                    orderData: t.data.orderData
                });
            }
        });
    },
    payGroupOrder: function(e) {
        wx.getStorageSync("uid_" + a);
        var r = e.currentTarget.dataset.orderid;
        t.util.request({
            url: "entry/wxapp/pay",
            data: {
                op: "getGroupPayOrder",
                orderid: r,
                uniacid: a,
                file: "group"
            },
            cachetime: "0",
            success: function(e) {
                if (e.data && e.data.data && !e.data.errno) {
                    var o = e.data.data.package;
                    wx.requestPayment({
                        timeStamp: e.data.data.timeStamp,
                        nonceStr: e.data.data.nonceStr,
                        package: e.data.data.package,
                        signType: "MD5",
                        paySign: e.data.data.paySign,
                        success: function(e) {
                            wx.showLoading({
                                title: "玩命加载中"
                            }), t.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    control: "group",
                                    order_id: r,
                                    op: "sendMsg",
                                    uniacid: a,
                                    prepay_id: o
                                },
                                success: function() {
                                    wx.hideLoading(), wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function() {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        fail: function(t) {
                            wx.showModal({
                                title: "系统提示",
                                content: "您取消了支付!",
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && is_jump && wx.redirectTo({
                                        url: "../orderList/index"
                                    });
                                }
                            });
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
    applyRefund: function(e) {
        var r = this, o = wx.getStorageSync("uid_" + a), s = e.currentTarget.dataset.orderid;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "applyGroupRefund",
                uid: o,
                uniacid: a,
                order_id: s
            },
            success: function(t) {
                1 == t.data.code ? (wx.showToast({
                    title: "申请已提交"
                }), r.getOrderData()) : wx.showToast({
                    title: "申请失败"
                });
            }
        });
    },
    sureGoods: function(e) {
        var r = this, o = wx.getStorageSync("uid_" + a), s = e.currentTarget.dataset.orderid;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "sureGoods",
                uid: o,
                uniacid: a,
                order_id: s
            },
            success: function(t) {
                1 == t.data.code ? (wx.showToast({
                    title: "收货成功"
                }), r.getOrderData()) : wx.showToast({
                    title: "收货失败"
                });
            }
        });
    },
    cancelOrder: function(e) {
        var r = this, o = wx.getStorageSync("uid_" + a), s = e.currentTarget.dataset.orderid;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "cancelOrder",
                uid: o,
                uniacid: a,
                order_id: s
            },
            success: function(t) {
                1 == t.data.code ? (wx.showToast({
                    title: "取消成功"
                }), r.getOrderData()) : wx.showToast({
                    title: "取消失败"
                });
            }
        });
    },
    onReachBottom: function(e) {
        var r = this, o = wx.getStorageSync("uid_" + a), s = r.data, n = s.orderData, d = s.page, i = s.currentIndex;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupList",
                uid: o,
                uniacid: a,
                status: i,
                page: d
            },
            success: function(t) {
                if (t.data.orderData) {
                    for (var a = t.data.orderData, e = 0; e < a.length; e++) n.push(a[e]);
                    r.setData({
                        orderData: n,
                        page: parseInt(d) + 1
                    });
                }
            }
        });
    },
    deleteOrder: function(a) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确认删除订单吗？删除后将不可找回",
            success: function(r) {
                if (r.confirm) {
                    var o = a.currentTarget.dataset.orderid, s = wx.getStorageSync("uid_" + n), n = t.siteInfo.uniacid;
                    t.util.request({
                        url: "entry/wxapp/class",
                        data: {
                            control: "group",
                            op: "deleteOrder",
                            uniacid: n,
                            uid: s,
                            orderid: o
                        },
                        success: function(t) {
                            console.log(t), 1 == t.data.code ? (wx.showToast({
                                title: t.data.msg
                            }), e.getOrderData()) : wx.showToast({
                                title: t.data.msg
                            });
                        }
                    });
                }
            }
        });
    }
});
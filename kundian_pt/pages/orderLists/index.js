var t = new getApp(), e = t.siteInfo.uniacid, a = t.util.getNewUrl("entry/wxapp/pt", "kundian_farm_plugin_pt");

Page({
    data: {
        bgColor: t.bgColor,
        assistColor: t.assistColor,
        types: [ {
            id: 1,
            title: "全部",
            read: 0,
            clicked: !1
        }, {
            id: 2,
            title: "待付款",
            read: 0,
            clicked: !1
        }, {
            id: 3,
            title: "待收货",
            read: 0,
            clicked: !1
        }, {
            id: 4,
            title: "已收货",
            read: 0,
            clicked: !1
        } ],
        currentId: 1,
        orderList: [],
        page: 1,
        isContent: !0
    },
    onLoad: function() {
        this.getOrderList(1, 1);
    },
    getOrderList: function(t, i) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var d = this, n = wx.getStorageSync("uid_" + e), r = d.data.orderList;
        wx.request({
            url: a,
            data: {
                action: "index",
                op: "getOrderList",
                uniacid: e,
                uid: n,
                page: t,
                currentId: i
            },
            success: function(e) {
                if (t > 1) {
                    var a = e.data.list;
                    void 0 != a && a.map(function(t) {
                        r.push(t);
                    }), d.setData({
                        orderList: r,
                        page: t
                    });
                } else {
                    var i = !0, n = e.data.orderList;
                    void 0 != n && 0 != n.length || (i = !1), d.setData({
                        orderList: n,
                        isContent: i
                    });
                }
                wx.hideLoading();
            }
        });
    },
    selected: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data, i = a.types;
        a.currentId != e && (i.find(function(t) {
            return t.id == e;
        }).clicked = !0, this.setData({
            currentId: e,
            types: i
        }), this.getOrderList(1, a.currentId));
    },
    onReachBottom: function() {
        this.getOrderList(parseInt(this.data.page) + 1, this.data.currentId);
    },
    deleteItem: function(t) {
        var i = this, d = t.currentTarget.dataset.orderid, n = this.data.orderList, r = wx.getStorageSync("uid_" + e);
        wx.showModal({
            title: "提示",
            content: "确认删除该订单吗？",
            success: function(t) {
                t.confirm && wx.request({
                    url: a,
                    data: {
                        op: "deletePtOrder",
                        action: "index",
                        order_id: d,
                        uniacid: e,
                        uid: r
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        }), n.map(function(t, e) {
                            t.id == d && n.splice(e, 1);
                        }), i.setData({
                            orderList: n
                        });
                    }
                });
            }
        });
    },
    cancelOrder: function(t) {
        var i = this, d = t.currentTarget.dataset.orderid, n = wx.getStorageSync("uid_" + e);
        wx.showModal({
            title: "提示",
            content: "确认取消该订单吗？",
            success: function(t) {
                t.confirm && wx.request({
                    url: a,
                    data: {
                        op: "cancelPtOrder",
                        action: "index",
                        order_id: d,
                        uniacid: e,
                        uid: n
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        }), 0 == t.data.code && i.getOrderList(1, i.data.currentId);
                    }
                });
            }
        });
    },
    nowPay: function(i) {
        var d = i.currentTarget.dataset.orderid, n = t.util.getNewUrl("entry/wxapp/pay", "kundian_farm_plugin_pt");
        wx.request({
            url: n,
            data: {
                orderid: d,
                uniacid: e
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
                            }), wx.request({
                                url: a,
                                data: {
                                    action: "index",
                                    op: "sendMsg",
                                    order_id: d,
                                    uniacid: e,
                                    prepay_id: i
                                },
                                success: function() {
                                    wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function() {
                                            wx.redirectTo({
                                                url: "../orderLists/index"
                                            });
                                        }
                                    }), wx.hideLoading();
                                }
                            });
                        },
                        fail: function(t) {
                            wx.showModal({
                                title: "提示",
                                content: t.data.message,
                                showCancel: !1
                            });
                        }
                    });
                } else wx.showModal({
                    title: "提示",
                    content: t.data.message,
                    showCancel: !1
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "系统提示",
                    content: t.data.message ? t.data.message : "错误",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    applyRefund: function(t) {
        var i = this, d = t.currentTarget.dataset.orderid, n = wx.getStorageSync("uid_" + e);
        wx.showModal({
            title: "提示",
            content: "确认对该订单进行退款处理吗?",
            success: function(t) {
                t.confirm && wx.request({
                    url: a,
                    data: {
                        op: "applyRefundOrder",
                        action: "index",
                        order_id: d,
                        uniacid: e,
                        uid: n
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        }), 0 == t.data.code && i.getOrderList(1, i.data.currentId);
                    }
                });
            }
        });
    },
    confirmGoods: function(t) {
        var i = this, d = wx.getStorageSync("uid_" + e), n = t.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确认您已经收到货了吗？",
            success: function(t) {
                t.confirm && wx.request({
                    url: a,
                    data: {
                        op: "confirmGoods",
                        action: "index",
                        order_id: n,
                        uniacid: e,
                        uid: d
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg
                        }), 0 == t.data.code && i.getOrderList(1, i.data.currentId);
                    }
                });
            }
        });
    },
    orderDetail: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../orderDetail/index?order_id=" + e
        });
    },
    toComment: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/comment/index?order_id=" + e + "&module_name=kundian_farm_plugin_pt"
        });
    }
});
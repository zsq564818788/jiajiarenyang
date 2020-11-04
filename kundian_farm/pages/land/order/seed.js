var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        order: [],
        land: [],
        spec: [],
        config: [],
        icon: [],
        showVideo: !1,
        showSeed: !1,
        currentSeed: [],
        bottom: 0,
        open_land_pay: 0,
        countDownNum: 30,
        isLoading: !1
    },
    onLoad: function(e) {
        var o = this, n = e.order_id, d = wx.getStorageSync("uid_" + a), i = wx.getStorageSync("kundian_farm_setData");
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "soil",
                op: "orderDetail",
                order_id: n,
                uid: d
            },
            success: function(t) {
                var a = t.data, e = a.order, n = a.land, d = a.spec, c = a.icon, s = a.cycle_count, r = a.cycle, u = 0;
                d.setData && d.setData.open_land_pay && (u = d.setData.open_land_pay);
                var l = 30;
                d.setData && d.setData.land_opreation_time && (l = d.setData.land_opreation_time), 
                o.setData({
                    order: e,
                    land: n,
                    spec: d,
                    config: i,
                    icon: c,
                    cycle_count: s,
                    cycle: r,
                    open_land_pay: u,
                    countDownNum: l
                });
            }
        });
    },
    showVideo: function(t) {
        this.setData({
            showVideo: !this.data.showVideo
        });
    },
    showSeed: function(t) {
        var a = this.data, e = a.showSeed, o = a.order, n = [];
        if (!e) {
            var d = t.currentTarget.dataset.index;
            n = o.seed[d];
        }
        this.setData({
            showSeed: !e,
            currentSeed: n
        });
    },
    onShow: function() {
        this.setData({
            bottom: t.bottom
        });
    },
    toCycle: function() {
        var t = this.data.order;
        wx.navigateTo({
            url: "./cycle?order_id=" + t.id
        });
    },
    toStatus: function(t) {
        var a = t.currentTarget.dataset.plantid;
        wx.navigateTo({
            url: "./state?plant_id=" + a
        });
    },
    controlDevice: function(t) {
        var a = this.data.open_land_pay, e = t.detail.formId, o = t.currentTarget.dataset, n = o.opreatype, d = o.typeindex;
        1 == a ? this.payRequest(d, e) : this.requestDid(n, e), this.setData({
            opreatype: n
        });
    },
    countDown: function(t, a) {
        var e = this, o = e.data.countDownNum;
        e.setData({
            isLoading: !0,
            countDownNum: o
        }), e.setData({
            timer: setInterval(function() {
                o--, e.setData({
                    countDownNum: o
                }), 0 == o && (clearInterval(e.data.timer), e.setData({
                    isLoading: !1,
                    countDownNum: e.data.spec.setData.land_opreation_time
                }), e.closeDevice(t, a));
            }, 1e3)
        });
    },
    closeDevice: function(e, o) {
        var n = this, d = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "closeNewDid",
                control: "control",
                web_did: e,
                close_type: o,
                uniacid: a,
                uid: d
            },
            success: function(t) {
                console.log(t), wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                }), n.setData({
                    close_type: 0
                });
            }
        });
    },
    payRequest: function(e, o) {
        var n = this.data, d = n.order, i = (n.open_land_pay, n.land), c = n.spec, s = wx.getStorageSync("uid_" + a), r = {
            op: "operationNewLand",
            control: "control",
            uniacid: a,
            uid: s,
            order_id: d.id,
            opera_type: e,
            land_name: i.land_name + c.land_num,
            did: c.did
        };
        t.util.request({
            url: "entry/wxapp/class",
            data: r,
            success: function(e) {
                if (-1 == e.data.code) return wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                }), !1;
                var o = e.data.order_id;
                t.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        control: "control",
                        order_id: o,
                        uniacid: a,
                        op: "getOperationPayOrder"
                    },
                    cachetime: "0",
                    success: function(e) {
                        if (e.data && e.data.data && !e.data.errno) {
                            var n = e.data.data.package;
                            wx.requestPayment({
                                timeStamp: e.data.data.timeStamp,
                                nonceStr: e.data.data.nonceStr,
                                package: e.data.data.package,
                                signType: "MD5",
                                paySign: e.data.data.paySign,
                                success: function(e) {
                                    wx.hideLoading(), t.util.request({
                                        url: "entry/wxapp/class",
                                        data: {
                                            op: "operation_notify",
                                            control: "control",
                                            order_id: o,
                                            uniacid: a,
                                            prepay_id: n
                                        },
                                        success: function(t) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "支付成功,请等待管理员进行相关操作",
                                                showCancel: "false"
                                            });
                                        }
                                    });
                                },
                                fail: function(t) {
                                    wx.showModal({
                                        title: "系统提示",
                                        content: "您取消了支付",
                                        showCancel: !1,
                                        success: function(t) {}
                                    });
                                }
                            });
                        }
                    },
                    fail: function(t) {
                        if ("JSAPI支付必须传openid" == t.data.message) return wx.navigateTo({
                            url: "/kundian_farm/pages/login/index"
                        }), !1;
                        wx.showModal({
                            title: "系统提示",
                            content: t.data.message ? t.data.message : "错误",
                            showCancel: !1,
                            success: function(t) {}
                        });
                    }
                });
            }
        });
    },
    requestDid: function(e, o) {
        var n = this, d = n.data, i = (d.order, d.open_land_pay, d.land, d.spec), c = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "controlDevice",
                control: "control",
                uniacid: a,
                uid: c,
                did: i.did,
                formId: o,
                operatype: e
            },
            success: function(t) {
                1 == t.data.code ? (n.setData({
                    close_type: e
                }), n.countDown(i.did, e)) : wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    onUnload: function(t) {
        var a = this.data, e = a.opreatype, o = a.spec;
        1 != e && 2 != e && 3 != e && 4 != e || (this.closeDevice(o.did, e), clearInterval(this.data.timer));
    }
});
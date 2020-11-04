var e = new getApp(), a = e.siteInfo.uniacid;

Page({
    data: {
        borderImg: "../../../images/icon/address-line.png",
        buyList: [],
        adoptData: [],
        specItem: [],
        address: "",
        phone: "",
        userName: "",
        adopt_id: "",
        farmSetData: [],
        order_id: 0,
        recovery_method: 1,
        remark: ""
    },
    onLoad: function(t) {
        var i = this, n = t.adopt_id, o = wx.getStorageSync("kundian_farm_setData"), r = 1;
        2 == o.recovery_method && (r = 2), i.setData({
            farmSetData: o,
            recovery_method: r,
            adopt_id: n
        }), i.getInit(n), e.util.setNavColor(a);
    },
    getInit: function(t) {
        var i = this, n = wx.getStorageSync("uid_" + a);
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "getSureOrder",
                uniacid: a,
                adopt_id: t,
                uid: n
            },
            success: function(e) {
                var a = e.data, t = a.address, n = a.adoptData, o = "";
                t && (o = t.region + " " + t.address), i.setData({
                    adoptData: n,
                    userName: t.name,
                    phone: t.phone,
                    address: o
                });
            }
        });
    },
    selAddress: function(e) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    changeRecoveryMethod: function(e) {
        var a = e.currentTarget.dataset.state, t = this.data, i = t.totalPrice, n = t.send_price, o = t.copyTotalPrice;
        i = 2 == a ? parseFloat(i - n).toFixed(2) : o, this.setData({
            recovery_method: a,
            totalPrice: i
        });
    },
    getRemark: function(e) {
        this.setData({
            remark: e.detail.value
        });
    },
    nowPay: function(a) {
        var t = this, i = wx.getStorageSync("uid_" + n), n = e.siteInfo.uniacid, o = t.data, r = o.userName, d = o.address, s = o.phone, c = o.adopt_id, l = o.recovery_method, u = o.remark, p = o.farmSetData;
        if (1 == l && ("" == d || "" == r || "" == s)) return wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        }), !1;
        if (2 != l || (r = a.detail.value.name, s = a.detail.value.phone, "" != r && "" != s)) {
            var m = {
                control: "animal",
                op: "addOrder",
                address: d,
                name: r,
                phone: s,
                uniacid: n,
                adopt_id: c,
                uid: i,
                recovery_method: l,
                remark: u,
                total_price: t.data.farmSetData.animal_send_price,
                self_address: p.self_lifting_address
            }, f = t.data.order_id;
            f ? 2 == l ? wx.redirectTo({
                url: "../../shop/orderList/index"
            }) : t.payRequest(f) : e.util.request({
                url: "entry/wxapp/class",
                data: m,
                success: function(e) {
                    var a = e.data.order_id;
                    t.setData({
                        order_id: a
                    }), 2 == l ? wx.redirectTo({
                        url: "../../shop/orderList/index"
                    }) : t.payRequest(a);
                }
            });
        } else wx.showToast({
            title: "请填写收获信息",
            icon: "none"
        });
    },
    payRequest: function(t) {
        this.data.farmSetData.animal_send_price > 0 ? e.util.request({
            url: "entry/wxapp/pay",
            data: {
                file: "animal",
                orderid: t,
                uniacid: a,
                op: "getAnimalSendOrder"
            },
            cachetime: "0",
            success: function(i) {
                if (i.data && i.data.data && !i.data.errno) {
                    var n = i.data.data.package;
                    wx.requestPayment({
                        timeStamp: i.data.data.timeStamp,
                        nonceStr: i.data.data.nonceStr,
                        package: i.data.data.package,
                        signType: "MD5",
                        paySign: i.data.data.paySign,
                        success: function(i) {
                            wx.showLoading({
                                title: "玩命加载中..."
                            }), e.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    control: "animal",
                                    op: "notify_send",
                                    order_id: t,
                                    uniacid: a,
                                    prepay_id: n
                                },
                                success: function(e) {
                                    wx.hideLoading(), wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function() {
                                            wx.redirectTo({
                                                url: "../../shop/orderList/index"
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        fail: function(e) {
                            wx.showModal({
                                title: "系统提示",
                                content: "您取消了支付!",
                                showCancel: !1,
                                success: function(e) {
                                    e.confirm && is_jump && wx.redirectTo({
                                        url: "../../shop/orderList/index"
                                    });
                                }
                            });
                        }
                    });
                } else console.log("fail1");
            },
            fail: function(e) {
                "JSAPI支付必须传openid" == e.data.message ? wx.navigateTo({
                    url: "/kundian_farm/pages/login/index"
                }) : wx.showModal({
                    title: "系统提示",
                    content: e.data.message ? e.data.message : "错误",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm;
                    }
                });
            }
        }) : (wx.showLoading({
            title: "正在下单..."
        }), e.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "notify_send",
                order_id: t,
                uniacid: a
            },
            success: function(e) {
                wx.hideLoading(), wx.showModal({
                    title: "提示",
                    content: "下单成功",
                    showCancel: !1,
                    success: function() {
                        wx.redirectTo({
                            url: "../../shop/orderList/index"
                        });
                    }
                });
            }
        }));
    },
    gotoMerchant: function() {
        var e = this.data.farmSetData;
        wx.openLocation({
            latitude: parseFloat(e.self_lifting_place.lat),
            longitude: parseFloat(e.self_lifting_place.lng),
            name: e.self_lifting_address
        });
    },
    onShow: function(e) {
        var t = wx.getStorageSync("uid_" + a), i = wx.getStorageSync("selectAdd_" + t);
        i && (this.setData({
            userName: i.name,
            phone: i.phone,
            address: i.region + " " + i.address
        }), wx.removeStorageSync("selectAdd_" + t));
    }
});
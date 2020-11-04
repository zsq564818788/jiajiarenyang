var e = new getApp(), a = e.siteInfo.uniacid;

Page({
    data: {
        borderImg: "../../../../images/icon/address-line.png",
        address: "",
        phone: "",
        userName: "",
        goodsData: [],
        specItem: [],
        specVal: [],
        default: !1,
        count: "",
        totalPrice: [],
        cartData: [],
        is_buy_type: 1,
        goods_id: "",
        cart_id: "",
        spec_id: "",
        send_price: 0,
        farmSetData: []
    },
    onLoad: function(t) {
        var s = t.goodsid;
        if (t.spec_id) d = t.spec_id; else var d = 0;
        t.cart_id;
        var i = t.count, o = wx.getStorageSync("uid_" + a), r = this;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "integral",
                op: "getSureGoods",
                uniacid: a,
                goods_id: s,
                spec_id: d,
                count: i,
                uid: o
            },
            success: function(e) {
                var a = e.data, t = a.specVal, o = a.specItem, n = a.goodsData, c = a.totalPrice, u = a.send_price, l = a.address;
                t || (t = []);
                var p = "";
                l && (p = l.region + " " + l.address), r.setData({
                    specItem: o,
                    goodsData: n,
                    count: i,
                    specVal: t,
                    totalPrice: c,
                    goods_id: s,
                    spec_id: d,
                    send_price: u,
                    address: p,
                    userName: l.name || "",
                    phone: l.phone || ""
                });
            }
        }), e.util.setNavColor(a), r.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    chooseAddress: function(e) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    onShow: function(e) {
        var t = wx.getStorageSync("uid_" + a), s = wx.getStorageSync("selectAdd_" + t);
        s && (this.setData({
            address: s.region + " " + s.address,
            userName: s.name,
            phone: s.phone
        }), wx.removeStorageSync("selectAdd_" + t));
    },
    formSubmit: function(t) {
        var s = this.data, d = s.userName, i = s.address, o = s.phone, r = (s.is_buy_type, 
        s.remark), n = s.goods_id, c = s.count, u = s.spec_id, l = s.send_price, p = wx.getStorageSync("uid_" + a);
        if ("" != i && "" != o && "" != d) {
            var g = {
                control: "integral",
                op: "addOrder",
                address: i,
                name: d,
                phone: o,
                uniacid: a,
                goods_id: n,
                count: c,
                uid: p,
                remark: r,
                is_buy_type: 1,
                spec_id: u
            };
            e.util.request({
                url: "entry/wxapp/class",
                data: g,
                success: function(t) {
                    if (1 == t.data.code) {
                        var s = t.data.order_id;
                        "" == l || 0 == l ? (wx.showLoading({
                            title: "加载中..."
                        }), e.util.request({
                            url: "entry/wxapp/class",
                            data: {
                                control: "integral",
                                op: "sendMsg",
                                order_id: s,
                                uniacid: a,
                                uid: p
                            },
                            success: function(e) {
                                0 == e.data.code && wx.showModal({
                                    title: "提示",
                                    content: "兑换成功",
                                    showCancel: !1,
                                    success: function() {
                                        wx.redirectTo({
                                            url: "../orderList/index"
                                        });
                                    }
                                }), wx.hideLoading();
                            }
                        })) : e.util.request({
                            url: "entry/wxapp/pay",
                            data: {
                                op: "getIntegralPayOrder",
                                orderid: s,
                                uniacid: a,
                                file: "integral"
                            },
                            cachetime: "0",
                            success: function(t) {
                                if (t.data && t.data.data && !t.data.errno) {
                                    var d = t.data.data.package;
                                    wx.requestPayment({
                                        timeStamp: t.data.data.timeStamp,
                                        nonceStr: t.data.data.nonceStr,
                                        package: t.data.data.package,
                                        signType: "MD5",
                                        paySign: t.data.data.paySign,
                                        success: function(t) {
                                            wx.showLoading({
                                                title: "加载中"
                                            }), e.util.request({
                                                url: "entry/wxapp/class",
                                                data: {
                                                    control: "integral",
                                                    op: "sendMsg",
                                                    order_id: s,
                                                    uniacid: a,
                                                    prepay_id: d,
                                                    uid: p
                                                },
                                                success: function(e) {
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
                                        fail: function(e) {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            });
                                        }
                                    });
                                } else wx.redirectTo({
                                    url: "../orderList/index"
                                });
                            },
                            fail: function(e) {
                                wx.showModal({
                                    title: "系统提示",
                                    content: e.data.message ? e.data.message : "错误",
                                    showCancel: !1,
                                    success: function(e) {
                                        e.confirm && wx.redirectTo({
                                            url: "../orderList/index"
                                        });
                                    }
                                });
                            }
                        });
                    } else 2 == t.data.code ? wx.showToast({
                        title: "兑换失败"
                    }) : 3 == t.data.code ? wx.showToast({
                        title: "积分不足"
                    }) : 4 == t.data.code && wx.showToast({
                        title: "积分支付失败"
                    });
                }
            });
        } else wx.showToast({
            title: "请选择收货地址!"
        });
    }
});
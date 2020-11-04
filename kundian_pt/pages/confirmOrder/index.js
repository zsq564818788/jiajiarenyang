var e = new getApp(), t = e.siteInfo.uniacid, a = e.util.getNewUrl("entry/wxapp/pt", "kundian_farm_plugin_pt");

Page({
    data: {
        selectNum: 1,
        address: {
            address: "",
            name: "",
            phone: ""
        },
        buy_types: 2,
        totalPrice: 0,
        send_price: 0,
        selectSpec: [],
        total_price: 0,
        relation_id: 0,
        countDownNum: 0,
        farmSetData: [],
        pay_text: "立即支付",
        discount: 0
    },
    onLoad: function(e) {
        var s = this, d = e.goods_id, i = e.selectNum, r = e.selectSpec, o = e.buy_types, n = e.selected, c = e.relation_id, u = wx.getStorageSync("kundian_farm_setData"), p = wx.getStorageSync("uid_" + t);
        wx.request({
            url: a,
            data: {
                op: "getSurePtOrder",
                action: "index",
                goods_id: d,
                selectNum: i,
                selectSpec: r,
                buy_types: o,
                uniacid: t,
                uid: p
            },
            success: function(e) {
                "undefined" != r ? r = JSON.parse(r) : n = [];
                var t = e.data, a = t.address, p = (t.goods, t.totalPrice), l = t.total_price, _ = t.send_price, g = t.discount, m = "";
                a && (m = {
                    address: a.region + " " + a.address,
                    name: a.name,
                    phone: a.phone
                }), s.setData({
                    goods_id: d,
                    goods: e.data.goods,
                    selectNum: i,
                    selectSpec: r,
                    buy_types: o,
                    selected: n,
                    totalPrice: p,
                    total_price: l,
                    send_price: _,
                    relation_id: c,
                    farmSetData: u,
                    address: m,
                    discount: g
                });
            }
        });
    },
    chooseAddress: function(e) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    onShow: function(e) {
        var a = wx.getStorageSync("uid_" + t), s = wx.getStorageSync("selectAdd_" + a);
        if (s) {
            this.data.address;
            var d = {
                address: s.region + " " + s.address,
                name: s.name,
                phone: s.phone
            };
            this.setData({
                address: d
            }), wx.removeStorageSync("selectAdd_" + a);
        }
        this.setData({
            pay_text: "立即支付"
        });
    },
    add: function() {
        var e = this.data, t = e.selectNum, a = e.selectSpec, s = e.send_price, d = (e.totalPrice, 
        e.buy_types), i = e.goods;
        t = parseInt(t) + 1;
        var r = 0;
        r = a ? 2 == d ? a.pt_price * t + parseFloat(s) : a.price * t + parseFloat(s) : i.price * t + parseFloat(s), 
        this.setData({
            selectNum: t,
            total_price: r.toFixed(2)
        });
    },
    reduce: function() {
        var e = this.data, t = e.selectNum, a = e.selectSpec, s = e.send_price, d = (e.totalPrice, 
        e.buy_types), i = e.goods;
        if (!(t <= 1)) {
            t = parseInt(t) - 1;
            var r = 0;
            r = a ? 2 == d ? a.pt_price * t + parseFloat(s) : a.price * t + parseFloat(s) : i.price * t + parseFloat(s), 
            this.setData({
                selectNum: t,
                total_price: r.toFixed(2)
            });
        }
    },
    addPtOrder: function(s) {
        var d = this.data, i = d.goods_id, r = (d.goods, d.selectSpec), o = d.buy_types, n = d.selectNum, c = d.address, u = d.send_price, p = d.total_price, l = d.relation_id, _ = d.selected, g = d.discount, m = wx.getStorageSync("uid_" + t);
        if (!c.address) return wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        }), !1;
        this.setData({
            pay_text: "正在下单"
        }), wx.request({
            url: a,
            data: {
                action: "index",
                op: "addPtOrder",
                goods_id: i,
                selectSpec: r,
                buy_types: o,
                selectNum: n,
                address: c,
                uniacid: t,
                uid: m,
                total_price: p,
                send_price: u,
                form_id: s.detail.formId,
                relation_id: l,
                sku_name: _,
                discount: g
            },
            success: function(s) {
                if (s.data.order_id) {
                    var d = s.data.order_id, i = e.util.getNewUrl("entry/wxapp/pay", "kundian_farm_plugin_pt");
                    wx.request({
                        url: i,
                        data: {
                            orderid: d,
                            uniacid: t
                        },
                        cachetime: "0",
                        success: function(e) {
                            if (e.data && e.data.data && !e.data.errno) {
                                var s = e.data.data.package;
                                wx.requestPayment({
                                    timeStamp: e.data.data.timeStamp,
                                    nonceStr: e.data.data.nonceStr,
                                    package: e.data.data.package,
                                    signType: "MD5",
                                    paySign: e.data.data.paySign,
                                    success: function(e) {
                                        wx.showLoading({
                                            title: "加载中"
                                        }), wx.request({
                                            url: a,
                                            data: {
                                                action: "index",
                                                op: "sendMsg",
                                                order_id: d,
                                                uniacid: t,
                                                prepay_id: s
                                            },
                                            success: function() {
                                                wx.showModal({
                                                    title: "提示",
                                                    content: "支付成功",
                                                    showCancel: !1,
                                                    success: function() {
                                                        wx.redirectTo({
                                                            url: "../orderDetail/index?order_id=" + d
                                                        });
                                                    }
                                                }), wx.hideLoading();
                                            }
                                        });
                                    },
                                    fail: function(e) {
                                        wx.showModal({
                                            title: "提示",
                                            content: "您取消了支付",
                                            showCancel: !1,
                                            success: function() {
                                                wx.redirectTo({
                                                    url: "../orderDetail/index?order_id=" + d
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        },
                        fail: function(e) {
                            "JSAPI支付必须传openid" == e.data.message ? wx.navigateTo({
                                url: "/kundian_farm/pages/login/index"
                            }) : wx.showModal({
                                title: "系统提示",
                                content: e.data.message ? e.data.message : "错误",
                                showCancel: !1,
                                success: function(e) {
                                    e.confirm && that.setData({
                                        pay_text: "立即支付"
                                    });
                                }
                            });
                        }
                    });
                } else wx.showToast({
                    title: s.data.msg
                });
            }
        });
    }
});
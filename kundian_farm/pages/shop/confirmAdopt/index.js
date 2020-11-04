var a = require("../../../../wxParse/wxParse.js"), t = new getApp(), e = t.siteInfo.uniacid;

wx.getStorageSync("uid_" + e);

Page({
    data: {
        bgColor: t.bgColor,
        assistColor: t.assistColor,
        specVal: [],
        sku_name: "",
        count: 0,
        aid: "",
        animalData: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        couponCount: 0,
        userCoupon: [],
        userName: "",
        userTel: "",
        state: !1,
        rules: !0,
        order_id: 0,
        iscostShow: !0,
        pay_text: "立即下单",
        discount: 0
    },
    onLoad: function(o) {
        var n = 0, i = t.bgColor, s = t.assistColor;
        t.globalData.sysData.model.indexOf("iPhone X") > -1 && (n = 68);
        var r = 0, u = wx.getStorageSync("kundian_farm_buy_animal"), c = o.aid, d = o.count;
        r = d * u.price, this.setData({
            count: d,
            aid: c,
            animalData: u,
            bottom: n,
            bgColor: i,
            assistColor: s
        });
        var l = this, p = wx.getStorageSync("uid_" + e);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getUseCouponCount",
                uid: p,
                uniacid: e,
                type: 3,
                totalprice: r,
                aid: c
            },
            success: function(t) {
                var e = t.data, o = e.couponCount, n = e.user, i = e.discount, s = e.total_price;
                l.setData({
                    couponCount: o,
                    userName: n.truename,
                    userTel: n.phone,
                    discount: i,
                    totalPrice: s
                });
                var r = wx.getStorageSync("kundian_farm_setData");
                r && a.wxParse("article", "html", r.animal_rule, l, 5);
            }
        }), wx.removeStorageSync("kundian_farm_buy_animal");
    },
    useCoupon: function(a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=3&totalPrice=" + t
        });
    },
    onShow: function() {
        var a = this.data.totalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var o = wx.getStorageSync("user_coupon");
            return wx.removeStorageSync("user_coupon"), void this.setData({
                userCoupon: o,
                totalPrice: parseFloat(a - o.coupon.coupon_price).toFixed(2)
            });
        }
        this.setData({
            userCoupon: [],
            totalPrice: a
        });
        var n = this, i = wx.getStorageSync("uid_" + e);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getUserBindPhone",
                uid: i,
                uniacid: e
            },
            success: function(a) {
                n.setData({
                    userName: a.data.userInfo.truename,
                    userTel: a.data.userInfo.phone
                });
            }
        }), this.setData({
            pay_text: "立即下单"
        });
    },
    surePay: function(a) {
        var o = this, n = o.data, i = n.userName, s = n.userTel, r = n.rules, u = n.count, c = n.aid, d = n.specVal, l = n.totalPrice, p = n.userCoupon, g = n.order_id, w = n.discount;
        if ("" != i && void 0 != i) if ("" != s && void 0 != s) {
            var x = 0, h = 0, m = wx.getStorageSync("uid_" + e);
            if ("" != p && (console.log(p), x = p.coupon.id, h = p.coupon.coupon_price), !r) return wx.showModal({
                title: "提示",
                content: "请先阅读并同意农场协议",
                showCancel: !1
            }), !1;
            this.setData({
                pay_text: "正在下单"
            }), t.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "animal",
                    op: "sureAdoptAnimal",
                    uid: m,
                    uniacid: e,
                    count: u,
                    spec_id: d.id,
                    aid: c,
                    coupon_id: x,
                    coupon_price: h,
                    username: i,
                    phone: s,
                    totalPrice: l,
                    order_id: g,
                    discount: w
                },
                success: function(a) {
                    if (0 == a.data.code) {
                        var n = a.data.order_id;
                        o.setData({
                            order_id: n
                        }), t.util.request({
                            url: "entry/wxapp/pay",
                            data: {
                                op: "getAnimalPayOrder",
                                orderid: n,
                                uniacid: e,
                                file: "animal"
                            },
                            cachetime: "0",
                            success: function(a) {
                                if (a.data && a.data.data && !a.data.errno) {
                                    var i = a.data.data.package;
                                    wx.requestPayment({
                                        timeStamp: a.data.data.timeStamp,
                                        nonceStr: a.data.data.nonceStr,
                                        package: a.data.data.package,
                                        signType: "MD5",
                                        paySign: a.data.data.paySign,
                                        success: function(a) {
                                            wx.showLoading({
                                                title: "加载中"
                                            }), t.util.request({
                                                url: "entry/wxapp/class",
                                                data: {
                                                    control: "animal",
                                                    op: "sendMsg",
                                                    order_id: n,
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
                                                                url: "../../user/Animal/index?current=2"
                                                            });
                                                        }
                                                    }), wx.hideLoading();
                                                }
                                            });
                                        },
                                        fail: function(a) {
                                            wx.showModal({
                                                title: "系统提示",
                                                content: "您取消了支付!",
                                                showCancel: !1,
                                                success: function(a) {
                                                    a.confirm && o.setData({
                                                        pay_text: "立即下单"
                                                    });
                                                }
                                            }), wx.hideLoading();
                                        }
                                    });
                                } else console.log("fail1"), o.setData({
                                    pay_text: "立即下单"
                                });
                            },
                            fail: function(a) {
                                "JSAPI支付必须传openid" == a.data.message ? wx.navigateTo({
                                    url: "/kundian_farm/pages/login/index"
                                }) : wx.showModal({
                                    title: "系统提示",
                                    content: a.data.message ? a.data.message : "错误",
                                    showCancel: !1,
                                    success: function(a) {
                                        a.confirm && o.setData({
                                            pay_text: "立即下单"
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        } else wx.showToast({
            title: "请填写联系电话"
        }); else wx.showToast({
            title: "请填写姓名！"
        });
    },
    inputUserName: function(a) {
        var t = a.detail.value;
        this.setData({
            userName: t
        });
    },
    changeRules: function() {
        var a = this.data.rules;
        this.setData({
            rules: !a
        });
    },
    animalRule: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/common/agreement/index?type=2"
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    changePhone: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/phone/index"
        });
    },
    costxq: function(a) {
        this.setData({
            iscostShow: !this.data.iscostShow
        });
    }
});
require("../../../../wxParse/wxParse.js");

var e = new getApp(), a = e.siteInfo.uniacid;

Page({
    data: {
        bgColor: e.bgColor,
        assistColor: e.assistColor,
        bottom: e.bottom,
        userName: "",
        userTel: "",
        state: !1,
        rules: !0,
        totalPrice: 0,
        copyTotalPrice: 0,
        lands: [],
        landLimit: [],
        landLimitArr: [],
        couponCount: 0,
        userCoupon: [],
        selectLand: [],
        land: [],
        day: [],
        alias_day: [],
        currentIndex: 0,
        icon: [],
        order_id: 0,
        is_load: !1,
        is_renew: 1,
        land_id: "",
        iscostShow: !0,
        address: {},
        pay_text: "立即支付",
        discount: 0,
        discount_price: 0
    },
    onLoad: function(t) {
        var o = this, s = wx.getStorageSync("uid_" + a), n = wx.getStorageSync("selectSpec"), i = t.land_id;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "soil",
                op: "surePay",
                land_id: i,
                spec_id: n[0].id,
                uid: s
            },
            success: function(e) {
                var a = e.data, t = a.land, s = a.cycle, r = a.couponCount, c = a.icon, d = a.user, u = a.address, l = a.discount;
                o.setData({
                    land: t,
                    cycle: s,
                    couponCount: r,
                    icon: c,
                    userName: d.truename,
                    userTel: d.phone,
                    selectLand: n,
                    copyTotalPrice: n[0].cost,
                    land_id: i,
                    address: u,
                    discount: l
                }), o.checkUserDiscount(n[0].cost), wx.hideLoading();
            }
        }), e.util.setNavColor(), wx.removeStorageSync("selectSpec");
    },
    checkUserDiscount: function(e) {
        var a = this.data.discount, t = e;
        (a = parseFloat(a)) > 0 && a < 10 && parseFloat(e) >= .1 && (t = parseFloat(e * (a / 10)).toFixed(2)), 
        this.setData({
            totalPrice: t,
            discount_price: parseFloat(e - t).toFixed(2)
        });
    },
    changeCycle: function(e) {
        this.setData({
            currentIndex: e.detail.value
        });
    },
    selectAdd: function(e) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    selectSeed: function() {
        var e = this.data, a = e.selectLand, t = e.land_id;
        wx.navigateTo({
            url: "./seed?land_id=" + t + "&area=" + a[0].area
        });
    },
    payFor: function(t) {
        var o = this, s = o.data, n = s.land, i = s.userName, r = s.userTel, c = s.cycle, d = s.currentIndex, u = s.totalPrice, l = s.rules, p = s.userCoupon, g = s.land_id, w = s.selectLand, x = s.address, h = s.discount_price, f = wx.getStorageSync("uid_" + a);
        if (x.address) if ("" != i && void 0 != i) if ("" != r && void 0 != r) if (l) {
            var _ = 0, y = 0;
            if ("" != p && (_ = p.coupon.id, y = p.coupon.coupon_price), 0 == f || "" == f) return wx.navigateTo({
                url: "/kundian_farm/pages/login/index"
            }), !1;
            var S = "/kundian_farm/pages/land/order/index";
            if (wx.getStorageSync("enter_is_play") && (S = "/kundian_game/pages/farm/index"), 
            1 == n.sow_status) {
                m = {
                    control: "soil",
                    op: "payFor",
                    uid: f,
                    username: i,
                    phone: r,
                    day: c.day[d],
                    totalPrice: u,
                    coupon_id: _,
                    coupon_price: y,
                    land_id: g,
                    spec_id: w[0].id,
                    address: JSON.stringify(x),
                    discount: h
                };
                S += "?navbar=3";
            } else {
                S += "?navbar=2";
                var v = o.data.selectSeed;
                if (void 0 == v || !v) return void wx.showToast({
                    title: "请先选择种子!",
                    icon: "none"
                });
                var m = {
                    control: "soil",
                    op: "payFor",
                    uid: f,
                    username: i,
                    phone: r,
                    day: c.day[d],
                    totalPrice: u,
                    coupon_id: _,
                    coupon_price: y,
                    land_id: g,
                    spec_id: w[0].id,
                    address: JSON.stringify(x),
                    selectSeed: JSON.stringify(v),
                    discount: h
                };
            }
            o.setData({
                pay_text: "正在下单"
            }), e.util.request({
                url: "entry/wxapp/class",
                data: m,
                method: "POST",
                success: function(t) {
                    if (-1 == t.data.code) return wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1
                    }), !1;
                    var o = t.data.order_id, s = {
                        op: "soilPay",
                        control: "soil",
                        orderid: o,
                        uniacid: a
                    };
                    e.util.request({
                        url: "entry/wxapp/pay",
                        data: s,
                        cachetime: "0",
                        success: function(a) {
                            if (a.data && a.data.data && !a.data.errno) {
                                var t = a.data.data.package;
                                wx.requestPayment({
                                    timeStamp: a.data.data.timeStamp,
                                    nonceStr: a.data.data.nonceStr,
                                    package: a.data.data.package,
                                    signType: "MD5",
                                    paySign: a.data.data.paySign,
                                    success: function(a) {
                                        wx.showLoading({
                                            title: "加载中"
                                        }), e.util.request({
                                            url: "entry/wxapp/class",
                                            data: {
                                                op: "sendMsg",
                                                control: "soil",
                                                order_id: o,
                                                prepay_id: t
                                            },
                                            success: function() {
                                                wx.showModal({
                                                    title: "提示",
                                                    content: "支付成功",
                                                    showCancel: !1,
                                                    success: function() {
                                                        wx.redirectTo({
                                                            url: S
                                                        });
                                                    }
                                                }), wx.hideLoading();
                                            }
                                        });
                                    },
                                    fail: function(e) {
                                        wx.showModal({
                                            title: "系统提示",
                                            content: "您取消了支付!",
                                            showCancel: !1,
                                            success: function(e) {
                                                wx.redirectTo({
                                                    url: "/kundian_farm/pages/land/order/index"
                                                });
                                            }
                                        }), wx.hideLoading();
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
                    });
                }
            });
        } else wx.showToast({
            title: "请先阅读并同意农场协议",
            icon: "none"
        }); else wx.showToast({
            title: "请填写联系电话",
            icon: "none"
        }); else wx.showToast({
            title: "请填写姓名",
            icon: "none"
        }); else wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        });
    },
    preventTouchMove: function() {},
    farmRule: function(e) {
        wx.navigateTo({
            url: "/kundian_farm/pages/common/agreement/index?type=1"
        });
    },
    inputUserName: function(e) {
        var a = e.detail.value;
        this.setData({
            userName: a
        });
    },
    inputUserTel: function(e) {
        var a = e.detail.value;
        this.setData({
            userTel: a
        });
    },
    changeRules: function() {
        var e = this.data.rules;
        this.setData({
            rules: !e
        });
    },
    selectCoupon: function(e) {
        var a = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=4&totalPrice=" + a
        });
    },
    onShow: function(t) {
        var o = this;
        this.setData({
            bgColor: e.bgColor,
            assistColor: e.assistColor
        });
        var s = wx.getStorageSync("uid_" + a), n = wx.getStorageSync("selectAdd_" + s);
        if (n) {
            var i = {
                name: n.name,
                phone: n.phone,
                address: n.region + " " + n.address
            };
            this.setData({
                address: i
            }), wx.removeStorageSync("selectAdd_" + s);
        }
        var r = this.data, c = r.totalPrice, d = (r.selectLand, r.copyTotalPrice), u = wx.getStorageSync("selectSeed");
        if (u || (u = this.data.selectSeed), u) {
            var l = 0;
            u.map(function(e) {
                l = parseFloat(l) + parseFloat(e.price * e.selectCount);
            }), c = (parseFloat(l) + parseFloat(d)).toFixed(2), this.setData({
                selectSeed: u,
                seedPrice: l.toFixed(2)
            }), wx.removeStorageSync("selectSeed");
        }
        this.checkUserDiscount(c);
        var p = this.data.totalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var g = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), parseFloat(p) > parseFloat(g.coupon.coupon_price) ? (c = parseFloat(p - g.coupon.coupon_price).toFixed(2), 
            this.setData({
                userCoupon: g,
                totalPrice: c
            })) : wx.showToast({
                title: "当前选择优惠券不可用!",
                icon: "none"
            });
        } else this.setData({
            userCoupon: []
        });
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getUserBindPhone"
            },
            success: function(e) {
                e.data.userInfo && o.setData({
                    userTel: e.data.userInfo.phone
                });
            }
        });
    },
    changePhone: function(e) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/phone/index"
        });
    },
    costxq: function(e) {
        this.setData({
            iscostShow: !this.data.iscostShow
        });
    }
});
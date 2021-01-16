var e = new getApp(), a = e.siteInfo.uniacid;

Page({
    data: {
        bgColor: e.bgColor,
        address: "",
        phone: "",
        userName: "",
        goodsData: [],
        count: "",
        totalPrice: [],
        copyTotalPrice: 0,
        cartData: [],
        is_buy_type: 1,
        goods_id: "",
        cart_id: "",
        spec_id: "",
        send_price: 0,
        couponCount: 0,
        userCoupon: [],
        order_id: 0,
        isIphoneX: e.globalData.isIphoneX,
        recovery_method: [],
        config: [],
        pay_text: "立即下单",
        discount: 0
    },
    onLoad: function(t) {
        console.log(this)
        var o = this, s = e.bgColor, i = t.goodsid, r = t.spec_id, d = t.cart_id, n = t.count, c = wx.getStorageSync("uid_" + a), u = wx.getStorageSync("kundian_farm_setData"), p = 1;
        2 == u.recovery_method && (p = 2), o.setData({
            recovery_method: p,
            bgColor: s,
            config: u
        }), i && (e.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSureGoods",
                control: "shop",
                uniacid: a,
                goods_id: i,
                spec_id: r,
                count: n,
                uid: c
            },
            success: function(e) {
                var a = e.data, t = a.goodsData, s = a.totalPrice, d = a.send_price, c = a.couponCount, u = a.address, l = a.discount;
                2 == p && (s = parseFloat(s - e.data.send_price).toFixed(2));
                var _ = "";
                u && (_ = u.region + " " + u.address), o.setData({
                    count: n,
                    totalPrice: s,
                    goods_id: i,
                    goodsData: t,
                    copyTotalPrice: e.data.totalPrice,
                    spec_id: r || "",
                    send_price: d,
                    couponCount: c,
                    address: _,
                    phone: u.phone || "",
                    userName: u.name || "",
                    discount: l
                });
            }
        }), e.util.setNavColor(a)), d && e.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "getBuyCartData",
                uniacid: a,
                uid: c,
                cart_id: d
            },
            success: function(e) {
                var a = e.data, t = a.address, s = a.cartData, i = a.totalPrice, r = a.send_price, n = a.couponCount, c = a.discount, u = "";
                t && (u = t.region + " " + t.address), o.setData({
                    cartData: s,
                    is_buy_type: 2,
                    totalPrice: i,
                    copyTotalPrice: i,
                    cart_id: d,
                    send_price: r,
                    couponCount: n,
                    address: u,
                    phone: t.phone || "",
                    userName: t.name || "",
                    discount: c
                });
            }
        });
    },
    chooseAddress: function(e) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    changeRecoveryMethod: function(e) {
        var a = e.currentTarget.dataset.state, t = this.data, o = t.totalPrice, s = t.send_price, i = t.copyTotalPrice;
        o = 2 == a ? parseFloat(o - s).toFixed(2) : i, this.setData({
            recovery_method: a,
            totalPrice: o
        });
    },
    addCount: function(e) {
        var a = this.data.goodsData, t = parseInt(this.data.count) + 1;
        if (1 == a.is_open_sku) o = parseFloat(this.data.goodsData.specVal.price * t) + parseFloat(this.data.send_price); else var o = parseFloat(a.price * t) + parseFloat(this.data.send_price);
        this.setData({
            count: t,
            totalPrice: o,
            copyTotalPrice: o
        });
    },
    reduceCount: function(e) {
        if (this.data.count > 1) {
            var a = this.data.goodsData, t = parseInt(this.data.count) - 1;
            if (1 == a.is_open_sku) o = parseFloat(this.data.goodsData.specVal.price * t) + parseFloat(this.data.send_price); else var o = parseFloat(a.price * t) + parseFloat(this.data.send_price);
            this.setData({
                count: t,
                totalPrice: o,
                copyTotalPrice: o
            });
        }
    },
    selectCoupon: function(e) {
        var a = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=1&totalPrice=" + a
        });
    },
    onShow: function(e) {
        var t = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var o = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: o,
                totalPrice: parseFloat(t - o.coupon.coupon_price).toFixed(2)
            });
        } else this.setData({
            userCoupon: [],
            totalPrice: t
        });
        var s = wx.getStorageSync("uid_" + a), i = wx.getStorageSync("selectAdd_" + s);
        i && (this.setData({
            userName: i.name,
            phone: i.phone,
            address: i.region + " " + i.address
        }), wx.removeStorageSync("selectAdd_" + s)), this.setData({
            pay_text: "立即下单"
        });
    },
    subOrder: function(t) {
        console.log(t)
        console.log(this)
        var o = this, s = wx.getStorageSync("uid_" + a), i = t.detail.value.remark, r = o.data, d = (r.order_id, 
        r.userName), n = r.address, c = r.phone, u = r.userCoupon, p = r.send_price, l = r.totalPrice, _ = r.recovery_method, g = r.is_buy_type, h = r.discount, f = 0, y = 0;
        if ("" != u && (f = u.coupon.id, y = u.coupon.coupon_price), 1 == _ && ("" == d || "" == n || "" == c)) return wx.showToast({
            title: "请选择收获地址",
            icon: "none"
        }), !1;
        if (2 != _ || (d = t.detail.value.userName, c = t.detail.value.phone, "" != d && "" != c)) {
            if (1 == g) var w = o.data, m = w.goods_id, x = w.count, v = w.spec_id, P = {
                control: "shop",
                op: "addOrder",
                address: n,
                name: d,
                phone: c,
                uniacid: a,
                goods_id: m,
                count: x,
                uid: s,
                remark: i,
                is_buy_type: 1,
                spec_id: v,
                coupon_id: f,
                coupon_price: y,
                send_price: p,
                totalPrice: l,
                recovery_method: _,
                formId: t.detail.formId,
                discount: h
            }; else var S = o.data.cart_id, P = {
                control: "shop",
                op: "addOrder",
                address: n,
                name: d,
                phone: c,
                uniacid: a,
                cart_id: S,
                uid: s,
                remark: i,
                is_buy_type: 2,
                coupon_id: f,
                coupon_price: y,
                send_price: p,
                totalPrice: l,
                recovery_method: _,
                formId: t.detail.formId,
                discount: h
            };
            console.log(P)
            this.setData({
                pay_text: "正在下单"
            }), e.util.request({
                url: "entry/wxapp/class",
                data: P,
                success: function(t) {
                    console.log(e)
                    console.log(t)
                    if (1 == t.data.code) {
                        var s = t.data.order_id;
                        o.setData({
                            order_id: s
                        }), e.util.request({
                            url: "entry/wxapp/pay",
                            data: {
                                op: "getShopPayOrder",
                                orderid: s,
                                uniacid: a,
                                file: "shop"
                            },
                            cachetime: "0",
                            success: function(t) {
                                if (t.data && t.data.data && !t.data.errno) {
                                    var o = t.data.data.package;
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
                                                    control: "shop",
                                                    order_id: s,
                                                    op: "sendMsg",
                                                    uniacid: a,
                                                    prepay_id: o
                                                },
                                                success: function() {
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
                                            wx.showModal({
                                                title: "系统提示",
                                                content: "您取消了支付!",
                                                showCancel: !1,
                                                success: function(e) {
                                                    e.confirm && wx.redirectTo({
                                                        url: "../orderList/index"
                                                    });
                                                }
                                            }), wx.hideLoading();
                                        }
                                    });
                                } else console.log("fail1");
                            },
                            fail: function(e) {
                                console.log(e)
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
                    } else wx.showModal({
                        title: "提示",
                        content: "订单生成失败！",
                        showCancel: !1
                    });
                }
            });
        } else wx.showToast({
            title: "请填写取货信息",
            icon: "none"
        });
    },
    gotoMerchant: function() {
        var e = this.data.config;
        wx.openLocation({
            latitude: parseFloat(e.self_lifting_place.lat),
            longitude: parseFloat(e.self_lifting_place.lng),
            name: e.self_lifting_address
        });
    }
});
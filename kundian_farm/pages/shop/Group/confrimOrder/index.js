var a = new getApp(), e = a.siteInfo.uniacid;

Page({
    data: {
        goodsData: [],
        specItem: [],
        aboutData: [],
        total_price: 0,
        copyTotalPrice: 0,
        count: 0,
        address: "",
        userName: "",
        phone: "",
        goods_id: "",
        spec_id: "",
        couponCount: 0,
        userCoupon: [],
        farmSetData: []
    },
    onLoad: function(t) {
        var o = this, s = t.goods_id;
        if (t.spec_id) var n = t.spec_id; else n = 0;
        var c = t.count, r = wx.getStorageSync("uid_" + e);
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getSureGoodsData",
                goods_id: s,
                spec_id: n,
                uniacid: e,
                count: c,
                uid: r
            },
            success: function(a) {
                var e = a.data, t = e.address, r = e.goodsData, d = e.aboutData, i = e.specItem, u = e.total_price, p = e.specVal, l = e.couponCount, g = "";
                t && (g = t.region + " " + t.address), o.setData({
                    goodsData: r,
                    specItem: i,
                    aboutData: d,
                    total_price: u,
                    copyTotalPrice: u,
                    count: c,
                    specVal: p,
                    goods_id: s,
                    spec_id: n,
                    couponCount: l,
                    address: g,
                    userName: t.name || "",
                    phone: t.phone || ""
                });
            }
        }), a.util.setNavColor(e), o.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    chooseAddress: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    formSubmit: function(t) {
        var o = wx.getStorageSync("uid_" + e), s = t.detail.value.remark, n = this.data, c = n.address, r = n.userName, d = n.phone, i = n.goods_id, u = n.spec_id, p = n.count, l = n.userCoupon, g = 0, _ = 0;
        if ("" != l && (g = l.coupon.id, _ = l.coupon.coupon_price), "" == c || "" == r || "" == d) wx.showToast({
            title: "请选择地址"
        }); else {
            var w = {
                control: "group",
                op: "addGroupOrder",
                uid: o,
                uniacid: e,
                address: c,
                phone: d,
                name: r,
                goods_id: i,
                spec_id: u,
                count: p,
                remark: s,
                coupon_id: g,
                coupon_price: _
            };
            a.util.request({
                url: "entry/wxapp/class",
                data: w,
                success: function(t) {
                    var o = t.data.order_id;
                    a.util.request({
                        url: "entry/wxapp/pay",
                        data: {
                            op: "getGroupPayOrder",
                            orderid: o,
                            uniacid: e,
                            file: "group"
                        },
                        cachetime: "0",
                        success: function(t) {
                            if (t.data && t.data.data && !t.data.errno) {
                                var s = t.data.data.package;
                                wx.requestPayment({
                                    timeStamp: t.data.data.timeStamp,
                                    nonceStr: t.data.data.nonceStr,
                                    package: t.data.data.package,
                                    signType: "MD5",
                                    paySign: t.data.data.paySign,
                                    success: function(t) {
                                        wx.showLoading({
                                            title: "玩命加载中"
                                        }), a.util.request({
                                            url: "entry/wxapp/class",
                                            data: {
                                                control: "group",
                                                order_id: o,
                                                op: "sendMsg",
                                                uniacid: e,
                                                prepay_id: s
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
                                    fail: function(a) {
                                        wx.showModal({
                                            title: "系统提示",
                                            content: "您取消了支付!",
                                            showCancel: !1,
                                            success: function(a) {
                                                a.confirm;
                                            }
                                        });
                                    }
                                });
                            } else console.log("fail1");
                        },
                        fail: function(a) {
                            "JSAPI支付必须传openid" == a.data.message ? wx.navigateTo({
                                url: "/kundian_farm/pages/login/index"
                            }) : wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm;
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    selectCoupon: function(a) {
        var e = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../../user/coupon/useCoupon/index?type=2&totalPrice=" + e
        });
    },
    onShow: function(a) {
        var t = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon");
        } else this.setData({
            userCoupon: [],
            total_price: t
        });
        var o = wx.getStorageSync("uid_" + e), s = wx.getStorageSync("selectAdd_" + o);
        s && (this.setData({
            address: s.region + " " + s.address,
            userName: s.name,
            phone: s.phone
        }), wx.removeStorageSync("selectAdd_" + o));
    }
});
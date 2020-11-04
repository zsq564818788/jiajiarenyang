var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        bgColor: t.bgColor,
        systemInfo: t.globalData.sysData,
        buyList: [],
        checkAll: !1,
        sumPrice: 0,
        cart_id: [],
        page: 1,
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1,
        height: 0,
        isContent: !0
    },
    onLoad: function(e) {
        var i = this, s = e.is_tarbar || !1, c = 0, n = t.globalData.sysData;
        c = s ? n.model.indexOf("iPhone X") > -1 ? 162 : 100 : n.model.indexOf("iPhone X") > -1 ? 62 : 0, 
        i.setData({
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: s,
            height: c
        }), i.getCartList(0, !1), t.util.setNavColor(a);
    },
    onShow: function() {
        this.getCartList(0, !1);
    },
    getCartList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = arguments[1], s = this, c = s.data.buyList;
        wx.getStorageSync("uid_" + a) ? (wx.showLoading({
            title: "玩命加载中..."
        }), t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "cartList",
                page: e
            },
            success: function(t) {
                wx.hideLoading();
                var a = t.data.cartData;
                if (i && a) a.map(function(t) {
                    c.push(t);
                }), s.setData({
                    buyList: c,
                    page: parseInt(e) + 1
                }); else {
                    var n = !0;
                    a.length <= 0 && (n = !1), s.setData({
                        buyList: a,
                        isContent: n
                    });
                }
            }
        })) : uni.navigateTo({
            url: "/kundian_farm/pages/login/index"
        });
    },
    reduceNum: function(e) {
        var i = this, s = i.data.buyList, c = e.currentTarget.dataset.id, n = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "reducuCount",
                uid: n,
                uniacid: a,
                id: c
            },
            success: function(t) {
                if (1 == t.data.code) for (var a = 0; a < s.length; a++) s[a].id == c && (t.data.count ? s[a].count = t.data.count : s.splice(a, 1)); else wx.showToast({
                    title: "操作失败"
                });
                i.setData({
                    buyList: s
                }), i.sumPrice();
            }
        });
    },
    addNum: function(e) {
        var i = this, s = e.currentTarget.dataset.id, c = i.data.buyList, n = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "addCount",
                uid: n,
                uniacid: a,
                id: s
            },
            success: function(t) {
                if (1 == t.data.code) for (var a = 0; a < c.length; a++) c[a].id == s && (c[a].count = t.data.count); else wx.showToast({
                    title: "操作失败"
                });
                i.setData({
                    buyList: c
                }), i.sumPrice();
            }
        });
    },
    checked: function(t) {
        var a = this, e = t.currentTarget.dataset.id, i = 0, s = a.data.cart_id;
        a.data.buyList.map(function(t) {
            if (t.id == e) if (t.check = !t.check, t.check) s.push(e); else for (var a = 0; a < s.length; a++) s[a] == e && s.splice(a, 1);
            i += t.price * t.count;
        }), a.setData({
            buyList: a.data.buyList
        }), a.sumPrice(), i == a.data.sumPrice ? a.setData({
            checkAll: !0
        }) : a.setData({
            checkAll: !1
        });
    },
    sumPrice: function() {
        var t = this, a = 0;
        t.data.buyList.map(function(t) {
            parseInt(t.goodsStock) >= parseInt(t.count) && t.check && (a += t.count * t.price);
        }), t.setData({
            sumPrice: a.toFixed(2)
        });
    },
    checkAll: function() {
        for (var t = this, a = t.data.buyList, e = new Array(), i = 0; i < a.length; i++) a[i].goodsStock > 0 && e.push(a[i].id);
        t.data.buyList.map(function(a) {
            t.data.checkAll ? a.check = !1 : a.check = !0;
        }), t.setData({
            checkAll: !t.data.checkAll,
            buyList: t.data.buyList,
            cart_id: e
        }), t.sumPrice();
    },
    deleteItem: function(e) {
        var i = this, s = e.currentTarget.dataset.id, c = wx.getStorageSync("uid_" + a), n = i.data.buyList;
        n.map(function(t, a) {
            t.id == s && n.splice(a, 1);
        }), i.setData({
            buyList: n
        }), 0 == i.data.buyList.length && i.setData({
            checkAll: !1
        }), t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "deleteCart",
                uid: c,
                uniacid: a,
                id: s
            },
            success: function(t) {
                1 != t.data.code ? wx.showToast({
                    title: "操作失败",
                    icon: "none"
                }) : wx.showToast({
                    title: "已删除",
                    icon: "none"
                });
            }
        }), i.sumPrice();
    },
    intoJieSuan: function(t) {
        var a = this.data.cart_id, e = a.join("_");
        "" != a && 0 != a.length ? wx.navigateTo({
            url: "../confrimOrder/index?cart_id=" + e
        }) : wx.showToast({
            title: "请选择商品",
            icon: "none"
        });
    },
    onReachBottom: function(t) {
        var a = this, e = a.data.page;
        a.getCartList(e, !0);
    },
    goBuyGoods: function(t) {
        wx.navigateTo({
            url: "../index/index"
        });
    },
    ListTouchStart: function(t) {
        this.setData({
            ListTouchStart: t.touches[0].pageX
        });
    },
    ListTouchMove: function(t) {
        this.setData({
            ListTouchDirection: this.data.ListTouchStart - t.touches[0].pageX > 50 ? "left" : "right"
        });
    },
    ListTouchEnd: function(t) {
        var a = null;
        "left" == this.data.ListTouchDirection && (a = t.currentTarget.dataset.target), 
        this.setData({
            ListTouchDirection: null,
            modalName: a
        });
    }
});
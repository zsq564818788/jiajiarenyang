var t = new getApp();

Page({
    data: {
        bgColor: t.bgColor,
        assistColor: t.assistColor,
        seed: [],
        is_show_cart: !1,
        count: 0,
        can_count: 0,
        selectSeedList: [],
        totalPrice: 0
    },
    onLoad: function(e) {
        var a = this, s = e.land_id, o = e.area;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "soil",
                op: "seed",
                land_id: s
            },
            success: function(t) {
                a.setData({
                    seed: t.data.seed,
                    can_count: o
                });
            }
        });
    },
    closeCart: function(t) {
        this.setData({
            is_show_cart: !this.data.is_show_cart
        }), this.data.is_show_cart && this.data.count <= 0 && wx.showModal({
            title: "提示",
            content: "请先选择种子",
            showCancel: !1
        });
    },
    addSeedCount: function(t) {
        var e = this.data, a = e.seed, s = e.totalPrice, o = e.count, n = e.can_count, c = t.currentTarget.dataset.seedid, r = [];
        if (n <= o) return wx.showModal({
            title: "提示",
            content: "当前选择的种子面积已大于剩余土地面积啦~",
            showCancel: !1
        }), !1;
        var l = !0;
        if (a.map(function(t) {
            if (t.id == c) if (t.low_count > 0) if (t.selectCount <= 0) {
                var e = parseInt(t.low_count);
                parseInt(o) + e > n ? l = !1 : (t.selectCount = parseInt(t.selectCount) + e, s = parseFloat(s) + parseFloat(t.price) * e, 
                o = parseInt(o) + e);
            } else t.selectCount = parseInt(t.selectCount) + 1, s = parseFloat(s) + parseFloat(t.price), 
            o = parseInt(o) + 1; else t.selectCount = parseInt(t.selectCount) + 1, s = parseFloat(s) + parseFloat(t.price), 
            o = parseInt(o) + 1;
            t.selectCount >= 1 && r.push(t);
        }), !l) return wx.showModal({
            title: "提示",
            content: "当前选择的种子面积已大于剩余土地面积啦~",
            showCancel: !1
        }), !1;
        this.setData({
            seed: a,
            selectSeedList: r,
            totalPrice: s.toFixed(2),
            count: o
        });
    },
    reduceSeedCount: function(t) {
        var e = t.currentTarget.dataset.seedid, a = this.data, s = a.seed, o = a.totalPrice, n = a.count, c = new Array();
        s.map(function(t) {
            t.id == e && (t.low_count > 0 ? t.selectCount == t.low_count ? (t.selectCount = 0, 
            o = parseFloat(o) - t.price * t.low_count, n -= t.low_count) : (t.selectCount = parseInt(t.selectCount) - 1, 
            o = parseFloat(o) - t.price, n -= 1) : (t.selectCount <= 1 ? t.selectCount = 0 : t.selectCount = parseInt(t.selectCount) - 1, 
            n -= 1, o = parseFloat(o) - t.price)), t.selectCount >= 1 && c.push(t);
        }), this.setData({
            seed: s,
            selectSeedList: c,
            totalPrice: o.toFixed(2),
            count: n
        });
    },
    lookSeedDetail: function(t) {
        var e = t.currentTarget.dataset.seedid;
        wx.navigateTo({
            url: "/kundian_farm/pages/land/seedDetails/index?sid=" + e
        });
    },
    submitOrder: function() {
        var t = this.data, e = t.selectSeedList, a = (t.totalPrice, t.count), s = t.can_count;
        a < s ? wx.showToast({
            title: "土地还剩" + (s - a) + "平方未选择",
            icon: "none"
        }) : (wx.setStorageSync("selectSeed", e), wx.navigateBack({
            delta: "1"
        }));
    }
});
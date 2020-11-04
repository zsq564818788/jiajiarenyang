var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        is_show_sale_dailog: !1,
        bagList: [],
        operationtype: "",
        selectBag: [],
        disabled: !1,
        isContent: !0
    },
    onLoad: function(e) {
        var s = this, i = "";
        e.formid && (i = e.formid);
        var o = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSeeBagList",
                control: "land",
                uid: o,
                uniacid: a,
                formid: i
            },
            success: function(t) {
                t.data.bagList.length > 0 ? s.setData({
                    bagList: t.data.bagList
                }) : s.setData({
                    isContent: !1
                });
            }
        }), t.util.setNavColor(a);
    },
    getBagList: function() {
        var e = this, s = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSeeBagList",
                control: "land",
                uid: s,
                uniacid: a
            },
            success: function(t) {
                t.data.bagList.length > 0 ? e.setData({
                    bagList: t.data.bagList
                }) : e.setData({
                    isContent: !1
                });
            }
        });
    },
    onShow: function(t) {
        this.getBagList();
    },
    operationBag: function(t) {
        var a = this;
        if (this.data.is_show_sale_dailog) this.setData({
            is_show_sale_dailog: !this.data.is_show_sale_dailog
        }); else {
            var e = t.currentTarget.dataset, s = (e.seedid, e.bagid), i = e.operationtype;
            if (this.data.bagList.map(function(t) {
                t.id == s && a.setData({
                    selectBag: t
                });
            }), 2 == i) return wx.navigateTo({
                url: "../pay_freight/index?selectBag=" + JSON.stringify(this.data.selectBag)
            }), !1;
            this.setData({
                is_show_sale_dailog: !this.data.is_show_sale_dailog,
                operationtype: i,
                bagid: s
            });
        }
    },
    saleSeed: function(e) {
        var s = this, i = this.data.selectBag, o = e.detail.value.weight, n = e.detail.formId, d = wx.getStorageSync("uid_" + a);
        return o <= 0 ? (wx.showModal({
            title: "提示",
            content: "重量必须大于0",
            showCancel: !1
        }), !1) : parseFloat(o) > parseFloat(i.weight) ? (wx.showModal({
            title: "提示",
            content: "重量不能大于" + i.weight + " kg",
            showCancel: !1
        }), !1) : (s.setData({
            disabled: !0
        }), void t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "saleSeed",
                control: "land",
                uniacid: a,
                selectBag: JSON.stringify(i),
                uid: d,
                weight: o,
                formid: n
            },
            method: "POST",
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function() {
                        s.setData({
                            is_show_sale_dailog: !s.data.is_show_sale_dailog,
                            disabled: !1
                        }), s.getBagList(n);
                    }
                });
            }
        }));
    }
});
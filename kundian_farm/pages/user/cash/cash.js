var t = getApp(), e = t.siteInfo.uniacid;

Page({
    data: {
        price: 0,
        selected: 0,
        user: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var o = this, i = wx.getStorageSync("uid_" + e);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "getWallet",
                uniacid: e,
                uid: i
            },
            success: function(t) {
                o.setData({
                    user: t.data.userInfo
                });
            }
        }), o.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    formSubmit: function(a) {
        var o = this, i = wx.getStorageSync("uid_" + e), s = parseFloat(parseFloat(a.detail.value.price).toFixed(2)), r = o.data, n = r.user, l = r.selected;
        if (s <= 0) return wx.showModal({
            title: "提示",
            content: "提现金额不能小于0",
            showCancel: !1
        }), !1;
        if (!s) return wx.showModal({
            title: "提示",
            content: "请输入提现金额",
            showCancel: !1
        }), !1;
        if (n.money < s) return wx.showModal({
            title: "提示",
            content: "提现金额不足",
            showCancel: !1
        }), !1;
        if (s < parseFloat(this.data.farmSetData.user_withdraw_low_price)) wx.showModal({
            title: "提示",
            content: "提现金额不能低于" + this.data.farmSetData.user_withdraw_low_price + "元",
            showCancel: !1
        }); else {
            var c = a.detail.value, d = c.name, u = c.mobile;
            if (0 == l) {
                if (!d || void 0 == d) return void wx.showToast({
                    title: "姓名不能为空"
                });
                if (!u || void 0 == u) return void wx.showToast({
                    title: "账号不能为空"
                });
            }
            0 == l || 1 == l ? (wx.showLoading({
                title: "正在提交",
                mask: !0
            }), t.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "user",
                    op: "user_withdraw",
                    uid: i,
                    name: d,
                    phone: u,
                    price: s,
                    uniacid: e,
                    method: l,
                    form_id: a.detail.formId
                },
                success: function(t) {
                    wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1,
                        success: function() {
                            wx.redirectTo({
                                url: "../recode/index"
                            });
                        }
                    });
                }
            })) : wx.showToast({
                title: "请选择提现方式"
            });
        }
    },
    select: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            selected: e
        });
    }
});
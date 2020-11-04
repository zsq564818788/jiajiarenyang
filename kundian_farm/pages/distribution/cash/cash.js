var t = getApp(), e = t.siteInfo.uniacid;

Page({
    data: {
        price: 0,
        selected: 0,
        saleSetting: [],
        user: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var i = this, s = wx.getStorageSync("uid_" + e);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getSaleSetting",
                uniacid: e,
                uid: s
            },
            success: function(t) {
                console.log(t), i.setData({
                    saleSetting: t.data.saleSetting,
                    user: t.data.user
                });
            }
        }), i.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    formSubmit: function(a) {
        var i = this, s = wx.getStorageSync("uid_" + e), o = parseFloat(parseFloat(a.detail.value.price).toFixed(2)), n = i.data.user;
        if (o <= 0) return wx.showModal({
            title: "提示",
            content: "提现金额必须大于0",
            showCancel: !1
        }), !1;
        if (!o) return wx.showModal({
            title: "提示",
            content: "请输入提现金额",
            showCancel: !1
        }), !1;
        if (n.price < o) return wx.showModal({
            title: "提示",
            content: "提现金额不足",
            showCancel: !1
        }), !1;
        if (o < parseFloat(i.data.saleSetting.distribution_withdraw_low_price)) wx.showModal({
            title: "提示",
            content: "提现金额不能低于" + i.data.saleSetting.distribution_withdraw_low_price + "元",
            showCancel: !1
        }); else {
            var l = a.detail.value.name, r = a.detail.value.mobile;
            if (l && void 0 != l) if (r && void 0 != r) {
                var c = i.data.selected;
                0 == c || 1 == c ? (wx.showLoading({
                    title: "正在提交",
                    mask: !0
                }), t.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "distribution",
                        op: "sale_withdraw",
                        uid: s,
                        name: l,
                        phone: r,
                        price: o
                    },
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1,
                            success: function() {
                                0 == t.data.code && wx.redirectTo({
                                    url: "../recode/index"
                                });
                            }
                        });
                    }
                })) : wx.showToast({
                    title: "请选择提现方式"
                });
            } else wx.showToast({
                title: "账号不能为空"
            }); else wx.showToast({
                title: "姓名不能为空"
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
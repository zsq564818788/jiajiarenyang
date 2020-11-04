var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        money: 0,
        withdrawSet: [],
        user: [],
        kundianFarmSet: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(e) {
        var n = this;
        t.util.setNavColor(a);
        var o = wx.getStorageSync("uid_" + a), r = t.util.getNewUrl("entry/wxapp/withdraw", "kundian_farm_plugin_play");
        wx.request({
            url: r,
            data: {
                op: "calculateMoney",
                uniacid: a,
                uid: o
            },
            success: function(t) {
                0 == t.data.code ? n.setData({
                    money: t.data.money,
                    withdrawSet: t.data.withdrawSet,
                    user: t.data.user
                }) : (wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                }), n.setData({
                    user: t.data.user
                }));
            }
        });
    },
    withdrawNow: function(e) {
        var n = this, o = wx.getStorageSync("uid_" + a), r = n.data.money;
        if (parseFloat(r) < 1 && parseFloat(r) > 2e6) return wx.showModal({
            title: "提示",
            content: "目前最低付款金额为1元，最高200w，请确认是否付款金额超限",
            showCancel: !1
        }), !1;
        var i = n.data.user, d = n.data.withdrawSet;
        if (i.gold < d.withdraw_low_gold || i.gold <= 0) return wx.showModal({
            title: "提示",
            content: "提现金币不足！最少提现金币为" + d.withdraw_low_gold,
            showCancel: !1
        }), !1;
        var w = t.util.getNewUrl("entry/wxapp/withdraw", "kundian_farm_plugin_play");
        wx.request({
            url: w,
            data: {
                op: "withdrawNow",
                uid: o,
                uniacid: a,
                money: r
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
        });
    },
    history: function() {
        wx.navigateTo({
            url: "../recode/index"
        });
    }
});
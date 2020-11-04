var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        bgColor: t.bgColor,
        assistColor: t.assistColor,
        records: [],
        card_num: "",
        card_pwd: "",
        icon: []
    },
    onLoad: function(o) {
        var e = this;
        0 != wx.getStorageSync("uid_" + a) ? (t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "getCardRecord"
            },
            success: function(t) {
                e.setData({
                    records: t.data.cardData,
                    icon: t.data.icon
                });
            }
        }), t.util.setNavColor(a)) : wx.redirectTo({
            url: "../../login/index"
        }), e.setData({
            bgColor: t.bgColor
        });
    },
    submitInfo: function(o) {
        wx.getStorageSync("uid_" + a);
        var e = o.detail.value, r = e.card_num, s = e.card_pwd;
        if ("" == r) return wx.showToast({
            title: "请填写卡号"
        }), !1;
        if ("" == s) return wx.showToast({
            title: "请填写密码"
        }), !1;
        var d = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "addCard",
                card_num: r,
                card_pwd: s
            },
            success: function(t) {
                0 == t.data.code ? (wx.showToast({
                    title: "绑定成功"
                }), d.setData({
                    card_num: "",
                    card_pwd: ""
                })) : 1 == t.data.code ? wx.showToast({
                    title: "绑定失败"
                }) : 2 == t.data.code ? wx.showModal({
                    title: "提示",
                    content: "卡号或密码输入错误"
                }) : 3 == t.data.code && wx.showModal({
                    title: "提示",
                    content: "卡号已被绑定"
                });
            }
        });
    },
    onShareAppMessage: function(t) {}
});
var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        name: "",
        id_card: ""
    },
    onLoad: function(e) {
        var n = wx.getStorageSync("uid_" + a), i = (wx.getStorageSync("kundian_farm_setData"), 
        this);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getUserBindPhone",
                uid: n,
                uniacid: a
            },
            success: function(t) {
                var a = t.data.userInfo;
                i.setData({
                    name: a.truename,
                    id_card: a.id_card
                });
            }
        }), t.util.setNavColor(a);
    },
    getstatusValue: function(t) {
        this.setData({
            id_card: t.detail.value
        });
    },
    getNameValue: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    submit: function() {
        var e = this.data, n = e.name, i = e.id_card, d = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if ("" == n || void 0 === n) return wx.showToast({
            title: "姓名不能为空",
            icon: "none",
            duration: 2e3
        }), !1;
        if ("" == i && wx.showToast({
            title: "身份证号码不能为空",
            icon: "none",
            duration: 2e3
        }), !d.test(i)) return wx.showToast({
            title: "请输入正确的身份证号码",
            icon: "none",
            duration: 2e3
        }), !1;
        var o = wx.getStorageSync("uid_" + a);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "realNameAuth",
                name: n,
                id_card: i,
                uniacid: a,
                uid: o
            },
            success: function(t) {
                wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                });
            }
        });
    }
});
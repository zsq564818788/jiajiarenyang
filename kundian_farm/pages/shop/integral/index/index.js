var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../../template/calendarTemplate/calendarTemplate")), t = new getApp(), e = t.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: t.globalData.sysData,
        isIphoneX: t.globalData.isIphoneX,
        bg: "",
        date: 3,
        userData: [],
        is_sign: 2,
        aboutData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function(n) {
        (0, a.default)();
        var i = this, r = wx.getStorageSync("uid_" + e), s = this.data.calendar, o = this.data.calendar.curYear, d = this.data.calendar.curMonth, u = wx.getStorageSync("kundian_farm_setData"), c = !1;
        n.is_tarbar && (c = n.is_tarbar), i.setData({
            sign_title: u.sign_title,
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: c
        }), 0 != r ? t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "getSignData",
                uid: r,
                uniacid: e,
                year: o,
                month: d
            },
            success: function(a) {
                if (a.data.signData) {
                    for (var t = a.data.signData, e = 0; e < t.length; e++) for (var n = 0; n < s.days.length; n++) s.days[n].day == t[e].day && (s.days[n].choosed = !0, 
                    s.days[n].sign = !0);
                    i.setData({
                        calendar: s
                    });
                }
                var r = a.data, o = r.userData, d = r.is_sign, u = r.aboutData;
                i.setData({
                    userData: o,
                    is_sign: d,
                    aboutData: u,
                    bg: u.sign_banner
                });
            }
        }) : wx.redirectTo({
            url: "../../../login/index"
        }), t.util.setNavColor(e);
    },
    intoIntegral: function(a) {
        wx.navigateTo({
            url: "../exchange/index"
        });
    },
    intoRecord: function(a) {
        wx.navigateTo({
            url: "../record/index"
        });
    },
    addSign: function(a) {
        var n = wx.getStorageSync("uid_" + e), i = this, r = i.data.calendar.days;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "addSign",
                uid: n,
                uniacid: e
            },
            success: function(a) {
                if (1 == a.data.code) {
                    wx.showToast({
                        title: "签到成功"
                    });
                    for (var t = 0; t < r.length; t++) r[t].day == a.data.day && (r[t].choosed = !0);
                    i.setData({
                        userData: a.data.userData,
                        is_sign: 1,
                        "calendar.days": r
                    });
                } else 2 == a.data.code ? wx.showToast({
                    title: "签到失败"
                }) : 3 == a.data.code ? wx.showToast({
                    title: "今日已签到"
                }) : wx.showToast({
                    title: "签到失败1"
                });
            }
        });
    },
    intoSignRule: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/common/agreement/index?type=3"
        });
    },
    onShareAppMessage: function() {},
    signCard: function() {
        var a = wx.getStorageSync("uid_" + e);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "signCard",
                uid: a,
                uniacid: e
            },
            success: function(a) {
                console.log(a);
            }
        });
    }
});
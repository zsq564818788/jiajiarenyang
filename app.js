App({
    onLaunch: function() {
        var a = this, t = this, n = wx.getStorageSync("kundian_farm_setData");
        n && (t.bgColor = n.background_color, t.assistColor = n.assist_color);
        var i = wx.getStorageSync("kundianFarmTarbar");
        i && (t.tarbar = i), wx.getSystemInfo({
            success: function(t) {
                a.globalData.sysData = t, t.model.indexOf("iPhone X") > -1 && (a.globalData.isIphoneX = !0);
                var n = [ t.windowHeight, t.screenWidth, t.model, !1 ], i = n[0], o = n[1], e = n[2], r = n[3];
                e.indexOf("iPhone X") > -1 && (r = !0, a.bottom = 68), a.globalData.screenHeight = i, 
                a.globalData.isFullScreen = r, a.globalData.Proportion = o / 750;
            }
        });
        var o = this;
        wx.getSystemInfo({
            success: function(a) {
                var t = 68;
                -1 !== a.model.indexOf("iPhone X") ? t = 88 : -1 !== a.model.indexOf("iPhone") && (t = 64), 
                o.globalData.statusBarHeight = a.statusBarHeight, o.globalData.titleBarHeight = t - a.statusBarHeight;
            },
            failure: function() {
                o.globalData.statusBarHeight = 0, o.globalData.titleBarHeight = 0;
            }
        });
        var e = t.siteInfo.siteroot + "?i=" + t.siteInfo.uniacid + "&t=" + t.siteInfo.multiid + "&v=" + t.siteInfo.version + "&from=wxapp&m=kundian_farm&c=entry&a=wxapp&do=class";
        wx.request({
            url: e,
            data: {
                op: "getCommonData",
                uniacid: t.siteInfo.uniacid,
                control: "index"
            },
            success: function(a) {
                var n = a.data, i = n.tarbar, o = n.farmSetData;
                t.bgColor = o.background_color, t.assistColor = o.assist_color, wx.setStorageSync("kundianFarmTarbar", i), 
                wx.setStorageSync("kundian_farm_setData", o), "kundian_farm/pages/HomePage/index/index" != i[0].path && wx.reLaunch({
                    url: "/" + i[0].path + "?is_tarbar=true"
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onError: function(a) {},
    util: require("util/resource/js/util.js"),
    loginBindParent: function(a, t) {
        var n = this;
        void 0 != t && 0 != t && void 0 != a && 0 != a && n.bindParent(a, t);
    },
    bindParent: function(a, t) {
        var n = this;
        void 0 == a && 0 == a || n.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "bindParent",
                user_uid: a,
                uniacid: n.siteInfo.uniacid,
                uid: t
            },
            success: function(a) {
                console.log(a);
            },
            error: function(a) {
                console.log(a);
            }
        });
    },
    getAuthUserInfo: function(a) {
        var t = this, n = t.siteInfo.uniacid;
        return new Promise(function(i, o) {
            t.util.getUserInfo(function(a) {
                wx.showLoading({
                    title: "登录中..."
                }), console.log(a), wx.setStorageSync("uid_" + n, a.memberInfo.uid), wx.setStorageSync("kundian_farm_sessionid", a.sessionid), 
                wx.setStorageSync("kundian_farm_wxInfo", a.wxInfo);
                var o = a.wxInfo.avatarUrl, e = a.wxInfo.nickName, r = a.memberInfo, s = {
                    op: "login",
                    action: "index",
                    control: "home",
                    avatar: r.avatar,
                    uid: r.uid,
                    nickname: r.nickname,
                    uniacid: n,
                    wxNickName: e,
                    wxAvatar: o
                };
                t.util.request({
                    url: "entry/wxapp/class",
                    data: s,
                    success: function(a) {
                        if (wx.setStorageSync("uid_" + n, a.data.uid), 0 == a.data.code) {
                            var o = wx.getStorageSync("farm_share_uid");
                            void 0 != o && 0 != o && (t.loginBindParent(o, r.uid), wx.removeStorageSync("farm_share_uid")), 
                            wx.showToast({
                                title: "登陆成功",
                                icon: "none",
                                success: function(a) {}
                            });
                        } else wx.showToast({
                            title: "登录失败",
                            icon: "none"
                        });
                        i(a.data.uid), wx.hideLoading();
                    }
                });
            }, a.detail);
        });
    },
    bottom: 0,
    bgColor: "",
    assistColor: "",
    tarbar: [],
    globalData: {
        userInfo: null,
        uid: "",
        sessionid: "",
        sysData: {},
        isIphoneX: !1,
        screenHeight: 0,
        Proportion: 0,
        isFullScreen: !1,
        tarbar: []
    },
    siteInfo: {
        uniacid: "2",
        acid: "2",
        multiid: "0",
        version: "1.0.0",
        siteroot: "https://mp.lgwljt.com/app/index.php"
    }
});
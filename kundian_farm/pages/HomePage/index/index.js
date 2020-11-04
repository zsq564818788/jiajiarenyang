var a = new getApp(), t = a.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        statusBarHeight: a.globalData.statusBarHeight,
        titleBarHeight: a.globalData.titleBarHeight,
        setData: wx.getStorageSync("kundian_farm_setData"),
        weather: [],
        loading: !0,
        mockView: 4,
        user_uid: 0,
        page: [],
        tarbar: a.tarbar,
        bgColor: a.bgColor,
        scrollTop: 0,
        is_loading: !1,
        isBarHidden: !1,
        barDistance: 0,
        showView: !1
    },
    onLoad: function(e) {
        var r = this, n = wx.getStorageSync("kundian_farm_setData"), i = wx.getStorageSync("kundianFarmTarbar");
        i && n ? a.util.setNavColor(t) : r.getMusic().then(function(e) {
            var i = e.data, o = i.tarbar, s = i.farmSetData;
            wx.setStorageSync("kundianFarmTarbar", o), wx.setStorageSync("kundian_farm_setData", s), 
            a.globalData.tarbar = o, r.setData({
                tarbar: o,
                setData: n
            }), a.util.setNavColor(t);
        }).then(function() {});
        var o = parseInt(new Date().valueOf()), s = wx.getStorageSync("kundianFarmHomePage"), c = !1;
        !s || wx.getStorageSync("kundianFarmHomePage_time" + t) < o ? r.getFirstData() : "search" == s.page[0].type && (c = !0), 
        c || (r.data.barDistance = 128, r.data.isIphoneX && (r.data.barDistance = 176));
        var u = e.user_uid || 0, g = wx.getStorageSync("uid_" + t);
        void 0 != u && 0 != u && (wx.setStorageSync("farm_share_uid", u), a.loginBindParent(u, g)), 
        wx.getStorageSync("enter_is_play") && wx.removeStorageSync("enter_is_play"), r.setData({
            tarbar: i || [],
            setData: n || [],
            user_uid: u,
            page: s.page || [],
            loading: !1,
            icon: s.icon || [],
            barDistance: r.data.barDistance
        }), r.getWeatherData();
    },
    onPageScroll: function(a) {
        var t = a.scrollTop;
        this.setData({
            scrollTop: t
        });
    },
    getMusic: function() {
        return new Promise(function(e, r) {
            a.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "getCommonData",
                    control: "index",
                    uniacid: t
                },
                success: function(a) {
                    e(a);
                }
            });
        });
    },
    getWeatherData: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getNowWeatherData",
                uniacid: t,
                control: "index"
            },
            success: function(a) {
                e.setData({
                    weather: a.data.weather,
                    weatherSet: a.data.weatherSet
                }), wx.setStorageSync("kundian_farm_weather", a.data.weather);
            }
        });
    },
    preventTouchMove: function() {},
    intoVetInfo: function(a) {
        var t = a.currentTarget.dataset.title;
        this.data.setData.vet_title && (t = this.data.setData.vet_title), wx.navigateTo({
            url: "/kundian_farm/pages/shop/VeterinaryIntroduce/index?title=" + t
        });
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_setData");
        return {
            path: "kundian_farm/pages/HomePage/index/index?&user_uid=" + wx.getStorageSync("uid_" + t),
            success: function(a) {},
            title: a.share_home_title
        };
    },
    onPullDownRefresh: function(e) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var r = this;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                uniacid: t,
                op: "getCommonData",
                control: "index",
                refresh: !0
            },
            success: function(t) {
                var e = t.data, n = e.tarbar, i = e.farmSetData;
                a.bgColor = i.background_color, a.assistColor = i.assist_color, wx.setStorageSync("kundianFarmTarbar", n), 
                wx.setStorageSync("kundian_farm_setData", i), r.setData({
                    tarbar: n,
                    setData: i,
                    bgColor: i.background_color,
                    assistColor: i.assist_color
                }), r.getFirstData(), wx.stopPullDownRefresh(), wx.hideLoading();
            }
        }), this.getWeatherData();
    },
    getFirstData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r = this, n = wx.getStorageSync("uid_" + t);
        wx.getStorageSync("kundian_farm_setData");
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getHomeData",
                control: "index",
                uniacid: t,
                uid: n,
                refresh: e
            },
            success: function(a) {
                new Array();
                var e = !1;
                "search" == a.data.page[0].type && (e = !0), e || (r.data.barDistance = 128, r.data.isIphoneX && (r.data.barDistance = 176));
                var n = a.data, i = n.page;
                n.icon;
                r.setData({
                    page: i,
                    loading: !1,
                    icon: a.data.icon,
                    barDistance: r.data.barDistance
                }), wx.setStorageSync("kundianFarmHomePage", a.data);
                var o = parseInt(new Date().valueOf()) + 18e5;
                wx.setStorageSync("kundianFarmHomePage_time" + t, o);
            }
        });
    },
    onShow: function() {
        var e = this, r = wx.getStorageSync("uid_" + t), n = this.data.user_uid;
        void 0 != n && 0 != n && (a.loginBindParent(n, r), e.setData({
            user_uid: n
        }));
    }
});
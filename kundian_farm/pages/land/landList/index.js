var a = new getApp(), t = a.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        bgColor: a.bgColor,
        tarbar: a.tarbar,
        landType: [],
        currentLand: [],
        currentIndex: 1,
        page: 1,
        is_tarbar: !0,
        isContent: !0
    },
    onLoad: function(n) {
        var e = this, r = a.tarbar, i = a.bgColor, s = n.is_tarbar || !1;
        if (e.setData({
            is_tarbar: s,
            bgColor: i,
            tarbar: r
        }), wx.showLoading({
            title: "玩命加载中"
        }), a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getLandList",
                type: "land_list",
                control: "soil"
            },
            success: function(a) {
                var t = a.data, n = t.landType, r = t.landData, i = !0;
                0 == r.length && (i = !1), e.setData({
                    landType: n,
                    currentLand: r,
                    currentIndex: n[0].id || 1,
                    isContent: i
                }), wx.hideLoading();
            }
        }), a.util.setNavColor(t), n.is_play) {
            var o = n.is_play;
            wx.setStorageSync("enter_is_play", o);
        } else wx.removeStorageSync("entry_is_play");
    },
    changeArea: function(a) {
        var t = a.currentTarget.dataset.id;
        this.getLandData(t, 0, 1);
    },
    getLandData: function(t, n, e) {
        var r = this;
        e = parseInt(e) + 1, 1 != n && (e = 1), a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getLandList",
                control: "soil",
                type: "land_by_type",
                type_id: t,
                page: e
            },
            success: function(a) {
                if (1 == n) {
                    var i = r.data.currentLand;
                    a.data.landData && (a.data.landData.map(function(a) {
                        i.push(a);
                    }), r.setData({
                        currentLand: i,
                        page: e,
                        currentIndex: t
                    }));
                } else {
                    var s = !0;
                    0 == a.data.landData.length && (s = !1), r.setData({
                        currentLand: a.data.landData,
                        currentIndex: t,
                        page: 1,
                        isContent: s
                    });
                }
            }
        });
    },
    onReachBottom: function(a) {
        var t = this.data, n = t.page, e = t.currentIndex;
        this.getLandData(e, 1, n);
    },
    intoLandDetail: function(a) {
        var t = a.currentTarget.dataset.lid;
        wx.navigateTo({
            url: "../detail/index?lid=" + t
        });
    },
    onShow: function(a) {
        var t = wx.getStorageSync("kundianFarmTarbar");
        this.setData({
            tarbar: t
        });
    }
});
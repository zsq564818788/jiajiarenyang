var t = new getApp(), n = t.siteInfo.uniacid;

Page({
    data: {
        bgColor: t.bgColor,
        statistics: [],
        total_user: 0,
        farmSetData: [],
        is_active: 0,
        icon: [],
        plugin_pt: 0
    },
    onLoad: function(a) {
        var i = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "manager",
                op: "getStatisticsData",
                uniacid: n
            },
            success: function(t) {
                var n = t.data, a = n.statistics, e = n.total_user, o = n.is_active, r = n.icon, s = n.plugin_pt;
                i.setData({
                    statistics: a,
                    total_user: e,
                    is_active: o,
                    icon: r,
                    plugin_pt: s
                });
            }
        }), t.util.setNavColor(), i.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bgColor: t.bgColor
        });
    },
    intoAdminShopOrder: function(t) {
        wx.navigateTo({
            url: "../../manage/orderList/index?type=1"
        });
    },
    intoAdminGroupOrder: function(t) {
        wx.navigateTo({
            url: "../../manage/orderList/index?type=2"
        });
    },
    intoPtOrder: function(t) {
        wx.navigateTo({
            url: "../../manage/orderList/index?type=4"
        });
    },
    intoAdminIntegralOrder: function(t) {
        wx.navigateTo({
            url: "../../manage/orderList/index?type=3"
        });
    },
    intoAdminLandManager: function(t) {
        wx.navigateTo({
            url: "/kundian_farm/pages/manage/land/index"
        });
    },
    intoAdminAnimalManager: function(t) {
        wx.navigateTo({
            url: "../myLandlist/index?plate=2"
        });
    },
    intoAdminApply: function(t) {
        wx.navigateTo({
            url: "/kundian_farm/pages/manage/apply/index"
        });
    },
    testVideo: function(t) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/test/index"
        });
    },
    getSiteInfo: function(n) {
        var a = t.siteInfo, i = "站点信息：uniacid=" + a.uniacid + ";acid=" + a.acid + ";multiid=" + a.multiid + ";version=" + a.version + ";siteroot=" + a.siteroot;
        wx.showModal({
            title: "提示",
            content: i,
            showCancel: !1
        });
    },
    intoDevice: function(t) {
        wx.navigateTo({
            url: "../device/index"
        });
    },
    intoRelays: function(t) {
        wx.navigateTo({
            url: "../relays/index"
        });
    },
    intoCheckActive: function(t) {
        wx.scanCode({
            success: function(t) {
                console.log(t.path);
                var n = "/" + t.path;
                wx.navigateTo({
                    url: n
                });
            }
        });
    }
});
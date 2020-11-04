!function(t) {
    t && t.__esModule;
}(require("../../utils/util.js"));

var t = getApp(), a = void 0, e = t.siteInfo.uniacid;

Page({
    data: {
        isIphoneX: t.globalData.isIphoneX,
        statusBarHeight: t.globalData.statusBarHeight,
        titleBarHeight: t.globalData.titleBarHeight,
        showFriend: !1,
        screenHeight: 0,
        Proportion: 0,
        money: "10000.00",
        isFullScreen: !1,
        userAppid: 123456789,
        steal: !1,
        stealMoney: 0,
        showHome: !1,
        showIcon: !0,
        lands: [ {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        } ],
        friend_uid: "",
        kundianPlaySet: [],
        user: [],
        friendList: []
    },
    onLoad: function(a) {
        var i = this, n = a.friend_uid;
        this.setData({
            screenHeight: t.globalData.screenHeight,
            isFullScreen: t.globalData.isFullScreen,
            Proportion: t.globalData.Proportion,
            friend_uid: n
        }), this.getHomeData(n);
        var s = wx.getStorageSync("uid_" + e), r = t.util.getNewUrl("entry/wxapp/game", "kundian_farm_plugin_play"), d = "";
        a.form_id && (d = a.form_id), wx.request({
            url: r,
            data: {
                op: "visitFriend",
                action: "friend",
                uid: s,
                friend_uid: n,
                uniacid: e,
                form_id: d
            },
            success: function(t) {
                i.setData({
                    user: t.data.user,
                    friendList: t.data.friendList
                }), 0 == t.data.code && wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                });
            }
        }), t.util.setNavColor(e);
    },
    getHomeData: function(a) {
        var i = this, n = t.util.getNewUrl("entry/wxapp/game", "kundian_farm_plugin_play");
        wx.request({
            url: n,
            data: {
                op: "getHomeData",
                action: "soil",
                uniacid: e,
                uid: a
            },
            success: function(t) {
                t.data.playSet;
                var a = t.data, e = a.lands, n = a.userData;
                i.setData({
                    lands: e,
                    userData: n
                });
            }
        });
    },
    run: function() {
        var t = this, e = !1;
        a = setTimeout(function() {
            e = !t.data.isrun, t.setData({
                isrun: e
            }), t.run();
        }, 700);
    },
    steal: function(t) {
        var a = wx.getStorageSync("uid_" + e);
        t.map(function(t) {
            t.stealist.map(function(e) {
                e.visit_uid == a && (t.steal = !0);
            });
        }), this.setData({
            lands: t
        });
    },
    mature: function(a) {
        var i = a.currentTarget.dataset.id, n = this.data.lands, s = n.findIndex(function(t) {
            return t.id == i;
        }), r = this, d = wx.getStorageSync("uid_" + e), o = r.data.friend_uid, u = t.util.getNewUrl("entry/wxapp/game", "kundian_farm_plugin_play");
        wx.request({
            url: u,
            data: {
                op: "matureFriendLand",
                action: "friend",
                uid: o,
                friend_uid: d,
                uniacid: e,
                plant_id: i
            },
            success: function(t) {
                if (-1 == t.data.code) return wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                }), !1;
                wx.showToast({
                    title: "偷取好友种植成功获得" + t.data.gold + "元",
                    icon: "none"
                }), n[s].steal = !0, n[s].animation = !0, n[s].money = t.data.gold, r.setData({
                    lands: n
                });
            }
        });
    },
    checkFriend: function() {
        var t = this.data.showFriend;
        this.setData({
            showFriend: !t
        });
    },
    visited: function(t) {
        var a = this, e = t.detail.formId, i = t.currentTarget.dataset.frienduid;
        wx.redirectTo({
            url: "../friend/index?friend_uid=" + i + "&form_id=" + e,
            success: function(t) {
                a.setData({
                    showFriend: !1
                });
            }
        });
    },
    shopMall: function() {
        wx.navigateTo({
            url: "../reflect/index"
        });
    },
    goBack: function() {
        wx.reLaunch({
            url: "../farm/index"
        });
    },
    onShow: function() {
        this.run();
    },
    onHide: function() {
        clearTimeout(a);
    },
    onShareAppMessage: function(t) {
        t.from;
        var a = wx.getStorageSync("uid_" + e);
        return {
            title: this.data.kundianPlaySet.farm_share_title,
            path: "kundian_game/pages/farm/index?share_uid=" + a
        };
    }
});
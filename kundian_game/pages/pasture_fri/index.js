!function(t) {
    t && t.__esModule;
}(require("../../utils/util.js"));

var t = getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        isIphoneX: t.globalData.isIphoneX,
        statusBarHeight: t.globalData.statusBarHeight,
        titleBarHeight: t.globalData.titleBarHeight,
        screenHeight: 0,
        Proportion: 0,
        money: "10000.00",
        isFullScreen: !1,
        showFriend: !1,
        animalList: [],
        clearTime: !1,
        currentInfo: {},
        noAnimal: !1,
        friendList: [],
        showHome: !1,
        showIcon: !0
    },
    onLoad: function(i) {
        var e = i.friend_uid, n = !1;
        this.setData({
            screenHeight: t.globalData.screenHeight,
            isFullScreen: t.globalData.isFullScreen,
            Proportion: t.globalData.Proportion
        });
        var r = this, s = t.util.getNewUrl("entry/wxapp/game", "kundian_farm_plugin_play"), o = wx.getStorageSync("uid_" + a);
        wx.request({
            url: s,
            data: {
                op: "getMyAnimal",
                action: "animal",
                uid: e,
                uniacid: a
            },
            success: function(t) {
                0 == t.data.animalList.length && (n = !0), r.setData({
                    animalList: t.data.animalList,
                    userData: t.data.userData,
                    noAnimal: n
                });
            }
        });
        var u = t.util.getNewUrl("entry/wxapp/game", "kundian_farm_plugin_play");
        wx.request({
            url: u,
            data: {
                op: "visitFriend",
                action: "friend",
                uid: o,
                friend_uid: e,
                uniacid: a
            },
            success: function(t) {
                r.setData({
                    user: t.data.user,
                    friendList: t.data.friendList
                }), 0 == t.data.code && wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                });
            }
        }), t.util.setNavColor(a);
    },
    animalDetail: function(t) {
        var a = [ t.detail, this.data.animalList ], i = a[0], e = a[1].find(function(t) {
            return t.id === i;
        });
        this.setData({
            currentInfo: e
        });
    },
    closeDetail: function() {
        this.setData({
            currentInfo: {}
        });
    },
    close: function() {
        this.setData({
            noAnimal: !1
        });
    },
    goBack: function() {
        wx.redirectTo({
            url: "../pasture/index"
        });
    },
    checkFriend: function(i) {
        if (this.setData({
            showFriend: !this.data.showFriend
        }), this.data.showFriend) {
            var e = this, n = wx.getStorageSync("uid_" + a), r = t.util.getNewUrl("entry/wxapp/game", "kundian_farm_plugin_play");
            wx.request({
                url: r,
                data: {
                    op: "getFriendInfo",
                    action: "friend",
                    uid: n,
                    uniacid: a
                },
                success: function(t) {
                    e.setData({
                        friendList: t.data.friendList
                    });
                }
            });
        }
    },
    visited: function(t) {
        var a = this, i = t.currentTarget.dataset.frienduid;
        wx.redirectTo({
            url: "../pasture_fri/index?friend_uid=" + i,
            success: function(t) {
                a.setData({
                    showFriend: !1
                });
            }
        });
    }
});
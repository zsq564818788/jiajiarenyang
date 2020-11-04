var o = new getApp(), t = o.siteInfo.uniacid;

Page({
    data: {
        bgColor: o.bgColor,
        assistColor: o.assistColor,
        userInfo: []
    },
    onLoad: function(a) {
        var n = this;
        n.setData({
            bgColor: o.bgColor
        });
        var e = wx.getStorageSync("uid_" + t);
        e ? o.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "getWallet",
                uniacid: t,
                uid: e
            },
            success: function(o) {
                n.setData({
                    userInfo: o.data.userInfo
                });
            }
        }) : wx.navigateTo({
            url: "../../login/index"
        }), o.util.setNavColor(t);
    },
    intoCash: function(o) {
        wx.navigateTo({
            url: "../cash/cash"
        });
    },
    intoRecord: function(o) {
        wx.navigateTo({
            url: "../recode/index"
        });
    },
    intoDetail: function(o) {
        wx.navigateTo({
            url: "../wallet_detail/index"
        });
    },
    onReady: function() {},
    onShow: function() {}
});
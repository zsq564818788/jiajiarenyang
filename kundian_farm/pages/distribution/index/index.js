var t = new getApp(), i = t.siteInfo.uniacid;

Page({
    data: {
        bgColor: t.bgColor,
        assistColor: t.assistColor,
        money: "",
        userInfo: [],
        config: []
    },
    onLoad: function(o) {
        var e = this;
        e.setData({
            bgColor: t.bgColor
        });
        var n = wx.getStorageSync("uid_" + i);
        n ? t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getUserInfo",
                uniacid: i,
                uid: n
            },
            success: function(t) {
                e.setData({
                    userInfo: t.data.user
                });
            }
        }) : wx.navigateTo({
            url: "../../login/index"
        }), e.copyWrite();
    },
    copyWrite: function() {
        var i = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getConfig",
                type: "distribution"
            },
            success: function(t) {
                var o = t.data.config;
                o.dis_top_title && wx.setNavigationBarTitle({
                    title: o.dis_top_title
                }), i.setData({
                    config: o
                });
            }
        });
    },
    allMoney: function() {
        this.setData({
            money: this.data.userInfo.price
        });
    },
    input: function(t) {
        var i = t.detail.value;
        this.setData({
            money: i
        });
    },
    intoOrder: function(t) {
        var i = t.currentTarget.dataset.ordertype;
        wx.navigateTo({
            url: "../orderList/index?order_type=" + i
        });
    },
    intoTixian: function(t) {
        wx.navigateTo({
            url: "../cash/cash"
        });
    },
    intoWithdrawRecord: function(t) {
        wx.navigateTo({
            url: "../recode/index"
        });
    },
    intoSalePrice: function(t) {
        wx.navigateTo({
            url: "../commission/index"
        });
    },
    intoTeam: function(t) {
        wx.navigateTo({
            url: "../team/index"
        });
    },
    intoCode: function(t) {
        wx.navigateTo({
            url: "../share/index"
        });
    }
});
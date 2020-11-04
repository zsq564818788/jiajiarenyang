var a = new getApp(), t = a.siteInfo.uniacid;

Page({
    data: {
        recordData: [],
        page: 1,
        sign_title: "",
        isContent: !0
    },
    onLoad: function(e) {
        var o = this, r = wx.getStorageSync("uid_" + t);
        wx.showLoading({
            title: "玩命加载中..."
        }), a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "getRecord",
                uniacid: t,
                uid: r
            },
            success: function(a) {
                a.data.recordData ? o.setData({
                    recordData: a.data.recordData
                }) : o.setData({
                    isContent: !1
                }), wx.hideLoading();
            }
        }), a.util.setNavColor(t);
    },
    onReachBottom: function() {
        var e = this, o = wx.getStorageSync("uid_" + t), r = e.data, i = r.page, n = r.recordData;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "getRecord",
                uniacid: t,
                uid: o,
                page: parseInt(i) + 1
            },
            success: function(a) {
                if (a.data.recordData) {
                    for (var t = a.data.recordData, o = 0; o < t.length; o++) n.push(t[o]);
                    e.setData({
                        recordData: n,
                        page: i
                    });
                }
            }
        });
    }
});
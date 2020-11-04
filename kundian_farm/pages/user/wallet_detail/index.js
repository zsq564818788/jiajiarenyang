var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        list: [],
        page: 1
    },
    onLoad: function(t) {
        this.getList(1, 0);
    },
    getList: function(i, e) {
        var s = this, n = wx.getStorageSync("uid_" + a);
        1 == e && (i = parseInt(i) + 1), t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "getDetail",
                uid: n,
                uniacid: a,
                page: i
            },
            success: function(t) {
                if (console.log(t), 1 == e) {
                    var a = t.data.list, n = s.data.list;
                    a.map(function(t) {
                        n.push(t);
                    }), s.setData({
                        list: n,
                        page: i
                    });
                } else s.setData({
                    list: t.data.list,
                    page: 1
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onReachBottom: function() {
        var t = this.data.page;
        this.getList(t, 1);
    }
});
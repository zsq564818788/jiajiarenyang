var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        status: -1,
        page: 1,
        list: [],
        is_content: !0
    },
    onLoad: function(t) {
        var e = this, s = (wx.getStorageSync("uid_" + a), e.data.page);
        e.getRecord(-1, s);
    },
    getRecord: function(e, s, i) {
        var n = wx.getStorageSync("uid_" + a), c = this, o = c.data.list;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "getWithdrawRecord",
                uniacid: a,
                uid: n,
                status: e
            },
            success: function(t) {
                if (1 == i) {
                    var a = t.data.list;
                    a && a.map(function(t) {
                        o.push(t);
                    }), c.setData({
                        list: o,
                        is_content: !0
                    });
                } else t.data.list.length > 0 ? c.setData({
                    list: t.data.list,
                    is_content: !0
                }) : c.setData({
                    is_content: !1
                });
            }
        });
    },
    showDesc: function(t) {
        var a = t.currentTarget.dataset.id, e = this.data.records;
        e.map(function(t) {
            if (t.id == a) {
                var e = t.show;
                t.show = !e;
            }
        }), this.setData({
            records: e
        });
    },
    changeStatus: function(t) {
        var a = t.currentTarget.dataset.index, e = this, s = e.data.page;
        e.getRecord(a, s), e.setData({
            status: a,
            page: 1
        });
    },
    onReachBottom: function() {
        var t = this, a = t.data.status, e = parseInt(t.data.page) + 1;
        t.getRecord(a, e, 1), t.setData({
            status: a,
            page: e
        });
    }
});
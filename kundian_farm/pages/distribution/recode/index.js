var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        status: -1,
        page: 1,
        list: [],
        isContent: !0
    },
    onLoad: function(t) {
        wx.getStorageSync("uid_" + a);
        var s = this.data.page;
        this.getRecord(-1, s);
    },
    getRecord: function(s, e, i) {
        var n = wx.getStorageSync("uid_" + a), o = this, r = o.data, d = r.list, c = r.isContent;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getWithdrawRecord",
                uniacid: a,
                uid: n,
                status: s
            },
            success: function(t) {
                if (1 == i) {
                    var a = t.data.list;
                    a && a.map(function(t) {
                        d.push(t);
                    }), o.setData({
                        list: d
                    });
                } else c = t.data.list.length > 0, o.setData({
                    list: t.data.list,
                    isContent: c
                });
            }
        });
    },
    showDesc: function(t) {
        var a = t.currentTarget.dataset.id, s = this.data.records;
        s.map(function(t) {
            if (t.id == a) {
                var s = t.show;
                t.show = !s;
            }
        }), this.setData({
            records: s
        });
    },
    changeStatus: function(t) {
        var a = t.currentTarget.dataset.index, s = this.data.page;
        this.getRecord(a, s), this.setData({
            status: a,
            page: 1
        });
    },
    onReachBottom: function() {
        var t = this.data.status, a = t.status, s = t.page;
        s = parseInt(s) + 1, this.getRecord(a, s, 1), this.setData({
            status: a,
            page: s
        });
    }
});
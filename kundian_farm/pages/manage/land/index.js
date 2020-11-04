var t = new getApp();

Page({
    data: {
        bgColor: "",
        list: [],
        isContent: !0,
        page: 1,
        index: 1
    },
    onLoad: function(a) {
        this.setData({
            bgColor: t.bgColor
        }), this.init(!1);
    },
    init: function(a) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var e = this, i = e.data, n = i.page, o = i.list, s = i.isContent, r = i.index;
        a && (n = parseInt(n) + 1), t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "manage",
                op: "plantList",
                page: n,
                index: r
            },
            success: function(t) {
                console.log(t);
                var i = t.data.seed;
                a && i ? i.map(function(t) {
                    o.push(t);
                }) : (o = i || [], s = !!i), e.setData({
                    list: o,
                    isContent: s,
                    page: n
                });
            }
        });
    },
    tabSelect: function(t) {
        var a = t.currentTarget.dataset.id;
        this.setData({
            index: a,
            page: 1
        }), this.init(!1);
    },
    onReachBottom: function() {
        this.init(!0);
    },
    toDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "./detail?order_id=" + a
        });
    }
});
var o = new getApp();

Page({
    data: {
        bgColor: o.bgColor,
        assistColor: o.assistColor,
        order: [],
        land: [],
        spec: [],
        cycle: [],
        showVideo: !1,
        config: []
    },
    onLoad: function(t) {
        var r = this, a = t.order_id, e = wx.getStorageSync("kundian_farm_setData");
        o.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "soil",
                op: "orderDetail",
                order_id: a
            },
            success: function(o) {
                var t = o.data, s = t.order, c = t.land, i = t.spec, d = t.cycle, l = t.cycle_count, n = i.live_src, u = [];
                n && (u = n.split(":")), r.setData({
                    order: s,
                    land: c,
                    spec: i,
                    cycle: d,
                    order_id: a,
                    cycle_count: l,
                    config: e,
                    src_xy: u
                });
            }
        });
    },
    toCycle: function() {
        var o = this.data.order_id;
        wx.navigateTo({
            url: "./cycle?order_id=" + o
        });
    },
    showVideo: function(o) {
        this.setData({
            showVideo: !this.data.showVideo
        });
    },
    onShow: function() {
        var t = o.bgColor, r = o.assistColor;
        this.setData({
            bgColor: t,
            assistColor: r
        });
    }
});
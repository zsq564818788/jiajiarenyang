var t = new getApp(), e = t.siteInfo.uniacid;

Page({
    data: {
        order_id: "",
        cycle: [],
        currentCycle: []
    },
    onLoad: function(t) {
        var e = t.order_id;
        this.getInit(e);
    },
    getInit: function(e) {
        var c = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "soil",
                op: "cycleInfo",
                order_id: e
            },
            success: function(t) {
                var r = t.data, n = r.cycle, o = r.current;
                c.setData({
                    order_id: e,
                    cycle: n,
                    current: o,
                    currentCycle: n[o]
                });
            }
        });
    },
    changeCycle: function(t) {
        var e = this, c = t.currentTarget.dataset.id, r = e.data.cycle;
        e.setData({
            currentCycle: r[c]
        });
    },
    sureGoods: function(c) {
        var r = this, n = r.data, o = n.currentCycle, a = n.order_id, i = wx.getStorageSync("uid_" + e), s = {
            control: "soil",
            op: "operationOrder",
            type: "confirm_goods",
            id: o.id,
            formid: c.detail.formId,
            uid: i
        };
        wx.showModal({
            title: "提示",
            content: "确认收货了吗？",
            success: function(e) {
                e.confirm && t.util.request({
                    url: "entry/wxapp/class",
                    data: s,
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            success: function() {
                                0 == t.data.code && r.getInit(a);
                            }
                        });
                    }
                });
            }
        });
    }
});
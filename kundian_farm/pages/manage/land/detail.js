var t = new getApp();

Page({
    data: {
        bgColor: "",
        order_id: "",
        order: [],
        showSeed: !1
    },
    onLoad: function(e) {
        this.init(e.order_id), this.setData({
            bgColor: t.bgColor
        });
    },
    init: function(e) {
        var a = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "manage",
                op: "detail",
                order_id: e
            },
            success: function(t) {
                a.setData({
                    order: t.data.order,
                    order_id: e
                });
            }
        });
    },
    toCycle: function(t) {
        var e = this.data.order;
        wx.navigateTo({
            url: "./cycle?order_id=" + e.id
        });
    },
    showSeed: function(t) {
        var e = this.data, a = e.showSeed, o = e.order;
        if (a) this.setData({
            showSeed: !1
        }); else {
            var i = t.currentTarget.dataset.index;
            this.setData({
                currentSeed: o.seed[i],
                showSeed: !0
            });
        }
    },
    plantNow: function(t) {
        var e = {
            control: "manage",
            op: "plant",
            type: "plant_now",
            id: this.data.currentSeed.id
        };
        this.toReques(e, "确认更新种植为已种植吗？");
    },
    ripeNow: function(t) {
        var e = {
            control: "manage",
            op: "plant",
            type: "ripe_now",
            id: this.data.currentSeed.id
        };
        this.toReques(e, "确认更新种植为已成熟吗？");
    },
    changeTime: function(t) {
        var e = {
            control: "manage",
            op: "plant",
            type: "ripe_time",
            id: this.data.currentSeed.id,
            time: t.detail.value
        };
        this.toReques(e, "确认更新预计成熟时间为" + t.detail.value + "吗？");
    },
    toReques: function(e, a) {
        var o = this, i = o.data.order_id;
        wx.showModal({
            title: "提示",
            content: a,
            success: function(a) {
                a.confirm && t.util.request({
                    url: "entry/wxapp/class",
                    data: e,
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            success: function() {
                                if (0 == t.data.code) {
                                    o.setData({
                                        showSeed: !1
                                    });
                                    var e = setTimeout(function() {
                                        clearTimeout(e), o.init(i);
                                    }, 1500);
                                }
                            }
                        });
                    }
                });
            }
        });
    },
    toStatus: function(t) {
        var e = t.currentTarget.dataset.plantid;
        wx.navigateTo({
            url: "../../land/order/state?plant_id=" + e + "&is_add=true"
        });
    }
});
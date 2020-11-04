var e = new getApp();

Page({
    data: {
        cycle: [],
        express: [ "圆通快递", "顺丰快递", "中通快递", "韵达快递", "百世汇通", "菜鸟裹裹", "申通快递", "EMS", "天天快递", "宅急送", "邮政包裹" ],
        express_company: "",
        express_no: "",
        showSendModel: !1,
        cuCycle: [],
        order_id: ""
    },
    onLoad: function(e) {
        this.init(e.order_id);
    },
    init: function(t) {
        var s = this;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "manage",
                op: "cycle",
                type: "cycle_list",
                order_id: t
            },
            success: function(e) {
                s.setData({
                    cycle: e.data.cycle,
                    order_id: t
                });
            }
        });
    },
    pickerChange: function(e) {
        var t = this.data.express;
        this.setData({
            express_company: t[e.detail.value]
        });
    },
    hideModal: function(e) {
        this.setData({
            showSendModel: !this.data.showSendModel
        });
    },
    saoma: function(e) {
        var t = this;
        wx.scanCode({
            success: function(e) {
                t.setData({
                    express_no: e.result
                });
            }
        });
    },
    expressNo: function(e) {
        console.log(e.detail.value), this.setData({
            express_no: e.detail.value
        });
    },
    showSend: function(e) {
        var t = this, s = e.currentTarget.dataset.id, a = t.data.cycle;
        this.setData({
            cuCycle: a[s],
            showSendModel: !0
        });
    },
    saveSend: function(e) {
        var t = this.data, s = t.express_company, a = t.express_no, o = t.cuCycle;
        if ("" != s && void 0 != s) if ("" != a && void 0 != a) {
            var n = {
                control: "manage",
                op: "cycle",
                type: "send",
                id: o.id,
                express_company: s,
                express_no: a
            };
            this.request(n, "确认立即发货吗？");
        } else wx.showToast({
            title: "请填写快递单号",
            icon: "none"
        }); else wx.showToast({
            title: "请选择快递公司",
            icon: "none"
        });
    },
    confirm: function(e) {
        var t = {
            control: "manage",
            op: "cycle",
            type: "confirm",
            id: e.currentTarget.dataset.id
        };
        this.request(t, "确认立即收货吗？");
    },
    request: function(t, s) {
        var a = this, o = a.data.order_id;
        wx.showModal({
            title: "提示",
            content: s,
            success: function(s) {
                s.confirm && e.util.request({
                    url: "entry/wxapp/class",
                    data: t,
                    success: function(e) {
                        wx.showToast({
                            title: e.data.msg,
                            icon: "none",
                            success: function() {
                                if (0 == e.data.code) {
                                    a.setData({
                                        showSendModel: !1
                                    });
                                    var t = setTimeout(function() {
                                        clearTimeout(t), a.init(o);
                                    }, 1500);
                                }
                            }
                        });
                    }
                });
            }
        });
    }
});
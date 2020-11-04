var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        adoptid: "",
        config: [],
        adoptData: []
    },
    onLoad: function(a) {
        t.util.setNavColor();
        var e = this, n = a.adoptid;
        e.getAnimalDetail(n), e.setData({
            config: wx.getStorageSync("kundian_farm_setData")
        });
    },
    getAnimalDetail: function(e) {
        var n = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getAnimalDetail",
                control: "manage",
                adoptid: e,
                uniacid: a
            },
            success: function(t) {
                var a = t.data, o = a.adoptData, s = a.orderData;
                n.setData({
                    adoptData: o,
                    adoptid: e,
                    animalOrder: s
                });
            }
        });
    },
    releases: function(t) {
        var a = t.currentTarget.dataset.adoptid;
        wx.navigateTo({
            url: "../release/index?adoptid=" + a + "&plate=2"
        });
    },
    sendRequest: function(a, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, o = this;
        wx.showModal({
            title: "提示",
            content: a,
            success: function(a) {
                a.confirm && t.util.request({
                    url: "entry/wxapp/class",
                    data: e,
                    success: function(t) {
                        1 == n && wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        }), 3 == n && wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            success: function() {
                                0 == t.data.code && o.getAnimalDetail(o.data.adoptid);
                            }
                        });
                    }
                });
            }
        });
    },
    sendAdoptTemplateToUser: function(t) {
        var e = t.currentTarget.dataset, n = e.adoptid, o = e.statustxt, s = "确认要发送模板消息通知用户当前认养状态为" + o + "吗？", d = {
            op: "sendTemplateToUser",
            control: "manage",
            id: n,
            currentStatus: o,
            uniacid: a
        };
        this.sendRequest(s, d);
    },
    changeAdoptStstua: function(t) {
        var a = t.currentTarget.dataset, e = a.adoptid, n = a.statustxt, o = "确认修改认养状态为" + n + "吗？", s = {
            op: "changeAdoptStatus",
            control: "manage",
            adopt_id: e,
            currentStatus: n,
            status: a.status
        };
        this.sendRequest(o, s, 3);
    },
    updateAdoptNumber: function(t) {
        var a = t.detail.value, e = "确认要修改认养编号为" + a + "吗？", n = {
            op: "udpateAdoptNumber",
            control: "manage",
            adopt_id: t.currentTarget.dataset.adoptid,
            adopt_number: a
        };
        this.sendRequest(e, n);
    }
});
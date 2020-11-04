var t = new getApp(), i = t.siteInfo.uniacid;

wx.getStorageSync("uid_" + i);

Page({
    data: {
        bgColor: "",
        assistColor: "",
        click: !0,
        isShow: !1,
        distributionSet: [],
        config: []
    },
    onLoad: function(a) {
        var e = wx.getStorageSync("uid_" + i);
        e || wx.navigateTo({
            url: "../../login/index"
        });
        var o = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "apply_become_distribution",
                uniacid: i,
                uid: e
            },
            success: function(t) {
                -1 == t.data.code && wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function(t) {
                        wx.navigateTo({
                            url: "../../login/index"
                        });
                    }
                }), o.setData({
                    distributionSet: t.data.farmSetData
                }), t.data.is_distributor && wx.redirectTo({
                    url: "../index/index"
                });
            }
        }), o.copyWrite(), o.setData({
            bgColor: t.bgColor,
            assistColor: t.assistColor
        }), t.util.setNavColor();
    },
    copyWrite: function() {
        var i = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getConfig",
                type: "distribution"
            },
            success: function(t) {
                var a = t.data.config;
                a.dis_fenxiaoshang && wx.setNavigationBarTitle({
                    title: "申请成为" + a.dis_fenxiaoshang
                }), i.setData({
                    config: a
                });
            }
        });
    },
    click: function() {
        var t = this.data.click;
        this.setData({
            click: !t
        });
    },
    check: function() {
        this.setData({
            isShow: !0
        });
    },
    preventTouchMove: function() {},
    close: function() {
        this.setData({
            isShow: !1
        });
    },
    formSubmit: function(a) {
        var e = this, o = a.detail.value, n = o.name, s = o.phone, r = wx.getStorageSync("uid_" + i);
        if ("" != r && void 0 != r) {
            if ("" == n) return wx.showToast({
                title: "请填写姓名"
            }), !1;
            if ("" == s) return wx.showToast({
                title: "请填写手机号"
            }), !1;
            if (0 == e.data.click) return wx.showModal({
                title: "提示",
                content: "请先同意申请协议",
                showCancel: !1
            }), !1;
            var c = a.detail.formId;
            t.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "distribution",
                    op: "apply_distribution",
                    uniacid: i,
                    name: n,
                    phone: s,
                    uid: r,
                    form_id: c
                },
                success: function(t) {
                    wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1,
                        success: function() {
                            5 == t.data.code ? wx.redirectTo({
                                url: "../index/index"
                            }) : wx.reLaunch({
                                url: "../../user/center/index?is_tarbar=true"
                            });
                        }
                    });
                }
            });
        } else wx.navigateTo({
            url: "/kundian_farm/pages/login/index"
        });
    }
});
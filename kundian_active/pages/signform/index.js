var t = new getApp(), a = t.siteInfo.uniacid, e = t.util.getNewUrl("entry/wxapp/class", "kundian_farm_plugin_active");

Page({
    data: {
        signList: [ {
            name: "",
            id: "0",
            tel: "",
            IDCard: ""
        } ],
        activeid: "",
        active: [],
        total: 0,
        selectNum: 0,
        spec: [],
        activeSet: wx.getStorageSync("kundian_farm_active_set"),
        farmSetData: [],
        discount: 0
    },
    onLoad: function(i) {
        var s = this, n = i.activeid, d = i.total, o = i.selectNum, c = JSON.parse(i.spec), r = wx.getStorageSync("kundian_farm_setData");
        wx.request({
            url: e,
            data: {
                action: "active",
                op: "getActiveConfirm",
                uniacid: a,
                active_id: n,
                total: d
            },
            success: function(t) {
                var a = t.data, e = (a.active, a.total), i = a.discount;
                s.setData({
                    active: t.data.active,
                    activeid: n,
                    total: e,
                    discount: i
                });
            }
        }), s.setData({
            spec: c,
            total: d,
            selectNum: o,
            farmSetData: r
        }), t.util.setNavColor(a);
    },
    addSign: function() {
        var t = this.data.signList, a = {
            id: t[t.length - 1].id + 1,
            name: "",
            tel: "",
            IDCard: ""
        };
        t.push(a), this.setData({
            signList: t
        });
    },
    delete: function(t) {
        var a = [ t.currentTarget.dataset.index, this.data.signList ], e = a[0], i = a[1];
        console.log(e), i.splice(e, 1), this.setData({
            signList: i
        });
    },
    modifyName: function(t) {
        var a = [ t.currentTarget.dataset.index, t.detail.value, this.data.signList ], e = a[0], i = a[1], s = a[2];
        s[e].name = i, this.setData({
            signList: s
        });
    },
    modifytel: function(t) {
        var a = [ t.currentTarget.dataset.index, t.detail.value, this.data.signList ], e = a[0], i = a[1], s = a[2];
        s[e].tel = i, this.setData({
            signList: s
        });
    },
    modifyidcard: function(t) {
        var a = [ t.currentTarget.dataset.index, t.detail.value, this.data.signList ], e = a[0], i = a[1], s = a[2];
        s[e].IDCard = i, this.setData({
            signList: s
        });
    },
    confirm: function(i) {
        var s = this, n = wx.getStorageSync("uid_" + a);
        if (n) {
            for (var d = s.data, o = d.signList, c = d.activeid, r = d.spec, u = d.selectNum, l = d.total, f = d.active, g = d.discount, w = 0; w < o.length; w++) for (var m = 0; m < f.add_info.length; m++) {
                if ("姓名" == f.add_info[m] && "" == o[w].name) return wx.showToast({
                    title: "请填写" + f.add_info[m]
                }), !1;
                if ("联系电话" == f.add_info[m] && "" == o[w].tel) return wx.showToast({
                    title: "请填写" + f.add_info[m]
                }), !1;
                if ("身份证号" == f.add_info[m] && "" == o[w].IDCard) return wx.showToast({
                    title: "请填写" + f.add_info[m]
                }), !1;
            }
            var v = e + "&op=addOrder&action=active";
            wx.showLoading({
                title: "加载中"
            }), wx.request({
                url: v,
                method: "POST",
                data: {
                    sign: JSON.stringify(o),
                    activeid: c,
                    spec: JSON.stringify(r),
                    selectNum: u,
                    total: l,
                    uid: n,
                    uniacid: a,
                    formid: i.detail.formId,
                    discount: g
                },
                success: function(e) {
                    if (1 == e.data.code) {
                        var i = e.data.order_id;
                        if (l > 0) t.util.request({
                            url: "entry/wxapp/activePay",
                            data: {
                                orderid: i,
                                uniacid: a
                            },
                            cachetime: "0",
                            success: function(e) {
                                if (e.data && e.data.data && !e.data.errno) {
                                    var s = e.data.data.package;
                                    wx.requestPayment({
                                        timeStamp: e.data.data.timeStamp,
                                        nonceStr: e.data.data.nonceStr,
                                        package: e.data.data.package,
                                        signType: "MD5",
                                        paySign: e.data.data.paySign,
                                        success: function(e) {
                                            wx.showLoading({
                                                title: "加载中..."
                                            });
                                            var d = t.util.url("entry/wxapp/class") + "m=" + mudule_name;
                                            wx.request({
                                                url: d,
                                                data: {
                                                    action: "active",
                                                    op: "notify",
                                                    uniacid: a,
                                                    uid: n,
                                                    orderid: i,
                                                    prepay_id: s
                                                },
                                                success: function(t) {
                                                    wx.hideLoading(), wx.showToast({
                                                        title: "支付成功",
                                                        success: function(t) {
                                                            wx.redirectTo({
                                                                url: "../payforResult/index?status=true&order_id=" + i
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        },
                                        fail: function(t) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "您取消了支付",
                                                showCancel: !1,
                                                success: function() {
                                                    wx.redirectTo({
                                                        url: "../orderList/index"
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                "JSAPI支付必须传openid" == e.data.message && wx.navigateTo({
                                    url: "../../login/index"
                                }), "当前余票不足" == e.data.message && wx.showModal({
                                    title: "提示",
                                    content: e.data.message,
                                    showCancel: !1
                                });
                            },
                            fail: function(t) {
                                wx.showModal({
                                    title: "系统提示",
                                    content: t.data.message ? t.data.message : "错误",
                                    showCancel: !1,
                                    success: function(t) {
                                        t.confirm;
                                    }
                                });
                            }
                        }); else {
                            var s = t.util.url("entry/wxapp/active") + "m=" + mudule_name;
                            wx.request({
                                url: s,
                                data: {
                                    op: "notify",
                                    uniacid: a,
                                    uid: n,
                                    orderid: i
                                },
                                success: function(t) {
                                    wx.showToast({
                                        title: "支付成功",
                                        success: function(t) {
                                            wx.redirectTo({
                                                url: "../payforResult/index?status=true&order_id=" + i
                                            }), wx.hideLoading();
                                        }
                                    });
                                }
                            });
                        }
                    } else wx.hideLoading(), wx.showModal({
                        title: "提示",
                        content: e.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    }
});
var e = new getApp(), t = e.siteInfo.uniacid, o = e.util.getNewUrl("entry/wxapp/store", "kundian_farm_plugin_store");

Page({
    data: function(e, t, o) {
        return t in e ? Object.defineProperty(e, t, {
            value: o,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = o, e;
    }({
        avatarUrl: "",
        code: "",
        phone: "",
        setData: [],
        submit_text: "立即登录"
    }, "setData", []),
    onLoad: function(n) {
        var a = this, i = wx.getStorageSync("kundian_farm_wxInfo"), s = wx.getStorageSync("kundian_farm_setData"), r = wx.getStorageSync("storePhone" + t);
        r && void 0 != r ? wx.redirectTo({
            url: "../info/index?phone=" + r
        }) : (a.setData({
            avatarUrl: i.avatarUrl,
            setData: s
        }), e.util.setNavColor(e.siteInfo.uniacid), wx.request({
            url: o,
            data: {
                op: "storeLogin",
                control: "store",
                type: "getSet"
            },
            success: function(e) {
                a.setData({
                    setData: e.data.set
                });
            }
        }), wx.login({
            success: function(e) {
                a.setData({
                    code: e.code
                });
            }
        }));
    },
    getPhoneNumber: function(e) {
        if ("getPhoneNumber:fail user deny" != e.detail.errMsg) {
            var n = this, a = wx.getStorageSync("uid_" + t), i = n.data, s = i.code;
            i.userInfo;
            s ? wx.request({
                url: o,
                data: {
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv,
                    code: s,
                    op: "getPhoneNum",
                    uid: a,
                    control: "store"
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    var t = e.data, o = t.msg, a = t.phone;
                    wx.showToast({
                        title: o,
                        icon: "none"
                    }), n.setData({
                        phone: a
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            }) : wx.login({
                success: function(t) {
                    wx.login({
                        success: function(t) {
                            wx.request({
                                url: o,
                                data: {
                                    encryptedData: e.detail.encryptedData,
                                    iv: e.detail.iv,
                                    code: t.code,
                                    op: "getPhoneNum",
                                    uid: a,
                                    control: "store"
                                },
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(e) {
                                    var t = e.data, o = t.msg, a = t.phone;
                                    wx.showToast({
                                        title: o,
                                        icon: "none"
                                    }), n.setData({
                                        phone: a
                                    });
                                },
                                fail: function(e) {
                                    console.log(e);
                                }
                            });
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "您拒绝了授权！",
            showCancel: !1
        });
    },
    nowLogin: function(e) {
        var n = this, a = n.data.phone;
        "" != a && void 0 != a ? (n.setData({
            submit_text: "正在登陆..."
        }), wx.request({
            url: o,
            data: {
                op: "storeLogin",
                control: "store",
                type: "nowLogin",
                phone: a
            },
            success: function(e) {
                wx.showToast({
                    title: e.data.msg,
                    icon: "none",
                    success: function() {
                        if (0 == e.data.code) {
                            wx.setStorageSync("storePhone" + t, a);
                            var o = setTimeout(function() {
                                wx.navigateTo({
                                    url: "../info/index?phone=" + a
                                }), o && clearTimeout(o);
                            }, 1e3);
                        }
                    }
                });
            }
        })) : wx.showToast({
            title: "请授权手机号",
            icon: "none"
        });
    },
    toApply: function() {
        wx.redirectTo({
            url: "../apply/index"
        });
    }
});
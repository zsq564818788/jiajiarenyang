var t = new getApp(), i = t.siteInfo.uniacid;

Page({
    data: {
        height: 0,
        currentList: {},
        isShow: !1,
        animation1: {},
        animation2: {},
        animation3: {},
        animation4: {},
        landMine: [],
        currentDeviceInfo: [],
        farmSetData: [],
        isLoading: !1,
        countDownNum: 30,
        close_type: 0,
        bottom: 0,
        icon: [],
        is_data: !0
    },
    onLoad: function(a) {
        var e = this, n = wx.getStorageSync("uid_" + i);
        n ? (t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getControlAllLand",
                uniacid: i,
                uid: n,
                control: "control"
            },
            success: function(t) {
                var i = !0;
                t.data.landMine.length > 0 ? (i = !0, e.setData({
                    landMine: t.data.landMine,
                    currentList: t.data.landMine[0],
                    icon: t.data.icon,
                    is_data: i
                }), e.createAnimations()) : i = !1, e.setData({
                    is_data: i
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                var i = t.windowHeight - 40;
                e.setData({
                    height: i
                });
            }
        })) : wx.navigateTo({
            url: "../../../login/index"
        });
        var o = 0;
        t.globalData.sysData.model.indexOf("iPhone X") > -1 && (o = 68), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: o
        });
    },
    createAnimations: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), i = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), e = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        });
        if (1 == this.data.farmSetData.is_open_webthing && this.data.currentList.currentDeviceInfo && (t.width(this.data.currentList.currentDeviceInfo.watering + "%").step({
            duration: 1e3
        }), i.width(this.data.currentList.currentDeviceInfo.temp / 60 * 100 + "%").step({
            duration: 1e3
        }), a.width((this.data.currentList.currentDeviceInfo.co2 - 350) / 650 * 100 + "%").step({
            duration: 1e3
        }), e.width(this.data.currentList.currentDeviceInfo.illumination / 1e3 + "%").step({
            duration: 1e3
        }), this.setData({
            animation1: t.export(),
            animation2: i.export(),
            animation3: a.export(),
            animation4: e.export()
        })), 2 == this.data.farmSetData.is_open_webthing && this.data.currentList.device) {
            var n = this.data.currentList.device;
            n.temp && (t.width(n.temp.DevHumiValue + "%").step({
                duration: 1e3
            }), i.width(n.temp.DevTempValue / 60 * 100 + "%").step({
                duration: 1e3
            })), n.co2 && a.width((n.co2.DevHumiValue - 350) / 650 * 100 + "%").step({
                duration: 1e3
            }), n.light && e.width(n.light.DevHumiValue / 10 + "%").step({
                duration: 1e3
            }), this.setData({
                animation1: t.export(),
                animation2: i.export(),
                animation3: a.export(),
                animation4: e.export()
            });
        }
    },
    chooseItem: function(t) {
        var i = this, a = this, e = t.currentTarget.dataset.id, n = "";
        this.data.landMine.map(function(t) {
            t.id === e && (i.setData({
                currentList: t,
                isShow: !1
            }), n = t.did, a.createAnimations());
        });
    },
    select: function() {
        this.setData({
            isShow: !0
        });
    },
    close: function() {
        this.setData({
            isShow: !1
        });
    },
    gotoBuy: function(t) {
        wx.navigateTo({
            url: "../../../land/landList/index"
        });
    },
    watering: function(i) {
        var a = this, e = a.data.currentList;
        if (e.did) {
            var n = wx.getStorageSync("uid_" + o), o = t.siteInfo.uniacid, s = i.detail.formId;
            t.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "control",
                    op: "watering",
                    uniacid: o,
                    uid: n,
                    lid: e.id,
                    web_did: e.did,
                    formId: s
                },
                success: function(t) {
                    1 == t.data.code ? (a.setData({
                        close_type: 1
                    }), a.countDown(e.did, 1)) : wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "当前土地未绑定设备",
            showCancel: !1
        });
    },
    fertilization: function(i) {
        var a = this, e = a.data.currentList;
        if (e.did) {
            var n = wx.getStorageSync("uid_" + o), o = t.siteInfo.uniacid, s = i.detail.formId;
            t.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "fertilization",
                    control: "control",
                    uniacid: o,
                    uid: n,
                    lid: e.id,
                    web_did: e.did,
                    formId: s
                },
                success: function(t) {
                    1 == t.data.code ? (a.setData({
                        close_type: 2
                    }), a.countDown(e.did, 2)) : wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "当前土地未绑定设备",
            showCancel: !1
        });
    },
    killVer: function(i) {
        var a = this, e = a.data.currentList, n = wx.getStorageSync("uid_" + o), o = t.siteInfo.uniacid, s = i.detail.formId;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "killVer",
                control: "control",
                uniacid: o,
                uid: n,
                lid: e.id,
                web_did: e.did,
                formId: s
            },
            success: function(t) {
                1 == t.data.code ? (a.setData({
                    close_type: 3
                }), a.countDown(e.did, 3)) : wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    weeding: function(i) {
        var a = this.data.currentList, e = wx.getStorageSync("uid_" + n), n = t.siteInfo.uniacid, o = i.detail.formId;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "weeding",
                control: "control",
                uniacid: n,
                uid: e,
                lid: a.id,
                formId: o
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    countDown: function(t, i) {
        var a = this, e = 30;
        a.setData({
            isLoading: !0,
            countDownNum: 30
        }), a.setData({
            timer: setInterval(function() {
                e--, a.setData({
                    countDownNum: e
                }), 0 == e && (clearInterval(a.data.timer), a.setData({
                    isLoading: !1
                }), a.closeDevice(t, i));
            }, 1e3)
        });
    },
    closeDevice: function(i, a) {
        var e = this, n = t.siteInfo.uniacid, o = wx.getStorageSync("uid_" + n);
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "closeDevice",
                control: "control",
                web_did: i,
                close_type: a,
                uniacid: n,
                uid: o
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                }), e.setData({
                    close_type: 0
                });
            }
        });
    },
    onUnload: function(t) {
        var i = this, a = this.data.close_type, e = i.data.currentList;
        if (1 == a || 2 == a || 3 == a) {
            var n = e.did;
            i.closeDevice(n, a), clearInterval(i.data.timer);
        }
    }
});
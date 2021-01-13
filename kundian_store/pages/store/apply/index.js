var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = new getApp(), o = e.siteInfo.uniacid, a = e.util.getNewUrl("entry/wxapp/store", "kundian_farm_plugin_store");

Page({
    data: {
        logo: "",
        tmpPhoto: [],
        addressInfo: [],
        setData: [],
        code: "",
        phone: "",
        isApply: 2,
        store: [],
        name: "",
        intro: "",
        storeConfig: []
    },
    onLoad: function(t) {
        console.log(t)
        var o = wx.getStorageSync("kundian_farm_setData");
        this.setData({
            setData: o
        }), this.checkApply(), this.getConfig();
        var a = this;
        wx.login({
            success: function(t) {
                a.setData({
                    code: t.code
                });
            }
        }), e.util.setNavColor(e.siteInfo.uniacid);
    },
    getConfig: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getConfig",
                type: "store_apply"
            },
            success: function(e) {
                console.log(e)
                t.setData({
                    storeConfig: e.data.config
                });
            }
        });
    },
    getName: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    getIntro: function(t) {
        this.setData({
            intro: t.detail.value
        });
    },
    checkApply: function(t) {
        var e = this, n = wx.getStorageSync("uid_" + o);
        "" != n && void 0 != n ? wx.request({
            url: a,
            data: {
                op: "checkApply",
                control: "store",
                uid: n
            },
            success: function(t) {
                if (t.data.store) {
                    var o = t.data.store, a = {
                        address: o.address,
                        longitude: o.longitude,
                        latitude: o.latitude
                    };
                    e.setData({
                        addressInfo: a,
                        phone: o.phone,
                        logo: o.logo,
                        tmpPhoto: o.imgs,
                        name: o.name,
                        intro: o.intro
                    });
                }
                e.setData({
                    isApply: t.data.code,
                    store: t.data.store || []
                }), 1 == t.data.code && wx.showModal({
                    title: "提示",
                    content: "您已入驻了，请直接登录",
                    showCancel: !1,
                    success: function() {
                        wx.redirectTo({
                            url: "../login/index"
                        });
                    }
                });
            }
        }) : wx.navigateTo({
            url: "/kundian_farm/pages/login/index"
        });
    },
    onShow: function() {
        this.checkApply();
    },
    chooseImage: function(t) {
        var o = this, a = t.currentTarget.dataset.type;
        if (1 != a) {
            if (2 == a) {
                var n = e.siteInfo.siteroot.replace("app/index.php", "web/index.php") + "?i=" + e.siteInfo.uniacid + "&c=utility&a=file&do=upload&thumb=0";
                wx.chooseImage({
                    success: function(t) {
                        var e = t.tempFilePaths, a = [];
                        if (e.length > 0) {
                            wx.showToast({
                                title: "正在上传...",
                                icon: "loading",
                                mask: !0,
                                duration: 1e4
                            });
                            for (var i = 0, s = 0; s < e.length; s++) wx.uploadFile({
                                url: n,
                                filePath: e[s],
                                name: "file",
                                formData: {
                                    op: "upload_file"
                                },
                                success: function(t) {
                                    i++;
                                    var n = JSON.parse(t.data);
                                    a.push(n.url), i == e.length && (wx.hideToast(), o.setData({
                                        tmpPhoto: a
                                    }));
                                }
                            });
                        }
                    }
                });
            }
        } else wx.chooseImage({
            count: 1,
            success: function(t) {
                var a = e.siteInfo.siteroot.replace("app/index.php", "web/index.php") + "?i=" + e.siteInfo.uniacid + "&c=utility&a=file&do=upload&thumb=0";
                wx.uploadFile({
                    url: a,
                    filePath: t.tempFilePaths[0],
                    name: "file",
                    formData: {
                        op: "upload_file"
                    },
                    success: function(t) {
                        var e = JSON.parse(t.data);
                        o.setData({
                            logo: e.url
                        });
                    }
                });
            }
        });
    },
    chooseAddress: function(t) {
        var e = this;
        wx.chooseLocation({
            success: function(t) {
                e.setData({
                    addressInfo: t
                });
            }
            // ,
            // fail: function(t) {
            //     console.log(t), wx.showModal({
            //         title: "提示",
            //         content: "无法打开地址",
            //         showCancel: !1
            //     });
            // }
        });
    },
    delImg: function(t) {
        this.data.tmpPhoto.splice(t.currentTarget.dataset.index, 1), this.setData({
            tmpPhoto: this.data.tmpPhoto
        });
    },
    viewImage: function(t) {
        wx.previewImage({
            urls: this.data.tmpPhoto,
            current: t.currentTarget.dataset.url
        });
    },
    submitData: function(n) {
        console.log(n)
        console.log(this)
        var y={
            "store_pay_in": 0,
            "store_pay_price": 1
        };
        var i = this, s = n.detail.value, d = s.name, c = s.phone, r = s.intro, l = n.detail.formId, u = i.data, p = u.tmpPhoto, f = u.addressInfo, g = u.logo, h = u.store, w = u.storeConfig ;
        if(w == undefined){
            w = y
        }
        
        console.log(u)
        if ("" != g && void 0 != g) if ("" != d && void 0 != d) if ("" != c && void 0 != c) if ("" != f && void 0 != (void 0 === f ? "undefined" : t(f))) if ("" != r && void 0 != r) {
            var m = wx.getStorageSync("uid_" + o), x = "";
            p.length > 0 && (x = p.join(",")), 1 != w.store_pay_in || 0 == w.store_pay_price || h.id ? wx.request({
                url: a,
                data: {
                    op: "storeApply",
                    control: "store",
                    name: d,
                    phone: c,
                    intro: r,
                    src: x,
                    logo: g,
                    formId: l,
                    uid: m,
                    id: h.id,
                    address: f.address,
                    longitude: f.longitude,
                    latitude: f.latitude
                },
                success: function(t) {
                    wx.showToast({
                        title: t.data.msg,
                        icon: "none"
                    }), 0 == t.data.code && i.setData({
                        isApply: 0
                    });
                }
            }) : wx.request({
                url: a,
                data: {
                    op: "storeApply",
                    control: "store",
                    store_pay_in: !0,
                    total_price: w.store_pay_price,
                    name: d,
                    phone: c,
                    intro: r,
                    src: x,
                    logo: g,
                    formId: l,
                    uid: m,
                    id: h.id,
                    address: f.address,
                    longitude: f.longitude,
                    latitude: f.latitude
                },
                success: function(t) {
                    console.log(t)  
                    if (0 == t.data.code) {
                        var n = t.data.order_id, s = e.util.getNewUrl("entry/wxapp/pay", "kundian_farm_plugin_store");
                        console.log(e)
                        wx.request({
                            url: s,
                            data: {
                                orderid: n,
                                control: "store",
                                op: "getStoreApplyOrder",
                                uniacid: o
                            },
                            cachetime: "0",
                            success: function(t) {
                                console.log(t)
                                console.log("2222"+t.data && t.data.data && !t.data.errno +"")
                                if (t.data && t.data.data && !t.data.errno) {
                                    var e = t.data.data.package;
                                    wx.requestPayment({
                                        timeStamp: t.data.data.timeStamp,
                                        nonceStr: t.data.data.nonceStr,
                                        package: t.data.data.package,
                                        signType: "MD5",
                                        paySign: t.data.data.paySign,
                                        success: function(t) {
                                            console.log(t)
                                            wx.showLoading({
                                                title: "加载中"
                                            }), wx.request({
                                                url: a,
                                                data: {
                                                    control: "store",
                                                    op: "sendMsg",
                                                    order_id: n,
                                                    uniacid: o,
                                                    prepay_id: e
                                                },
                                                success: function(t) {
                                                    console.log(t)
                                                    wx.showModal({
                                                        title: "提示",
                                                        content: "支付成功",
                                                        showCancel: !1,
                                                        success: function() {
                                                            1 != t.data.isApply ? i.setData({
                                                                isApply: 0
                                                            }) : wx.navigateTo({
                                                                url: "../login/index"
                                                            });
                                                        }
                                                    }), wx.hideLoading();
                                                }
                                            });
                                        },
                                        fail: function(t) {
                                            console.log(t)
                                            wx.showModal({
                                                title: "提示",
                                                content: "您取消了支付",
                                                showCancel: !1,
                                                success: function() {}
                                            });
                                        }
                                    });
                                }
                            },
                            fail: function(t) {
                                "JSAPI支付必须传openid" == t.data.message ? wx.navigateTo({
                                    url: "/kundian_farm/pages/login/index"
                                }) : wx.showModal({
                                    title: "系统提示",
                                    content: t.data.message ? t.data.message : "错误",
                                    showCancel: !1,
                                    success: function(t) {
                                        t.confirm;
                                    }
                                });
                            }
                        });
                    }
                }
            });
        } else wx.showToast({
            title: "请填写商户简介",
            icon: "none"
        }); else wx.showToast({
            title: "请选择商户地址",
            icon: "none"
        }); else wx.showToast({
            title: "请授权手机号码",
            icon: "none"
        }); else wx.showToast({
            title: "请填写商户名称",
            icon: "none"
        }); else wx.showToast({
            title: "请先上传logo",
            icon: "none"
        });
    },
    getPhoneNumber: function(t) {
        if ("getPhoneNumber:fail user deny" != t.detail.errMsg) {
            var e = this, n = wx.getStorageSync("uid_" + o), i = e.data, s = i.code;
            i.userInfo;
            s ? wx.request({
                url: a,
                data: {
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv,
                    code: s,
                    op: "getPhoneNum",
                    uid: n,
                    control: "store"
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    var o = t.data, a = o.msg, n = o.phone;
                    wx.showToast({
                        title: a,
                        icon: "none"
                    }), 0 == t.data.code && e.setData({
                        phone: n,
                        code: ""
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            }) : wx.login({
                success: function(o) {
                    wx.login({
                        success: function(o) {
                            wx.request({
                                url: a,
                                data: {
                                    encryptedData: t.detail.encryptedData,
                                    iv: t.detail.iv,
                                    code: o.code,
                                    op: "getPhoneNum",
                                    uid: n,
                                    control: "store"
                                },
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(t) {
                                    var o = t.data, a = o.msg, n = o.phone;
                                    wx.showToast({
                                        title: a,
                                        icon: "none"
                                    }), e.setData({
                                        phone: n,
                                        code: ""
                                    });
                                },
                                fail: function(t) {
                                    console.log(t);
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
    }
});
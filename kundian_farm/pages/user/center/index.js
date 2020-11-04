var a = new getApp(), e = a.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        bgColor: a.bgColor,
        assistColor: a.assistColor,
        nickName: "",
        avatarUrl: "../../../images/icon/moren.png",
        back_img: "",
        noPayCount: 0,
        peiCount: 0,
        getCount: 0,
        is_admin: 2,
        setData: [],
        is_distributor: 0,
        aboutData: [],
        tarbar: a.tarbar,
        is_tarbar: !1,
        userInfo: [],
        styleType: 2,
        page: [],
        kefu: {
            cover: "",
            url: "/kundian_farm/pages/user/center/index?is_tarbar=true",
            title: ""
        }
    },
    onLoad: function(t) {
        var n = this, r = a.tarbar, i = a.bgColor, o = a.assistColor, s = parseInt(new Date().valueOf()), u = wx.getStorageSync("farmCenterPage");
        !u || wx.getStorageSync("farmCenterPage" + e) < s ? n.getCenterPage() : this.setData({
            page: u,
            styleType: u.currentType
        });
        var d = wx.getStorageSync("uid_" + e), g = wx.getStorageSync("kundian_farm_setData"), c = !1;
        t.is_tarbar && (c = t.is_tarbar);
        var l = this.data.kefu;
        if (g.kefu_card) {
            var f = g.kefu_card;
            l.title = f.title || "个人中心", l.cover = f.cover || this.data.avatarUrl;
        }
        n.setData({
            setData: g,
            is_tarbar: c,
            kefu: l,
            bgColor: i,
            assistColor: o,
            tarbar: r
        }), d || wx.navigateTo({
            url: "../../login/index"
        }), a.util.setNavColor(e);
    },
    getCenterPage: function(t) {
        var n = this;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getCenterPage",
                control: "index",
                uniacid: e
            },
            success: function(a) {
                var t = a.data.centerPage;
                n.setData({
                    page: t,
                    styleType: t.currentType
                });
                var r = parseInt(new Date().valueOf()) + 18e5;
                wx.setStorageSync("farmCenterPage", t), wx.setStorageSync("farmCenterPage" + e, r);
            }
        });
    },
    getUserData: function() {
        var t = this, n = wx.getStorageSync("uid_" + e);
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getUserInfo",
                control: "index",
                uid: n,
                uniacid: e
            },
            success: function(a) {
                var e = a.data, n = e.noPayCount, r = e.peiCount, i = e.getCount, o = e.is_admin, s = e.back_img, u = e.aboutData, d = a.data.userInfo || {};
                Object.keys(d).length > 0 ? a.data.userInfo.avatarurl && void 0 != a.data.userInfo.avatarurl && t.setData({
                    nickName: d.nickname,
                    avatarUrl: d.avatarurl,
                    is_distributor: d.is_distributor || 0,
                    noPayCount: n,
                    peiCount: r,
                    getCount: i,
                    is_admin: o,
                    userInfo: d,
                    aboutData: u,
                    back_img: s
                }) : t.setData({
                    noPayCount: n,
                    peiCount: r,
                    getCount: i,
                    is_admin: o,
                    userInfo: d,
                    aboutData: u,
                    back_img: s
                }), d || (wx.removeStorageSync("kundian_farm_wxInfo"), wx.removeStorageSync("userInfo"), 
                wx.navigateTo({
                    url: "../../login/index"
                }));
            }
        });
    },
    onShow: function(a) {
        var e = this, t = wx.getStorageSync("kundian_farm_wxInfo");
        t && e.setData({
            avatarUrl: t.avatarUrl,
            nickName: t.nickName
        }), this.getUserData(), e.setData({
            tarbar: wx.getStorageSync("kundianFarmTarbar")
        });
    },
    intoOrder: function(a) {
        var e = a.currentTarget.dataset.status;
        wx.navigateTo({
            url: "../../shop/orderList/index?status=" + e
        });
    },
    updateUserInfo: function(a) {
        var e = this, t = getApp(), n = t.siteInfo.uniacid;
        t.util.getUserInfo(function(a) {
            wx.setStorageSync("uid_" + n, a.memberInfo.uid), wx.setStorageSync("kundian_farm_sessionid", a.sessionid), 
            wx.setStorageSync("kundian_farm_wxInfo", a.wxInfo), console.log(a.wxInfo);
            var r = a.memberInfo, i = a.wxInfo.avatarUrl, o = a.wxInfo.nickName, s = r.uid;
            if (e.setData({
                nickName: o,
                avatarUrl: i
            }), !s) return wx.showModal({
                title: "提示",
                content: "获取用户UID失败",
                showCancel: !1
            }), !1;
            t.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "login",
                    control: "index",
                    avatar: r.avatar,
                    nickname: r.nickname,
                    uid: s,
                    uniacid: n,
                    wxNickName: o,
                    wxAvatar: i
                },
                success: function(a) {
                    var e = wx.getStorageSync("farm_share_uid");
                    void 0 != e && 0 != e && t.loginBindParent(e, s), wx.showModal({
                        title: "提示",
                        content: a.data.msg,
                        showCancel: !1
                    });
                }
            });
        }, a.detail);
    },
    onPullDownRefresh: function(t) {
        var n = this, r = wx.getStorageSync("kundian_farm_wxInfo");
        r && n.setData({
            avatarUrl: r.avatarUrl,
            nickName: r.nickName
        }), n.getCenterPage(), n.getUserData(), a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getCommonData",
                control: "index",
                uniacid: e
            },
            success: function(e) {
                var t = e.data, r = t.tarbar, i = t.farmSetData;
                a.bgColor = i.background_color, a.assistColor = i.assist_color, n.setData({
                    tarbar: r,
                    farmSetData: i
                }), wx.setStorageSync("kundianFarmTarbar", r), wx.setStorageSync("kundian_farm_setData", i);
            }
        }), wx.stopPullDownRefresh();
    },
    intoAdmin: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/manage/center/index"
        });
    },
    callPhone: function(a) {
        var e = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    intoMenuDetail: function(a) {
        var e = this, t = a.currentTarget.dataset.menutype, n = a.currentTarget.dataset.url;
        if ("center_address" == t) wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index"
        }); else if ("center_sale" == t) {
            var r = e.data.is_distributor;
            1 == r ? wx.navigateTo({
                url: "/kundian_farm/pages/distribution/index/index"
            }) : 2 == r ? wx.navigateTo({
                url: "/kundian_farm/pages/distribution/examine/index"
            }) : wx.navigateTo({
                url: "/kundian_farm/pages/distribution/addinfo/index"
            });
        } else "center_animal" == t ? wx.navigateTo({
            url: "/kundian_farm/pages/" + n + "?current=4"
        }) : "center_land" == t ? wx.navigateTo({
            url: "/kundian_farm/pages/land/order/index"
        }) : "center_set" == t ? wx.navigateTo({
            url: "/kundian_farm/pages/user/install/index"
        }) : "center_funding" == t ? wx.navigateTo({
            url: "/kundian_funding/pages/orderList/index"
        }) : "center_active" == t ? wx.navigateTo({
            url: "/kundian_active/pages/orderList/index"
        }) : "plugin_pt" == t ? wx.navigateTo({
            url: "/kundian_pt/pages/orderLists/index"
        }) : "center_store" == t ? wx.navigateTo({
            url: "/kundian_store/pages/store/login/index"
        }) : "center_store_apply" == t ? wx.navigateTo({
            url: "/kundian_store/pages/store/apply/index"
        }) : wx.navigateTo({
            url: "/kundian_farm/pages/" + n
        });
    },
    intoSetting: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/install/index"
        });
    },
    intoScoreRecord: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/integral/record/index"
        });
    },
    intoMoney: function() {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/wallet/index"
        });
    },
    intoSign: function() {
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/integral/index/index"
        });
    },
    showSystemInfo: function(t) {
        var n = "domain=" + a.siteInfo.siteroot + ";uid=" + wx.getStorageSync("uid_" + e) + ";uniacid=" + a.siteInfo.uniacid;
        wx.showModal({
            title: "提示",
            content: n,
            showCancel: !1
        });
    }
});
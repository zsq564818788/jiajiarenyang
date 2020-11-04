var a = require("../../../../wxParse/wxParse.js"), t = new getApp(), i = t.siteInfo.uniacid;

Page({
    data: {
        bgColor: t.bgColor,
        assistColor: t.assistColor,
        index: "1",
        state: !1,
        count: 1,
        animalData: [],
        aid: "",
        aboutData: [],
        farmSetData: [],
        isShow: !1,
        is_loading: !0,
        bottom: t.bottom,
        kefu: {
            cover: "",
            url: "/kundian_farm/pages/shop/AdoptRules/index",
            title: ""
        },
        cuIndex: -1,
        live: [],
        is_limit: !1
    },
    preventTouchMove: function() {},
    onLoad: function(e) {
        var n = this, o = t.bgColor, s = t.assistColor, u = e.aid, r = n.data.kefu, c = wx.getStorageSync("kundian_farm_setData");
        if (c.kefu_card) {
            var l = c.kefu_card;
            r.title = l.title || "认养详情", r.cover = l.cover || this.data.avatarUrl;
        }
        r.url = "/kundian_farm/pages/shop/AdoptRules/index?aid=" + u, n.setData({
            farmSetData: c,
            kefu: r,
            bgColor: o,
            assistColor: s
        }), t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "animalDetail",
                aid: u,
                uniacid: i
            },
            success: function(t) {
                var i = t.data, e = i.animalData, o = i.aboutData;
                n.setData({
                    animalData: e,
                    aid: u,
                    aboutData: o
                }), e.limit_purchase > 0 && n.checkUserLimit(), "" != e.detail_desc && a.wxParse("article", "html", e.detail_desc, n, 5);
            }
        }), n.liveInit(u);
        var d = e.user_uid, h = wx.getStorageSync("uid_" + i);
        t.loginBindParent(d, h), void 0 != d && 0 != d && n.setData({
            user_uid: d
        }), t.util.setNavColor();
    },
    changeCu: function(a) {
        this.setData({
            cuIndex: a.currentTarget.dataset.cuindex
        });
    },
    liveInit: function(a) {
        var i = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "live",
                op: "liveOther",
                type: "animal",
                aid: a
            },
            success: function(a) {
                i.setData({
                    live: a.data.live
                });
            }
        });
    },
    checkUserLimit: function() {
        var a = this, i = a.data.aid;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "checkLimitPurchase",
                aid: i
            },
            success: function(t) {
                console.log(t), t.data.buy_count > 0 && a.setData({
                    is_limit: !0
                });
            }
        });
    },
    onShow: function(a) {
        var e = this.data.user_uid, n = wx.getStorageSync("uid_" + i);
        t.loginBindParent(e, n), void 0 != e && 0 != e && this.setData({
            user_uid: e
        });
    },
    showMode: function() {
        var a = wx.getStorageSync("uid_" + i);
        void 0 == a || 0 == a ? wx.navigateTo({
            url: "../../login/index"
        }) : this.setData({
            state: !0
        });
    },
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        var a = this.data, t = a.count, i = a.animalData;
        parseInt(t) + 1 > i.count ? wx.showToast({
            title: "库存不足",
            icon: "none"
        }) : this.setData({
            count: parseInt(t) + 1
        });
    },
    chooseNum: function(a) {
        var t = this.data, i = (t.count, t.animalData);
        a.detail.value > i.count ? wx.showToast({
            title: "库存不足",
            icon: "none"
        }) : this.setData({
            count: a.detail.value
        });
    },
    goHome: function(a) {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index?is_tarbar=true"
        });
    },
    doCall: function(a) {
        wx.makePhoneCall({
            phoneNumber: a.currentTarget.dataset.phone
        });
    },
    sureAnimal: function(a) {
        var t = this.data, i = t.aid, e = t.animalData, n = t.count;
        t.is_limit || e.limit_purchase > 0 && parseInt(n) > e.limit_purchase ? wx.showToast({
            title: "该商品有限购" + e.limit_purchase + e.unit,
            icon: "none"
        }) : parseInt(n) > parseInt(e.count) ? wx.showToast({
            title: "库存不足",
            icon: "none"
        }) : (wx.setStorageSync("kundian_farm_buy_animal", e), wx.navigateTo({
            url: "../confirmAdopt/index?count=" + n + "&aid=" + i
        }));
    },
    onShareAppMessage: function() {
        var a = this.data.animalData, t = wx.getStorageSync("uid_" + i);
        return {
            path: "/kundian_farm/pages/shop/AdoptRules/index?aid=" + a.id + "&user_uid=" + t,
            success: function(a) {},
            title: a.animal_name,
            imageUrl: a.animal_src
        };
    },
    play: function(a) {
        this.setData({
            is_loading: !1
        });
    },
    chengeIndex: function(a) {
        this.setData({
            index: a.currentTarget.dataset.index
        });
    }
});
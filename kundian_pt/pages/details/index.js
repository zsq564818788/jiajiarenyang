Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../utils/util"), t = require("../../../wxParse/wxParse.js"), a = getApp(), i = {}, n = a.siteInfo.uniacid, s = a.util.getNewUrl("entry/wxapp/pt", "kundian_farm_plugin_pt");

Page({
    data: {
        isFullScreen: !1,
        currentClass: "1",
        isSelect: !1,
        endTime: "",
        countDown: {
            sec: 0,
            min: 0,
            hour: 0,
            day: 0
        },
        finised: !1,
        lists: [],
        commentList: [],
        selected: "",
        selectNum: 1,
        goods: [],
        spec: [],
        selectSku: [],
        buy_types: 2,
        relation_id: "",
        page: 1,
        uid: 0,
        farmSetData: [],
        ptIng: [],
        list: []
    },
    onLoad: function(o) {
        this.setData({
            isFullScreen: a.globalData.isFullScreen
        });
        var c = wx.getStorageSync("uid_" + n), r = this, d = o.goodsid, u = wx.getStorageSync("kundian_farm_setData"), l = "";
        o.relation_id && (l = o.relation_id), wx.request({
            url: s,
            data: {
                op: "getPtDetail",
                action: "index",
                goods_id: d,
                uniacid: n
            },
            success: function(a) {
                var n = a.data, s = n.goods, o = n.spec, d = n.ptOrder, m = n.commentList, f = n.ptIng, p = s.limit_time;
                r.setData({
                    goods: s,
                    spec: o,
                    endTime: p,
                    lists: d,
                    relation_id: l,
                    commentList: m,
                    ptIng: f,
                    uid: c,
                    farmSetData: u
                });
                var g = d;
                g.map(function(t, a) {
                    t.finised || (i["time" + a] = setInterval(function() {
                        var n = e.countDown(t.endTime);
                        t.hour = n.hour, t.min = n.min, t.sec = n.sec, 0 == n.day && 0 == n.hour && 0 == n.sec && 0 == n.min && (t.finised = !0, 
                        clearInterval(i["time" + a])), g[a] = t, r.setData({
                            lists: g
                        });
                    }, 1e3));
                }), i.time = setInterval(function() {
                    var t = e.countDown(p);
                    0 == t.day && 0 == t.hour && 0 == t.sec && 0 == t.min && (r.setData({
                        finised: !0
                    }), clearInterval(i.time)), r.setData({
                        countDown: t
                    });
                }, 1e3), "" != s.content && t.wxParse("article", "html", s.content, r, 5);
            }
        });
    },
    onShow: function() {
        var t = this, a = this.data, n = a.lists, s = a.endTime;
        n && n.map(function(a, s) {
            a.finised || (i["time" + s] = setInterval(function() {
                var o = e.countDown(a.endTime);
                a.hour = o.hour, a.min = o.min, a.sec = o.sec, 0 == o.day && 0 == o.hour && 0 == o.sec && 0 == o.min && (a.finised = !0, 
                clearInterval(i["time" + s])), n[s] = a, t.setData({
                    lists: n
                });
            }, 1e3));
        }), s && (i.time = setInterval(function() {
            var a = e.countDown(s);
            0 == a.day && 0 == a.hour && 0 == a.sec && 0 == a.min && (t.setData({
                finised: !0
            }), clearInterval(i.time)), t.setData({
                countDown: a
            });
        }, 1e3));
    },
    onHide: function() {
        var e = this.data, t = e.finised, a = e.lists;
        t || (clearInterval(i.time), a && a.length > 0 && a.map(function(e, t) {
            clearInterval(i["time" + t]);
        }));
    },
    changeClass: function(e) {
        var t = e.currentTarget.dataset.class;
        t != this.data.currentClass && this.setData({
            currentClass: t
        });
    },
    preventTouchMove: function() {},
    selectSpec: function(e) {
        var t = this.data.isSelect, i = e.currentTarget.dataset.types || 2;
        this.setData({
            isSelect: !t,
            buy_types: i
        }), t || a.util.saveFormId(e.detail.formId, n);
    },
    selected: function(e) {
        var t = "", a = e.currentTarget.dataset, i = a.valid, n = a.specid, s = this.data, o = s.spec, c = s.goods, r = s.selectSpec, d = c.sku;
        o.map(function(e) {
            e.id == n && e.specVal.map(function(e) {
                e.selected = !1, e.id == i && (e.selected = !0);
            });
        });
        var u = [];
        o.map(function(e) {
            e.specVal.map(function(e) {
                e.selected && (t += "  " + e.spec_value, u.push(e.id));
            });
        }), d.map(function(e) {
            e.sku_name == u.join(",") && (r = e);
        }), this.setData({
            selected: t,
            spec: o,
            selectSpec: r || []
        });
    },
    reduce: function() {
        var e = this.data.selectNum;
        e <= 1 || this.setData({
            selectNum: e - 1
        });
    },
    add: function() {
        var e = this.data.selectNum;
        this.setData({
            selectNum: e + 1
        });
    },
    inputNum: function(e) {
        var t = Number(e.detail.value);
        this.setData({
            selectNum: t
        });
    },
    goHome: function(e) {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index"
        });
    },
    confirmOrder: function(e) {
        var t = this.data, i = t.goods, s = t.selectNum, o = t.selectSpec, c = t.buy_types, r = t.selected, d = t.relation_id;
        if ("1" == i.is_open_sku) {
            if (!o || void 0 == o || o.length <= 0) return wx.showToast({
                title: "请选择规格",
                icon: "none"
            }), !1;
        } else if (s > i.count) return void wx.showToast({
            title: "库存不足",
            icon: "none"
        });
        a.util.saveFormId(e.detail.formId, n), wx.navigateTo({
            url: "../confirmOrder/index?selectNum=" + s + "&selectSpec=" + JSON.stringify(o) + "&goods_id=" + i.id + "&buy_types=" + c + "&selected=" + r + "&relation_id=" + d
        });
    },
    onShareAppMessage: function(e) {
        var t = this.data.goods, a = wx.getStorageSync("uid_" + n);
        return {
            path: "/kundian_pt/pages/details/index?goodsid=" + t.id + "&user_uid=" + a,
            success: function(e) {},
            title: t.goods_name,
            imageUrl: t.cover
        };
    },
    pinDan: function(e) {
        var t = e.currentTarget.dataset.relationid;
        this.setData({
            isSelect: !0,
            relation_id: t,
            buy_types: 2
        });
    },
    previewImg: function(e) {
        var t = e.currentTarget.dataset, a = t.commentid, i = t.index, n = [];
        this.data.commentList.map(function(e) {
            a == e.id && (n = e.src);
        }), wx.previewImage({
            urls: n,
            current: n[i]
        });
    },
    onReachBottom: function(e) {
        var t = this, a = this.data, i = a.currentClass, o = a.page, c = a.goods, r = a.commentList;
        1 != i && (o = parseInt(o) + 1, wx.request({
            url: s,
            data: {
                op: "getPtCommentList",
                action: "index",
                uniacid: n,
                goods_id: c.id,
                page: o
            },
            success: function(e) {
                e.data.commentList && (e.data.commentList.map(function(e) {
                    r.push(e);
                }), t.setData({
                    commentList: r,
                    page: o
                }));
            }
        }));
    },
    updateUserInfo: function(e) {
        if ("getUserInfo:fail auth deny" == e.detail.errMsg) return wx.showModal({
            title: "提示",
            content: "您取消了授权",
            showCancel: !1
        }), !1;
        var t = new getApp(), a = this, i = t.siteInfo.uniacid;
        t.util.getUserInfo(function(e) {
            wx.showLoading({
                title: "登录中..."
            }), console.log(e), wx.setStorageSync("uid_" + i, e.memberInfo.uid), wx.setStorageSync("kundian_farm_sessionid", e.sessionid), 
            wx.setStorageSync("kundian_farm_wxInfo", e.wxInfo);
            var n = e.wxInfo.avatarUrl, s = e.wxInfo.nickName, o = e.memberInfo, c = {
                op: "login",
                action: "index",
                control: "home",
                avatar: o.avatar,
                uid: o.uid,
                nickname: o.nickname,
                uniacid: i,
                wxNickName: s,
                wxAvatar: n
            };
            t.util.request({
                url: "entry/wxapp/class",
                data: c,
                success: function(e) {
                    wx.setStorageSync("uid_" + i, e.data.uid), 0 == e.data.code ? a.setData({
                        uid: e.data.uid
                    }) : wx.showToast({
                        title: "登录失败",
                        icon: "none"
                    }), wx.hideLoading();
                }
            });
        }, e.detail);
    }
});
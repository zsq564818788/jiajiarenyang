var t = require("../../../../wxParse/wxParse.js"), o = new getApp(), e = o.siteInfo.uniacid;

Page({
    data: {
        isIphoneX: o.globalData.isIphoneX,
        statusBarHeight: o.globalData.statusBarHeight,
        titleBarHeight: o.globalData.titleBarHeight,
        bgColor: o.bgColor,
        assistColor: o.assistColor,
        pageScrollTop: 0,
        scrollShow: !1,
        currentIndex: 1,
        goodsData: [],
        goodsid: "",
        is_show: "1",
        specItem: [],
        count: 1,
        price: "",
        spec_src: "",
        spec_id: "",
        buy_type: 1,
        specVal: [],
        user_uid: "",
        farmSetData: [],
        show_haibao: !1,
        show_goods_shop_model_mask: !1,
        bottom: 0,
        slideCurrentIndex: 1,
        commentCount: 0,
        commentList: [],
        is_create_poster: !1,
        local_src: "",
        post_src: "",
        showHome: !1,
        showIcon: !0,
        kefu: {
            cover: "",
            url: "/kundian_farm/pages/shop/prodeteils/index",
            title: ""
        },
        isServer: !1,
        istopShow: !0,
        nav_opacity: 0,
        scrollTop: 0,
        product: {},
        cuIndex: -1
    },
    onLoad: function(t) {
        var a = this, s = o.bgColor, i = o.assistColor, n = t.goodsid;
        if (a.setData({
            bgColor: s,
            assistColor: i
        }), n) {
            var c = t.user_uid, d = wx.getStorageSync("uid_" + e);
            o.loginBindParent(c, d), void 0 != c && 0 != c && a.setData({
                user_uid: c,
                showHome: !0,
                showIcon: !1
            });
            var r = 0;
            o.globalData.sysData.model.indexOf("iPhone X") > -1 && (r = 68), a.getGoodsDetailData(n), 
            a.liveInit(n), o.util.setNavColor(e);
            var l = this.data.kefu;
            l.url = "/kundian_farm/pages/shop/prodeteils/index?goodsid=" + n, a.setData({
                farmSetData: wx.getStorageSync("kundian_farm_setData"),
                bottom: r,
                kefu: l,
                goodsid: n
            });
        } else wx.showModal({
            title: "提示",
            content: "当前商品不存在或已下架！",
            showCancel: "false",
            success: function() {
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    changeCu: function(t) {
        var o = t.currentTarget.dataset.cuindex;
        this.setData({
            cuIndex: o
        });
    },
    onShow: function(t) {
        var a = this.data.user_uid, s = wx.getStorageSync("uid_" + e);
        o.loginBindParent(a, s);
    },
    setCurrent: function(t) {
        this.setData({
            slideCurrentIndex: parseInt(t.detail.current) + 1
        });
    },
    getGoodsDetailData: function(a) {
        var s = this, i = this.data.kefu, n = wx.getStorageSync("kundian_farm_setData");
        o.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getGoodsDetail",
                uniacid: e,
                goodsid: a
            },
            success: function(o) {
                var e = o.data, c = e.goodsData, d = e.specItem, r = e.commentCount, l = e.commentList;
                if (n.kefu_card) {
                    var u = n.kefu_card;
                    i.title = u.title || c.goods_name, i.cover = u.cover || c.cover;
                }
                s.setData({
                    goodsData: c,
                    goodsid: a,
                    specItem: d,
                    commentCount: r,
                    commentList: l,
                    kefu: i
                }), "" != o.data.goodsData.goods_desc && t.wxParse("article", "html", o.data.goodsData.goods_desc, s, 5);
            }
        });
    },
    liveInit: function(t) {
        var e = this;
        o.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "live",
                op: "liveOther",
                type: "goods_detail",
                goods_id: t
            },
            success: function(t) {
                e.setData({
                    live: t.data.live
                });
            }
        });
    },
    on_error: function(t) {
        console.log(t);
    },
    showMode: function(t) {
        var a = this, s = a.data.goodsData, i = wx.getStorageSync("uid_" + e);
        if (i) if (1 == s.is_open_sku) a.setData({
            is_show: 2,
            buy_type: 2
        }); else {
            var n = a.data, c = n.goodsid, d = n.count;
            o.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "cart",
                    op: "addCart",
                    goods_id: c,
                    uniacid: e,
                    count: d,
                    uid: i
                },
                success: function(t) {
                    1 == t.data.code ? wx.showToast({
                        title: "已加入购物车"
                    }) : wx.showToast({
                        title: "操作失败"
                    });
                }
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    },
    hideModal: function() {
        this.setData({
            is_show: 1
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        var t = parseInt(this.data.count) + 1;
        this.setData({
            count: t
        });
    },
    chooseNum: function(t) {
        var o = t.detail.value;
        o <= 1 ? this.setData({
            count: 1
        }) : this.setData({
            count: o
        });
    },
    selectSpec: function(t) {
        for (var a = this, s = a.data, i = s.goodsid, n = s.specItem, c = t.currentTarget.dataset, d = c.specid, r = c.valid, l = new Array(), u = 0; u < n.length; u++) {
            n[u].id == d && (n[u].select_spec = 1);
            for (var g = 0; g < n[u].specVal.length; g++) n[u].id == d && (n[u].specVal[g].select_val = 0), 
            n[u].specVal[g].id == r && (n[u].specVal[g].select_val = 1), 1 == n[u].specVal[g].select_val && l.push(n[u].specVal[g].id);
        }
        var h = l.join(",");
        o.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getSpec",
                uniacid: e,
                spec_id: h,
                goodsid: i
            },
            success: function(t) {
                if (1 == t.data.code) {
                    t.data.specVal.count <= 0 && wx.showToast({
                        title: "库存不足..."
                    });
                    for (var o = 0; o < n.length; o++) {
                        n[o].id == l && (n[o].is_select = 1);
                        for (var e = 0; e < n[o].specVal.length; e++) {
                            n[o].specVal[e].is_count = 1, n[o].specVal[e].id == r && (n[o].specVal[e].is_select = 0, 
                            t.data.specVal.count <= 0 && (n[o].specVal[e].is_count = 0));
                            for (var s = 0; s < l.length; s++) l[s] == r && l.splice(s, 1);
                        }
                    }
                    var i = t.data.specVal;
                    a.setData({
                        price: i.price,
                        spec_src: i.spec_src,
                        spec_id: i.id,
                        specItem: n,
                        specVal: i
                    });
                } else a.setData({
                    specItem: n
                });
            }
        });
    },
    sureGoods: function(t) {
        var o = this.data, a = o.goodsid, s = o.goodsData, i = o.spec_id, n = o.count, c = o.specVal, d = wx.getStorageSync("uid_" + e);
        console.log(a)
        console.log(i)
        console.log(n)
        if (0 != d && void 0 != d) if (1 == s.is_open_sku) {
            if ("" == i && 0 == i.length) return wx.showToast({
                title: "请选择规格",
                icon: "none"
            }), !1;
            c.sku_name ? c.count >= n ? wx.navigateTo({
                url: "../confrimOrder/index?goodsid=" + a + "&spec_id=" + i + "&count=" + n
            }) : wx.showToast({
                title: "库存不足",
                icon: "none"
            }) : wx.showToast({
                title: "请选择规格",
                icon: "none"
            });
        } else s.count >= n ? wx.navigateTo({
            url: "../confrimOrder/index?goodsid=" + s.id + "&count=" + n
        }) : wx.showToast({
            title: "库存不足",
            icon: "none"
        }); else wx.navigateTo({
            url: "../../login/index"
        });
    },
    buySelectSpec: function(t) {
        this.setData({
            is_show: 2,
            buy_type: 1
        });
    },
    buyNow: function(t) {
        var o = this.data, a = (o.goodsData, o.count, wx.getStorageSync("uid_" + e));
        0 != a && void 0 != a ? this.setData({
            is_show: 2,
            buy_type: 1
        }) : wx.navigateTo({
            url: "../../login/index"
        });
    },
    addCart: function(t) {
        var a = this, s = a.data, i = s.goodsid, n = s.spec_id, c = s.count, d = s.specVal, r = wx.getStorageSync("uid_" + e);
        if (0 != r && void 0 != r) {
            if ("" == n || void 0 == n) return wx.showToast({
                title: "请选择规格",
                icon: "none"
            }), !1;
            console.log(i)
            d.count >= c ? o.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "cart",
                    op: "addCart",
                    goods_id: i,
                    spec_id: n,
                    uniacid: e,
                    count: c,
                    uid: r
                },
                success: function(t) {
                    console.log(t)
                    1 == t.data.code ? (wx.showToast({
                        title: "已加入购物车",
                        icon: "none"
                    }), a.setData({
                        is_show: 1
                    })) : wx.showToast({
                        title: "操作失败",
                        icon: "none"
                    });
                }
            }) : wx.showToast({
                title: "库存不足",
                icon: "none"
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    },
    goHome: function(t) {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index?is_tarbar=true"
        });
    },
    onShareAppMessage: function() {
        var t = this.data.goodsData, o = wx.getStorageSync("uid_" + e);
        return {
            path: "/kundian_farm/pages/shop/prodeteils/index?goodsid=" + t.id + "&user_uid=" + o,
            success: function(t) {},
            title: t.goods_name,
            imageUrl: t.cover
        };
    },
    intoCart: function(t) {
        wx.navigateTo({
            url: "../buyCar/index"
        });
    },
    proDetailVideo: function(t) {
        var o = t.currentTarget.dataset.videosrc;
        wx.navigateTo({
            url: "../prodeteilVideo/index?src=" + o
        });
    },
    chengeIndex: function(t) {
        this.setData({
            currentIndex: t.currentTarget.dataset.index
        });
    },
    onPageScroll: function(t) {
        var o = !1;
        t.scrollTop >= 350 && (o = !0), this.setData({
            scrollShow: o,
            scrollTop: t.scrollTop
        });
    },
    scroll: function(t) {
        wx.pageScrollTo({
            scrollTop: this.data.pageScrollTop,
            duration: 0
        });
    },
    returnTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    previewSlideImg: function(t) {
        var o = t.currentTarget.dataset.index, e = this.data.goodsData;
        wx.previewImage({
            urls: e.goods_slide,
            current: e[o]
        });
    },
    showGoodsShareModel: function(t) {
        this.setData({
            show_shop_model: !0,
            show_goods_shop_model_mask: !0
        });
    },
    closeGoodsShareModel: function(t) {
        this.setData({
            show_shop_model: !1,
            show_goods_shop_model_mask: !1
        });
    },
    closeGoodsHaihao: function(t) {
        this.setData({
            show_haibao: !1,
            show_goods_shop_model_mask: !1
        });
    },
    createGoodsPost: function(t) {
        var o = this;
        this.data.is_create_poster ? o.setData({
            show_shop_model: !1,
            show_haibao: !0
        }) : (wx.showLoading({
            title: "海报生成中"
        }), o.getPoster());
    },
    intoCommentList: function(t) {
        wx.navigateTo({
            url: "../commentList/index?goods_id=" + this.data.goodsid
        });
    },
    getPoster: function() {
        var t = this, a = wx.getStorageSync("uid_" + e);
        o.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getGoodsQrcode",
                uid: a,
                goods_id: t.data.goodsid,
                uniacid: e
            },
            success: function(o) {
                t.setData({
                    local_src: o.data.local_src,
                    post_src: o.data.post_src,
                    show_shop_model: !1,
                    show_haibao: !0,
                    is_create_poster: !0
                });
            }
        });
    },
    saveGoodsPost: function(t) {
        var o = this.data.local_src;
        wx.downloadFile({
            url: o,
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: "海报保存成功",
                            showCancel: !1
                        });
                    },
                    fail: function(t) {}
                });
            }
        });
    },
    showService: function(t) {
        this.setData({
            isServer: !this.data.isServer
        });
    },
    fanhui: function(t) {
        console.log("dss"), wx.navigateBack({
            delta: 1
        });
    }
});
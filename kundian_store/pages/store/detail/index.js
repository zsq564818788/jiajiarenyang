var t = new getApp(), e = t.siteInfo.uniacid, a = t.util.getNewUrl("entry/wxapp/store", "kundian_farm_plugin_store");

Page({
    data: {
        isIphoneX: t.globalData.isIphoneX,
        store: [],
        store_id: "",
        live: [],
        slideCurrent: 1,
        page: 1,
        showPost: !1,
        setData: []
    },
    onLoad: function(o) {
        var s = this, i = o.store_id, r = wx.getStorageSync("uid_" + e), n = wx.getStorageSync("kundian_farm_setData");
        t.util.setNavColor(), s.setData({
            setData: n,
            store_id: i
        }), wx.request({
            url: a,
            data: {
                control: "index",
                op: "storeDetail",
                type: "init",
                store_id: i,
                uid: r
            },
            success: function(t) {
                s.setData({
                    store: t.data.store,
                    live: t.data.live
                });
            }
        });
    },
    doCall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.store.phone
        });
    },
    doMap: function() {
        var t = this.data.store;
        wx.openLocation({
            latitude: parseFloat(t.latitude),
            longitude: parseFloat(t.longitude),
            name: t.name,
            address: t.address
        });
    },
    playVideo: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../video/index?id=" + e
        });
    },
    setCurrent: function(t) {
        this.setData({
            slideCurrent: parseInt(t.detail.current) + 1
        });
    },
    onReachBottom: function() {
        var t = this, o = t.data, s = o.store_id, i = o.live, r = o.page;
        r = parseInt(r) + 1;
        wx.getStorageSync("uid_" + e);
        wx.request({
            url: a,
            data: {
                control: "index",
                op: "storeDetail",
                type: "live_more",
                store_id: s,
                page: r
            },
            success: function(e) {
                e.data.live && (e.data.live.map(function(t, e) {
                    i.push(t);
                }), t.setData({
                    live: i,
                    page: r
                }));
            }
        });
    },
    createPost: function(t) {
        var e = this, a = e.data.store;
        a.post_img ? this.setData({
            showPost: !0,
            local_src: a.post_img,
            post_src: a.post_img
        }) : e.createPoster();
    },
    createPoster: function() {
        var t = this, e = t.data.store;
        wx.showLoading({
            title: "海报生成中..."
        }), wx.request({
            url: a,
            data: {
                control: "store",
                op: "createPoster",
                store_id: e.id
            },
            success: function(a) {
                e.post_img = a.data.post_src, t.setData({
                    local_src: a.data.local_src,
                    post_src: a.data.post_src,
                    showPost: !0,
                    store: e
                }), wx.hideLoading();
            }
        });
    },
    savePost: function(t) {
        var e = this.data.local_src;
        wx.downloadFile({
            url: e,
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
    hidePost: function() {
        this.setData({
            showPost: !1
        });
    }
});
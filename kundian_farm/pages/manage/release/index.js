var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        imgArr: [],
        currentIndexId: 0,
        isShow: !0,
        lid: "",
        plate: 1,
        adoptid: "",
        farmSetData: []
    },
    onLoad: function(e) {
        var i = e.plate;
        if (1 == i) {
            var s = e.lid, n = e.seed_id;
            this.setData({
                lid: s,
                plate: i,
                seed_id: n
            });
        } else {
            var o = e.adoptid;
            this.setData({
                adoptid: o,
                plate: i
            });
        }
        t.util.setNavColor(a), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    addImg: function() {
        var t = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                for (var e = a.tempFilePaths, i = 0; i < e.length; i++) t.data.imgArr.push(e[i]);
                t.setData({
                    imgArr: t.data.imgArr
                });
            }
        });
    },
    deleteImg: function(t) {
        var a = t.currentTarget.dataset.url, e = this.data.imgArr;
        e.map(function(t, i) {
            t == a && e.splice(i, 1);
        }), this.setData({
            imgArr: e
        });
    },
    checked: function(t) {
        var a = t.currentTarget.dataset.id, e = this.data.seedList;
        e.map(function(t) {
            t.select = !1, t.id == a && (t.select = !0);
        }), this.setData({
            seedList: e,
            currentIndexId: a
        });
    },
    isShow: function() {
        var t = this.data.isShow;
        this.setData({
            isShow: !t
        });
    },
    submitData: function(a) {
        var e = this, i = this, s = i.data, n = s.plate, o = s.imgArr, d = t.siteInfo.siteroot.replace("app/index.php", "web/index.php") + "?i=" + t.siteInfo.uniacid + "&c=utility&a=file&do=upload&thumb=0", r = [], l = a.detail.value.txt;
        if (1 == n) {
            !function() {
                var t = e.data, a = t.lid, s = t.seed_id;
                if (wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e4
                }), o.length > 0) for (u = 0, c = 0; c < o.length; c++) wx.uploadFile({
                    url: d,
                    filePath: o[c],
                    name: "file",
                    formData: {
                        op: "upload_file"
                    },
                    success: function(t) {
                        u++;
                        var e = JSON.parse(t.data);
                        if (r.push(e.url), u == o.length) {
                            wx.hideToast();
                            var n = "";
                            o.length > 0 && (n = JSON.stringify(r));
                            var d = {
                                op: "statusSave",
                                control: "manage",
                                txt: l,
                                src: n,
                                lid: a,
                                seed_id: s
                            };
                            i.sendRequest(d);
                        }
                    }
                }); else {
                    var n = {
                        op: "statusSave",
                        control: "manage",
                        txt: l,
                        lid: a,
                        seed_id: s
                    };
                    i.sendRequest(n);
                }
            }();
        } else {
            var u, c;
            !function() {
                var t = e.data.adoptid;
                if (wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e4
                }), o.length > 0) for (u = 0, c = 0; c < o.length; c++) wx.uploadFile({
                    url: d,
                    filePath: o[c],
                    name: "file",
                    formData: {
                        op: "upload_file"
                    },
                    success: function(a) {
                        u++;
                        var e = JSON.parse(a.data);
                        if (r.push(e.url), u == o.length) {
                            wx.hideToast();
                            var s = "";
                            o.length > 0 && (s = JSON.stringify(r));
                            var n = {
                                op: "statusAdoptSave",
                                control: "manage",
                                txt: l,
                                src: s,
                                adoptid: t
                            };
                            i.sendRequest(n);
                        }
                    }
                }); else {
                    var a = {
                        op: "statusAdoptSave",
                        control: "manage",
                        txt: l,
                        adoptid: t
                    };
                    i.sendRequest(a);
                }
            }();
        }
    },
    sendRequest: function(a) {
        t.util.request({
            url: "entry/wxapp/class",
            data: a,
            method: "POST",
            success: function(t) {
                wx.showToast({
                    title: t.data.msg,
                    success: function() {
                        if (0 == t.data.code) var a = setTimeout(function() {
                            clearTimeout(a), wx.navigateBack({
                                delta: 1
                            });
                        }, 2e3);
                    }
                });
            }
        });
    }
});
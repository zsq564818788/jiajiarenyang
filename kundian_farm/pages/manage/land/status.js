var t = new getApp();

Page({
    data: {
        bgColor: "",
        plant_id: "",
        imgArr: []
    },
    onLoad: function(a) {
        this.setData({
            plant_id: a.plant_id,
            bgColor: t.bgColor
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
    submitData: function(a) {
        var e = this.data, i = e.plant_id, n = e.imgArr, o = t.siteInfo.siteroot.replace("app/index.php", "web/index.php") + "?i=" + t.siteInfo.uniacid + "&c=utility&a=file&do=upload&thumb=0", s = [], r = a.detail.value.txt;
        if (wx.showToast({
            title: "正在上传...",
            icon: "loading",
            mask: !0,
            duration: 1e4
        }), n.length > 0) for (var l = 0, u = 0; u < n.length; u++) wx.uploadFile({
            url: o,
            filePath: n[u],
            name: "file",
            formData: {
                op: "upload_file"
            },
            success: function(a) {
                l++;
                var e = JSON.parse(a.data);
                if (s.push(e.url), l == n.length) {
                    wx.hideToast();
                    var o = "";
                    n.length > 0 && (o = JSON.stringify(s)), t.util.request({
                        url: "entry/wxapp/class",
                        data: {
                            op: "statusSave",
                            control: "manage",
                            txt: r,
                            src: o,
                            plant_id: i
                        },
                        method: "POST",
                        success: function(t) {
                            wx.showToast({
                                title: t.data.msg,
                                icon: "none",
                                success: function() {
                                    var t = setTimeout(function() {
                                        clearTimeout(t), wx.navigateBack({
                                            delat: 1
                                        });
                                    }, 1500);
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});
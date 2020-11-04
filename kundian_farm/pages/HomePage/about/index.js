var a = require("../../../../wxParse/wxParse.js"), t = new getApp();

Page({
    data: {},
    onLoad: function(e) {
        t.siteInfo.uniacid;
        var s = this;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getAboutData",
                control: "index"
            },
            success: function(t) {
                "" != t.data.aboutData.farm_desc && a.wxParse("article", "html", t.data.aboutData.farm_desc, s, 5);
            }
        });
    }
});
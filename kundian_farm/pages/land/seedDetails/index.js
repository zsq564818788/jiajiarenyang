var a = new getApp();

Page({
    data: {
        plant: [],
        farmSetData: []
    },
    onLoad: function(t) {
        var e = this, s = a.siteInfo.uniacid, i = t.sid;
        wx.showLoading({
            title: "玩命加载中..."
        }), a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "seedDetail",
                control: "soil",
                sid: i
            },
            success: function(a) {
                e.setData({
                    plant: a.data.seed
                }), wx.hideLoading();
            }
        }), a.util.setNavColor(s), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    }
});
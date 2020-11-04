var t = new getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        bgColor: t.bgColor,
        currentState: 1,
        adoptData: [],
        page: 1,
        isContent: !0
    },
    onLoad: function(a) {
        this.getAdoptData(a.current), this.setData({
            currentState: a.current,
            bgColor: t.bgColor
        }), t.util.setNavColor();
    },
    getAdoptData: function(e) {
        wx.showLoading({
            title: "玩命加载中"
        });
        var n = this, o = wx.getStorageSync("uid_" + a);
        0 != o ? t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "getMyAnimal",
                uid: o,
                uniacid: a,
                status: e
            },
            success: function(t) {
                t.data.animalData.length > 0 ? (n.data.adoptData = t.data.animalData, n.data.isContent = !0) : n.data.isContent = !1, 
                n.setData({
                    adoptData: n.data.adoptData,
                    isContent: n.data.isContent
                }), wx.hideLoading();
            }
        }) : wx.redirectTo({
            url: "../../login/index"
        });
    },
    changeState: function(t) {
        this.setData({
            currentState: t.currentTarget.dataset.state
        }), this.getAdoptData(t.currentTarget.dataset.state);
    },
    intoAdoptDetail: function(t) {
        var a = t.currentTarget.dataset.adoptid;
        wx.navigateTo({
            url: "../../shop/adoptiveState/index?adopt_id=" + a
        });
    },
    onShareAppMessage: function() {},
    gotoBuy: function(t) {
        wx.navigateTo({
            url: "../../shop/Adopt/index"
        });
    }
});
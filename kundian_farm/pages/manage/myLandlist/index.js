var a = new getApp(), t = a.siteInfo.uniacid;

Page({
    data: {
        bgColor: a.bgColor,
        currentIndex: "6",
        isInput: !1,
        page: 1,
        landData: [],
        plate: 1,
        animalData: [],
        config: []
    },
    onLoad: function(n) {
        a.util.setNavColor(t);
        var e = this.data.currentIndex;
        this.getInitData(this, t, e), this.setData({
            config: wx.getStorageSync("kundian_farm_setData")
        });
    },
    changeIndex: function(a) {
        var n = a.currentTarget.dataset.index;
        this.getInitData(this, t, n), this.setData({
            currentIndex: n
        });
    },
    getInitData: function(t, n, e) {
        wx.showLoading({
            title: "玩命加载中..."
        }), a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getAnimal",
                control: "manage",
                current: e
            },
            success: function(a) {
                t.setData({
                    animalData: a.data.animalData,
                    page: 1
                }), wx.setNavigationBarTitle({
                    title: "认养管理"
                }), wx.hideLoading();
            }
        });
    },
    isInput: function() {
        this.setData({
            isInput: !0
        });
    },
    onReachBottom: function(t) {
        var n = this, e = n.data, i = e.currentIndex, r = e.page, s = n.data.animalData;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getAnimal",
                control: "manage",
                current: i,
                page: r
            },
            success: function(a) {
                a.data.animalData && (a.data.animalData.map(function(a) {
                    s.push(a);
                }), n.setData({
                    animalData: s,
                    page: parseInt(r) + 1
                }));
            }
        });
    },
    intoLandDetail: function(a) {
        var t = a.currentTarget.dataset.adoptid;
        wx.navigateTo({
            url: "../myLand/index?adoptid=" + t + "&plate=2"
        });
    }
});
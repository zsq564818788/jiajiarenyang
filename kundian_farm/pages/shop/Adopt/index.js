function a(a, t, r) {
    return t in a ? Object.defineProperty(a, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = r, a;
}

var t, r = new getApp(), e = r.siteInfo.uniacid;

Page({
    data: (t = {
        SystemInfo: r.globalData.sysData,
        isIphoneX: r.globalData.isIphoneX,
        tarbar: r.tarbar,
        Adopt: [],
        currentImg: "",
        currentStyle: 3,
        showName: 0,
        setData: []
    }, a(t, "tarbar", wx.getStorageSync("kundianFarmTarbar")), a(t, "is_tarbar", !1), 
    a(t, "cardCur", 0), t),
    onLoad: function(a) {
        var t = this, n = (wx.getStorageSync("uid_" + e), wx.getStorageSync("kundian_farm_setData")), i = a.is_tarbar || !1;
        t.setData({
            is_tarbar: i,
            setData: n,
            currentStyle: n.animal_list_style ? n.animal_list_style : 3
        }), wx.showLoading({
            title: "玩命加载中"
        }), r.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "index",
                uniacid: e
            },
            success: function(a) {
                var r = a.data.animalData, e = r[0].animal_src;
                t.setData({
                    Adopt: r,
                    currentImg: e,
                    showName: 1 == n.animal_name_show ? 1 : 0
                }), wx.hideLoading();
            }
        }), r.util.setNavColor(e);
    },
    cardSwiper: function(a) {
        var t = a.detail.current, r = this.data.Adopt;
        this.setData({
            cardCur: t,
            currentImg: r[t].animal_src
        });
    },
    onShow: function(a) {
        var t = wx.getStorageSync("kundianFarmTarbar");
        this.setData({
            tarbar: t
        });
    },
    Adopt: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../AdoptRules/index?aid=" + t
        });
    }
});
var t = new getApp();

Page({
    data: {
        state: [],
        page: 1,
        plant_id: "",
        is_add: !1,
        bgColor: "",
        is_content: !0
    },
    onLoad: function(a) {
        this.setData({
            plant_id: a.plant_id,
            is_add: a.is_add || !1,
            bgColor: t.bgColor
        }), this.getInit(!1);
    },
    getInit: function(a) {
        var n = this, e = n.data, i = e.page, s = e.state, o = e.plant_id;
        a && (i = parseInt(i) + 1), t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "soil",
                op: "seedState",
                page: i,
                plant_id: o
            },
            success: function(t) {
                var e = t.data.list;
                a ? (e.map(function(t) {
                    s.push(t);
                }), n.setData({
                    state: s,
                    page: i
                })) : (n.setData({
                    state: e,
                    is_content: e.length > 0
                }), console.log(n.data.is_content));
            }
        });
    },
    previewImg: function(t) {
        var a = t.currentTarget.dataset, n = a.key, e = a.index, i = this.data.state[n].src;
        wx.previewImage({
            urls: i,
            current: i[e]
        });
    },
    onReachBottom: function() {
        this.getInit(!0);
    },
    toAdd: function(t) {
        var a = this.data.plant_id;
        wx.navigateTo({
            url: "../../manage/land/status?plant_id=" + a
        });
    },
    onShow: function() {
        this.getInit(!1);
    }
});
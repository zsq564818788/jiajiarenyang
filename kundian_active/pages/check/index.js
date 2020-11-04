var a = new getApp(), t = a.siteInfo.uniacid, e = a.util.url("entry/wxapp/class") + "m=kundian_farm_plugin_active";

Page({
    data: {
        orderData: [],
        is_check_user: [],
        farmSetData: []
    },
    onLoad: function(r) {
        var c = this, i = r.order_id, o = wx.getStorageSync("uid_" + t), d = wx.getStorageSync("kundian_farm_setData");
        wx.request({
            url: e,
            data: {
                action: "order",
                op: "getTicketData",
                order_number: i,
                uniacid: t,
                uid: o
            },
            success: function(a) {
                c.setData({
                    orderData: a.data.orderData,
                    is_check_user: a.data.is_check_user,
                    farmSetData: d
                });
            }
        }), a.util.setNavColor(t);
    },
    checkActive: function(a) {
        var r = this, c = wx.getStorageSync("uid_" + t), i = r.data.orderData;
        wx.showModal({
            title: "提示",
            content: "确认核销该订单吗？",
            success: function(a) {
                a.confirm && wx.request({
                    url: e,
                    data: {
                        action: "order",
                        op: "checkActive",
                        uniacid: t,
                        order_id: r.data.orderData.id,
                        uid: c
                    },
                    success: function(a) {
                        0 == a.data.code && (i.status = 4, r.setData({
                            orderData: i
                        })), wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: !1
                        });
                    }
                });
            }
        });
    }
});
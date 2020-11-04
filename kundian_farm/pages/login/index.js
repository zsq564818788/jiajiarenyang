var n = new getApp();

Page({
    data: {},
    onLoad: function(a) {
        n.util.setNavColor(n.siteInfo.uniacid);
    },
    updateUserInfo: function(n) {
        if ("getUserInfo:fail auth deny" == n.detail.errMsg) return wx.showModal({
            title: "提示",
            content: "您取消了授权",
            showCancel: !1
        }), !1;
        var a = new getApp(), e = a.siteInfo.uniacid;
        a.util.getUserInfo(function(n) {
            wx.showLoading({
                title: "登录中..."
            }), console.log(n), wx.setStorageSync("uid_" + e, n.memberInfo.uid), wx.setStorageSync("kundian_farm_sessionid", n.sessionid), 
            wx.setStorageSync("kundian_farm_wxInfo", n.wxInfo);
            var t = n.wxInfo.avatarUrl, i = n.wxInfo.nickName, o = n.memberInfo, s = {
                op: "login",
                control: "index",
                avatar: o.avatar,
                uid: o.uid,
                nickname: o.nickname,
                uniacid: e,
                wxNickName: i,
                wxAvatar: t
            };
            a.util.request({
                url: "entry/wxapp/class",
                data: s,
                success: function(n) {
                    if (wx.setStorageSync("uid_" + e, n.data.uid), 0 == n.data.code) {
                        var t = wx.getStorageSync("farm_share_uid");
                        void 0 != t && 0 != t && a.loginBindParent(t, o.uid), wx.showToast({
                            title: "登陆成功",
                            icon: "none",
                            success: function(n) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    } else wx.showToast({
                        title: "登录失败",
                        icon: "none"
                    });
                    n.data.uid && wx.setStorageSync("uid_" + e, n.data.uid), wx.hideLoading();
                }
            });
        }, n.detail);
    },
    onReachBottom: function() {}
});
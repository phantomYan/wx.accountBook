// miniprogram/pages/checkLog/checkLog.js
wx.cloud.init();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logList:[{
      id:'hyc',
      time:'2020-1-14',
      sth:'utf-8',
      num:'1'
    },{
        id: 'hyc',
        time: '2020-1-15',
        sth: 'utf-4',
        num: '1'
    }]
  },

  checklog: function () {
    let self = this
    // let rid = new RegExp(this.data.needget, 'i') //正则判断 不区分大小写模糊查询
    db.collection('log').where({
      // id: rid
    })
      .get({
        success: function (res) {

          self.tansdata(res.data)

        }
      })
  },

  tansdata: function (e) {
    if (e.length == 0) {
      wx.showModal({
        title: "错误",
        content: "未找到日志"
      });
    }
    console.log(e);
    var arrtan = [];
    for (var i = 0; i < e.length; i++) {
      if (e[i].number !== 0) {
        arrtan[i] = {
          user: e[i].user,
          color: e[i].color,
          id: e[i].id,
          num: e[i].number,
          time: e[i].time,
          size: e[i].size
        }
      }
    }
    // console.log(arrtan);
    this.setData({ arrtan })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
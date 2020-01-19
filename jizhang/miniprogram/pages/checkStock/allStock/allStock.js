wx.cloud.init();
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  tosize: function () {
    wx.navigateTo({
      url: '/pages/checkStockSize/checkStockSize',
    })
  },
  tocs: function () {
    wx.navigateTo({
      url: '/pages/checkStock/checkStock',
    })
  },

  // 搜索
  seach: function () {
    let self = this
    db.collection('main').where({
    })
      .get({
        success: function (res) {
          self.tansdata(res.data)
        }
      })
  },

  tansdata: function (e) {
    console.log(e);
    var arrtan = [];
    for (var i = 0; i < e.length; i++) {
      if (e[i].number !== 0) {
        arrtan[i] = {
          _id: e[i]._id,
          color: e[i].color,
          id: e[i].id,
          number: e[i].number,
          price: e[i].price,
          size: e[i].size
        }
      }
    }
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
    // wx.reLaunch({
    //   url: '/pages/index/index'
    // })
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
// miniprogram/test/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"admin"
    
  },

  checkstock: function () {
    wx.navigateTo({
      url: '/pages/checkStock/allStock/allStock',
    })
    // wx.switchTab({
    //   url: '/pages/checkStock/checkStock',
    // })
  },
  checklog: function () {
   
  },
  sale: function () {
    wx.navigateTo({
      url: '/pages/sale/sale?user='+this.data.username,
    })
  },
  addstock: function () {
    wx.navigateTo({
      url: '/pages/addStock/addStock',
    })
  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      // env: ''
    })
    console.log(options)
    let that=this
    if (options.user !== '' && options.user !== undefined) {
    this.setData({username:options.user})}else{
      wx.getUserInfo({
        success: function (res) {
          console.log(res.userInfo)
          that.setData({ username: res.userInfo.nickName})
        }
      })
    }
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
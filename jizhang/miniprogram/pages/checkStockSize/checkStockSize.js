// miniprogram/pages/checkStock/checkStock.js
wx.cloud.init();
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false, //初始文本框不显示内容
    list: [],
    needget: 'test',
  },

  tosize: function () {
    wx.navigateTo({
      url: '/pages/checkStock/checkStock',
    })
  },
  toall: function () {
    wx.navigateTo({
      url: '/pages/checkStock/allStock/allStock',
    })
  },


  sthid: function (e) {
    // console.log(e.detail.value)
    this.setData({ needget: e.detail.value }),
      // getdata()
      console.log(this.data.needget)
  },
  // 使文本框进入可编辑状态
  showInput: function () {
    this.setData({
      inputShowed: true //设置文本框可以输入内容
    });
  },
  // 取消搜索
  hideInput: function () {
    let self = this
    let rsize = new RegExp(this.data.needget, 'i') //正则判断 不区分大小写模糊查询
    db.collection('main').where({
      size: rsize
      // done: false
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          // console.log(res.data)
          self.tansdata(res.data)
          // console.log(res.data)
        }
      })
  },

  tansdata: function (e) {
    if (e.length == 0) {
      wx.showModal({
        title: "错误",
        content: "未找到该产品"
      });
    }
    console.log(e);
    var arrtan = [];
    // console.log(e.length);
    for (var i = 0; i < e.length; i++) {
      // console.log(i);
      arrtan[i] = {
        _id: e[i]._id,
        color: e[i].color,
        id: e[i].id,
        number: e[i].number,
        price: e[i].price,
        size: e[i].size
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
    wx.reLaunch({
      url: '/pages/index/index'
    })
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
    // wx.navigateTo({
    //   url: '/pages/index/index',
    // })
  }
})
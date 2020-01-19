// miniprogram/pages/sale/sale.js
wx.cloud.init();
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    said:'',
    sacolor:'',
    sasize:'',
    sanumber:'',
    username:'admin'
  },

  saleid:function(e){
    this.setData({
      said: e.detail.value,
    })
  },
  salecolor: function (e) {
    this.setData({
      sacolor: e.detail.value,
    })
  },
  salesize: function (e) {
    this.setData({
      sasize: e.detail.value,
    })
  },
  salenumber: function (e) {
    this.setData({
      sanumber: e.detail.value,
    })
  },

  saleit:function(){
    let that = this;
    if (that.data.said !== '' && that.data.sacolor !== '' && that.data.sasize !== ''){
    let regid = new RegExp(this.data.said, 'i')
    let regcolor = new RegExp(this.data.sacolor, 'i')
    let regsize = new RegExp(this.data.sasize, 'i')
    db.collection('main').where({
      id: regid,
      color: regcolor,
      size: regsize,
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          // console.log(res)
          that.checkid(res.data)
          that.setData({ cloudarr: res.data })
        }
      })
    }else{
      wx.showModal({
        title: "错误",
        content: "必填项为空",
        
      });
    }
  },

  

  checkid: function (e) {
    // console.log(e)
    let self = this;
    if (e.length > 0) {
      console.log('物品存在')
      let id = e[0]._id
      if (Number(e[0].number) > self.data.sanumber){
      let numb = Number(e[0].number) - self.data.sanumber
      console.log(numb) //新增后数量
      db.collection('main').doc(id).update({
        // data 传入需要局部更新的数据
        data: {
          number: numb
        },
        success: function (res) {
          console.log(res)
          console.log('日志程序开始执行')
          self.writelog()
          console.log('日志程序执行完成')
          wx.showModal({
            title: "卖出成功",
            content: self.data.said + "已卖出" + self.data.sanumber +"件 \n 库存"+numb+"件"
          });
        }
      })
      }else{
        wx.showModal({
          title: "卖出失败",
          content: "请确认"+self.data.said + "库存充足"
        });
      }
    } else {
      console.log('物品不存在')
      wx.showModal({
        title: "卖出失败",
        content: "物品未找到"
      });
    }
  },

  writelog:function(){
    let that=this;
    var year = new Date().getFullYear();
    var mou = new Date().getMonth();
    var day = new Date().getDate();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    // var sec = new Date().getSeconds();
    // var time = year + '年 ' + mou + 1 + '月 ' + day + '日 ' + hours + ':' + min + ':' + sec;
    var time = year + '年 ' + mou + 1 + '月 ' + day + '日 ' + hours + ':' + min;
    console.log(time)

    db.collection('log').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 
        id: that.data.said,
        user:that.data.username,
        time:time,
        color: that.data.sacolor,
        size: that.data.sasize,
        number: that.data.sanumber,
      },
      success: function (res) {
       console.log('日志上传成功')
      }
    })
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.user)
    if (options.user !== '' && options.user !==undefined){
    this.setData({ username: options.user })
    }
    console.log(this.data.username)
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
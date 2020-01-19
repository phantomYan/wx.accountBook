// miniprogram/pages/addStock/addStock.js
wx.cloud.init();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addid: 'undefined',
    addprice: 'undefined',
    addcolor: 'undefined',
    addsize: undefined,
    addnumber: 'undefined',
    changnumber:'undefined',
    shownumber:0,
    aimnumber:0,
    aimnumber2:0
  },

  addid:function(e){  //名称    
    this.setData({
      addid: e.detail.value,
    })
  },
  addprice: function (e) { //价格
    // console.log(e.detail.value)
    this.setData({
      addprice: e.detail.value
    })
  },
  addcolor: function (e) { //颜色
    // console.log(e.detail.value)
    // let reg = new RegExp(e.detail.value, 'i')
    this.setData({
      addcolor: e.detail.value
    })
  },
  addsize: function (e) { //码号
    console.log(e.detail.value)
    // let reg = new RegExp(e.detail.value, 'i')
    this.setData({
      addsize: e.detail.value
    })
    console.log(this.data.addsize!=='')
  },
  addnumber: function (e) { //新增数量
    // console.log(e.detail.value)
    this.shownum('shownumber');
    this.setData({
      addnumber: Number(e.detail.value)
    })
    console.log(Number(e.detail.value) + Number(this.data.shownumber))
    this.setData({
      aimnumber: Number(e.detail.value) + Number(this.data.shownumber)
    })
  },
  changnumber: function (e) { //修改数量
    // console.log(e.detail.value)
    this.shownum('shownumber2');
    this.setData({
      changnumber: e.detail.value
    })
    this.setData({
      aimnumber2: e.detail.value
    })
  },

  shownum:function(e){ //显示修改后数值
    let shownumber=this.data.shownumber
    let aim=this.data.e
    let that=this
    let regid = new RegExp(this.data.addid, 'i')
    let regcolor = new RegExp(this.data.addcolor, 'i')
    let regsize = new RegExp(this.data.addsize, 'i')
    db.collection('main').where({
      id: regid,
      color: regcolor,
      size: regsize,
    })
      .get({
        success: function (res) {
          console.log(res)
          if (res.data.length > 0 && that.data.addid !== '' && that.data.addcolor !== '' && that.data.addsize !== ''){
            console.log('scc')
            that.setData({ shownumber: res.data[0].number })

          }else{
            console.log('edd')
            console.log(shownumber)
            that.setData({ shownumber: 0 })
          }
        },
      })
  },

  addstock:function(){  //确定新增
    // console.log('addstock')
    let that=this;
    if (that.data.addid !== '' && that.data.addcolor !== '' && that.data.addsize !== '' && that.data.addid != 'undefined' && that.data.addcolor != 'undefined' && that.data.addsize != 'undefined') {
    let regid = new RegExp(this.data.addid, 'i')
    let regcolor = new RegExp(this.data.addcolor, 'i')
    let regsize = new RegExp(this.data.addsize, 'i')
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
          that.setData({cloudarr:res.data})
        }
      })
    }else{
      wx.showModal({
        title: "错误",
        content: "必填项为空",

      });
    }
  },


  //判断ID是否存在
  checkid:function(e){
    // console.log(e)
    let self=this;
    if(e.length>0){ 
      console.log('物品存在')
      let id = e[0]._id
      let numb = Number(e[0].number) + self.data.addnumber
      console.log( numb) //新增后数量
      db.collection('main').doc(id).update({
        // data 传入需要局部更新的数据
        data: { 
          number: numb
        },
        success: function (res) {
          console.log(res)
          wx.showModal({
            title: "新增成功",
            content: self.data.addid + "库存已更新"
          });
        }
      })
    }else{
      console.log('物品不存在')
      if (self.data.addid != 'undefined' && self.data.addcolor != 'undefined' && self.data.addsize != 'undefined' && self.data.addnumber != 'undefined' && self.data.addprice != 'undefined' && self.data.addid !== '' && self.data.addcolor !== '' && self.data.addsize !== '' && self.data.addnumber !== '' && self.data.addprice !== ''){
        console.log('开始新建')
      db.collection('main').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: self.data.addid + '_'+ self.data.addcolor +'_'+ self.data.addsize, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          id:self.data.addid,
          // due: new Date("2018-09-01"),
          color:self.data.addcolor,
          size:self.data.addsize,
          number:self.data.addnumber,
          price: self.data.addprice,
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          wx.showModal({
            title: "新建成功",
            content: self.data.addid+"已创建"
          });
        }
      })
      }else{
        console.log('新建失败')
        wx.showModal({
          title: "错误",
          content: "必填项为空"
        });
      }
    }
  },




  changstock: function () { //确定修改
    console.log('changstock')
    let that = this;
    let regid = new RegExp(this.data.addid, 'i')
    let regcolor = new RegExp(this.data.addcolor, 'i')
    let regsize = new RegExp(this.data.addsize, 'i')
    db.collection('main').where({
      id: regid,
      color: regcolor,
      size: regsize,
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          // console.log(res)
          that.checkid2(res.data)
          
        }
      })
  },

  //判断ID是否存在
  checkid2: function (e) {
    // console.log(e)
    let self = this;
    if (e.length > 0 && self.data.changnumber!='') {
      console.log('物品存在')
      console.log(self.data.changnumber)
      let id=e[0]._id
      db.collection('main').doc(id).update({
        // data 传入需要局部更新的数据
        data: {
          number: Number(self.data.changnumber)
        },
        success: function (res) {
          wx.showModal({
            title: "修改成功",
            content: self.data.addid + "的库存数量已修改"
          });
          console.log('修改成功')
        }
      })
    } else {
      console.log('物品不存在')
        wx.showModal({
          title: "物品不存在或必填项为空",
          content: "请检查必填项"
        });
      }
    
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
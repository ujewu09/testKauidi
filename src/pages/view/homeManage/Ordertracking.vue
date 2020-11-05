<template>
  <div class="container">
    <Title-b title="订单跟踪" />
    <p class="userP">{{$t('Domesticordertracking.logisticsinformation')}}</p>
    <div class="all">
      <!-- imput -->
      <div class="search">
        <i-input placeholder="" v-model="searchValue" style="width: 343px"></i-input>
        <i-button type="error" class="search_error" @click="GetLogisticsTrajectory">搜索</i-button>
        <img src="../../../assets/images/sousuo1.png" alt="">
      </div>
      <!-- 订单打印 -->
      <!-- <div class="Orderprinting">
        <p>转运单号：D25462348454521</p>
        <p style="padding: 8px 86px;">状态：<span style="color: #6BA504;">待签收</span></p>
        <p><span style="position: relative;top: -7px;">订单打印</span></p>
      </div> -->
      <!-- <div class="arrow">
        <div class="background_one" v-for="(item,index) in userObject" :key="index">
          <img :src="item.img" alt="">
          <span>{{item.name}}</span>
          <img :src="item.img1" alt="" class="img_1">
          <span>2020-05-22 10:18:39</span>
        </div>
      </div> -->
      <div v-for="(item,index) in allorder" :key="index">{{item}}</div>
      <!-- 处理时间 -->
      <div class="date">
        <div>
          <i-table stripe :columns="columns1" :data="arr.length ?arr[0].value : []" align="center" id="mygrid"></i-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        columns1: [{
            title: '处理时间',
            key: 'scan_time'
          },
          {
            title: '处理信息',
            key: 'scan_memo'
          }
        ],
        data1: [{
            scan_time: '2020-05-22 10:18:39',
            scan_memo: '拣货完毕，快件已拣货完毕，正在打包',
          },
          {
            name: '2020-05-22 10:18:39',
            age: '拣货完毕，快件已拣货完毕，正在打包',
          },
          {
            name: '2020-05-22 10:18:39',
            age: '拣货完毕，快件已拣货完毕，正在打包',
            address: '张三'
          },
          {
            name: '2020-05-22 10:18:39',
            age: '拣货完毕，快件已拣货完毕，正在打包',
          }
        ],
        userObject:[
          {
           img:require('../../../assets/images/tijiao.png'),
           name:"提交订单",
           img1:require('../../../assets/images/gouxuan1.png')
          },
          {
           img:require('../../../assets/images/ruku.png'),
           name:"包裹入库",
           img1:require('../../../assets/images/gouxuan1.png')
          },
          {
           img:require('../../../assets/images/baoguochuku.png'),
           name:"包裹出库",
           img1:require('../../../assets/images/gouxuan1.png')
          },
          {
           img:require('../../../assets/images/qianshou.png'),
           name:"签收"
          },
          {
           img:require('../../../assets/images/gouxuan.png'),
           name:"订单完成"
          }
        ],
        allorder:[],
        arr: [],
        searchValue: ''
      }
    },
    methods:{
      // 参数{
      //   billcodelist: searchValue,token
      //   }
      // 2086102317
      async GetLogisticsTrajectory(){
           let _this = this;
          const params = {
            MemberID:localStorage.getItem("userID"),
            billcodelist: _this.searchValue,
            token: localStorage.getItem("token")
          };
          const { data } = await this.$post("GetLogisticsTrajectory",params,true);
          if(data.State){
              this.allorder = JSON.parse(data.ReturnJson);
            }
            let obj = JSON.parse(data.ReturnJson);
         
            Object.keys(obj).forEach((key,index) => {
              _this.arr.push({
                name: key,
                value : JSON.parse(obj[key])
              })
            })
      }
    },
    mounted(){
    }
    // created() {
    //   document.getElementsByClassName('background_one').htmlText="wwww"
    // }
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 1069px;
    height: 748px;
    background: #fff;
    padding: 20px 29px;

    // 修改table的属性
    /deep/ #mygrid{
      .ivu-table th{
        text-align: center;
        background: #E2E2E2;
      }
      .ivu-table td{
        text-align: center;
        height: 30px;
      }
      // .ivu-table tr:nth-child(odd){
      //   background-color: red;
      // }
      // .ivu-table tr:nth-child(even){
      //   background-color: #000;
      // }
    }
    .userP {
      color: #ccc;
      font-size: 14px;
      font-weight: 400;
      padding: 15px 0 0 61px;
    }

    .all {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 1000px;

      .search {
        height: 52px;
        margin: 20px 0 0 265px;
        position: relative;
        .search_error {
          width: 80px;
          height: 30px;
          //  @include border($_color);
          @include backgroundColor($_color);
          // background: #FF0000;
          color: #fff;
          margin-left: 10px;

        }
        /deep/ .ivu-btn-error{
          border-color: #fff;
        }

        /deep/ .ivu-input{padding-left: 39px !important;}
         /deep/ .ivu-input::-webkit-input-placeholder{
              color:#999;
              padding-left: 30px;
         }
        img{
          position: absolute;
          left: 13px;top: 6px;
        }
      }

      .Orderprinting {
        width: 870px;
        height: 30px;
        background: #fff8e1;
        border-radius: 5px;
        display: flex;
        margin: 0 0 0 100px;
        flex-direction: row;

        p {
          font-size: 12px;
          font-weight: 400;
          cursor: pointer;
          padding: 8px 4px;
          margin: 0px 0 0 26px;
          color: #9A9A9A;
        }

        p:nth-child(3) {
          width: 71px;
          color: #fff;
          text-align: center;
          height: 20px;
          background: #fdaa2e;
          border-radius: 5px;
          margin: 5px 0 0 320px;
        }
      }

      .arrow {
        width: 870px;
        height: 90px;
        margin: 0 0 0 100px;
        position: relative;
        top: 20px;
        display:flex;
        flex-direction: row;
        div:nth-child(1){
          position: absolute;
          right: 652px;
          z-index: 4;
          img{width:30px;height:30px;margin: 0 0 4px -46px;}
          > span:nth-child(2){font-size: 14px;color: #666666;margin: 0 0 0px -46px;}
          > span:nth-child(4){font-size: 12px;color: #999;margin: 0 0 0px -46px;}
          .img_1{left: 174px;top: 28px;position: absolute;}
        }
        div:nth-child(2){
          position: absolute;
          right: 489px;
          z-index: 3;
          .img_1{left: 152px;top: 28px;position: absolute;}
        }
        div:nth-child(3){
          position: absolute;
          right: 326px;
          z-index: 2;
          .img_1{left: 152px;top: 28px;position: absolute;}
        }
        div:nth-child(4){
          position: absolute;
          right: 163px;
          z-index: 1;
          background: url('../../../assets/images/lingxing1.png')no-repeat;
          width: 220px;
          height: 90px;
          background-size: 220px 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
          img{width:28px;height:30px;margin-bottom: 4px;};
          .img_1{left: 0;top: 0;position: absolute;z-index: -99;width: 0px;height: 0px;}
          > span:nth-child(2){font-size: 14px; color: #f4aa2d !important;}
          > span:nth-child(3){font-size: 12px; color: #f4aa2d !important;}
        }
        div:nth-child(5){
          position: absolute;
          right: 0px;
        }
         .background_one{
          background: url('../../../assets/images/lingxing.png')no-repeat;
          width: 220px;
          height: 90px;
          background-size: 220px 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
          img{width:30px;height:30px;margin-bottom: 4px;}
          > span:nth-child(2){font-size: 14px;color: #666666;}
          > span:nth-child(4){font-size: 12px;color: #999999;}
          .img_1{left: 0;top: 0;position: absolute;z-index: -99;width: 0px;height: 0px;}
          .img_1{
            width: 33px;
            cursor: pointer;
            height: 33px;
          }
         }
      }

      .date {
        width: 870px;
        margin: 30px 0 0 100px;
        border: 1px solid #CCCCCC;
      }
    }
  }
</style>

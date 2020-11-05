<template>
  <!-- 我的收益 -->
  <div class="container">
    <Title-b title="我的收益" />
    <!-- <p class="p">我的收益</p> -->
    <div class="one">
      <div class="blue">
        <div class="bj">¥</div>
        <div class="money">
          <p>{{$t('PromotionCenter.AllMoney')}}</p>
          <p>
            {{ allorder.AllProfit ? allorder.AllProfit : 0}}
          </p>
        </div>
      </div>
      <div class="red">
        <div class="bj">¥</div>
        <div class="money">
          <p>{{$t('PromotionCenter.KtxMoney')}}</p>
          <p>{{ allorder.BalanceProfit ? allorder.AllProfit : 0}}</p>
          <p @click="modal1 = true">提现</p>
        </div>
      </div>
    </div>
    <div class="two">
      <div class="date">
        <table id="table" cellspacing="0">
          <tr>
            <td>{{$t('PromotionCenter.DdID')}}ID</td>
            <td>{{$t('PromotionCenter.Sm')}}</td>
            <td>{{$t('PromotionCenter.Date')}}</td>
            <td>{{$t('PromotionCenter.Shzt')}}</td>
          </tr>
          <tr v-for="(item, index) in all.WithDrawInfo" :key="index" class="td">
            <td>{{ item.Id }}</td>
            <td>{{ item.WithDrawType }}</td>
            <td>{{ item.WithDrawTime }}</td>
            <td>{{ item.IsChecked ? '审核通过' : '审核中' }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div style="margin: 10px 0 0 400px">
      <Page
        :total="dataCount"
        :page-size="pageSize"
        show-total
        @on-change="changepage"
        show-elevator
      />
    </div>

    <Modal v-model="modal1" title="提现">
      <Button @click="(modal2 = true), (modal1 = false)">提现到余额</Button>
      <Button @click="(modal3=true),(modal1=false)">提现到支付宝</Button>
    </Modal>
    <Modal v-model="modal2" class="Modal" @on-ok="ApplyWithDraw()">
      <!-- 提现到余额 -->
      <div style="margin: 10px 10px">
        金额：<Input v-model="form1.value1" disabled placeholder="请输入金额" style="width: 200px"/>
      </div>
      <div style="margin: 10px 0px">
        会员ID：<Input v-model="form1.value2" disabled placeholder="请输入会员ID" style="width: 200px"/>
      </div>
      <div style="margin: 10px 10px">
        备注：<Input v-model="form1.value3" placeholder="请输入" style="width: 200px"/>
      </div>
    </Modal>
    <Modal v-model="modal3" class="Modal" @on-ok="ApplyWithDraw()">
      <!-- 提现到支付宝 -->
      <div style="margin: 10px 10px">
        金额：<Input v-model="form1.value1" disabled placeholder="请输入金额" style="width: 200px"/>
      </div>
      <div style="margin: 10px 0px">
        会员ID：<Input v-model="form1.value2" disabled placeholder="请输入会员ID" style="width: 200px"/>
      </div>
      <div style="margin: 10px 0px">
        用户名：<Input v-model="form2.value3" placeholder="请输入用户名" style="width: 200px"/>
      </div>
      <div style="margin: 10px 10px">
        备注：<Input v-model="form2.value4" placeholder="请输入" style="width: 200px" />
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allorder: {},
      dataCount: 0,
      pageSize: 8,
      modal1: false,
      modal2: false,
      modal3: false,
      all: [],
      form1: {
        value1: "",
        value2: "",
        value3: "",
      },
      form2: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
      },
      is: true,
      arrId: []
    };
  },
  mounted() {
    this.form1.value2 = localStorage.getItem("userID");
    this.QueryIncome();
    this.QueryWithDraw();
  },
  methods: {
    // 查询所以返利信息
    async QueryIncome() {
      const params = {
        MemberId: localStorage.getItem("userID"),
        offset: 1,
        limit: 10,
      };
      const { data } = await this.$post("QueryIncome", params);
      if (data.State) {
        this.allorder = JSON.parse(data.ReturnJson);
        this.form1.value1 = this.allorder.BalanceProfit;
        console.log(this.allorder)
        this.allorder.IncomeInfo.forEach((item,index) => {
            this.arrId[index] = item.OrderId
        })
      }
    },
    // 提现接口
    async ApplyWithDraw() {
        this.arrId = this.arrId.join(',')
      const obj = {
        WithDrawMoney: this.form1.value1,
        MemberId: localStorage.getItem("userID") * 1,
        Remarks: this.form1.value3,
        WithDrawType: "提现到余额",
        WithDrawAccount: localStorage.getItem("userID") * 1,
        OrderId: this.arrId,
      };
      const {data} = await this.$post("ApplyWithDraw", obj);
        this.$Message.error(data.MsgText);
    },
    //         const obj = {
    //         WithDrawMoney: this.form.WithDrawMoney,
    //         MemberId: localStorage.getItem("userID"),
    //         Remarks: this.form.Remarks,
    //         WithDrawType: "提现到余额",
    //         WithDrawAccount: localStorage.getItem("userID"),
    //         OrderId: this.form.OrderId
    //       };  ApplyWithDraw

    //      form: {
    //             WithDrawMoney: "",
    //             MemberId: localStorage.getItem("userID"),
    //             WithDrawImage: "",
    //             Remarks: "",
    //             WithDrawType: "提现到微信",
    //             WithDrawAccount: localStorage.getItem("userID"),
    //             NickName: "",
    //             Mobile: "",
    //             OrderId: ''
    //           },QueryIncome

    // if(this.form2.value1 == ""){
    //     this.$Message.error("请输入金额！");
    //     this.is=false;
    //     return false;
    // }else if(this.form2.value2 == ""){
    //     this.$Message.error("请输入会员ID！");
    //     this.is=false;
    //     return false;
    // }else if(this.form2.value3 == ""){
    //     this.$Message.error("请输入用户名！");
    //     this.is=false;
    //     return false;
    // }
    // 这个是返回到table的提现数据
    async QueryWithDraw(page = 1) {
      const params = {
        MemberID: localStorage.getItem("userID"),
        offset: page,
        limit: this.pageSize,
      };
      const { data } = await this.$post("QueryWithDraw", params);
      if (data.State) {
        this.all = JSON.parse(data.ReturnJson);
        console.log(this.all);
        this.dataCount = this.allorder.AllCount;
      }
    },
    changepage(index) {
      this.QueryWithDraw(index);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 1069px;
  height: 700px;
  border-radius: 5px;
  background: #fff;
  padding: 19px 17px;
  .one {
    display: flex;
    flex-direction: row;
    margin: 0 0 0 281px;
    .blue {
      width: 210px;
      height: 124px;
      background: linear-gradient(90deg, #4096ee 0%, #7abcff 100%);
      border-radius: 5px;
      position: relative;
      .bj {
        font-size: 138px;
        font-weight: 500;
        color: #fff;
        opacity: 0.1;
        position: absolute;
        top: -26px;
        right: 0px;
      }
      .money {
        cursor: pointer;
        margin: 27px 0 0 0;
        text-align: center;
        p {
          color: #fff;
        }
        p:nth-child(1) {
          font-size: 20px;
        }
        p:nth-child(2) {
          font-size: 30px;
          font-weight: bold;
        }
      }
    }
    .red {
      width: 210px;
      height: 124px;
      background: linear-gradient(90deg, #ff5e70 0%, #ffa88e 100%);
      border-radius: 5px;
      margin: 0 0 0 84px;
      position: relative;
      .bj {
        font-size: 138px;
        font-weight: 500;
        color: #fff;
        opacity: 0.1;
        position: absolute;
        top: -26px;
        right: 0px;
      }
      .money {
        cursor: pointer;
        margin: 15px 0 0 0;
        text-align: center;
        p {
          color: #fff;
        }
        p:nth-child(1) {
          font-size: 20px;
        }
        p:nth-child(2) {
          font-size: 30px;
          font-weight: bold;
        }
        p:nth-child(3) {
          width: 60px;
          height: 30px;
          background: #fff;
          border-radius: 5px;
          font-size: 20px;
          color: #ff6070;
          margin: 0 0 0 75px;
        }
      }
    }
  }
  .two {
    width: 949px;
    // height: 369px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 28px 0 0 60px;
    .date {
      // margin: 33px 0 0 60px;
      #table {
        width: 947px;
        cursor: pointer;
        tr {
          height: 40px;
        }
        tr:nth-child(1) {
          //background: linear-gradient(0deg, #FF920A 0%, #FFAF4B 100%);
          font-size: 16px;
          color: #333;
          td {
            color: #000;
            font-size: 12px;
            border-bottom: 0px solid #ccc;
          }
        }
        td {
          width: 100px;
          font-size: 12px;
          text-align: center;
          // border-bottom: 1px solid #ccc;
        }
        //td:nth-child(1){color: #ff9900;font-size: 12px;}
        .td:nth-child(even) {
          background: #f9f5ef;
        }
        .td:nth-child(odd) {
          background: #ffffff;
        }
      }
    }
  }
}
</style>
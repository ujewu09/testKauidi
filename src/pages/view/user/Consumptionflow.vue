<template>
  <!-- 消费流水 -->
  <div class="container">
    <Title-b title="消费流水" />
    <!-- <p class="p">修改信息</p> -->
    <div class="all">
      <div class="money">
        <div class="balance">
          <p>{{$t('Personal.Accountbalance')}}</p>
          <p>{{ info.Money }}元</p>
        </div>
        <div class="consumption">
          <p>{{$t('Personal.Historicalconsumption')}}</p>
          <p>{{ info.UnMoney }}元</p>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="date">
      <div>
        <i-table
          stripe
          :columns="columns1"
          :data="info.QueryMoneyLogInfo"
          align="center"
          id="mygrid"
          :row-class-name="rowClassName"
        ></i-table>
      </div>
      <div class="left"></div>
      <div class="right"></div>
      <div class="top"></div>
    </div>
    <Page
      class="page-ive"
      :total="page.total"
      :current="1"
      :page-size="page.size"
      @on-change="changePage"
      show-total
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "日期",
          key: "CreateTime",
        },
        {
          title: "事件",
          key: "Type",
        },
        {
          title: "交易前余额",
          key: "OldMoney",
        },
        {
          title: "交易金额",
          key: "Money",
          render: (h, params) => {
              console.log(params.row)
            return h("div", {
             domProps: {
              style: params.row.Money > 0 ?"color: #FFCC00" :"color: red" ,
              innerHTML: params.row.Money > 0 ? `+${params.row.Money}` : params.row.Money ,
            },
            });
          },
        },
        {
          title: "交易后金额",
          key: "NowMoney",
          
        },
      ],
      data1: [],
      form: {
        MemberId: localStorage.getItem("userID"),
        offset: 1,
        limit: 8,
      },
      page: {
        total: 1,
        current: 1, // 当前页码
        size: 8, // 每页个数
      },
      info: {},
    };
  },
  methods: {
    async queryWaterConsumption() {
      const { data } = await this.$post("QueryWaterConsumption", this.form);
      if (data.State) {
        this.info = JSON.parse(data.ReturnJson);
        this.page.total = this.info.AllCount;
      }
    },
    changePage(e) {
      this.form.offset = e;
      this.queryWaterConsumption();
    },
    rowClassName(row, index) {
      if (index === 0) {
        return "demo-table-info-row";
      } else if (index === 3) {
        return "demo-table-error-row";
      }
      return "";
    },
  },
  mounted() {
    this.queryWaterConsumption();
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 1069px;
  height: 700px;
  background: #ffffff;
  padding: 20px 29px;
  //修改table的属性
  .page-ive {
    margin: 20px auto;
    width: 400px;
    display: flex;
    justify-content: center;
  }
  /deep/ #mygrid {
    .ivu-table {
      border-top: 0px solid #fff;
    }
    .ivu-table th {
      text-align: center;
      background: #fff;
      color: #4d75b0ff;
      border: 0px solid #fff;
    }
    .ivu-table td {
      text-align: center;
    }

    .ivu-table .demo-table-info-row td {
      background-color: #f1f5fe;
      color: #666;
    }
    .ivu-table-wrapper {
      position: relative;
      border-bottom: 0;
      border-right: 0;
    }
    .ivu-table:before {
      content: "";
      width: 100%;
      height: 0px;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
    }
    .ivu-table:after {
      content: "";
      width: 0px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;
    }
  }
  .all {
    width: 936px;
    display: flex;
    justify-content: center;
    margin: -20px 0 0 0px;
    .money {
      display: flex;
      flex-direction: row;
      text-align: center;
      justify-content: space-around;
      width: 684px;
      .balance {
        width: 280px;
        height: 80px;
        background-image: linear-gradient(to right, #ff9933ff, #efe457ff);
        border-radius: 5px;
        cursor: pointer;
        p {
          line-height: 36px;
        }
        p:nth-child(1) {
          font-size: 16px;
          color: #fff;
        }
        p:nth-child(2) {
          font-size: 30px;
          color: #ff3300;
          font-weight: bold;
        }
      }
      .consumption {
        width: 280px;
        height: 80px;
        background-image: linear-gradient(to right, #00a9e0ff, #7bddfdff);
        border-radius: 5px;
        p {
          line-height: 36px;
        }
        p:nth-child(1) {
          font-size: 16px;
          color: #fff;
        }
        p:nth-child(2) {
          font-size: 30px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
  .date {
    width: 949px;
    margin: 33px 0 0 34px;
    position: relative;
    .left {
      width: 1px;
      height: 570px;
      border: 1px solid #fff;
      position: top;
      position: absolute;
      top: 0px;
    }
    .top {
      width: 949px;
      height: 1px;
      border: 1px solid #fff;
      position: top;
      position: absolute;
      top: 0px;
    }
    // .right{
    //     width: 1px;
    //     height: 570px;
    //     border: 1px solid #fff;
    //     position: top;
    //     position: absolute;
    //     top: 0px;
    //     background: #fff;
    //     right: 0;
    // }
  }
}
</style>
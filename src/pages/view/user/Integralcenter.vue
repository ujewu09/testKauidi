<template>
  <!-- 积分中心 -->
  <div class="container">
    <Title-b title="积分中心" />
    <div class="background">
      <div class="circular">{{ info.Money }}</div>
    </div>
    <div class="date">
      <table id="table" cellspacing="0">
        <tr>
          <td>{{$t('Personal.Integraltype')}}</td>
          <td>{{$t('Myorder.Ordernumber')}}</td>
          <td>ID</td>
          <td>{{$t('Personal.Integral')}}</td>
          <td>{{$t('Personal.Time')}}</td>
        </tr>
        <tr v-for="(v, n) in data" :key="n">
          <td>{{ v.IntegralCome }}</td>
          <td>{{ v.OrderID }}</td>
          <td>{{ v.ID }}</td>
          <td>{{ v.Integral }}</td>
          <td>{{ v.CreateTime }}</td>
        </tr>
      </table>
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
      form: {
        MemberId: localStorage.getItem("userID"),
        offset: 1,
        limit: 10,
      },
      list: [],
      data: [],
      info: {},
      page: {
        total: 1,
        current: 1, // 当前页码
        size: 8, // 每页个数
      },
    };
  },
  mounted() {
    this.queryIntegral();
  },
  methods: {
    async queryIntegral() {
      const { data } = await this.$post("QueryIntegral", this.form);
      if (data.State) {
        this.info = JSON.parse(data.ReturnJson);
        this.info.QueryIntegralinfolist.forEach((item) => {
          this.list = this.list.concat(item.QueryIntegralinfo);
        });
        this.data = this.list;
        this.page.total = this.data.length;
        if (this.list.length < this.page.size) {
          this.data = this.list;
        } else {
          this.data = this.list.slice(0, this.pageSize);
        }
      }
    },
    changePage(index) {
      // 页码改变的回调，返回改变后的页码
      var _start = (index - 1) * this.page.size;
      var _end = index * this.page.size;
      this.data = this.list.slice(_start, _end);
    },
  
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 1069px;
  height: 700px;
  background: #fff;
  border-radius: 5px;
  padding: 19px 17px;
  /deep/ #mygrid {
    // .ivu-table{
    //     border: 0px solid #fff;
    // }
    .ivu-table th {
      text-align: center;
      background: #fff;
      color: #000;
    }
    .ivu-table td {
      text-align: center;
    }
    .ivu-table .demo-table-info-row td {
      background-color: #f1f5fe;
      color: #666;
    }
  }
  // .p{
  //     padding: 19px 17px;
  //     color:#000;
  //     font-size: 16px;
  // }
  .background {
    background: url("../../../assets/images/kexiaofeijifen.png");
    margin: -20px 0 0 190px;
    width: 671px;
    height: 191px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .circular {
      text-align: center;
      line-height: 40px;
      width: 200px;
      height: 36px;
      background: #fbf1ae;
      border-radius: 15px;
      font-size: 30px;
      font-weight: bold;
      color: #ff9900;
      margin: 93px 0 0 0;
    }
  }
  .date {
    margin: 33px 0 0 60px;
    #table {
      width: 949px;
      cursor: pointer;
      tr {
        height: 40px;
      }
      tr:nth-child(1) {
        background: linear-gradient(0deg, #ff920a 0%, #ffaf4b 100%);
        font-size: 16px;
        color: #333;
        td {
          color: #333;
          font-size: 16px;
        }
      }
      td {
        width: 100px;
        font-size: 12px;
        text-align: center;
        border-bottom: 1px solid #ccc;
      }
      td:nth-child(1) {
        color: #ff9900;
        font-size: 12px;
      }
      .td:nth-child(even) {
        background: #fff;
      }
      .td:nth-child(odd) {
        background: #f1f5fe;
      }
    }
  }
}
</style>
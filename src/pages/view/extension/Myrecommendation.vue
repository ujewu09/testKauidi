<template>
  <!-- 我的推荐 -->
  <div class="container">
    <Title-b title="我的推荐" />
    <!-- <p class="p">我的推荐</p> -->
    <p class="p2">{{$t('PromotionCenter.total')}}</p>
    <p class="p3">{{ allorder.AllCount }}</p>
    <div class="date">
      <table id="table" cellspacing="0">
        <tr>
          <td>{{$t('PromotionCenter.UserID')}}</td>
          <td>{{$t('PromotionCenter.UserMC')}}</td>
          <td>{{$t('PromotionCenter.Userzc')}}</td>
        </tr>
        <tr
          v-for="(item, index) in allorder.ReCommendInfo"
          :key="index"
          class="td"
        >
          <td>{{ item.ClientName }}</td>
          <td>{{ item.MemberId }}</td>
          <td>{{ item.CreateTime }}</td>
        </tr>
      </table>
      <div style="margin: 10px 0 0 200px">
        <Page
          :total="dataCount"
          :page-size="pageSize"
          show-total
          @on-change="changepage"
          show-elevator
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allorder: [],
      dataCount: 0,
      pageSize: 8,
      all: [],
    };
  },
  mounted() {
    this.Query_Recommend();
  },
  methods: {
    async Query_Recommend(page = 1) {
      const params = {
        MemberID: localStorage.getItem("userID"),
        offset: page,
        limit: this.pageSize,
      };
      const { data } = await this.$post("Query_Recommend", params);
      if (data.State) {
        this.allorder = JSON.parse(data.ReturnJson);
        console.log(this.allorder);
        this.dataCount = this.allorder.AllCount;
        console.log(this.dataCount);
        this.all = this.allorder.ReCommendInfo;
      }
    },
    changepage(index) {
      this.Query_Recommend(index);
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
  P {
    cursor: pointer;
  }
  // .p{
  //     padding: 19px 17px;
  //     color:#000;
  // }
  .p2 {
    color: #69b1d7;
    font-size: 20px;
    margin: 0 0 0 436px;
  }
  .p3 {
    @include color($_color);
    margin: 0 0 0 510px;
    font-weight: bold;
    font-size: 30px;
  }
  .date {
    margin: 15px 0 0 209px;
    #table {
      width: 650px;
      cursor: pointer;
      tr {
        height: 40px;
      }
      tr:nth-child(1) {
        background: linear-gradient(
          0deg,
          #abd6e5 0%,
          #85bed7 50%,
          #67b0d7 100%
        );
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
        border-bottom: 1px solid #aad5e5;
        color: #333;
      }
      .td {
        td:nth-child(1) {
          border-left: 1px solid #aad5e5;
        }
        td:nth-child(3) {
          border-right: 1px solid #aad5e5;
        }
      }
    }
  }
}
</style>
<template>
  <!-- 银行转账 -->
  <div class="container">
    <div class="one">
      <Title-b title="银行转账" />
      <!-- <p class="p">银行转账</p> -->
      <!-- 银行卡 -->
      <div class="bankcard">
        <div v-for="(item,index) in list" :key="index" class="bank-item">
          <div>银行账户：{{ item.AccountNumber }}</div>
          <div>银行名称：{{ item.BankName }}</div>
          <div>户口持有人：{{ item.HolderName }}</div>
          <div>
            <Button-b value="转账申报" @click.native="changeBank(item)" />
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="tow" v-if="isShow">
      <Title-b title="登记转账信息" />
      <!-- <p class="p">登记转账信息</p> -->

      <div class="from">
        <div style="position: relative; left: 12px">
          <span class="span">银行名称：</span>
          <input type="text" class="input" v-model="bankName" disabled />
        </div>
        <div>
          <span class="span">交易号：</span>
          <input type="text" class="input" v-model="TransactionNo"/>
        </div>
        <div>
          <span class="span">付款人姓名：</span>
          <input type="text" class="input" v-model="Contacts"/>
        </div>
        <div>
          <span class="span">付款人电话：</span>
          <input type="text" class="input" v-model="PhoneNo"/>
        </div>
        <div style="position: relative; left: 12px">
          <span class="span">付款金额：</span>
          <input type="text" class="input" v-model="Money"/>
        </div>
        <div class="display-row">
          <span class="span">付款凭证图：</span>
          <Upload
            multiple
            ref="upload"
            :before-upload="handleUpload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            action="http://39.99.246.93:8881/Website/uploadImg"
          >
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
          <img v-if="src" class="upImg" :src="src" alt="">
        </div>
        <div class="subimt">
          <button type="button" @click="addTransactionLog()">确定提交</button>
        </div>
      </div>
    </div>
    <div class="three">
      <Title-b title="转账记录" />
      <div class="date">
        <table id="table" cellspacing="0" v-if="isShowTable">
          <tr>
            <td>{{$t('Personal.Tradinghours')}}</td>
            <td>{{$t('Personal.Transactionamount')}}</td>
            <td>{{$t('Personal.drawee')}}</td>
            <td>{{$t('Personal.Transactionserialnumber')}}</td>
            <td>{{$t('Personal.Receivingbankcardnumber')}}</td>
            <td>{{$t('Personal.Auditstatus')}}</td>
            <td>备注</td>
          </tr>
          <tr v-for="(v, n) in allorder.TransactionInfo" :key="n">
            <td>{{ v.TransactionTime }}</td>
            <td>{{ v.Money }}</td>
            <td>{{ v.Contacts }}</td>
            <td>{{ v.TransactionNo }}</td>
            <td>{{ v.BankNo }}</td>
            <td>{{ v.AudtingDescription }}</td>
            <td>{{ v.Remark }}</td>
          </tr>
        </table>
      </div>
      <div style="margin: 10px 0 0 340px">
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
      list: [],
      bankName: "",
      isShow: false,
      imgName: "",
      visible: false,
      src: "",
      img: "",
      allorder:[],
      addorder:[],
      TransactionNo:"",
      PhoneNo:"",
      Contacts:"",
      Money:"",
      tempObj:{},
      dataCount: 0,
      pageSize: 8,
      isShowTable: true
    };
  },

  methods: {
    //插入银行卡交易记录
    async addTransactionLog(){
      if(this.TransactionNo == ""){
        this.$Message.error("交易号不能为空！");
        return false;
      }else if(this.Contacts == ""){
        this.$Message.error("姓名不能为空！");
        return false;
      }else if(this.PhoneNo == ""){
        this.$Message.error("电话不能为空！");
        return false;
      }else if(this.Money == ""){
        this.$Message.error("付款金额不能为空！");
        return false;
      }else{
        for(var i = 0; i<this.list.length;i++){
          this.tempObj = this.list[i].AccountNumber
          console.log(this.tempObj )
        }
        const today = new Date();
        const params = { 
          UserID: localStorage.getItem("userID"),
          UserName:"",
          BankNo:this.tempObj,
          TransactionNo:this.TransactionNo,
          PhoneNo:this.PhoneNo,
          Money:this.Money,
          Contacts:this.Contacts,
          TransactionTime:today,
          Url:this.src
        };
        const { data } = await this.$post("AddTransactionLog", params);
        if (data.State) {
            this.addorder = JSON.parse(data.ReturnJson);
            console.log(this.addorder);
            this.queryTransactionLog();
        }
        this.$Message.success("添加成功！")
      }
    },
    // 获取转账记录
    async queryTransactionLog(page = 1){
      this.isShowTable = false
      const params = { 
        MemberID: localStorage.getItem("userID"),
        offset:page,
        limit:this.pageSize
      };
      const { data } = await this.$post("QueryTransactionLog", params);
      if (data.State) {
          this.allorder = JSON.parse(data.ReturnJson);
          this.dataCount = this.allorder.TransactionInfo.length;
          this.isShowTable = true
          console.log(this.allorder);
      }
    },
    changepage(index) {
      this.queryTransactionLog(index);
    },
    // 获取店铺银行卡信息接口
    async getShopBankInfo() {
      var JsonData = {
        ShopID: localStorage.getItem("CusID"),
      };
      const { data } = await this.$post("GetShopBankInfo", JsonData);
      if (data.State) {
        this.list = JSON.parse(data.ReturnJson).BankNoInfo;
      }
    },
    changeBank(item) {
      this.bankName = item.BankName;
      this.isShow = true;
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleUpload(file) {
      console.log(file);
      var formDate = new FormData();
      formDate.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const url = localStorage.getItem("url");
      console.log(formDate)
    //   this.$http.post(url + "/uploadImg", formDate, config).then((res) => {
    //     console.log(JSON.parse(res.data.ReturnJson), "imgg");
    //     console.log(res, "res");
    //     this.src = JSON.parse(res.data.ReturnJson).Image;
    //     this.img = JSON.parse(res.data.ReturnJson).ulrImage;
    //   });
    },
    handleSuccess(res, file) {
      let data = JSON.parse(res.ReturnJson);
      this.src  = data.ulrImage;
      file.name = data.Image;
    },
  },

  mounted() {
    this.getShopBankInfo();
    this.queryTransactionLog();
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 1069px;

  .one {
    width: 1069px;
    background: #fff;
    margin: 10px 0 0 0;
    border-radius: 5px;
    padding: 20px 29px;

    .bankcard {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      .bank-item {
          background: url('../../../assets/imgs/9f57772f74ba8532f4fecf13ea11bb5.png');
        margin: 0 20px;
        width: 306px;
        height: 160px;
        border-radius: 5px;
        box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.1);
        padding: 20px;
        line-height: 26px;
      }
    }
  }
  .tow {
    width: 1069px;
    height: 230px;
    background: #fff;
    margin: 10px 0 0 0;
    border-radius: 5px;
    padding: 20px 29px;
    .from {
      width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: -10px 0 0 230px;
      span {
        color: #666;
      }
      div {
        //width: 280px;
        margin: 10px 12px;
      }
      .input {
        text-indent: 10px;
        cursor: pointer;
        width: 200px;
        height: 26px;
        border-radius: 5px;
        border: 1px solid #ccc;
      }
      .subimt {
        // margin: 13px 0 0 190px;
        z-index: 999;
        button {
          width: 200px;
          height: 30px;
          @include backgroundColor($_color);
          // background: #ff0000;
          border-radius: 5px;
          border: 0px solid #fff;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
  .three {
    width: 1069px;
    // height: 389px;
    background: #fff;
    margin: 10px 0 0 0;
    border-radius: 5px;
    padding: 20px 29px;
    .date {
      margin: 33px 0 0 30px;
      #table {
        width: 949px;
        cursor: pointer;
        tr {
          height: 40px;
        }
        tr:nth-child(1) {
          font-size: 16px;
          color: #333;
          td {
            border:0px solid #fff;
            color: #333;
            font-size: 16px;
          }
        }
        td {
          width: 100px;
          font-size: 12px;
          text-align: center;
          border: 1px solid #ccc;
        }
        td:nth-child(1) {
          // color: #ff9900;
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
}
.display-row{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.upImg{
    width: 100px;
    height: 100px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
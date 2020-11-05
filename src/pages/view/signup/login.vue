<template>
  <div class="container">
    <div class="body">
      <headerDiv />
      <div class="total">
        <div class="one">
          <p>{{$t('login.one')}}</p>
          <div class="two" style="margin-top: 35px">
            <input type="text" placeholder="请输入用户名/会员ID" v-model="Uid" />
          </div>
          <div class="two">
            <input type="password" name="" id="" v-model="Pwd" placeholder="请输入密码" />
          </div>
          <div class="three">
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <div class="code" id="v_container"></div>
          </div>
          <div class="four">
            <button type="button" @click="denglu()">
              <span>{{$t('login.three')}}</span>
              <img src="../../../assets/images/xiangyoujiantou.png" alt="" />
            </button>
          </div>
          <p class="pdw" @click="xs()">{{$t('login.two')}}</p>
          <div class="five">
            <span>{{$t('login.four')}}</span>
            <span @click="register()">{{$t('login.five')}}</span>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="handelModal"
      title="忘记密码"
      style="width:330px"
    >
      <Input v-model="Cname" placeholder="请输入你的登录名..." style="width: 300px" />
      <Input v-model="Cphone" placeholder="请输入你的邮箱" style="width: 300px" />
      <br>
      <Button type="primary" @click="Client_ReSetPwd()">找回密码</Button>
    </Modal>
  </div>
</template>
<script>
let Base64 = require("js-base64").Base64;
import axios from "axios";
import headerDiv from "../../layout/header/index.vue";
import { GVerify } from "./code.js";
import md5 from "js-md5";
export default {
  data() {
    return {
      username: "",
      userpwd: "",
      single: false,
      four: 0,
      one: true,
      two: false,
      Uid: "",
      Pwd: "",
      code: "",
      verifyCode: "",
      handelModal:false,
      Cname:"",
      Cphone:""
    };
  },
  components: {
    headerDiv,
  },
  methods:{
    xs(){
      this.handelModal=true;
    },
    async Client_ReSetPwd(){
      if(this.Cname == ""){
        this.$Message.error('请输入您的用户名')
        return false;
      }else if(this.Cphone == ""){
        this.$Message.error('请输入您的邮箱')
        return false
      }else{
         localStorage.removeItem("token")
        const params = {
          // MemberID: localStorage.getItem("userID"),
          clientName:this.Cname,
          email:this.Cphone
        };
        console.log(params,'数据')
        const { data } = await this.$post("Client_ReSetPwd", this.params);
        console.log("111"+data)
        if (data.status==200) {
          // this.allorder = JSON.parse(data.ReturnJson);
          this.$Message.success('您的新密码重置为"123456"')
        }
        this.handelModal = true;
      }
      
    },
    async queryUrl() {
      const _md5 = md5('{"Url":"member.paibaoex.com"}123456');
      const params = {
        JsonData: '{"Url":"member.paibaoex.com"}',
        CusID: 23,
        KeyMd5: _md5,
      };
      const { data } = await this.$post("/QueryUrl", params, true);
      if (data.State) {
        const storeInfo = JSON.parse(data.ReturnJson);
        localStorage.setItem("CusID", storeInfo.CusID);
        localStorage.setItem("shopName", storeInfo.Name);
        localStorage.setItem("KeyText", storeInfo.KeyText);
        localStorage.setItem("phone", storeInfo.Phone);
      }
    },
    
    async login() {
      const pwd = Base64.encode(this.Pwd);
      const KeyText = localStorage.getItem("KeyText");
      const JsonData = {
        Uid: this.Uid,
        Pwd: pwd,
      };
      const _md5 = md5(JSON.stringify(JsonData) + KeyText); // md5加密
      const params = {
        JsonData: JSON.stringify(JsonData),
        CusID: localStorage.getItem("CusID"),
        KeyMd5: _md5,
      };
      const { data } = await this.$post("/Client_Login", params, true);
      if (data.State) {
        const msg = JSON.parse(data.ReturnJson);
        localStorage.setItem("token", msg.Token);
        localStorage.setItem("userID", msg.id);
        localStorage.setItem("name", msg.ClientName);
        localStorage.removeItem("guide");
         this.$Message.success('登录成功');
         this.$router.push("./manageHome");
      } else {
        this.$Message.error(data.MsgText);
      }
    },
    denglu() {
      if (this.Uid == "") {
        this.$Message.error("用户名不能为空!");
        return false;
      }
      if (this.Pwd == "") {
        this.$Message.error("密码不能为空!");
        return false;
      }
      if (this.verifyCode != this.code) {
        this.$Message.error("验证码填写有误!");
        return false;
      }
      this.login();
    },
    register() {
        console.log('123222')
      this.$router.push("./register");
    },
  },
  mounted() {
    this.queryUrl();
    const codeImg = new GVerify("v_container");
    this.verifyCode = codeImg.options.code;
    console.log(this.verifyCode)
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
   @include backgroundColor($_color);
    // height: 100vh;
    // /deep/ .ivu-modal-content{
    //   width: 334px ;
    // }
    .body{
      background: url('../../../assets/images/bg.png')no-repeat center center;
      height: 100vh;
      width:100%;
      background-size: 100% 100%;
      background-position: -400px 0;
    }
  .total {
    width: 100%;
    display: flex;
    padding-bottom:20px;
    justify-content: flex-end;
  
    .one {
      width: 500px;
      height: 550px;
      background: #fff;
      box-shadow: 0px 0px 30px 0px rgba(35, 21, 24, 0.35);
      border-radius: 20px;
      margin: 80px 190px 0 0;
      padding: 0 54px;
      p {
        font-size: 36px;
        font-weight: bold;
        color: #333;
        padding: 38px 0 0 0;
      }
      .pdw {
        font-size: 14px;
        font-weight: 600;
        position: absolute;
        color:#f00;
        // @include color($_color);
        margin: -59px 0 0 0;
        cursor: pointer;
      }
      .two {
        margin: 30px 0 30px 0;
        input {
          width: 390px;
          height: 43px;
          background: #fafafa;
          border: 2px solid #e4e4e4;
          opacity: 0.6;
          border-radius: 5px;
          text-indent: 1em;
        }
      }
      .three {
        display: flex;
        flex-direction: row;
        input {
          width: 293px;
          height: 43px;
          background: #fafafa;
          border: 2px solid #e4e4e4;
          opacity: 0.6;
          border-radius: 5px;
          text-indent: 1em;
        }
        .code {
          width: 156px;
          height: 43px;
          background: #fafafa;
          border: 2px solid #e4e4e4;
          opacity: 0.6;
          border-radius: 5px;
          margin: 0 0 0 10px;
        }
        /deep/ #verifyCanvas {
          width: 153px;
          height: 43px;
        }
      }
      .four {
        position: relative;
        display: flex;
        flex-direction: row;
        margin-top: 35px;
        .check1 {
          width: 19px;
          height: 19px;
          background: #fff;
          border-radius: 50%;
          border: 1px solid #c2c2c2;
          position: absolute;
          top: 0;
        }
        .check2 {
          width: 19px;
          height: 19px;
          background: #0099ff;
          border-radius: 50%;
          position: absolute;
          top: 0;
        }
        span {
          margin: 0 0 0 25px;
          font-weight: 500;
          color: #666;
          width: 50px;
        }
        button {
           @include backgroundColor($_color);
          width: 230px;
          height: 60px;
          border-radius: 5px;
          display: flex;
          margin: 0px 0 0 160px;
          line-height: 60px;
          cursor: pointer;
          border: none;
          justify-content: space-around;
          img {
            vertical-align: middle;
            margin: 14px 0 0 0px;
          }
          span {
            font-size: 24px;
            font-weight: 500;
            color: #fff;
          }
        }
      }
      .five {
        width: 460px;
        height: 70px;
        background: #f9f9f9;
        border-radius: 5px;
        text-align: center;
        margin: 37px -35px;
        span {
          font-size: 20px;
          font-weight: 500;
          line-height: 65px;
        }
        span:nth-child(1) {
          color: #333;
        }
        span:nth-child(2) {
          color: #f00;
          // @include color($_color);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
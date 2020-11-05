<template>
  <!-- 个人中心管理 -->
  <div class="contaier">
    <div class="all">
      <div class="one">
        <Title-b title="修改信息" />
        <!-- <p class="p">修改信息</p> -->
        <div class="avatar">
          <div class="yuan">
            <img :src="urlImg" class="img-style" alt="" />
          </div>
        </div>
        <div class="from">
          <div>
            <span class="span">{{$t('Personal.two')}}：</span>
            <input type="text" class="input" disabled v-model="form.ClientName" />
          </div>
          <div>
            <span class="span">{{$t('Home.Email')}}：</span>
            <input type="emali" v-model="form.Email" class="input" />
          </div>
          <div>
            <span class="span">{{$t('Personal.Phone')}}：</span>
            <input type="emali" v-model="form.Mobile" class="input" />
          </div>
          <div style="position: relative; left: -3px">
            <span>{{$t('Personal.one')}}：</span>
            <input type="emali" v-model="form.Cardnum" class="input" />
          </div>
          <div style="position: relative;left: 9px;">
            <span>{{$t('Personal.Postcode')}}：</span>
            <input type="emali" v-model="form.ZipCode" class="input" />
          </div>
          <div class="subimt">
            <button type="button" @click="tj()">{{$t('Personal.Savememberinformation')}}</button>
          </div>
        </div>
      </div>
      <div class="two">
        <Title-b title="修改密码" />
        <!-- <p class="p">修改信息</p> -->
        <div class="from">
          <div>
            <span class="span">{{$t('Personal.three')}}：</span>
            <input type="password" v-model="formPass.OldPassword" class="input" />
          </div>
          <div>
            <span class="span">{{$t('Personal.four')}}：</span>
            <input type="password" v-model="formPass.NewPassword" class="input"/>
          </div>
          <div style="position: relative; left: -23px">
            <span class="span">{{$t('Personal.five')}}：</span>
            <input type="password" v-model="formPass.Repassword" class="input" />
          </div>
          <div class="subimt">
            <button type="button" @click="updatePwd">{{$t('Personal.Savepassword')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userNmae: "",
      email: "",
      phone: "",
      id: "",
      Postcode: "",
      urlImg: "",
      form: {
        MemberId: localStorage.getItem("userID"),
        ClientName: "",
        Mobile: "",
        // QQNum: "",
        // Wx_No: "",
        Email: "",
        Cardnum: "",
        ZipCode: "",
      },
      info: {},
      formPass: {
        MemberId: localStorage.getItem("userID"),
        OldPassword: "",
        NewPassword: "",
        Repassword: "",
      },
    };
  },
  methods: {
    async getUserInfo() {
      const params = { member: localStorage.getItem("userID") };
      const { data } = await this.$post("GetUserInfo", params);
      console.log(data);
      if (data.State) {
        this.info = JSON.parse(data.ReturnJson);
        let info = this.info;
        this.form.ClientName = info.ClientName;
        this.form.Email = info.email;
        this.form.Mobile = info.Mobile;
        this.form.Cardnum = info.Cardnum;
        this.form.Wx_No = info.Wx_No;
        this.form.QQNum = info.QQNum;
        this.urlImg = info.HeadUrl;
        localStorage.setItem("msg", JSON.stringify(this.info));
      } else {
        this.$Message.error(data.MsgText);
      }
    },
    async editMember() {
      const { data } = await this.$post("EditMember", this.form);
      if (data.State) {
        this.$Message.success("修改成功!");
      } else {
        this.$Message.error(data.MsgText);
      }
    },
    async updatePwd() {
          let bol = Object.keys(this.formPass).some(key => {
      return this.formPass[key] == "" || this.formPass[key] == null
    })
    if (bol) {
        this.$Message.error('请将密码填写完整');
      return false;
    }
      const { data } = await this.$post("updatePwd", this.formPass);
      if (data.State) {
          this.$Message.success("修改成功，请重新登录!");
           localStorage.removeItem("name");
        this.$router.push("/login");
       
      } else {
        this.$Message.error(data.MsgText);
      }
    },

    tj() {
      // 邮箱
      let phoneReg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      // 18位身份证
      let sfz = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      // 邮编
      let yb = /^[0-9]{6}$/;
      if (this.form.ClientName == "") {
        this.$Message.error("会员姓名不能为空！");
        return false;
      }
       else if (this.form.Email == "") {
        this.$Message.error("邮箱不能为空！");
        return false;
      } else if (!phoneReg.test(this.form.Email)) {
        this.$Message.error("邮箱格式错误！");
        return false;
      } 
      else if (this.form.Mobile == "") {
        this.$Message.error("手机号不能为空！");
        return false;
      } else if (!sfz.test(this.form.Cardnum)) {
        this.$Message.error("身份证格式错误！");
        return false;
      } 
    //   else if (this.form.ZipCode == "") {
    //     this.$Message.error("邮编不能为空！");
    //     return false;
    //   } else if (!yb.test(this.form.ZipCode)) {
    //     this.$Message.error("邮编格式错误！");
    //     return false;
    //   }
       else {
        this.editMember();
        return true;
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>
<style lang="scss" scoped>
.contaier {
  width: 1069px;
  height: 748px;
  // background: #fff;
  // padding: 20px 29px;
  .all {
    .one {
      width: 1069px;
      height: 356px;
      background: #fff;
      border-radius: 5px;
      padding: 20px 29px;
      // .p{
      //     padding: 20px 29px;
      // }
      .avatar {
        display: flex;
        flex-direction: row;
        align-items: center;
        //justify-content: center;
        margin: 0 0 0 275px;
        .yuan {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.1);
          .img-style {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .change {
          border: 1px solid #666;
          width: 80px;
          height: 26px;
          border-radius: 13px;
          margin: -23px 0 0 29px;
          text-align: center;
          line-height: 26px;
          cursor: pointer;
        }
      }
      .from {
        width: 600px;
        // height: 190px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 19px 0 0 230px;
        div {
          width: 280px;
          margin: 10px 10px;
        }
        .input {
          text-indent: 10px;
          cursor: pointer;
          width: 200px;
          height: 26px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .span::before {
          content: "*";
          display: inline-block;
          margin-right: 4px;
          line-height: 1;
          font-family: SimSun;
          font-size: 12px;
          color: #ed4014;
        }
        .subimt {
          margin: 13px 0 0 190px;
          button {
            width: 200px;
            height: 30px;
            @include backgroundColor($_color);
            // background: #ff0000;
            border-radius: 5px;
            border: 0px solid #ffffff;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    .two {
      width: 1069px;
      height: 384px;
      background: #fff;
      border-radius: 5px;
      padding: 20px 29px;
      margin-top: 9px;
      // .p{
      //     padding: 20px 29px;
      // }
      .from {
        width: 600px;
        // height: 190px;
        display: flex;
        flex-direction: column;
        margin: 19px 0 0 230px;
        div {
          width: 300px;
          margin: 10px 10px;
        }
        .input {
          text-indent: 10px;
          cursor: pointer;
          width: 200px;
          height: 26px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .span::before {
          content: "*";
          display: inline-block;
          margin-right: 4px;
          line-height: 1;
          font-family: SimSun;
          font-size: 12px;
          color: #ed4014;
        }
        .subimt {
          margin: 13px 0 0 190px;
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
  }
}
</style>
<template>
  <!-- 收货地址管理 -->
  <div class="container">
    <Title-b title="地址管理" />
    <!-- <p class="p">银行转账</p> -->
    <div class="goods" @click="show()">{{$t('Personal.six')}}</div>
    <div class="goodss" v-show="show1">
      <div class="fff">
        <div>
          <span
            style="color: #000;font-size: 20px;margin: 37px 0 0 132px;display: inline-block;">添加收货地址</span>
          <img src="../../../assets/images/chahao.png" alt="" style="width: 27px;height: 27px;position: absolute;top: 34px;left: 1010px; " @click="clone()"/>
        </div>
        <!-- tabs -->
        <div style="margin: 16px 0 0 227px">
          <Tabs active-key="0" :animated="false">
            <Tab-pane label="送货上门" :index="0">
              <div class="from">
                <div>
                  <span class="span">{{$t('Home.Destination')}}：</span>
                  <i-select v-model="addressid.Country" placeholder="请选择国家" @on-change="changeAddress('Country', $event)" style="width: 105px">
                    <i-option :value="itemm.CountryID" v-for="(itemm, indexx) in syck" :key="indexx">
                      {{ itemm.CountryName }}
                    </i-option>
                  </i-select>
                  <i-select v-model="addressid.Provice" placeholder="请选择省" @on-change="changeAddress('Provice', $event)" style="width: 105px">
                    <i-option :value="itemm.CodeID" v-for="(itemm, indexx) in addList.Country" :key="indexx">
                      {{ itemm.Name }}
                    </i-option>
                  </i-select>
                  <!-- 第二个 -->
                  <i-select v-model="addressid.City" placeholder="请选择市" @on-change="changeAddress('City', $event)" style="width: 105px;">
                    <i-option :value="item.CodeID" v-for="(item, index) in addList.Provice" :key="index">
                      {{ item.Name }}
                    </i-option>
                  </i-select>
                  <!-- 第三个 -->
                  <i-select v-model="addressid.Area" placeholder="请选择" @on-change="changeAddress('Area', $event)" style="width: 105px">
                    <i-option :value="itemmm.CodeID" v-for="(itemmm, indexxx) in addList.City" :key="indexxx">
                      {{ itemmm.Name }}
                    </i-option>
                  </i-select>
                </div>
                <div>
                  <span class="span">{{$t('Personal.Detailedaddress')}}：</span>
                  <input type="emali" class="input" v-model="address" />
                </div>
                <div>
                  <span class="span">{{$t('Personal.Phone')}}：</span>
                  <input type="emali" class="input" v-model="phone" />
                </div>
                <div>
                  <span class="span">{{$t('Personal.Namebusinessname')}}：</span>
                  <input type="emali" class="input" v-model="signer" />
                </div>
                <div>
                  <span>{{$t('Personal.Tel')}}：</span>
                  <input type="emali" class="input" v-model="tel" />
                </div>
                <div>
                  <span>{{$t('Personal.Postcode')}}：</span>
                  <input type="emali" class="input" v-model="card" />
                </div>
                <div class="subimt" @click="addAddress()">
                  <button type="button">{{$t('Personal.six')}}</button>
                </div>
              </div>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
    </div>
    <!-- 编辑 -->
    <div class="goodss" v-show="show2">
      <div class="fff">
        <div>
          <span
            style="color: #000;font-size: 20px;margin: 37px 0 0 132px;display: inline-block;">修改收货地址</span>
          <img src="../../../assets/images/chahao.png" alt="" style="width: 27px;height: 27px;position: absolute;top: 34px;left: 1010px; " @click="show2=false;cuurrtAddressID=null"/>
        </div>
        <!-- tabs1 -->
        <div style="margin: 16px 0 0 227px">
          <Tabs active-key="0" :animated="false">
            <Tab-pane label="送货上门" :index="0">
              <div class="from">
                <div>
                  <span class="span">{{$t('Home.Destination')}}：</span> 
                  <i-select v-model="addressid.Country" placeholder="请选择国家" @on-change="changeAddress('Country', $event)" style="width: 105px">
                    <i-option :value="itemm.CountryID" v-for="(itemm, indexx) in syck" :key="indexx">
                      {{ itemm.CountryName }}
                    </i-option>
                  </i-select>
                  <i-select v-model="addressid.Provice" placeholder="请选择省" @on-change="changeAddress('Provice', $event)" style="width: 105px">
                    <i-option :value="itemm.CodeID" v-for="(itemm, indexx) in addList.Country" :key="indexx">
                      {{ itemm.Name }}
                    </i-option>
                  </i-select>
                  <i-select v-model="addressid.City" placeholder="请选择市" @on-change="changeAddress('City', $event)" style="width: 105px;">
                    <i-option :value="item.CodeID" v-for="(item, index) in addList.Provice" :key="index">
                      {{ item.Name }}
                    </i-option>
                  </i-select>
                  <i-select v-model="addressid.Area" placeholder="请选择" @on-change="changeAddress('Area', $event)" style="width: 105px">
                    <i-option :value="itemmm.CodeID" v-for="(itemmm, indexxx) in addList.City" :key="indexxx">
                      {{ itemmm.Name }}
                    </i-option>
                  </i-select>
                </div>
                <div>
                  <span class="span">{{$t('Personal.Detailedaddress')}}：</span>
                  <input type="emali" class="input" v-model="address" />
                </div>
                <div>
                  <span class="span">{{$t('Personal.Phone')}}：</span>
                  <input type="emali" class="input" v-model="phone" />
                </div>
                <div>
                  <span class="span">{{$t('Personal.Namebusinessname')}}：</span>
                  <input type="emali" class="input" v-model="signer" />
                </div>
                <div>
                  <span>{{$t('Personal.Tel')}}：</span>
                  <input type="emali" class="input" v-model="tel" />
                </div>
                <div>
                  <span>{{$t('Personal.Postcode')}}：</span>
                  <input type="emali" class="input" v-model="card" />
                </div>
                <!-- 修改 -->
                <div class="subimt" @click="EditAddress()">
                  <button type="button">{{$t('Personal.Modifyshippingaddress')}} </button>
                </div>
              </div>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="one" v-for="(item, index) in table" :key="index">
        <div class="defaultaddress">
          <div>
            <p style="padding-top: 3px">{{ item.name }}</p>
            <p style="padding-top: 3px">{{item.CountryName}}</p>
            <div v-if="index == 0"><p>{{$t('Personal.Defaultaddress')}}</p></div>
          </div>
          <div>
            <img src="../../../assets/images/xiugai.png" alt="" style="width: 15px; height: 15px; margin-top: 6px" @click="QueryAddressByID(item.ID)"/>
            <img src="../../../assets/images/sc.png" alt="" style="width: 15px; height: 17px" @click="delAddress(item.ID)"/>
          </div>
        </div>
        <div class="type">
          <div class="tow">
            <p>
                <span>{{$t('Personal.Type')}}：</span>
                <span v-if="item.AddType == 1">商超自取</span>
                <span v-else-if="item.AddType == 2">配送到家</span>
                <span v-else-if="item.AddType == 3">自提点自提</span>
            </p>
            <p>
              <span>{{$t('Personal.Consignee')}}：</span><span>{{ item.Signer }}</span>
            </p>
            <p>
              <span>{{$t('Home.Destination')}}：</span>
              <span>{{ item.CountryName }} {{item.ProviceName}} {{item.CityName}} {{item.AreaName}}</span>
            </p>
            <p>
              <span>{{$t('Personal.Address')}}：</span><span>{{ item.Address }}</span>
            </p>
          </div>
          <div class="tow" style="margin: 0 0 0 230px">
            <p v-if="item.Chk == 1"><span>{{$t('Personal.State')}}：</span><span>已审核</span></p>
            <p v-if="item.Chk == 0"><span>{{$t('Personal.State')}}：</span><span>未审核</span></p>
            <p>
              <span>{{$t('Personal.Phone')}}：</span><span>{{ item.Phone }}</span>
            </p>
            <p>
              <span>{{$t('Personal.Tel')}}：</span><span>{{ item.Tel }}</span>
            </p>
            <p>
              <span>{{$t('Personal.Asurcharge')}}：</span><span>{{ item.AddFree }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除对话框 -->
     <Modal
        v-model="handelModal"
        title="确认删除?"
        :loading="handelloading"
        @on-cancel="cuurrtAddressID=null"
        @on-ok="delAddresssRquest">
        <p>确定要删除吗？</p>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      show2:false,
      handelModal:false,
      handelloading:false,
      cuurrtAddressID:null,
      //目的地
      country: "",
      address: "",
      phone: "",
      // 姓名
      signer: "",
      tel: "",
      card: "",
      table: [],
      syck: [],
      tabs:[],
      bag: {},
      addList: {
        Provice: [],
        City: [],
        Area: [],
        Country:[]
      },
      addressid: {
        Country: 0,
        Provice: 0,
        City: 0,
        Area: 0,
      },
      dzid:'',
    };
  },
  mounted() {
    // this.addAddress();
    this.queryAdressByMemberID();
    this.getCountryList();
  },
  methods: {
    show() {
      this.show1 = true;
      this.addList = {
        Provice: [],
        City: [],
        Area: [],
        Country:[]
      };
      this.addressid = {
         Country: 0,
        Provice: 0,
        City: 0,
        Area: 0,
      };
      this.address = this.phone = this.signer = this.tel = this.card = ''
    },
    clone() {
      this.show1 = false;
    },
    // 省市区
    async changeAddress(key,e) {
        console.log(key,e,"=================");
        /*
        Country 86 =================
        Provice 
        */
       switch(key){
         case "Country":
           this.addList.Provice=[];
           this.addList.City=[];
           this.addList.Area=[];
           this.addressid.Provice="";
           this.addressid.City="";
           this.addressid.Area="";
           break;
         case "Provice":
           this.addList.City=[];
           this.addList.Area=[];
           this.addressid.City="";
           this.addressid.Area="";
           break;
         case "City":
           this.addList.Area=[];
           this.addressid.Area="";
           break;
       }
        this.addressid[key] = e
            const params = {
            ParentID: key == "Country" ? 0 : e,
            CountryID: this.addressid.Country,
        };
        const { data } = await this.$post("GetAreaByParentID", params);
        if (data.State) {
            this.addList[key] = JSON.parse(data.ReturnJson);
        }
    },
    // 查询地址
    async queryAdressByMemberID() {
      const params = { MemberID: localStorage.getItem("userID")};
      const { data } = await this.$post("QueryAdressByMemberID", params);
      if (data.State) {
        this.table = JSON.parse(data.ReturnJson);
        console.log(this.table);
      }
    },
    // 添加地址
    async addAddress() {
      //手机号
      let phone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (this.address == "") {
        this.$Message.error("请填写详细地址!");
        return false;
      } else if (this.phone == "") {
        this.$Message.error("手机号不能为空!");
        return false;
      }else if(this.signer == ""){
        this.$Message.error("请填写姓名!");
        return false;
      }else {
        this.$Message.success("新增地址成功！");
        this.show1 = false;
        const params = {
          AddType: 2,
          Member: localStorage.getItem("userID"),
          Signer: this.signer,
          Phone: this.phone,
          Ztd: 0,
          Country: this.addressid.Country,
          Provice:this.addressid.Provice,
          City:this.addressid.City,
          Area:this.addressid.Area,
          Address: this.address,
          Tel: this.tel,
          Card: this.Card
        };
        this.address = this.phone = this.signer = this.tel = this.card = ''
        const { data } = await this.$post("AddAddress", params);
        this.queryAdressByMemberID();
        if (data.State) {
      
        }
      }
    },
    async getProviceList(key , id) {
        const params = {
            ParentID: id,
            CountryID: this.addressid.Country,
        };
        const { data } = await this.$post("GetAreaByParentID", params);
        if (data.State) {
          console.log(key)
            this.addList[key] = JSON.parse(data.ReturnJson)
            console.log(this.addList)
        }
    },
    // 修改地址
    async QueryAddressByID(ID) {  
      const params = { MemberID: localStorage.getItem("userID"),ID };
      const { data } = await this.$post("QueryAddressByID", params);
      if (data.State) {
          this.bag = JSON.parse(data.ReturnJson);
          this.signer = this.bag.Signer
          this.phone = this.bag.Phone
          this.tel = this.bag.Tel
          this.Card = this.bag.Card
          this.addressid.Country = this.bag.Country 
          this.addressid.Provice = JSON.stringify(this.bag.Provice) 
          this.addressid.City = JSON.stringify(this.bag.City) 
          this.addressid.Area = JSON.stringify(this.bag.Area) 
          this.address = this.bag.Address
          this.getProviceList('Country',0);
          this.getProviceList('Provice',this.bag.Provice);
          this.getProviceList('City',this.bag.City);
          this.cuurrtAddressID = ID
          this.show2 = true
      }
    },
    async EditAddress(){
      if (this.address == "") {
        this.$Message.error("请填写详细地址!");
        return false;
      } else if (this.phone == "") {
        this.$Message.error("手机号不能为空!");
        return false;
      }else if(this.signer == ""){
        this.$Message.error("请填写姓名!");
        return false;
      }else{
        const params = {
          // this.table.ID
          ID:this.cuurrtAddressID,
          AddType:1,
          Member: localStorage.getItem("userID"),
          Signer: this.signer,
          Phone: this.phone,
          Ztd: 0,
          Country: this.addressid.Country,
          Provice:this.addressid.Provice,
          City:this.addressid.City,
          Area:this.addressid.Area,
          Address: this.address,
          Tel: this.tel,
          Card: this.Card
        };
        const { data } = await this.$post("EditAddress", params);
        this.$Message.success("修改成功！");
        this.show2=false
        this.queryAdressByMemberID();
      }
        
        // if (data.State) {
        //     this.$Message.success("修改成功！");
        //     this.show2=false
        //     this.queryAdressByMemberID();
        // }else{
        //   this.$Message.error(data.MsgText);
        // }
    },
    // 删除地址
    async delAddress(value) {
      this.handelModal=true
      this.cuurrtAddressID = value
    },
    
    async delAddresssRquest(){
      const params = {
        MemberID: localStorage.getItem("userID"),
        ID: this.cuurrtAddressID,
      };
       const { data } = await this.$post("DelAddress", params);
      if (data.State) {
        this.queryAdressByMemberID();
      }
      this.$Message.success('删除成功！')
    },
    // 获取国家信息
    async getCountryList() {
      const params = { MemberID: localStorage.getItem("userID") };
      const { data } = await this.$post("GetCountryList", params);
      if (data.State) {
        this.syck = JSON.parse(data.ReturnJson);
        // this.changeAddress(key,e);
        // this.addList = {
        //   Provice: [],
        //   City: [],
        //   Area: [],
        // };
        // this.addressid = {
        //   Provice: 0,
        //   City: 0,
        //   Area: 0,
        // };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 1069px;
background: #fff;
  border-radius: 5px;
  padding: 19px 17px;
  .type {
      margin: 15px 0 0 56px;
      display: flex;
      flex-direction: row;
      .tow {
        cursor: pointer;
        p {
          font-size: 12px;
          margin: 10px 0 0 0;
          span {
            color: #666;
          }
          span:nth-child(1) {
            color: #999;
            width: 50px;
            text-align: right;
            display: inline-block;
          }
        }
      }
    }
  /deep/ .unify-title {
    display: inline-block;
  }
  .goods {
    width: 200px;
    height: 30px;
    border-radius: 5px;
    text-align: center;
    @include backgroundColor($_color);
    display: inline-block;
    color: #fff;
    font-size: 16px;
    line-height: 32px;
    margin: 0px 0 0 36px;
    cursor: pointer;
  }
  .goodss {
    background: #00000087;
    z-index: 99;
    width: 100%;
    height: 870px;
    top: 0px;
    position: fixed;
    left: 0px;
    .fff {
      width: 1069px;
      height: 516px;
      background: #fff;
      position: relative;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 50%;
      .from {
        width: 653px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        > div {
          display: flex;
          flex-direction: row;
          padding: 10px 0;
          span {
            width: 115px;
            text-align: right;
            display: inline-block;
            margin: 3px 0 0 0;
            font-size: 16px;
          }
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
        /deep/ .ivu-select:nth-child(3) { margin-left: 40px;}
        /deep/ .ivu-select:nth-child(4) { margin-left: 40px;}
        /deep/ .ivu-select:nth-child(5) {margin-left: 40px;}
        /deep/ .ivu-select-single .ivu-select-selection {height: 26px;}
        /deep/ .ivu-select-placeholder {
          line-height: 25px;
          font-size: 12px;
        }
        /deep/ .ivu-select-selected-value {
          line-height: 25px;
          font-size: 12px;
        }
        .subimt {
          margin: 13px 0 0 190px;
          button {
            font-size: 20px;
            font-weight: 500;
            width: 300px;
            height: 40px;
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
    /deep/ .ivu-tabs-bar {
      border-bottom: 0px solid #fff !important;
    }
  }
  .one {
    width: 949px;
    height: 190px;
    border-radius: 5px;
    border: 1px solid #999;
    background: #fff;
    margin: 10px 0 0 60px;
    .defaultaddress {
      display: flex;
      flex-direction: row;
      margin: 15px 15px;
      div:nth-child(1) {
        display: flex;
        flex-direction: row;
        width: 200px;
        cursor: pointer;
        p {
          font-size: 14px;
          color: #000;
        }
        * {
          margin: 0 5px;
        }
        > div p {
          width: 80px;
          height: 25px;
          background: #ff9933;
          border-radius: 5px;
          color: #fff;
          text-align: center;
          line-height: 26px;
        }
      }
      div:nth-child(2) {
        margin: 0 0 0 640px;
        img {
          margin: 0 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<template>
  <div class="newBag-wrapper">
    <div class="forecast">
      <Title-b title="预报快递单号" />
      <div class="explain">
        <div class="e-tips">
          {{$t('Forecastpackage.Shoppingwebsite')}}
        </div>
        <div class="explain-title">{{$t('Forecastpackage.Descriptiontype')}}</div>
        <div class="type-list-wrapper">
          <div class="type-item" v-for="(item, index) in GoodList" :key="index">
            <div class="type-name">{{ item.GoodsName }}：</div>
            <div class="type-value">
              {{ item.goodsType }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-bag">
      <Tabs active-key="key2">
        <Tab-pane label="单个预报" key="key1">
          <i-table
            :columns="columns"
            border
            :data="data"
            align="center"
            v-if="showTable"
          ></i-table>
          <div class="btn-wrapper">
            <Button-b value="提交" @click.native="verifyBag" class="m-r" />
            <Button-b value="重置" @click.native="init" />
          </div>
        </Tab-pane>
        <Tab-pane label="批量预报" key="key2">
          <div class="from-content">
            <i-form
              ref="formRef"
              :model="formInline"
              :rules="ruleInline"
              label-position="right"
              :label-width="100"
              inline
            >
              <Form-item label="快递单号" prop="kdBillcode">
                <Input
                  v-model="formInline.kdBillcode"
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 8 }"
                  placeholder="※多个单号请回车换行※"
                  style="width: 310px"
                />
              </Form-item>
              <Form-item label="货物品名" prop="Goods">
                <Input
                  v-model="formInline.Goods"
                  placeholder="请输入货物品名"
                  style="width: 310px"
                />
              </Form-item>
              <Form-item label="货物类型" prop="Goodsid">
                <i-select
                  v-model="formInline.Goodsid"
                  :label-in-value="true"
                  style="width: 310px"
                  placeholder="请选择货物类型"
                  @on-change="changeSelect"
                >
                  <i-option
                    :value="item.GoodsID"
                    v-for="(item, index) in GoodList"
                    :key="index"
                    >{{ item.GoodsName }}</i-option
                  >
                </i-select>
              </Form-item>
              <Form-item label="货物数量" prop="Number">
                <Input
                  v-model="formInline.Number"
                  placeholder="请输入货物数量"
                  style="width: 310px"
                />
              </Form-item>
              <Form-item label="备注说明">
                <Input v-model="formInline.Goods_meno" style="width: 310px" />
              </Form-item>
            </i-form>

            <div class="btn-wrapper">
              <Button-b
                value="提交"
                @click.native="handleSubmit('formRef')"
                class="m-r"
              />
              <Button-b value="重置" @click.native="handleReset('formRef')" />
            </div>
          </div>
        </Tab-pane>
        <!-- <Tab-pane label="导入预报" key="key3">
          <i-button type="info">选择文件</i-button>
          <i-button type="info">导入</i-button>
          </Tab-pane> -->
        <!-- <Upload
            multiple
            ref="upload"
            :before-upload="handleUpload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            action="http://39.99.246.93:8881/Website/uploadImg"
          >
            <Button icon="ios-cloud-upload-outline">选中文件</Button>
          </Upload> -->
      </Tabs>
    </div>
  </div>
</template>

<script>
import { colInput, colSelect, headerTop, colTop } from "./index.js";
export default {
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",

        },
        {
          title: "快递单号",
          key: "kdBillCode",
          align: "center",
          ...colInput(this, "kdBillCode"),
        },
        {
          title: "货物品名",
          key: "Goods",
          align: "center",
          ...colInput(this, "Goods"),
        },
        {
          title: "货物类型",
          key: "Goodsid",
          align: "center",
          ...colSelect(this),
        },
        {
          title: "货物数量",
          key: "Number",
          align: "center",
          ...colInput(this, "Number"),
        },
        {
          title: "备注说明（选填）",
          key: "Goods_meno",
          align: "center",
          ...colInput(this, "Goods_meno"),
        },
        {
          title: "",
          key: "c",
          align: "center",
          ...headerTop(this),
          ...colTop(this),
        },
      ],
      //这个
      data: [
        {
          kdBillCode: "",
          Goods: "",
          Goodsid: "",
          Number: "",
          Goods_meno: "",
          GoodsType: "",
          MemberID: localStorage.getItem("userID"),
        },
      ],

      formInline: {
        kdBillcode: "",
        Goods: "",
        Goodsid: "",
        GoodsType: "",
        Goods_meno: "",
        Number: "",
        MemberID: localStorage.getItem("userID"),
        // Immediatrly: 0,
        // GoodsValue: "",
      },
      ruleInline: {
        kdBillcode: [
          { required: true, message: "快递单号不能为空！", trigger: "change" },
        ],
        Goods: [
          { required: true, message: "品名不能为空！", trigger: "change" },
        ],
        Goodsid: [
          {
            required: true,
            message: "请选择货物类型",
            trigger: "change",
            type: "number",
          },
        ],
        Number: [
          { required: true, message: "货物数量不能为空", trigger: "change" },
        ],
      },
      GoodList: [],
      showTable: true,
      idArr: [],
      tipObj: {}
    };
  },
  methods: {
    async queryGoods() {
      const JsonData = {
        MemberId: localStorage.getItem("userID"),
      };
      const { data } = await this.$post("QueryGoods", JsonData);
      if (data.State) {
        this.GoodList = JSON.parse(data.ReturnJson);
      }
    },

    async prediction(item,bol) {
      const { data } = await this.$post("SubBillCode", item);
      if (data.State) {
        return true;
     
      } else {
        console.log(this.tipObj)
        this.$Message.error(`单号${bol ? '':this.tipObj.kdBillCode} :${data.MsgText}`);
      }
    },

    verifyBag() {
      let bol = false;
      this.data.forEach((item) => {
        bol = Object.keys(item).some((key) => {
          if (key != "Goods_meno") {
            return item[key] == "" || item[key] == null;
          }
        });
      });
      if (bol) {
        this.$Message.error("请将内容填写完整!");
        return false;
      }
      this.promisFn(this.data);
      console.log(this.data,"===========")
      this.$router.push("./myBag")
    },
    promisFn(arr,bol) {
      let promiseList = [];
      let _this = this;
      arr.forEach((item) => {
        let fn = new Promise((resolve, reject) => {
          this.tipObj = item
          _this.prediction(item,bol).then(function (res) {
            resolve(res);
          });
        });
        promiseList.push(fn);
      });
      Promise.all(promiseList)
        .then((result) => {
          let leng = result.filter((item) => {
            return item;
          }).length;
          this.$Message.success(`提交成功：${leng}个!`);
          this.$router.push(`./myBag`);
        })
        .catch((error) => {
          console.log(error);
        }); 
    },

    changeSelect(e) {
      this.formInline["GoodsType"] = e && e.label;
    },
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let str = this.formInline["kdBillcode"];
          let arr = [];
          this.idArr = str.split(/[\n,]/g);
          this.idArr.forEach((item) => {
            let obj = {};
            obj = { ...this.formInline };
            if (item != "") {
              obj.kdBillcode = item;
              arr.push(obj);
            }
          });
         await this.promisFn(arr,true);
        } else {
          this.$Message.error("请将内容填写完整!");
        }
      });
    },
    init() {
      this.data = [
        {
          kdBillCode: "",
          Goods: "",
          Goodsid: "",
          Number: "",
          Goods_meno: "",
          GoodsType: "",
          MemberID: localStorage.getItem("userID"),
        },
      ];
      this.showTable = false;
      this.showTable = true;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
  created() {
    this.queryGoods();
  },
};
</script>



<style lang="scss" scoped>
.newBag-wrapper {
  width: 100%;
  .forecast {
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    .explain {
      padding-left: 40px;
      .e-tips {
        line-height: 1;
        margin-top: 13px;
        font-size: 12px;
        color: #ccc;
      }
      .explain-title {
        margin: 14px 0;
        line-height: 1;
        color: #666;
        font-size: 14px;
        font-weight: bold;
      }
      .type-list-wrapper {
        width: 100%;
        padding: 10px 20px;
        background: #efefef;
        border-radius: 6px;
        .type-item {
          margin-bottom: 10px;
          line-height: 1;
          display: flex;
          flex-direction: row;
          .type-name {
            @include color($_color);
            font-size: 10px;
          }
          .type-value {
            color: #999999;
            font-size: 10px;
          }
        }
      }
    }
  }
  .table-bag {
    background: #fff;
    border-radius: 6px;
    margin-top: 10px;
    padding: 20px 60px;
    min-height: 532px;
    overflow: hidden;

    .btn-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      .button-custom {
        width: 200px;
      }
      .m-r {
        margin-right: 60px;
      }
    }
    .from-content {
      width: 420px;
      margin: 0 auto;
      .btn-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 0;

        .m-r {
          margin-right: 60px;
        }
      }
    }
  }
}
</style>
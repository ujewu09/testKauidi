<template>
    <!-- 联系方式 -->
    <div class="contaier">
        <!-- <Title-b title="sss"> -->
        <Title-b title="联系方式" />
        <!-- <p class="p">联系方式</p> -->
        <div class="total">
            <div class="upper">
                <div class="left"><img src="../../../assets/images/4.jpg" alt=""></div>
                <div class="right">
                    <div><img src="../../../assets/images/dianhua.png" alt=""/><span>联系方式</span></div>
                    <ul style="margin-top:20px;">
                        <li>全国业务咨询热线：{{allorder.Phone}}</li>
                        <li>技术支持：{{allorder.Phone}}</li>
                        <li>企业QQ：{{allorder.QQ}}</li>
                        <!-- <li>企业邮箱：</li> -->
                    </ul>
                </div>
            </div>
            <div class="lower">
                <div class="left"><img src="../../../assets/images/4.jpg" alt=""></div>
                <div class="right">
                    <div><img src="../../../assets/images/dianhua.png" alt=""/><span>联系方式</span></div>
                    <ul style="margin-top:20px;">
                        <li>公司地址：解放路口的荆防颗粒</li>
                        <li>邮编：1215151515</li>
                        <li>公司网址：<span>{{allorder.MainUrl}}</span></li>
                        <!-- <li>企业邮箱：</li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from "js-md5";
export default {
    data(){
        return{
            allorder:[]
        }
    },
    mounted(){
        this.queryUrl();
    },
    methods:{
        async queryUrl() {
            const _md5 = md5('{"Url":"member.dellker.com"}123456');
            const params = {
                JsonData: '{"Url":"member.dellker.com"}',
                CusID: "23",
                KeyMd5: _md5,
                Url:'{"Url":"member.dellker.com"}'
            };
            const { data } = await this.$post("/QueryUrl", params, true);
            if (data.State) {
                  this.allorder = JSON.parse(data.ReturnJson);
                  console.log(this.allorder);
                // localStorage.setItem("CusID", storeInfo.CusID);
                // localStorage.setItem("shopName", storeInfo.Name);
                // localStorage.setItem("KeyText", storeInfo.KeyText);
                // localStorage.setItem("phone", storeInfo.Phone);
            }
        },
    }
}
</script>
<style lang="scss" scoped>
    .contaier{
        width: 1069px;
        height: 691px;
        border-radius: 5px;
        background: #fff;
        padding: 19px 17px;
        // .p{
        //     padding: 19px 17px;
        //     color:#000;
        // }
        .total{
            .upper{
                display: flex;
                flex-direction: row;
                margin: 40px 0 0 105px;
                .left{
                    width: 256px;
                    height: 169px;
                    background: #000;
                }
                .right{
                    margin: 15px 0 0 50px;
                    > div{
                        border-bottom: 1px dashed #c2c2c2;
                        height: 28px;
                        width:218px;
                        img{vertical-align: middle;}
                        span{vertical-align: middle;margin: 0 0 0 20px;}
                    }
                    ul li{
                        margin: 8px 0;
                        color: #999;
                        list-style: none;
                        span{
                            text-decoration: underline;
                            color: red;
                        }
                    }
                }
            }
            .lower{
                display: flex;
                flex-direction: row;
                margin: 78px 0 0 105px;
                .left{
                    width: 256px;
                    height: 169px;
                    background: #000;
                }
                .right{
                    margin: 15px 0 0 50px;
                    > div{
                        border-bottom: 1px dashed #c2c2c2;
                        height: 28px;
                        width: 218px;
                        img{vertical-align: middle;}
                        span{vertical-align: middle;margin: 0 0 0 20px;}
                    }
                    ul li{
                        margin: 8px 0;
                        color: #999;
                        list-style: none;
                        cursor: pointer;
                        span{
                            text-decoration: underline;
                            color: red;
                        }
                    }
                }
            }
        }
    }
</style>

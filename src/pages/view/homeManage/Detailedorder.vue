<template>
    <!-- 单个订单详细 -->
    <div class="contions">
        <!-- <Button>打印</Button> -->
        <div>
            <div class="one">
                <div>
                    <p>Invoice To：</p>
                    <p>用户编号：{{all.MemberID}}</p>
                    <p>邮箱：{{all.EMail}}</p>
                    <p>联系电话：{{all.TelePhone}}</p>
                </div>
                <div>
                    <p>收货人：{{all.CName}}</p>
                    <p>姓名/电话/: {{all.CName}} {{all.Mobile}}</p>
                    <p>支付/收货方式：{{all.PayType}}</p>
                    <p>收货地址：{{all.Address}}</p>
                </div>
            </div>
            <!-- <div v-for="(item,index) in allorder" :key="index">{{item}}</div> -->
            <div class="two">
                <h4>Your Invoice</h4>
                <div class="date">
                    <table id="table" cellspacing="0">
                        <tr>
                            <td>序号</td>
                            <td>快递公司</td>
                            <td>集包单号</td>
                            <td>快递单号</td>
                            <td>货仓编号</td>
                            <td>入库时间</td>
                            <td>货物品名</td>
                            <td>收费重</td>
                            <td>实重</td>
                            <td>图片</td>
                            <td>备注</td>
                        </tr>
                        <tr v-for="(item,index) in allorder.QueryOrderToList" :key="index">
                            <td>{{item.OrderCode}}</td>
                            <td>{{item.kdCom}}</td>
                            <td></td>
                            <td>{{item.kdBillcode}}</td>
                            <td>{{item.WaveHouse}}</td>
                            <td>{{item.ddTime}}</td>
                            <td>{{item.Goods}}</td>
                            <td>{{item.sFareWeight}}</td>
                            <td>{{item.Weight}}</td>
                            <td>暂无图片</td>
                            <td>{{item.Rem}}</td>
                        </tr>
                        <tr>
                            <td>实际重量：</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{all.Weight}}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>实际重量：</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{all.Weight}}</td>
                            <td></td>
                        </tr>
                    </table>
                    <div class="three">
                        <p>Totals：</p>
                        <div class="block">
                            <p>积分抵扣：-¥ {{all.JFFree}}</p>
                            <p>集运卷抵扣：-¥ {{all.Jyj_Money}} </p>
                            <p>超长费：¥ {{all.longFee}}</p>
                            <p>地址附加费：¥ {{all.OrterFree}}</p>
                            <p>运单附加费：¥ 0.00</p>
                        </div>
                        <div class="block">
                            <p>报税手续费：¥ {{all.Bs_Free}}</p>
                            <p>保价金额：¥ {{all.Bj_Money}} </p>
                            <p>保价手续费：¥ {{all.Bj_Sxf}}</p>
                            <p>代收贷款：DHS {{all.Dshk}}</p>
                            <p>贷款手续费：¥ {{all.Dshk_Sxf}}</p>
                        </div>
                        <div class="four">
                            <div>
                                <span>订单运费：</span><span>¥ {{all.Z_Free}}</span>
                            </div>
                            <div>
                                <span>费用总计：</span><span>¥ {{all.Fare}}</span>
                            </div>
                            <div>
                                <span>实付费用：</span><span>¥ {{all.Fare}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            orderID:null,
            allorder:[],
            all:{}
        }
    },
    mounted(){
        console.log(this.$route)
        this.orderID  = this.$route.query.orderID
        this.QueryOrderDetail()
    },
    methods:{
        async QueryOrderDetail(){
            const params = {
                MemberID:localStorage.getItem("userID"),
                ID:this.orderID
            };
            const { data } = await this.$post("QueryOrderDetail", params);
            if (data.State) {
                this.allorder = JSON.parse(data.ReturnJson);
                console.log(this.allorder)
                this.all = JSON.parse(data.ReturnJson).QueryOrderDetail[0];
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .contions{
        width: 1069px;
        background: #fff;
        // height: 700px;
        padding: 20px 29px;
        .one{
            display: flex;
            flex-direction: row;
            margin: 15px 0 0 0;
            div p{
                line-height: 26px;
                cursor: pointer;
            }
            > div:nth-child(2){
                margin: 0px 0 0 100px;
            }
        }
        .two{
            margin-top: 20px;
            h4{font-weight: bold;font-size: 20px;}
            .date {
                // margin: 33px 0 0 60px;
                #table{
                    width: 949px;
                    cursor: pointer;
                    tr{
                        height: 40px;
                    }
                    tr:nth-child(1){
                        // background: #ccc;    
                        background: linear-gradient(0deg, #FF920A 0%, #FFAF4B 100%);
                        font-size: 14px;
                        color: #333;
                        td{color: #000;font-size: 14px;font-weight: bold;}
                    }
                    td{
                        width: 100px;
                        font-size: 12px;
                        text-align: center;
                        border-bottom: 1px solid #ccc;
                    }
                    .td:nth-child(even){
                        background: #fff;
                    }
                    .td:nth-child(odd){
                        background: #F1F5FE;
                    }
                }
            }
            .three{
                 margin: 5px 0 0 0;
                 >p{font-size: 16px;cursor: pointer;font-weight: bold;}
                .block{
                    display: flex;
                    flex-direction: row;
                    p{
                        cursor: pointer;
                        margin: 0 20px;
                        width: 150px;
                        text-align: center;
                    }
                }
            }
            .four{
                margin: 10px 0 0 0;
                div:nth-child(1){background: #c3c3c3b8;}
                div:nth-child(2){background: #c2c2c2;}
                div:nth-child(3){background: red;}
                div{
                    width: 949px;
                    height: 30px;
                    background: #fff;
                    span:nth-child(1){float: left;line-height: 30px;padding: 0 5px;}
                    span:nth-child(2){float: right;line-height: 30px;padding: 0 5px;}
                }
            }
        }
    }
</style>
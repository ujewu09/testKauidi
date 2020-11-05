<template>
    <!-- 新手指导 -->
    <div class="container">
        <!-- <p>新</p> -->
        <Title-b title="新手引导" />
        <div class="hr"></div>
        <div class="one">
            <p @click="dj()">点击链接进入VIP客户中心：<span style="display:inline-block;">http://localhost:8885/#/register</span></p>
            <p>点击【注册账号】</p>
            <p>会员账號：建议使用旺旺号（淘宝账号）、手机账号</p>
            <p>电子邮箱：填写有效的电子邮箱，便於接收快递入库信息、包裹物流轨跡、优惠活动等信息</p>
            <p>设定您的密码并确认</p>
            <p>推荐人：选填项，有推荐人时勾选填写推荐人ID和旺旺名，如没有推荐人不勾选</p>
            <p>点击《承运条款》，认真阅读并勾选</p>
            <p>点击注册按钮提交信息注册成功</p>
            <img src="../../../assets/images/dengluzhuche.png" alt="">

            <Title-b title="获取集运仓库地址" />
            <br>
            <p>登录会员中心--选择左侧菜单“集运地址”获取您的专属集运仓库地址</p>
            <p>复制集运地址在购物平台添加收货地址选择默认或提供给发货方将货物发往仓库</p>
            <img src="../../../assets/images/jiyundizhi.png" alt="">

            <Title-b title="快递单号及货品名预报" />
            <br>
            <p>选中左侧菜单栏包裹预报</p>
            <p>您在电商平台购买的物品发货后获得快递单号，将快递单号以及货物名称填写提交预报，支持单个或批量预报</p>
            <img src="../../../assets/images/kauididanhaoyubao.png" alt="">

            <Title-b title="地址添加" />
            <br>
            <p>选择左侧菜单栏收货地址：点击新增收货地址，填入收货地址并保存；如添加的地址为默认地址，请勾选“设为默认收货”地址
新添加的收货地址需后台审核后才能使用，建议您提前添加</p>
            <img src="../../../assets/images/dizhitianjia.png" alt="">

            <Title-b title="集运申请" />
            <br>
            <p class="p">步骤1.左侧菜单栏选择我的包裹--选择已上架货物</p>
            <span>申请集运需要等货物入库、上架方可操作。可一次申请全部或者单件货物，选择完成后点击申请集运</span>
            <img src="../../../assets/images/jiyunshenqing.png" alt="">
            <p class="p">步骤2、地址选择</p>
            <span>选择收货地址、配送时效、配送方式，点击下一步</span>
            <img src="../../../assets/images/dizhixuanze.png" alt="">
            <p class="p">步骤3、运费结算</p>
            <span>集运有钱包支付、支付宝支付、微信支付、淘宝店铺支付</span>
            <span>支付宝、微信隻限大陆版</span>
            <span>淘宝店铺支付需到淘宝专属铺购买运费，选择相应的运费后在给卖家留言处备注上你的会员编号</span>
            <img src="../../../assets/images/yunfeijiesuan.png" alt="">

            <Title-b title="等待收货" />
            <br>
            <span>大陆仓发货时间为週日至週五</span>
            <span>正常时效2-4个工作日</span>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        dj(){
            this.$router.push('./register');
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        width: 1069px;
        border-radius: 5px;
        background: #fff;
        padding: 19px 17px;
        /deep/ .unify-title{
            font-weight: bold;
            font-size: 18px;
            height: 18px;
        }
        .hr{
            margin: 15px 0 0 0;
            width: 1000px;
            height: 1px;
            border-bottom: 1px solid #cccccc;
        }
        .one{
            margin: 10px 0 0 0;
            .p{
                font-weight: bold;
            }
            p{
                margin: 5px 0;
                font-size: 18px;
                cursor: pointer;
                color: #000;
            }
            img{
                margin: 10px 0px;
            }
            span{
                display: inherit;
                font-size: 16px;
                color: #000;
                cursor: pointer;
            }
        }
    }
</style>
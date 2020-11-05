<template>
    <div class="container">
        <div class="body">
            <headerDiv />
                <div class="total">
                    <div class="one">
                        <p class="p">{{$t('register.one')}}</p>
                        <div class="two" style="margin-top:35px;">
                            <input type="text" placeholder="用户名" v-model="username"/>
                            <p>{{$t('register.two')}}</p>
                        </div>
                        <div class="two">
                            <input type="password" name="" id="" v-model="userpwd" placeholder="请输入密码" >
                            <p>*&nbsp;{{$t('register.three')}}</p>
                        </div>
                        <div class="three">
                            <input type="password" name="" id="" v-model="userpwdpwd" placeholder="确认密码">
                        </div>
                        <div class="three">
                            <input type="text" placeholder="请输入邮箱(必填)" v-model="phone">
                        </div>
                        <div class="three">
                            <input type="text" placeholder="请输入手机号(选填)" v-model="email">
                        </div>
                        <div class="five">
                            <input type="text" v-model="ReferenceNumber" placeholder="推荐人编号">
                            <p>{{$t('register.four')}}</p>
                        </div>
                        <div class="six">
                            <div>
                                <div class="check1" @click="dj(four=0)" v-show="one"></div>
                                <div class="check2" @click="dj(four=1)" v-show="two"><img src="../../../assets/images/gou.png" alt="" style="margin: 3px 0 0 4px;"/></div>
                            </div>
                            <span @click="modal1=true">{{$t('register.five')}}</span>
                        </div>
                        <div class="logon" @click="denglu()">{{$t('register.six')}}</div>
                        <div class="border" @click="register()">{{$t('register.Seven')}}</div>
                    </div>
                </div>
        </div>
    <!-- 对话框 -->
    <Modal
        v-model="modal1"
        title="派寶集運服務條款細則"
        width="800">
    <div>
        一 關於時效<br><br>
        1.派寶集運截單時間爲（工作日）每天下午5點，週六及香港假期前一天除外。截單時間前完成付款當天（工作日）安排發貨。中轉站週六及香港紅日前一天均不發貨，周天或公眾假期香港派送公司不予貨物派送。節假日具體安排請留意派寶集運官網www.paibaoex.com通知，具體變動以派寶集運官網www.paibaoex.com爲準。<br>
        2.派寶集運訂單發貨後正常隔天到港。到港後訂單一般當天（工作日）派送，偏遠地區一般需要隔天派送。特殊情況：當遇上天氣惡劣/海關查處/雨天/公眾假期/偏遠地區/6.18/雙11/雙12等情況，爲了保證貨物安全，貨物可能會延遲派送，特殊情況請留意派寶集運官網公告。
    </div>
    <br>
    <div>
        二 運費付款細則<br><br>
        1.客戶在派寶集運官網www.paibaoex.com或派寶集運APP申請集包後，還需要到淘寶店鋪付款我們才能安排發貨，如果運費需要到付請聯繫客服。<br>
        2.如收件地址爲非工商區或偏遠地區，付款時沒有支付附加費，必須安排補付運費，否則不予安排送貨。<br>
        3.客戶必須如實申報貨物品名，收件地址信息（工商區/非工商區），是否敏感。并按照對應價格支付運費，否則必須補齊差價才可安排發貨。<br>
        4.因付款不及時造成發貨時效延誤，派寶集運不承擔任何相關責任。<br>
        5.每票訂單貨物體積重量與實際貨物重量作比較，取較重者計算運費。派寶集運根據國際標準及物流行業慣例，體積重量計算公式爲：體積重量=長*寬*高（cm）/6000。請客戶在購買貨物之前弄清貨物實際體積，以免造成費用誤會。<br>
        6.貨物集包後不足1KG部分按1KG核算運費。<br>
        7.如果貨物重量超重或體積超大需要額外聘用其他設備卸裝搬運的，我們將另外收取費用。具體標準聯繫派寶集運客服。<br>
        8.訂單一經確認如需取消訂單，請聯繫派寶集運客服。根據實際情況處理，如已經裝車發貨則取消不了訂單，未裝車取消訂單需收取10元/票操作費用。<br>
        9.關於派寶集運收取費用問題，派寶集運擁有最終裁決權！
    </div>
    <br>
    <div>
        三 有關快遞派送收貨事宜<br><br>
        1.爲保障貨物安全快遞公司會按照訂單指定地址送貨，如要更改送貨地址將會產生額外送貨費用，延長派送時效，具體聯繫派寶集運客服。<br>
        2.如客戶提供的地址有誤，在派送時出現的任何問題，派寶集運將不承擔任何責任。<br>
        3.出現以下情況派送公司將會不搬運上樓，收貨人必須自己下樓取件：<br>
        A.派送地址沒辦法提供免費泊車。<br>
        B.沒有升降機，需要經樓梯搬運。<br>
        C.需要上樓才能到達升降機上樓的。<br>
        D.貨物重量/體積/長度超大，不能使用升降機或使用升降機一次搬運不完的。<br>
        E.停車位置距離升降機門口超20米的。<br>
        4.如果派送員到達收貨地址，一直聯繫不上收件人的，貨物被退回存放於物流倉庫，產生的二次派送費用由客戶自行承擔。<br>
        5.派寶集運對於以下原因造成訂單派送延誤/派送錯誤及不能派送等任何損失將不承擔任何責任：<br>
        A.由於客戶原因填寫地址錯誤/電話號碼錯誤或不全等。<br>
        B.收件人地址變更或無法送達的地區。<br>
        C.由於訂單物品違反了國家相關政策和法規明確禁止的物品。例如：易燃易爆，易腐蝕，易污染，有毒的粉末或液體，槍支彈藥等物品。<br>
        D.因客戶未經聲明或貨物包裝不當導緻的貨物破損等。
    </div>
    <br>
    <div>   
        四 貨物破損及遺失處理<br><br>
        1.申報規則如下：<br><br>
        A.如果貨物有遺失或破損，客戶必須在簽收貨物後24小時之內以打電話或派寶集運旺旺聯繫客服申報，如超時派寶集運默認貨物已經正常派送，不在接受遺失申報。<br>
        B.申報時必須將清晰拍照外包裝袋和清晰的派送面單照片，派送單號必須拍照清晰。<br>
        C.拆袋時必須先清點包裹內集包小貨數量，數量無誤再拆包裹內集包小貨。如果將所有集包小貨全部拆散之後再申報貨物遺失/少件，派寶集運將不予申報處理不承擔任何責任。<br>
        D.收件時發現外包裝破損時，請拍下貨物外包裝圖片和拆包時短視頻發作爲破損遺失證據給派寶集運客服。<br>
        E.提供貨物物品真實購買價值付款鏈接和截圖。<br>
        2.以上申報信息齊全經派寶集運客服確認屬實後，進行賠償，賠償金額最高爲運費每筆集運後運費三倍。<br>
        3.如果丟失物品在審核賠償時找回，派寶集運將選擇從新派送，將不予賠償。如有任何爭議，派寶集運保留最終決定權。<br>
        4.如果遺失的貨物是違禁物品和仿牌等禁運物品，或海關查扣查驗，派寶集運一律不予賠償。派寶集運保留最終決定權。<br>
        5.遺失理賠範圍只包括派寶集運倉庫至客戶收件地址運輸派送段，不包含客戶購買地至派寶集運倉庫運輸段。理賠確認付款時間將在5個工作日完成。派寶集運保留最終決定權。<br>
        6.如因客戶購買貨物的外包裝質量不能滿足多次轉運條件而導緻物品破損或遺失時，派寶集運將不予理賠處理。除非可以提供外包裝專業的檢測報告能夠證明外包裝能夠滿足多次轉運條件則可以申報處理。<br>
        7.如訂單貨物爲陶瓷/玻璃製品/工藝品等易損易破易變形物品，則客戶因確保良好的外包裝和良好的內包裝措施。（外包裝確保有木箱木架或鐵箱鐵架，內包裝確保有泡沫或國定物填充，確保能承受一定壓力）否則派寶集運將不予承擔任何責任，派寶集運將擁有最終決定權。
    </div>
    <br>
    <div>
        五 承運條款<br><br>
        1.派寶集運客戶需承諾派寶集運有權放棄或不收；不宜試於運輸方式的貨物，有意或無意隱瞞貨物真實品名和價值的，國家法規命令禁止郵寄運輸攜帶的物品。一經發現客戶將承擔由此產生的一切法律責任和一切經濟損失賠償。<br>
        2.派寶集運所有客戶必須保證和接受派寶集運所公佈的貨物運價和相關的存倉/退倉/轉運的所有相關費用。<br>
        3.如因客戶的貨物溢出/滲出/漏出任何液體或固體，導緻其他貨物損毀時，派寶集運將有權追究一切相關導緻的經濟損失和法律責任。<br>
        4.派寶集運有權獲知承運物品名稱，性質，材質，數量，重量和價值。以協助相關部門和海關對承運物品進行檢查。<br>
        5.承運貨物到達派寶集運倉庫，如需退倉和專寄其他地方，具體收費以派寶集運客服溝通價格爲準。<br>
        6.貨物未能送達派寶集運倉庫要求接貨產生的一切提貨費用由客戶承擔。<br>
        7.貨物到達派寶集運倉庫後必須在180天內下單寄出，否則派寶集運將物品作棄件處理。派寶集運擁有貨物自行處理權，客戶不得有任何意義，派寶集運對棄件有最終決定權。<br>
        8.客戶自支付運費起即表示接受和遵守本契約之條款，保證所運輸的貨物符合國家法律和快遞行業能夠接受的物品。派寶集運拒絕接受以下物品：<br>
        A.易燃易爆易腐蝕的具有毒性，爆炸性，殺傷性，腐蝕性和放射性物品。<br>
        B.藥物和具有傳染性，妨害公共衛生品和毒品/吸毒相關器具。<br>
        C.侵犯商標，著作權和智慧財產權物品。<br>
        D.貨幣，增值稅發票和其他稅票或有價證券，金銀財寶，古董和貴重金屬（金，銀，稀有貴金屬）。<br>
        E.活體動物，植物和種子。<br>
        F.私人證件，合同，批文和具備通信性質書函。<br>
        G.反動政治刊物，書籍，錄像和影碟。<br>
        H.非正品/仿製品/來源不正當物品。<br>
        I.包裝不穩妥，可能會造成人身傷害或可能導緻其他貨物污損物品。<br>
        J.不符合《中華人民共和國產品質量法》，《中華人民共和國香港法》，《中華人民共和國消費者權益保障法》和其他法規部門強制性標準規定的物品。<br>
        如客戶使用派寶集運www.paibaoex.com服務獎默認同意以上所有條款，派寶集運將保留最終解釋權。
    </div>
    </Modal>
  </div>
</template>
<script>
// import {GVerify} from "./code.js"
import headerDiv from "../../layout/header/index.vue"
export default {
    data(){ 
        return{
            modal1:false,
            username:'',
            userpwd:'',
            userpwdpwd:'',
            phone:'',
            model1: '',
            four:0,
            one:true,
            two:false,
            ReferenceNumber:'',
            syck:[],
            email:''
        }
    },
    components: {
    headerDiv,
  },
    mounted(){
        const id = this.$route.query.id
        if(id){
           this.ReferenceNumber=id
        }
    },
    methods:{
      denglu(){
        this.$router.push('./login')
      },
      dj(){
          if(this.four == 0){
              this.one = false;
              this.two = true;
            //   console.log(this.four);
          }else if(this.four == 1){
              this.one = true;
              this.two = false;
          }
      },
      async register(){
            // 手机号
            // let Phone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
          if(this.username==''){
            this.$Message.error('旺旺名不能为空！');
            return false
          }else if(this.username.length<2){
              this.$Message.error("用户名不能小于两位");
              return false;
          }else if(this.userpwd==''){
            this.$Message.error('密码不能为空！')
            return false
          }else if(this.userpwd.length<6){
            this.$Message.error('密码不能小于6位！')
            return false
          }else if(this.userpwdpwd != this.userpwd){
            this.$Message.error('两次密码不一致！')
            return false
          }else if(this.phone==''){
            this.$Message.error('邮箱不能为空')
            return false
          }else{
                const params = {
                    ReferenceNumber:this.ReferenceNumber,
                    ClientName:this.username,
                    Email:this.phone,
                    Mobil:this.email,
                    Password:this.userpwdpwd,
                    RePassword:this.userpwdpwd,
                    WeiboId:"",
                    enname:""
                };
                const { data } = await this.$post("Client_Registered", params);
                this.$Message.success('注册成功！')
                this.$router.push('./login')
            }
          },
      }
}
</script>
<style lang="scss" scoped>
    /deep/.ivu-modal-body{
        font-size: 14px;
    }
    .container {
        width: 100%;
        // height: 1080px;
        @include backgroundColor($_color);
        height: 100vh;
        // background: linear-gradient(0deg, #226CAA 0%, #4294DA 25%, #84BAE8 50%, #4294DA 75%, #226CAA 100%);
        .body{
            background: url('../../../assets/images/bg.png')no-repeat center center;
            height: 100vh;width:100%;
            background-size: 100% 100%;
            background-position: -400px 0;
        }
        .total{
            width: 100%;
            display: flex;
            padding-bottom:20px;
            justify-content: flex-end;
            .one{
                width: 500px;
                height: 600px;
                background: #fff;    
                box-shadow: 0px 0px 30px 0px rgba(35, 21, 24, 0.35);
                border-radius: 20px;
                margin: 80px 190px 0 0;
                padding: 0 54px;
                position: relative;
                .logon{
                    position:absolute;
                    bottom: 16px;
                    right: 50px;
                    text-decoration: underline;
                    color: red;
                    font-size: 20px;
                    cursor: pointer;
                }
                .p{
                    font-size: 32px;
                    font-weight: bold;
                    color: #333;
                    padding: 28px 0 0 0;
                }
                .pdw{
                    font-size: 14px;
                    font-weight: 500;
                    color: #0099ff;
                    margin: -29px 0 0 0;
                    cursor: pointer;
                }
                .two{
                    margin: 0px 0 5px 0;
                    input{
                        width: 390px;
                        height: 43px;
                        background: #fafafa;
                        border: 2px solid #e4e4e4;
                        opacity: 0.6;
                        border-radius: 5px;
                        text-indent: 1em;
                    }
                    p{
                        font-size: 12px;
                        color: red;
                        cursor: pointer;
                        padding: 5px 0 0 0;
                    }
                }
                .three{
                    margin: 0 0 10px 0;
                    p{color: red;}
                    .span::before {
                        content: "*";
                        display: inline-block;
                        margin-right: 4px;
                        line-height: 1;
                        font-family: SimSun;
                        font-size: 12px;
                        color: #ed4014;
                    }
                    input{
                        width: 390px;
                        height: 43px;
                        background: #fafafa;
                        border: 2px solid #e4e4e4;
                        opacity: 0.6;
                        border-radius: 5px;
                        text-indent: 1em;
                    }
                }
                /deep/ .four{
                    display: flex;
                    flex-direction: row;
                    margin: 30px 0 0 0;
                    input{
                        width: 293px;
                        height: 60px;
                        background: #fafafa;
                        border: 2px solid #e4e4e4;
                        opacity: 0.6;
                        border-radius: 5px;
                        text-indent:1em;
                        margin: 0 0 0 10px;
                    }
                    .code{
                        width: 156px;
                        height: 60px;
                        background: #fafafa;
                        border: 2px solid #e4e4e4;
                        opacity: 0.6;
                        border-radius: 5px;
                        // margin: 0 0 0 10px;
                    }
                    #verifyCanvas{
                        width: 153px;
                        height: 56px;
                    }
                     .ivu-select-selected-value{
                        display: block;
                        height: 41px;
                        line-height: 60px;
                        font-size: 20px;
                    }
                     .ivu-select-single .ivu-select-selection{
                        position: relative;
                        height: 58px;
                    }
                     .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{font-size: 20px;line-height: 60px;height: 40px;color:#999;}
                }
                .five{
                    margin: 5px 0 0px 0;
                    input{
                        width: 390px;
                        height: 43px;
                        background: #fafafa;
                        border: 2px solid #e4e4e4;
                        opacity: 0.6;
                        border-radius: 5px;
                        text-indent: 1em;
                    }
                    p{
                        font-size: 12px;
                        color: #999;
                        padding: 5px 0 0 0;
                    }
                }
                .six{
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    // margin-top:10px;
                    margin: 10px 0 0 10px;
                    .check1{
                        width: 19px;
                        height: 19px;
                        background: #fff;
                        border-radius: 50%;
                        border: 1px solid #c2c2c2;
                        position: absolute;
                        top: 0;
                    }
                    .check2{
                        width: 19px;
                        height: 19px;
                        background: red;
                        border-radius: 50%;
                        position: absolute;
                        top: 0;
                    }
                    span{
                        margin: 0 0 0 25px;
                        cursor: pointer;
                        font-weight: 500;
                        color:#3399FF;
                        width: 100px;
                        text-decoration: underline;
                    }
                }
                .border{
                    width: 230px;
                    height: 60px;
                    background: #FF3333;
                    border-radius: 10px;
                    font-size: 36px;
                    text-align: center;
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 60px;
                    margin: 18px 0 0 82px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
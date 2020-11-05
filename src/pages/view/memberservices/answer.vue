<template>
    <!-- 有问必答 -->
    <div class="contaier">
        <Title-b title="有问必答" />
        <!-- <p class="p">有问必答</p> -->
        <div style="display: flex;justify-content: center;">
            <div class="total">                                         
                <div v-for="(item,index) in s" :key="index" class="one" :class=" flaot ==index ? name1:name2" @click="helpcenterByIdArticle(item,index)">
                    {{item.typename}}
                    <!-- <img src="../../../assets/images/daosanjiao.png" alt="" class="absolute" v-show="show1"> -->
                </div>
                <!-- <div :class="flaot == 0 ? name1:name2" class="one" @click="helpcenterByIdArticle(flaot=0)">
                    {{a.typename}}
                    <img src="../../../assets/images/daosanjiao.png" alt="" class="absolute" v-show="show1">
                </div>
                <div :class="flaot == 1 ? name1:name2" class="two" @click="helpcenterByIdArticle(flaot=1)">
                    {{s.length&&s[1].typename}}
                    <img src="../../../assets/images/daosanjiao.png" alt="" class="absolute" v-show="show2">
                </div>
                <div :class="flaot == 2 ? name1:name2" class="three" @click="helpcenterByIdArticle(flaot=2)">
                    {{s.length&&s[2].typename}}
                    <img src="../../../assets/images/daosanjiao.png" alt="" class="absolute" v-show="show3">
                </div>
                <div :class="flaot == 3 ? name1:name2" class="four" @click="helpcenterByIdArticle(flaot=3)" >
                    {{s.length&&s[3].typename}}
                    <img src="../../../assets/images/daosanjiao.png" alt="" class="absolute" v-show="show4">
                </div> -->
            </div>
        </div>
        <div class="news">
            <div v-for="(item,index) in news" :key="index" @click="Djquestion(index)">
                <div v-if="item.Type == 1 && flaot == 0">{{item.Title}} <span>{{item.CreateTime}}</span></div>
                <div v-if="item.Type == 2 && flaot == 1">{{item.Title}}</div>
                <div v-if="item.Type == 3 && flaot == 2">{{item.Title}}</div>
                <div v-if="item.Type == 4 && flaot == 3">{{item.Title}}</div>
            </div>
        </div>
        <div>
            <div class="modal-mask" v-show="QuestionInfo">
                <div class="frame_box">
                    <div class="frame_title">{{news.length&&news[index].Title}}</div>
                    <img src="../../../assets/images/chahao.png" alt="" @click="QuestionInfo = false"/>
                    <div class="frame-container">
                    <div v-html="news.length&&news[index].Text">{{news.length&&news[index].Text}}</div>
                    <div class="frame-time"></div>
                    </div>
                    <div class="fc_footer"  @click="QuestionInfo = false">我已知晓</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name1:"gong1",
            name2:"gong2",
            flaot:0,
            show1:true,
            show2:false,
            show3:false,
            show4:false,
            news:[],
            newss:[],
            Article:[],
            time:[],
            QuestionInfo:false,
            index:0,
            s:{},
        }
    },
    mounted(){
        this.getQuestion();
        this.helpcenter();
        // this.typeGetQuestion();
    },
    methods:{
        async getQuestion(){
            const params = {MemberID:localStorage.getItem("userID")};
            const { data } = await this.$post("GetQuestion",params);
            if(data.State){
                this.news = JSON.parse(data.ReturnJson).QuestionInfo;
                console.log(this.news)
            }
        },
        // 标签名称
        async helpcenter(){
            // console.log( localStorage.getItem("token");
            const params = {MemberID:localStorage.getItem("userID")};
            const { data } = await this.$post("Helpcenter",params);
            if(data.State){
                this.s = JSON.parse(data.ReturnJson);
                console.log(this.s)
                // localStorage.setItem("token", this.s.Token);
            }
        },
        async helpcenterByIdArticle(item,index){ 
            this.flaot = index;
            const params = {
                MemberID:localStorage.getItem("userID"),
                id:this.s.id,
                CusID:0
            };
            const { data } = await this.$post("HelpcenterByIdArticle",params);
            if(data.State){
                this.Article = JSON.parse(data.ReturnJson)
                localStorage.setItem("token", Article.Token);
                console.log(this.Article);
            }
        },
        
        Djquestion(index){
            this.QuestionInfo = true;
            this.index = index;
            console.log(this.index);
        },
    },
}
</script>
<style lang="scss" scoped>
    .modal-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    overflow: auto;
    .frame_box{
      height: 664px;
      display: block;
      width: 900px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      display: flex;
      flex-direction: column;
      img{
        width: 23px;
        height: 23px;
        position: absolute;
        right: 29px;
        cursor: pointer;
        top: 33px;
      }
      .frame_title{
        padding: 30px 0;
        margin: 0 30px;
        border-bottom: 1px solid #ddd;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
      }
      .frame-container{
        padding: 30px;
        flex: 1;
        overflow: auto;
        .frame-time{
          @include color($_color);
          font-size: 16px;
          text-align: right;
        }
      }
      .fc_footer{
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 20px;
        @include backgroundColor($_color);
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        margin: 15px auto;
      }
    }
    }
    .contaier{
        width: 1069px;
        height: 700px;
        border-radius: 5px;
        background: #fff;
        padding: 19px 17px;
        .total{
            display: flex;
            flex-direction: row;
            text-align: center;
            color: #fff;
            font-size: 20px;
            line-height: 60px;
            .gong1{
                background: #0a703d;
            }
            .gong2{
                background: #23B670;
            }
            .one{
                position:relative;
                width: 280px;
                height: 60px;
                margin-left: 80px;
                cursor: pointer;
                .absolute{
                    position: absolute;
                    top: 52px;
                    left: 91px;
                }
            }
            .two{
                width: 280px;
                height: 60px;
                position: relative;
                margin-left: 35px;
                cursor: pointer;
                .absolute{
                    position: absolute;
                    top: 52px;
                    left: 91px;
                }
            }
            .three{
                width: 280px;
                position: relative;
                height: 60px;
                margin-left: 35px;
                cursor: pointer;
                .absolute{
                    position: absolute;
                    top: 52px;
                    left: 91px;
                }
            }
            .four{
                width: 280px;
                position: relative;
                height: 60px;
                margin-left: 35px;
                cursor: pointer;
                .absolute{
                    position: absolute;
                    top: 52px;
                    left: 93px;
                }
            }
        }
        .news{
            margin: 44px 79px;
            cursor: pointer;
            >div{
                >div{
                    margin: 14px 0;
                    border-bottom: 1px dashed;
                    height: 29px;
                    span{
                        float: right;
                    }
                }
                >div:hover{
                     @include color($_color);
                    // @include color($color);
                }
            }
        }
    }
</style>
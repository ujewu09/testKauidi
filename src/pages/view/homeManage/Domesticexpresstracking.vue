<template>
    <!-- 国内快递跟踪 -->
    <div class="container">
        <Title-b title="国内快递跟踪" />
        <p class="userP">您可以根据自己的快递单号，查询包裹具体到哪儿了</p>
        <br>
        <div class="all">
            <iframe style="padding:20px;width:1000px;" id="ifrma" name="kuaidi100" src="http://www.kuaidi100.com/frame/app/index2.html" width="100%" height="400" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>
        </div>
    </div>
</template>
<script>
import {
    colInput,
    colSelect,
    headerTop,
    colTop
  } from "./index.js";
export default {
    data(){
        return{}
    },
    mounted(){
        this.OK()
    },
    methods:{
        OK()
        {
            // 操作iframe中内容的CSSifrmaz
            var iframe = document.getElementById('ifrma');
            var iframe = document.getElementById('ifrma');
            
            var body = iframe.contentWindow.document.body.queryElement('.c_round_gray');
            body.style.marginTop =50;
            body.style.padding =0;
            body.style.fontSize =30;
            body.style.textAlign ='center';
            body.style.backgroundColor ='red';
            body.style.color ='blue';
            body.style.width ='1100px';
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        width: 1069px;
        height: 748px;
        background: #fff;
        padding: 20px 29px;
        .userP {
        color: #ccc;
        font-size: 14px;
        font-weight: 400;
        padding: 10px 0 0 61px;
        }
        .all{
            width: 631px;
            height: 378px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            // .border{
            //     width: 618px;
            //     height: 389px;
            //     border:1px solid #c2c2c2;
            //     margin: 0 auto;
            //     border-radius: 5px;
            //     display: flex;
            //     align-items: center;
            //     justify-content: center;
            //     .son{
            //         width: 597px;
            //         height: 334px;
            //         border: 1px solid #c2c2c2
            //     }
            // }
        }
    }
</style>
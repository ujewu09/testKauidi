<template>
    <!-- 同行订单导入 -->
    <div class="container">
        <Title-b title="同行订单导入" />
        <p class="userP">您可以在这里导入订单</p>
        <div class="all">
            <div>
                <span class="span">发货仓库</span>
                <i-select v-model="order1" placeholder="请选择发货仓库" style="width:160px">
                    <i-option value="shenzhen">深圳仓</i-option>
                    <i-option value="guangzhou">广州</i-option>
                    <i-option value="shanghai">上海</i-option>
                    <i-option value="hunan">湖南</i-option>
                </i-select>
            </div>
            <div>
                <span class="span">目的地</span>
                <i-select v-model="order2" placeholder="请选择目的地" style="width:160px">
                    <i-option value="beijing">马来西亚</i-option>
                    <i-option value="shanghai">柬埔寨</i-option>
                    <i-option value="shenzhen">迪拜</i-option>
                </i-select>
            </div>
            <div>
                <span class="span">承运商</span>
                <i-select v-model="order3" placeholder="请选择承运商" style="width:160px">
                    <i-option value="beijing">昨天订单</i-option>
                    <i-option value="shanghai">三天以内订单</i-option>
                    <i-option value="shenzhen">一周内订单</i-option>
                    <i-option value="shenzhen">一个月内订单</i-option>
                    <i-option value="shenzhen">三个月内订单</i-option>
                    <i-option value="shenzhen">2019年订单</i-option>
                </i-select>
            </div>
        </div>
        <div class="upload">
             <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                <i-button type="ghost">上传文件</i-button>
            </Upload>
            <div class="data">导入</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            order1:'',
            order2:'',
            order3:''
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
        padding: 10px 0 0 43px;
        }
        /deep/ .all{
            display: flex;
            width: 870px;
            flex-direction: row;
            justify-content: space-around;
            padding:45px 0;
            margin: 0 auto;
            // flex-wrap: wrap;
            .ivu-select-single .ivu-select-selection{
                height: 26px;
                margin-left: 27px;
            }
            .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height: 25px;}
            .span{
                position: relative;
                top:1px;
                color: #666;
                font-size: 12px;
                font-weight: 400;
            }
            .ivu-select-selected-value{color: #999;}
            .ivu-select-item{color: #999;}
            //.ivu-select-item-selected, .ivu-select-item-selected:hover{color: #fff;}
            .ivu-select-item-focus{background: #FF9933;}
        }
        /deep/ .upload{
            display: flex;
            width: 870px;
            flex-direction: row;
            justify-content: center;
            .ivu-btn{
                @include backgroundColor($_color);
                //background: red;
                width: 100px;
                height: 30px;
            }
            .ivu-btn>span{font-size: 16px;line-height: 20px;}
            // .ivu-btn>span:hover{color: #fff;}
            .data{
                width: 100px;
                height: 30px;
                @include backgroundColor($_color);
                // background: red;
                text-align: center;
                font-size: 16px;
                color: #fff;
                border-radius: 5px;
                // margin-left: 20px;
                position: relative;
                left: 85px;
                line-height: 32px;
                cursor: pointer;
            }
        }
    }
</style>
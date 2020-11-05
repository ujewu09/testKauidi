<template>
    <div class="footer-wrapper">
        <div class="footer-block">
            <p>Copyright Reserved © 派寶集運（vip.paibaoex.com） | 粵ICP備18159914号-1</p>
            <p>
                全球服務熱線：<span style="font-weight: bold;">00852-31158366</span>  周一至周日09:00-18:00
                <br>
                <span span style="font-weight: bold;">00852-31158399  +8619926638591</span>
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
    @include backgroundColor($_color);
    width: 100%;
    height:100px;
    .footer-block{
       display: flex;
       height:100px;
       justify-content: center;
       margin: 0 auto;
       align-items: center;
       p{
        font-size: 14px;
        cursor: pointer;
       }
       p:nth-child(2){
        width: 355px;
        position: relative;
        left: 200px;
       }
    }
}
</style>
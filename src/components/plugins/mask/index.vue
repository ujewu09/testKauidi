<template>
   <div class="modal-bag" v-if="isShowModal">
      <div class="modal-content">
        <div class="frame_title">
          <div class="ft_name">{{title}}

           
          </div>
          <div> <slot name="price"></slot> </div>
          <div class="close_btn" @click="closeMask">
            <img src="@/assets/imgs/guanbi.png" alt="" />
          </div>
        </div>
        <div class="frame-container">

         <slot></slot>
        </div>
      </div>
    </div>
</template>


<script>
export default {
    props: {
        isShowModal: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
            
        }
    },
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        closeMask() {
            this.$emit('closeMask')
        }
    }
}
</script>

<style lang="scss">
.modal-bag {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    overflow: auto;
    .modal-content {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      display: flex;
      flex-direction: column;
      height: 80vh;
      .frame_title {
        padding: 20px 0;
        margin: 0 30px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ft_name {
          font-size: 20px;
          font-weight: bold;
          color: rgba(34, 34, 34, 1);
        }
        .close_btn {
          width: 23px;
          height: 23px;
          cursor: pointer;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .frame-container {
        padding: 10px 30px;
        flex: 1;
        overflow: auto;
        .upBtn {
          width: 30%;
          margin: 0 auto;
        }
      }
    }
  }
</style>
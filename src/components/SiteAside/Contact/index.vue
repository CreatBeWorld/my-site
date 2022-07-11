<template>
  <ul class="contact-container">
    <li>
      <a>
        <Icon type="github" />
        <span>CreateBeWorld</span>
      </a>
    </li>
    <li>
      <a href="mailto:xsj20@outlook.com">
        <Icon type="mail" />
        <span>xsj20@outlook.com</span>
      </a>
    </li>
    <li>
      <a
        href="tencent://message/?Menu=yes&uin=466840028&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45"
      >
        <Icon type="qq" />
        <span>466840028</span>
      </a>
      <div class="pop">
        <img src="../../../assets/qq.png" alt="" />
      </div>
    </li>
    <li>
      <a class="weixin">
        <Icon type="weixin" />
        <span>13870829832</span>
      </a>
      <div class="pop">
        <img src="../../../assets/weixin.png" alt="" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  name: "Contact",
  components: {
    Icon,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.contact-container {
  color: @lightWords;
  padding: 15px;
  li {
    position: relative;
    margin-bottom: 10px;
    a {
      display: block;
      cursor: pointer;
      i {
        vertical-align: -2px;
        font-size: 20px;
      }
      &.weixin {
        text-indent: -2px;
        i {
          font-size: 24px;
        }
        span{
          margin-left: 3px;
        }
      }
      span {
        margin-left: 6px;
      }
    }
    .pop {
      position: absolute;
      left: 0;
      top: 0;
      transition: 0.4s;
      transform-origin: bottom center;
      transform: translateY(-103%) scaleY(0);
      img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 5px;
      }
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: #fff;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
      }
    }
    a:hover + .pop {
      transform: translateY(-103%) scaleY(1);
    }
  }
}
</style>

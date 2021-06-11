<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="tips">
        <div class="tips-notfound">404 Not Found</div>
        <div class="tips-headline">无法访问</div>
        <div class="tips-info">请检查 URL 是否正确</div>
        <router-link class="tips-return-home" to="/" replace>返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404'
}
</script>

<style lang="scss" scoped>
  .wscn-http404-container{
    width: 300px;
    margin: 100px auto;
  }

  .wscn-http404 {
    text-align: center;

    .tips {
      position: relative;
      width: 100%;
      overflow: visible;

      &-notfound {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #409EFF;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }

      &-headline {
        font-size: 20px;
        line-height: 24px;
        color: #222;
        font-weight: bold;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }

      &-info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }

      &-return-home {
        display: block;
        width: 110px;
        height: 36px;
        background: #409EFF;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
        text-decoration: none;
        margin: 0 auto;
      }

      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
</style>

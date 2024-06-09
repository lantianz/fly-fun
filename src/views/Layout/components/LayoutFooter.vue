<template>
  <footer class="app_footer">
    <div class="extra">
      <div class="container">
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="https://github.com/lantianz" target="_blank">关于我</a>
            <a href="javascript:;">友情链接（meiyou）</a>
          </p>
          <p>CopyRight © 2024 FlyFun</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang='scss'>
.app_footer {
  width: 100vw;
  background-color: #f5f5f5;
  margin-top: 50px;
  padding-top: 20px;

  .extra {
    width: 100%;
    background-color: #333;
  }

  .copyright {
    width: 100%;
    height: 100px;
    padding-top: 20px;
    text-align: center;
    color: #999;
    font-size: 15px;

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;

      &:last-child {
        border-right: none;
      }

      &:hover {
        color: $xtxColor;
        ;
      }
    }
  }
}
</style>
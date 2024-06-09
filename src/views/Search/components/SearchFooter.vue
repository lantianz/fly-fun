<template>
    <footer class="app_footer">
        <div class="container">
          <!-- 标语 -->
          <div class="slogan">
            <a href="javascript:;">
              <i class="iconfont icon-footer01"></i>
            </a>
          </div>
          <!-- 版权信息 -->
          <div class="copyright">
            <p style="margin-bottom: 10px;">
              <a href="https://github.com/lantianz" target="_blank">关于我</a>
              <a href="javascript:;">友情链接（meiyou）</a>
            </p>
            <p style="padding-bottom: 20px;">CopyRight © 2024 FlyFun</p>
          </div>
        </div>
    </footer>
  </template>
  
  <style scoped lang='scss'>
  .app_footer {
    width: 100vw;
    padding-top: 20px;
    background-color: $whiteBgColor;
  
    .slogan {
      margin-top: 20px;
      padding: 10px 0;
      border-bottom: 1px solid #999999;
      display: flex;
      justify-content: center;
  
      a {
        line-height: 36px;
        font-weight: bold;
        color: #333;
        font-size: 28px;
  
        i {
          font-size: 40px;
          vertical-align: middle;
          margin-right: 10px;
          font-weight: 100;
        }
      }
    }
  
    .copyright {
      padding-top: 10px;
      text-align: center;
      color: #999;
      font-size: 15px;
  
      p {
        line-height: 1;
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
          color: $xtxColor;;
        }
      }
    }
  }
  </style>
<template>
    <footer class="app_footer">
      <div class="extra">
        <div class="container">
          <!-- 标语 -->
          <div class="slogan">
            <a href="javascript:;">
              <i class="iconfont icon-footer01"></i>
              <span>还看？？？啥都没有了！</span>
            </a>
          </div>
          <!-- 版权信息 -->
          <div class="copyright">
            <p>
              <a href="javascript:;">关于我（meiyou）</a>
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
  
    .slogan {
      width: 100%;
      height: 90px;
      padding-top: 10px;
      border-bottom: 1px solid #434343;
      display: flex;
      justify-content: center;
  
      a {
        height: 58px;
        line-height: 58px;
        color: #fff;
        font-size: 28px;
  
        i {
          font-size: 40px;
          vertical-align: middle;
          margin-right: 10px;
          font-weight: 100;
        }
  
        span {
          vertical-align: middle;
          text-shadow: 0 0 1px #333;
        }
      }
    }
  
    .copyright {
      width: 100%;
      height: 120px;
      padding-top: 40px;
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
      }
    }
  }
  </style>
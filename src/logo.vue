<template>
  <div class="logo-page">
    <div :class="['top-logo']">
      <div class='logo-title-tip'>
        <i class='iconfont logo-icon'>&#xe6cf;</i><span>金卡数据创新平台</span>
      </div>

      <div class='user-info-wrap'>
        <div class='title'>
          登录
        </div>
        <div :class="['logo-content-info',{'logo-content-info-error': isUserName|| isPassWord }]">
          <div
            class='item-info-error'
            v-if='isUserName|| isPassWord'
          >
            <span class='user-info'>
              <i class='iconfont '>&#xe6df;</i>
            </span>

            <span>
              {{message}}
            </span>
          </div>
          <div :class="['item-info-input',{'input-active-focus':active === 'username'}]">
            <span class='user-info'>
              <i class='iconfont '>&#xe6de;</i>
            </span>

            <input
              class='menu-search-input'
              type="text"
              v-model="username"
              placeholder="请输入帐号"
              @focus="onFocus('username')"
              @blur="onBlur()"
            >
          </div>
          <div :class="['item-info-input','item-info-input-password',{'input-active-focus':active === 'password'}]">
            <span class='user-info'>
              <i class='iconfont '>&#xe6dd;</i>
            </span>

            <input
              class='menu-search-input'
              type="password"
              v-model="password"
              placeholder="请输入密码"
              @focus="onFocus('password')"
              @blur="onBlur()"
            >
          </div>
          <div class='prompt'>
            忘记密码
          </div>
          <gc-button
            className='login-btn'
            @click='login'
          >
            登录
          </gc-button>
        </div>
        <div class='user-info-footer'>
          <span>我要注册</span>
          <span>其他方式登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Login } from './api/login'
import $ from 'jquery'
export default {
  name: 'logo-app',
  data () {
    return {
      form: this.$form.createForm(this),
      username: '',
      password: '',
      message: '密码不能为空',
      isUserName: false,
      isPassWord: false,
      active: ''
    }
  },
  computed: {
    isFixedLoginDemo () {
      return this.isFixedLogin
    }
  },
  mounted: function () {
    $(document).on('keydown', (evt) => {
      if (evt.keyCode === 13) {
        this.login()
      }
    })
  },
  watch: {
    username: function () {
      this.message = !this.username ? '帐号不能为空' : '密码不能为空'
      this.isUserName = !this.username
    },
    password: function () {
      this.message = !this.username ? '帐号不能为空' : '密码不能为空'
      this.isPassWord = !this.password
    }
  },
  methods: {
    login () {
      if (!this.username || !this.password) {
        this.message = !this.username ? '帐号不能为空' : '密码不能为空'
        this.isUserName = !this.username
        this.isPassWord = !this.password
      } else {
        Login({
          username: this.username,
          password: this.password
        }).then((data) => {
          if (data.status !== 'success') {
            return false
          } else {
            window.localStorage.setItem('token', 'aaaaaaaaaa', 24 * 60 * 60 * 1000)
            this.$router.push({ name: 'home' })
          }
        })
      }
    },
    onFocus (attr) {
      this.active = attr
    },
    onBlur () {
      this.active = ''
    }
  },
  beforeDestroy () { // 在组件生命周期结束的时候销毁。
    $(document).off('keydown')
  }
}
</script>
<style lang='less'>
.logo-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("./assets/img/pg_01.png") no-repeat;
  background-position: top center;
  .top-logo {
    width: 1078px;
    height: 610px;
    background: url("./assets/img/pg_login.png") no-repeat;
    background-position: top center;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -539px;
    margin-top: -265px;
    color: #fff;
    .logo-title-tip {
      position: absolute;
      top: -50px;
      left: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        font-size: 20px;
        font-weight: 550;
        height: 28px;
        line-height: 28px;
      }
      i {
        margin-right: 10px;
        font-size: 25px;
      }
    }
    .user-info-wrap {
      width: 340px;
      height: 400px;
      position: absolute;
      background: #ffffff;
      box-shadow: 0 0 4px 0 rgba(0, 62, 153, 0.2);
      border-radius: 4px;
      padding: 0 40px;
      right: 170px;
      top: 70px;
      .logo-content-info {
        width: 100%;
        padding-top: 14px;
        &.logo-content-info-error {
          padding-top: 0;
        }
        .item-info-error {
          width: 100%;
          height: 28px;
          background: #fae7e6;
          border: 1px solid #fa9b96;
          border-radius: 2px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #cc2929;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 18px;
          font-size: 8px;
          .user-info {
            width: 40px;
            height: 100%;
            text-align: right;
            line-height: 28px;
            padding-right: 10px;
            color: #cc2929;
            i {
              font-size: 15px;
            }
          }
        }
        .item-info-input {
          width: 100%;
          height: 44px;
          background: #f0f3fa;
          border: 1px solid #99c5ff;
          border-radius: 2px;
          border: 1px solid #dcdcdc;
          color: #4a4a4a;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 18px;
          &.input-active-focus {
            border: 1px solid #99c5ff;
          }
          .user-info {
            width: 44px;
            height: 100%;
            text-align: right;
            line-height: 44px;
            padding-right: 8px;
            color: #4a4a4a;
            i {
              font-size: 19px;
            }
          }
          .menu-search-input {
            background: none;
            list-style: none;
            outline: none;
            border: none;
            width: 100%;
            height: 26px;
            font-size: 14px;
            &::-webkit-input-placeholder {
              /* placeholder颜色  */
              color: #b3b3b3;
            }
          }
          &.item-info-input-password {
            margin-bottom: 10px;
          }
        }
      }
      .title {
        height: 28px;
        line-height: 28px;
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #666666;
        text-align: center;
        letter-spacing: 5px;
        margin-top: 40px;
        margin-bottom: 20px;
      }
      .prompt {
        margin-bottom: 18px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        cursor: pointer;
      }
      .login-btn {
        width: 100%;
        height: 44px;
        line-height: 36px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        background: #4367cc;
        border-radius: 2px;
        letter-spacing: 5px;
        &:hover {
          background: #4c74e6;
        }
      }
      .user-info-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 44px;
        width: 100%;
        background: #ebf3ff;
        border-radius: 0 0 4px 4px;
        display: flex;
        justify-content: flex-start;

        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #6b7eb3;
          width: 50%;
          text-align: center;
          line-height: 44px;
        }
      }
    }
  }
}
@media screen and (min-height: 800px) {
  .logo-page {
    width: 100%;
    height: 100%;
    position: relative;
    background: url("./assets/img/pg_01.png") no-repeat;
    background-position: top center;
    .top-logo {
      width: 1078px;
      height: 610px;
      background: url("./assets/img/pg_login.png") no-repeat;
      background-position: top center;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 232px;
      margin-top: 0;
      margin-left: -539px;
      color: #fff;
      .logo-title-tip {
        position: absolute;
        top: -50px;
        left: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          font-size: 20px;
          font-weight: 550;
          height: 28px;
          line-height: 28px;
        }
        i {
          margin-right: 10px;
          font-size: 25px;
        }
      }
      .user-info-wrap {
        width: 340px;
        height: 400px;
        position: absolute;
        background: #ffffff;
        box-shadow: 0 0 4px 0 rgba(0, 62, 153, 0.2);
        border-radius: 4px;
        padding: 0 40px;
        right: 170px;
        top: 70px;
        .logo-content-info {
          width: 100%;
          padding-top: 14px;
          &.logo-content-info-error {
            padding-top: 0;
          }
          .item-info-error {
            width: 100%;
            height: 28px;
            background: #fae7e6;
            border: 1px solid #fa9b96;
            border-radius: 2px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #cc2929;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 18px;
            font-size: 8px;
            .user-info {
              width: 40px;
              height: 100%;
              text-align: right;
              line-height: 28px;
              padding-right: 10px;
              color: #cc2929;
              i {
                font-size: 15px;
              }
            }
          }
          .item-info-input {
            width: 100%;
            height: 44px;
            background: #f0f3fa;
            border: 1px solid #99c5ff;
            border-radius: 2px;
            border: 1px solid #dcdcdc;
            color: #4a4a4a;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 18px;
            &.input-active-focus {
              border: 1px solid #99c5ff;
            }
            .user-info {
              width: 44px;
              height: 100%;
              text-align: right;
              line-height: 44px;
              padding-right: 8px;
              color: #4a4a4a;
              i {
                font-size: 19px;
              }
            }
            .menu-search-input {
              background: none;
              list-style: none;
              outline: none;
              border: none;
              width: 100%;
              height: 26px;
              font-size: 14px;
              &::-webkit-input-placeholder {
                /* placeholder颜色  */
                color: #b3b3b3;
              }
            }
            &.item-info-input-password {
              margin-bottom: 10px;
            }
          }
        }
        .title {
          height: 28px;
          line-height: 28px;
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #666666;
          text-align: center;
          letter-spacing: 5px;
          margin-top: 40px;
          margin-bottom: 20px;
        }
        .prompt {
          margin-bottom: 18px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          cursor: pointer;
        }
        .login-btn {
          width: 100%;
          height: 44px;
          line-height: 36px;
          font-size: 16px;
          color: #ffffff;
          text-align: center;
          background: #4367cc;
          border-radius: 2px;
          letter-spacing: 5px;
          &:hover {
            background: #4c74e6;
          }
        }
        .user-info-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 44px;
          width: 100%;
          background: #ebf3ff;
          border-radius: 0 0 4px 4px;
          display: flex;
          justify-content: flex-start;

          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #6b7eb3;
            width: 50%;
            text-align: center;
            line-height: 44px;
          }
        }
      }
    }
  }
}
</style>

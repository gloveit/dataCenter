<template>
  <div class="home-page">
    <transition name='my-trans'>
      <div
        class="modal-menu"
        v-if="flag"
      >
        <div class="modal-content">
          <div class='modal-box-content'>
            <div class='box-image'>
              <div
                class="modal-container"
                v-for="(item, index) in menuList"
                :key="index"
              >
                <h4>
                  <div class="tip-icon">{{item.name}}
                    <span class='tip-icon-left'></span>
                    <span class='tip-icon-middle'></span>
                    <span class='tip-icon-right'></span>
                  </div>
                </h4>
                <ul class='modal-container-item'>
                  <li
                    tag="li"
                    v-for="v in item.tiles.filter(val=>{
                  return val.cat_id !== null
                })"
                    :key="v.id"
                    @click='clickMenu(v)'
                  >
                    <nav-menu-item :dataSource="v"></nav-menu-item>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="top-menu">
      <div class="top-menu-box">
        <span class='top-logo'>
          <i class='iconfont logo-icon'>&#xe6cf;</i>金卡数据创新平台
        </span>
        <div
          :class="[ 'menu-flag', {'menu-show':flag}]"
          @click="showMenuList"
        ><i class='iconfont'>&#xe6ce;</i></div>
        <!-- v-if='!this.$store.state.Home.isHomePage' -->
        <div
          class='shortcuts-to-home'
          @click="homeBack"
        >
        </div>
        <div :class="['circle', {'baCircleYellow': this.$store.state.Home.isHomePage}]">
          <div :class="['set', {'demo':flagShowSearch }]">

            <div class='use-search'>
              <div
                class='logo-search-input'
                v-if="flagShowSearch"
                ref='logoSearchInput'
              >
                <span class="left-half-circle">
                </span>
                <input
                  class='menu-search-input'
                  type="text"
                >
                <i class="iconfont menu-search-icon">
                  &#xe6c9;
                </i>
                <span class='right-half-circle'>
                </span>
              </div>

              <span class='logo-search'>
                <i
                  v-if="!flagShowSearch"
                  class="iconfont"
                >
                  &#xe6c9;
                </i>
              </span>
            </div>
            <div class='use-set'>
              <span class='logo-info'>
                <i class='iconfont'>&#xe6cd;</i>
                <b class='logo-info-number'>5</b>
              </span>

              <a-dropdown
                overlayClassName="dropdown-user"
                :visible='flagUserInfo'
              >

                <span
                  class='logo-user'
                  @click.stop="showUserInfo"
                >
                  <i class="iconfont">&#xe6cb;</i>
                </span>
                <div
                  slot="overlay"
                  class='dropdown-user-box'
                  @click.stop
                >
                  <div class='dropdown-user-content'>
                    <div class='user-photo'>
                      <img
                        src=""
                        alt=""
                      >
                    </div>
                    <h3>王长期</h3>
                    <h4>
                      超级管理员
                    </h4>
                  </div>
                  <div class='dropdown-user-footer'>
                    <div
                      v-if='!this.$store.state.Home.flagDrag&&this.$store.state.Home.isHomePage'
                      class='seting-btn'
                      @click="editTiles"
                    ><span class='seting-icon'><i></i></span><span>设置</span></div>
                    <div
                      class='exit-btn'
                      @click='extApp'
                    ><span class='exit-icon'><i></i></span><span>退出</span></div>
                  </div>
                </div>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class='home-page-footer'
      v-if='this.$store.state.Home.flagDrag'
    >
      <gc-button
        @click='editOk'
        className='btn-edit-footer'
      >完成编辑</gc-button>
      <gc-button
        @click='exitEditor'
        className='btn-edit-footer'
      >
        退出编辑
      </gc-button>
    </div>
    <div class='home-page-content'>
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive" />
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import _ from 'lodash'
import NavMenuItem from '@/components/container/nav_menu_item'
import { Modal } from 'ant-design-vue'
import { EditOk } from '@/api/home'
export default {
  name: 'home',
  components: {
    NavMenuItem
  },
  data () {
    return {
      list: [],
      flag: false,
      flagShowSearch: false,
      flagUserInfo: false
    }
  },
  computed: {
    menuList () {
      return this.$store.state.Home.list
    }
  },
  mounted: function () {
    $(document).on('click', '.logo-search', (e) => {
      e.stopPropagation()
      this.flagShowSearch = true
    })
    $(document).on('click', (e) => {
      this.flagShowSearch = false
      this.flagUserInfo = false
    })
    $(document).on('click', '.logo-search-input', (e) => {
      e.stopPropagation()
      this.flagShowSearch = true
    })
  },
  methods: {
    clickMenu (attr) {
      this.showMenuList()
      if (attr.linkedComponent.path === '/openOtherLick') {
        window.open('http://183.129.168.178:30290/#/main1')
      } else if (attr.linkedComponent) {
        let _newList = _.cloneDeep(this.$store.state.Breadcrumb.breadList)
        _newList.push({
          path: attr.linkedComponent.path,
          name: attr.linkedComponent.remark
        })
        this.$store.commit('CHANGEBREAD', _newList)
        this.$router.push({ path: attr.linkedComponent.path })
      }
    },
    showMenuList () {
      this.flag = !this.flag
    },
    extApp () {
      let that = this
      Modal.confirm({
        title: '您确认退出吗？',
        onOk () {
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('routerList')
          setTimeout(() => {
            that.$router.push({ name: 'login' })
          }, 500)
        },
        okText: '确认',
        cancelText: '取消',
        onCancel () { }
      })
    },
    editTiles () {
      this.$store.commit('CHANGEFLAGE', true)
    },
    exitEditor () {
      this.$store.dispatch('getList')
      this.$store.commit('CHANGEFLAGE', false)
    },
    editOk () {
      let newTiles = []
      this.$store.state.Home.list.filter((item) => {
        return item.id !== 0
      }).forEach((item) => {
        let id = item.id
        item.tiles.forEach((val, i) => {
          val.cat_id = id
          val.seq = i
          newTiles.push(val)
        })
      })
      this.$store.commit('CHANGEFLAGE', false)
      EditOk(newTiles)
    },
    editMeterInfo () {
      this.$router.push({ path: '/home/meterInfo/Revision' })
    },
    homeBack () {
      this.$router.push({
        path: '/home'
      })
    },
    showUserInfo () {
      this.flagUserInfo = true
    }
  }
}
</script>
<style lang='less'>
@import url("./Home.less");
</style>

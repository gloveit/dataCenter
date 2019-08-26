<template>
  <div class='home-container'>
    <div class="home">
      <div class="home-content">
        <div class="navigation">
          <ul class="nav-menu">
            <li
              v-for="(item, index) in menuText"
              :key="item.name"
              :class="{activeItmeNav: activeMenu===index}"
              @click="changeMenu(index)"
              :accesskey="item.name"
              quanxian='accept'
            >
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div
        class='container-box'
        id="scrollBox"
      >
        <div
          :class="['container-item', {'edit-mode': flagDrag}]"
          v-for="item in list"
          :key="item.id"
          :id="item.key"
        >
          <span class='item-tip'>
            <i
              class='iconfont collection'
              v-if="item.icon === 'collection'"
            >
              &#xe6ca;
            </i>
            <i
              class='iconfont'
              v-else-if="item.icon === 'icon-meter'"
            >
              &#xe6cc;
            </i>
            <i
              class='iconfont'
              v-else
            >
              &#xe6cc;
            </i>
            {{item.name}}
          </span>
          <div class="item-content">
            <draggable
              class='tiles-router'
              tag='ul'
              v-if='flagDrag'
              v-bind="dragOptions"
              v-model="item.tiles"
              :move="checkMove"
              @end="endDom"
              :group="{name: 'false', pull: 'clone', put: false}"
            >
              <li
                class="ui-state-default li-item-tiles "
                v-for="val in item.tiles"
                :key="val.id"
                :id="val.id"
                :accesskey="item.name"
              >
                <magnet :dataSource='val'></magnet>
              </li>
            </draggable>
            <ul
              class='tiles-router'
              v-else
            >
              <li
                class='empty-favorites-item'
                v-if="item.name === '收藏夹'&& item.tiles.length <2"
              >
                <i class='iconfont'>&#xe6f8;</i>暂无内容，请在浏览的时候收藏您关注的磁贴
              </li>
              <li
                class="ui-state-default li-item-tiles jquery-contextMenu"
                v-for="val in item.tiles.filter(v=>{
                  return v.cat_id !== null
                })"
                :key="val.id"
                :id="val.id"
                :accesskey="val.id+'&'+item.id"
                @click="changeRouter(val)"
              >
                <div
                  :class="['favorites-btn',{'hasFavorites': val.userCollection !== null}]"
                  @click.stop="favAndUnfav(val)"
                  :title="val.userCollection !== null? '取消收藏':'点击收藏'"
                >
                  <i class='iconfont'>&#xe6fa;</i>
                </div>
                <magnet :dataSource='val'></magnet>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import _ from 'lodash'
import draggable from 'vuedraggable'
import Magnet from '@/components/container/magnet'
import { addTilesToFavorites, deteleTilesFromFavorites } from '@/api/home'
import { Message } from 'ant-design-vue'
export default {
  name: 'home-container',
  components: {
    draggable,
    Magnet
  },
  data () {
    return {
      activeMenu: 0
    }
  },
  computed: {
    list () {
      if (this.$store.state.Home.flagDrag) {
        return this.$store.state.Home.list.filter((item) => {
          return item.name !== '收藏夹'
        })
      } else {
        return (this.$store.state.Home.list || [])
      }
    },
    menuText () {
      if (this.$store.state.Home.flagDrag) {
        return this.$store.state.Home.menuList.filter((item) => {
          return item.name !== '收藏夹'
        })
      } else {
        return (this.$store.state.Home.menuList || [])
      }
    },
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    flagDrag () {
      return this.$store.state.Home.flagDrag || false
    }
  },
  mounted: function () {
    // 监听dom元素的scroll事件
    this.scrollBox = document.getElementById('scrollBox')
    this.scrollBox.addEventListener('scroll', (e) => {
      const jump = $('.container-item')
      const topArr = []
      for (let i = 0; i < jump.length; i++) {
        topArr.push(jump.eq(i).outerHeight(true))
      }
      const currentOffsetTop = this.scrollBox.scrollTop // 滚轮的高度
      let top = 0
      for (let i = 0; i < topArr.length; i++) {
        top += topArr[i]
        if (currentOffsetTop <= top - topArr[i]) { // 根据滚动距离判断应该滚动到第几个导航的位置
          this.activeMenu = i
          break
        }
      }
    }, true)
    $(document).on('mouseover', (e) => {
      // eslint-disable-next-line no-unused-expressions
      e.stopPropagation()
      this.drag = false
      this.dragDomAssKey = ''
      this.currentId = ''
    })
    $(document).on('mouseover', '.nav-menu li', (e) => {
      e.stopPropagation()
      if (this.drag && this.dragDomAssKey && this.currentId > -1) {
        if (e.target.accessKey !== this.dragDomAssKey && e.target.accessKey !== '收藏夹' && this.dragDomAssKey !== '收藏夹') {
          let _newList = _.cloneDeep(this.list)
          let newItem = {}
          _newList.forEach((item) => {
            if (item.name === this.dragDomAssKey) {
              newItem = item.tiles[this.currentId]
              item.tiles.splice(this.currentId, 1)
            }
          })
          _newList.forEach((item) => {
            if (item.name === e.target.accessKey && JSON.stringify(newItem) !== '{}') {
              item.tiles.push(newItem)
            }
          })
          this.$store.commit('GETLIST', _newList)
        }
      }
    })
  },
  methods: {
    changeMenu (index) {
      const jump = $('.container-item').eq(index)
      const scrollTop = jump.position().top + this.scrollBox.scrollTop - 60 // 获取需要滚动的距离
      // Chrome
      this.scrollBox.scrollTo({
        top: scrollTop,
        behavior: 'smooth' // 平滑滚动
      })
    },
    changeRouter (router) {
      if (router.linkedComponent.path === '/openOtherLick') {
        window.open('http://183.129.168.178:30290/#/main1')
      } else if (router.linkedComponent) {
        let _newList = _.cloneDeep(this.$store.state.Breadcrumb.breadList)
        _newList.push({
          path: router.linkedComponent.path,
          name: router.linkedComponent.remark
        })
        this.$store.commit('CHANGEBREAD', _newList)
        this.$router.push({ path: router.linkedComponent.path })
      }
    },
    checkMove (e) {
      return true
    },
    endDom (e) {
      this.drag = true
      this.dragDomAssKey = e.item.accessKey
      this.currentId = e.newIndex
    },
    favAndUnfav (attr) {
      if (attr.userCollection === null) {
        addTilesToFavorites({ id: attr.id }).then((data) => {
          if (_.get(data, 'status') === 'success') {
            Message.success('收藏成功', 0.4)
            this.$store.dispatch('getList')
          }
        })
      } else {
        deteleTilesFromFavorites({ tid: attr.id }).then((data) => {
          if (_.get(data, '[0].status') === 'success') {
            Message.success('取消收藏成功', 0.4)
            this.$store.dispatch('getList')
          }
        })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('SAVEHOMESCROLL', this.scrollBox.scrollTop)
    next()
  },
  activated () {
    _.get(this.$router, 'options.routes[2].children', []).forEach(item => {
      if (item.path !== 'content') {
        _.set(item, 'keepAlive', false)
      }
    })
    this.scrollBox.scrollTo({
      top: this.$store.state.Home.scrolltop
    })
  }

}
</script>
<style lang='less'>
@import url("./home_content.less");
</style>

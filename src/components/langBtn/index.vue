<template>
  <div class="lang-wrap">
    <div class="lang" @click="isShow=true">
      <span class="lang-text">
        {{ localeLangText }}
      </span>
      <svg-icon iconClass="down" class-name="lang-icon"></svg-icon>
    </div>
    <div class="lang-mask" @touchmove.prevent @click.prevent.stop="isShow=false"
         :style="{'display': isShow?'block':'none'}"></div>
    <ul class="lang-ul" :style="{'display': isShow?'flex':'none'}">
      <li class="lang-li" :class="{'active':$i18n.locale===item.value}" :key="index" v-for="(item,index) in langs"
          @click.prevent="handleChangeLang(item.value)">
        {{ item.label }}
      </li>
    </ul>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { loadLanguageAsync } from '@/lang'

export default {
  name: 'langBtn',
  created () {
  },
  data () {
    return {
      isShow: false,
      langs: [
        {
          label: '中文简体',
          value: 'zh-CN'
        }, {
          label: '中文繁体',
          value: 'zh-TW'
        }, {
          label: 'English',
          value: 'en'
        }, {
          label: '日本語',
          value: 'ja'
        }, {
          label: '한국인',
          value: 'ko'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['localLang']),
    localeLangText () {
      const langItem = this.langs.find((item) => item.value === this.localLang)
      return langItem ? langItem.label : ''
    }
  },
  methods: {
    handleChangeLang (lang) {
      loadLanguageAsync(lang)
      this.$store.commit('setLocalLang', lang)
      this.isShow = !this.isShow
    }
  }
}
</script>

<style scoped lang="less">
.lang {
  width: 128px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #fff;
  border-radius: 40px;
  height: 48px;
  cursor: pointer;
  padding: 0 20px;
  box-sizing: border-box;

  &-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: none;
    z-index: 11;
  }

  &-ul {
    position: absolute;
    border: 1px solid #fff;
    width: 128px;
    flex-direction: column;
    border-radius: 15px;
    bottom: -50%;
    transform: translateY(100%);
    overflow: hidden;
    z-index: 12;
  }

  &-li {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    font-size: 14px;
    font-family: Arial-Regular, Arial;
    font-weight: 400;
    color: #999999;
    height: 32px;
    width: 100%;
    border-bottom: 1px solid #fff;
    cursor: pointer;
    padding: 5px 0;

    &:last-child {
      border-bottom: 0;
    }

    &:active, &.active {
      background-color: #333333;
    }
  }

  &-wrap {
    position: relative;
  }

  &-text {
    font-size: 16px;
    font-family: Arial-Regular, Arial;
    font-weight: 400;
    line-height: 32px;
    color: #fff;
    margin-right: 11px;
    white-space: nowrap;
  }

  .lang-icon {

  }
}

@media screen and (max-width: 768px) {
  .lang {
    max-width: 1.28rem;
    height: .36rem;
    padding: 0 .20rem;

    &-ul {
      width: 1.28rem;
      border-radius: .15rem;
    }

    &-li {
      font-size: .14rem;
      height: .32rem;
      padding: .1rem 0;
    }

    &-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-text {
      font-size: 0.16rem;
      margin-right: .03rem;
      line-height: 1;
    }

    .lang-icon {
      width: .12rem;
      height: .12rem;
    }
  }
}
</style>

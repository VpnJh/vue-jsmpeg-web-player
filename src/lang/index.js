import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/locales/en.js'

// 运行程序

Vue.use(VueI18n)
// VueI18n 实例
const i18n = new VueI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    messages
})


const loadedLanguages = [] // 我们的预装默认语言

function setI18nLanguage(lang) {
    i18n.locale = lang
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

export function loadLanguageAsync(lang) {
    // 如果语言相同
    if (i18n.locale === lang) {
        return Promise.resolve(setI18nLanguage(lang))
    }
    // 如果语言已经加载
    if (loadedLanguages.includes(lang)) {
        return Promise.resolve(setI18nLanguage(lang))
    }

    // 如果尚未加载语言
    return import(/* webpackChunkName: "[request]" */ `@/lang/locales/${lang}`).then(
        messages => {
            i18n.setLocaleMessage(lang, messages.default)
            loadedLanguages.push(lang)
            return setI18nLanguage(lang)
        }
    )
}

export default i18n

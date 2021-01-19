import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cnLocale from './cn/cn'
import enLocale from './en/en'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale // 英文
    },
    cn: {
        ...cnLocale // 中文
    }
}
const i18n = new VueI18n({
    locale: window.localStorage.getItem('lang') || 'en',
    messages
})

export default i18n

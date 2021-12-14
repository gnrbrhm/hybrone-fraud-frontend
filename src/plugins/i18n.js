import Vue from "vue";
import VueI18n from "vue-i18n";
import store from "../store";
import Element from "element-ui";

// for ElementUI i18n
import enLocale from "element-ui/lib/locale/lang/en";
import trLocale from "element-ui/lib/locale/lang/tr-TR";

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context(
    "../locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );

  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      if (locale == "tr") messages[locale] = { ...locales(key), ...trLocale };
      if (locale == "en") messages[locale] = { ...locales(key), ...enLocale };
    }
  });
  return messages;
}

const i18n = new VueI18n({
  locale: store.state.locale.lang,
  fallbackLocale: "tr",
  messages: loadLocaleMessages(),
  silentTranslationWarn: true,
});

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
});

export default i18n;

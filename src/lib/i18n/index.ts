import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";

const saved = typeof window !== "undefined" ? localStorage.getItem("tl-lang") : null;
const initialLang = saved ?? "en";

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, fr: { translation: fr } },
    lng: initialLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

// Keep <html lang> in sync so browser doesn't offer to translate
if (typeof document !== "undefined") {
  document.documentElement.lang = initialLang;
  i18n.on("languageChanged", (lng) => {
    document.documentElement.lang = lng;
  });
}

export default i18n;

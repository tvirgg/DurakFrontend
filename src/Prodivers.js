import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { IntlProvider } from "react-intl";
import enMessages from "./static/locales/en.json";
import ruMessages from "./static/locales/ru.json";

const messages = {
  en: enMessages,
  ru: ruMessages,
};

const IntlContext = createContext();

export const useIntlProvider = () => useContext(IntlContext);

const Providers = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== "undefined") {
      const systemLanguage = navigator.language.split("-")[0];
      return messages[systemLanguage] ? systemLanguage : "en";
    }
    return "en"; // Fallback для SSR
  });

  const handleChangeLanguage = newLocale => {
    setLocale(newLocale);
  };

  const providerValue = useMemo(
    () => ({
      locale,
      setLocale: handleChangeLanguage,
    }),
    [locale]
  );

  useEffect(() => {
    const fontFamily =
      locale === "en" ? "Inter, sans-serif" : "var(--ttHoves), sans-serif";

    document.body.style.fontFamily = fontFamily;
  }, [locale]);

  return (
    <IntlContext.Provider value={providerValue}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export default Providers;

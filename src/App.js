import React from "react";
import "./app.css";
import "./media/css/animations.css";
// Routes
import Routes from "./router/routes";
import LanguageSwitcher from "./components/language.switcher";
import Providers from "./Prodivers";
import Preloader from "./includes/preloader";
import initUser from "./initUser";

function App({ intlProviderValue }) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const tg = window.Telegram.WebApp;
    const tgReady = () => {
      tg.disableVerticalSwipes();
      tg.ready();
      tg.expand();
      tg.BackButton.hide();
    };

    const auth = async () => {
      let response;

      try {
        await initUser().then(() => {
          setLoading(false);
        });
      } catch (error) {
        if (error.response && error.response.status) {
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }

      if (response && response.status) {
        console.log(response.status);
      }
    };

    auth();
    tgReady();
  });

  return (
    <>
      {loading === true ? (
        <Preloader />
      ) : (
        <main className="App">
          <Routes />
          <LanguageSwitcher onChange={intlProviderValue.setLocale} />
        </main>
      )}
    </>
  );
}

export default function AppWithProviders() {
  return (
    <Providers>
      <App />
    </Providers>
  );
}

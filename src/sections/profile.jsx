import React, { useState } from "react";
// css
import "../media/css/profile.css";
// components
import CardUserProfile from "../components/card.user.profile";
import ProfileCustomsBar from "../components/profile.customs";
import CardInviteFirends from "../components/card.invite.friends";
import ProfileFriends from "../components/profile.friends";
import ProfileWindows from "../components/profile.windows";
import Preloader from "../includes/preloader";
import { useNavigate } from "react-router-dom";
import BackBtn from "../BackBtn";

// NavBar
import NavBar from "../components/nav.bar";
// UI
import UI_WINDOWX from "../layouts/ui/xWindow";
import LanguageSwitcher from "../components/language.switcher";
import { useIntlProvider } from "../Prodivers";

const Profile = () => {
  const intlProviderValue = useIntlProvider();
  const [navBarVisible, setNavBarVisible] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    BackBtn("/", navigate);
  });

  return (
    <>
      <section className="page profile_section pb-80">
        <Preloader />
        <div className="container">
          <LanguageSwitcher onChange={intlProviderValue.setLocale} />
          {/* profile */}
          <CardUserProfile />
          {/* customs bar */}
          <ProfileCustomsBar />
          {/* xWindow */}
          <UI_WINDOWX>
            <CardInviteFirends />
          </UI_WINDOWX>
          {/* friends */}
          <ProfileFriends />
          {/* modal / windows */}
          <ProfileWindows setNavBarVisible={setNavBarVisible} />
        </div>
      </section>
      {navBarVisible && <NavBar />}
    </>
  );
};
export default Profile;

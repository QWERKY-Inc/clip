import KakaoLogin from "react-kakao-login";
import { useState } from "react";
import { token } from "./Secrets";
// Secrets.js is gitignored until i find a way to handle secrets

const KakaoAuth = () => {
  const [profile, setProfile] = useState(null);

  // Does this need to be async? or even useState?
  const responseKaKao = (res) => {
    // setProfile({data: res});
    // const data = res;

    const loginBody = {
      mem_jointype: "KAKAO",
      mem_email: res.profile.kakao_account.email,
      mem_snsid: res.profile.id,
      mem_token: null,
    };

    console.log(loginBody);
  };

  return (
    <div>
      <KakaoLogin
        token={token}
        onSuccess={responseKaKao}
        onFail={console.error}
        onLogout={console.info}
        getProfile={true}
      />
    </div>
  );
};

export default KakaoAuth;

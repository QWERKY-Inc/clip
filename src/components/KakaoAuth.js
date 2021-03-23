import KakaoLogin from "react-kakao-login";
import { useState } from "react";
import {TouchableOpacity,Text,View,Modal,Image,Linking,Dimensions,TextInput} from 'react-native';
// import { token } from "./Secrets";
// Secrets.js is gitignored until i find a way to handle secrets
// cafe24 doesn't have ENV interface. hardcoding it in.

const KakaoAuth = (props) => {
  const [profile, setProfile] = useState(null);

  // Does this need to be async? or even useState?
  const responseKaKao = (res) => {
    // setProfile({data: res});
    // const data = res;
    props.setUserEmail(res.profile.kakao_account.email)
    props.setSNSID(res.profile.id)
    const loginBody = {
      mem_jointype: "KAKAO",
      mem_email: res.profile.kakao_account.email,
      mem_snsid: res.profile.id,
      mem_token: null,
    };

    console.log(loginBody);
    props.logInFunction(loginBody)
  };

  return (
    <div>
      <KakaoLogin
        // token={token}
        token='8c08c2009696a8de772e1b1990dc4521'
        onSuccess={responseKaKao}
        onFail={console.error}
        onLogout={console.log}
        getProfile={true}
        style={{
          height:'40px',
          width:'100%',
          alignItems:'center',
          justifyContent:'center',
          textAlign:'center',
          backgroundColor:'white',
          borderRadius:'10px',
          border:"1px solid black",
          marginBottom:'15px'
        }}
      >
        <div style={{
          height:'40px',
          width:'100%',
          lineHeight:'40px'
        }}>
          <Text>
            카카오로 시작하기
          </Text>
        </div>
      </KakaoLogin>
    </div>
  );
};

export default KakaoAuth;

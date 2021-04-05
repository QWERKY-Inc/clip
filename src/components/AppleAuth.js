import AppleLogin from "react-apple-login";
import { useState } from "react";
import {TouchableOpacity,Text,View,Modal,Image,Linking,Dimensions,TextInput} from 'react-native';
// import { token } from "./Secrets";
// Secrets.js is gitignored until i find a way to handle secrets
// cafe24 doesn't have ENV interface. hardcoding it in.

const AppleAuth = (props) => {
  const [profile, setProfile] = useState(null);

  // Does this need to be async? or even useState?
  const responseApple = (res) => {
    // setProfile({data: res});
    // const data = res;
    console.log(res)
    // props.setUserEmail(res.user.email)
    // props.setSNSID(res.authorization.id_token)
    const loginBody = {
      mem_jointype: "APPLE",
      mem_email: res.user.email,
      mem_snsid: res.authorization.id_token,
      mem_token: null,
    };

    console.log(loginBody);
    // props.logInFunction(loginBody)
  };

  return (
    <div>
      <AppleLogin
        // token={token}
        // token='8c08c2009696a8de772e1b1990dc4521'
        onSuccess={responseApple}
        onFail={console.error}
        onLogout={console.log}
        // getProfile={true}
        clientId="xyz.qwerky.clipapp"
        redirectURI="clip.style"
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
            Apple 계정으로 계속하기
          </Text>
        </div>
      </AppleLogin>
    </div>
  );
};

export default AppleAuth;

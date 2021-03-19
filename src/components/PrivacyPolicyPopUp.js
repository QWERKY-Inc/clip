import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,Linking,Dimensions,TextInput} from 'react-native';
import xIcon from '../assets/x.png';
import './Login.css'
const queryString = require('query-string');

function PrivacyPolicyPopUp(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)

    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    
    useEffect(() => {
        Dimensions.addEventListener('change',onChange) 
      },[])

   

   
        return (
            <div
            style={{
            position:'fixed',
            height:'100vh',
            width:'100vw',
            top:0,
            left:0,
            backgroundColor:'rgba(0,0,0,0.5)',
            display:'block',
        //   padding:'160px',
            zIndex:103
            }}
        >
        <div
        style={{
            paddingTop:'100px',
            paddingLeft:'65px',
            paddingRight:'65px'
        }}
        >
            <div
            style={{
                textAlign:'left',
                // margin:'25pt'
                paddingLeft:'0px',
                paddingRight:'0px',
                backgroundColor:'transparent'
            }}
            >
            </div>


            <div
            style={{
            borderRadius:'10px',
            backgroundColor:'white',
            width:'100%',
            height:'500px',
            paddingTop:'15px',
            // columnCount:3,
            // flexwrap:'wrap',
            // flexDirection:'column',
            // display: 'grid',
            // gridTemplateColumns: 'auto auto',
            // // padding:'100px',
            overflowY: 'scroll',
            }}
            >
                <div
                style={{
                height:'25px',
                width:'25px',
                backgroundColor:'transparent',
                position: 'absolute',
                top:'110px',
                left:'75px',
                zIndex:102,
                }}
            >
                <TouchableOpacity
                onPress={()=>{
                    props.togglePrivacyPolicyPopUpShow()
                }}
                >
                <img
                src={xIcon}
                style={{
                    height:'25px',
                    width:'25px',
                }}
                >
                </img>
                </TouchableOpacity>
            </div>
            
                <View
                style={{
                    backgroundColor:'white',
                    height:'498px',
                    width:'100%',
                    borderBottomLeftRadius:'10px',
                    borderBottomRightRadius:'10px'

                }}
                >
                    <View
                        style={{
                            position:'relative',
                            top:0,
                            height:'30px',
                            width:'100%',
                            backgroundColor:'white',
                            borderTopLeftRadius:'10px',
                            borderTopRightRadius:'10px',
                            borderBottom:'1px solid rgb(221,221,221)'
                        }}
                    >
                    <Text
                        style={{
                            fontWeight:700,
                        }}
                    >개인정보 취급 방침</Text>
                    </View>

                <div
                    style={{
                    display: 'block',
                    textAlign:'left',
                    padding:'15px',
                    overflowY:'scroll',
                    backgroundColor:'white',
                    height:'100%'
                }} 
                >
                   <Text>
                    개인정보 처리방침 ​ (주)쿼키(이하 “회사”)는 통신비밀보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 정보통신 서비스 제공자가 준수하여야 할 관련 법령 상의 개인정보 보호 규정을 준수하며, 관련 법령에 의거한 개인정보 취급 방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다. 본 개인정보 처리 방침은 회사가 제공하는 클립 (CLIP) 서비스에 적용되며 다음과 같은 내용을 포함하고 있습니다. ​ 1. 개인정보 수집 및 이용 현황 회사는 서비스 제공을 위한 최소한의 범위 내에서 이용자의 동의 하에 개인정보를 수집하며, 수집한 모든 개인정보는 고지한 목적 범위 내에서만 사용됩니다. 필수정보 - 수집 항목: 전자메일(아이디), 비밀번호, 이름, 회사명, 회사규모, 직종, 직책, 전화번호, 웹사이트,블로그 또는 SNS주소, 직종, 직책, 전문분야, 회사규모. - 수집 및 이용목적: 본인 확인 및 가입 의사 확인, 회원가입 승인여부 판단, 부정이용 확인∙방지, 상담 및 문의 처리, 회원 맞춤형 정보 제공. - 보유 및 이용기간: 회원 탈퇴 시 즉시 삭제함. 부정이용 방지를 위한 정보(ID, 불량 이용 기록)는 탈퇴DB에서 6개월 후 삭제함. 추가정보 - 수집 항목: 수취인정보(이름, 연락처, 주소), 프로젝트정보(프로젝트 이름, 유형, 규모, 시기 등), 샘플이용정보(적용부위, 시공여부 등), 통화가능 시간. - 수집 및 이용목적: 물품의 주문/배송/취소. 제품 안내 및 상담, 문의 처리, 샘플제공업체 마케팅 정보 제공 - 보유 및 이용기간: 재화 또는 서비스의 제공 목적이 달성된 후 파기(단, 관계법령에 정해진 규정에 따라 법정기간 동안 보관). 거래기록 보존을 위한 정보(ID, 계좌번호, 배송지 주소)는 5년간 보관함(전자상거래 등에서의 소비자보호에 관한 법률). 선택정보 - 수집 항목: 마케팅 정보 수신 동의(휴대폰 번호, 전자메일, SMS/MMS), 뉴스레터 수신 동의(전자메일). - 수집 및 이용목적: 신규 서비스 안내, 설문, 이벤트 관련 정보 및 참여 기회 제공, 광고 및 마케팅 정보 제공. - 보유 및 이용기간: 정보 삭제 또는 이용 정지 요청 및 회원 탈퇴 시 즉시 삭제 ※ 부정이용이란 회원 탈퇴 후 재가입, 허위정보를 통한 물품 주문, 물품 주문 후 구매취소 등을 반복적으로 행하는 등, 이용약관 등에서 금지하고 있는 행위, 명의도용 등의 불·편법 행위 등을 포함합니다. ※ 고객의 권리를 보장해 드리기 위하여 탈퇴 회원 또는 장기 미이용 회원에게 환불 또는 리콜 안내를 목적으로 구매정보를 이용하여 연락을 취할 수 있습니다. ※ 위의 정보는 서비스 이용에 따른 통계∙분석에 이용될 수 있습니다. 2. 개인정보의 공유 및 제공 회사는 “1. 개인정보 수집 및 이용 현황”에서 고지한 범위 내에서만 개인정보를 이용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하지 않습니다. 물품 주문이 이루어진 경우, 상담 및 배송 등의 원활한 거래 이행을 위하여 관련된 정보를 필요한 범위 내에서 샘플제공업체(제3자)에게 전달합니다. 제공받는 자: 샘플제공 업체 제공 목적: 서비스 제공, 업체 직발송 물품 배송, 제품 안내, 홍보 및 상담, 문의 처리 제공 정보: 수취인정보(이름, 연락처, 주소), 프로젝트정보(프로젝트 이름, 유형, 규모, 시기 등), 샘플이용정보(적용부위, 시공여부 등), 통화가능 시간. 보유 및 이용기간: 재화 또는 서비스의 제공 목적이 달성된 후 파기(단, 관계법령에 정해진 규정에 따라 법정기간 동안 보관) ※ 동의 거부권 등에 대한 고지 개인정보 제공은 서비스 이용을 위해 꼭 필요합니다. 개인정보 제공을 거부하실 수 있으나, 이 경우 서비스 이용이 제한될 수 있습니다. 개인정보 제3자 제공은 샘플 주문시에만 이뤄지며, 명확한 내용은 주문 신청 시 안내하여 드립니다. 3. 개인정보의 파기 수집된 개인정보의 보유•이용기간은 서비스 이용계약 체결(회원가입)시부터 서비스 이용계약 해지(탈퇴신청, 직권탈퇴포함)시까지 입니다. 또한 동의 해지 시 고객의 개인정보를 상기 명시한 정보보유 사유에 따라 일정 기간 저장하는 자료를 제외하고는 지체 없이 파기합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기하고, 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법 또는 물리적 방법을 사용하여 파기합니다. 수집•이용목적이 달성된 개인정보의 경우 별도의 DB에 옮겨져 내부규정 및 관련 법령을 준수하여 안전하게 보관되며, 정해진 기간이 종료되었을 때 지체없이 파기됩니다. 이때, 별도의 DB로 옮겨진 개인정보는 회원이 동의한 목적을 초과하거나 혹은 법률이 정한 경우 외의 다른 목적으로 이용되지 않습니다. 4. 고객의 권리와 의무 4.1 고객의 권리 고객 및 법정대리인은 언제든지 수집 정보에 대하여 수정, 동의 철회, 삭제, 열람을 요청할 수 있습니다. 다만, 동의 철회, 삭제 시 서비스의 일부 또는 전부 이용이 제한될 수 있습니다. 회사가 수집한 개인정보는 CLIP 웹페이지에서 - 개인정보 확인 수정 / 주문목록 / 배송조회를 통해 확인할 수 있습니다. CLIP 웹을 통해 직접 확인하지 못하는 정보는 고객센터 help@clip.style에 요청하여 확인할 수 있습니다. 개인정보 동의 철회 및 삭제, 처리 정지를 요청하고자 하는 경우에는 고객센터 help@clip.style을 통해 요청할 수 있습니다. 또한, 고객은 언제든 회원탈퇴를 통해 개인정보의 수집 및 이용 동의를 철회할 수 있습니다. 이러한 요청 시, 서비스의 일부 또는 전부 이용이 제한될 수 있습니다. 또한 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우, 다른 사람의 생명·신체를 해할 우려가 있거나 다른사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우, 개인정보를 처리하지 아니하면 정보 주체와 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한 경우로서 정보주체가 그 계약의 해지 의사를 명확하게 밝히지 아니한경우에는 동의 철회, 삭제, 처리 정지가 어려울 수 있습니다. 요청하신 처리가 완료될 때까지 해당 정보를 이용하거나 타인에게 제공하지 않습니다. 또한, 합리적인 사유로 잘못된 개인정보를 제3자에게 이미 제공한 경우, 그 결과를 지체 없이 제3자에게 통지하여 동의 철회, 삭제, 처리 정지하도록 조치합니다. 4.2. 고객의 의무 고객은 자신의 개인정보를 보호할 의무가 있으며, 회사의 귀책사유가 없이 ID(이메일 주소), 비밀번호, 접근매체 등의양도·대여·분실이나 로그인 상태에서 이석 등 고객 본인의 부주의나 관계법령에 의한 보안조치로 차단할 수 없는 방법이나 기술을 사용한 해킹 등 회사가 상당한 주의에도 불구하고 통제할 수 없는 인터넷상의 문제 등으로 개인정보가 유출되어 발생한 문제에 대해 회사는 책임을 지지 않습니다. 고객은 자신의 개인정보를 최신의 상태로 유지해야 하며, 고객의 부정확한 정보 입력으로 발생하는 문제의 책임은 고객 자신에게 있습니다. 타인의 개인정보를 도용한 회원가입 또는 ID등을 도용하여 결제 처리 시 고객 자격 상실과 함께 관계법령에 의거하여 처벌될 수 있습니다. 고객은 아이디, 비밀번호 등에 대해 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다. 고객은 회사의 개인정보보호정책에 따라 보안을 위한 주기적인 활동에 협조할 의무가 있습니다. 5. 자동 수집되는 개인정보 및 거부에 관한 사항 회사는 이용자 맞춤서비스 등을 제공하기 위하여 쿠키(cookie)를 설치 및 운영합니다. 쿠키의 사용 목적과 거부에 관한 사항은 아래와 같습니다. 가. 쿠키란? 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터에 저장되어 운영됩니다. 나. 쿠키의 사용 목적 이용자들의 접속 관리, 이용자 별 사용 환경 제공, 이용자 활동 정보 파악, 이벤트 및 프로모션 통계 확인 등을 파악하여 최적화된 맞춤형 서비스를 제공하기 위해 사용합니다. 다. 쿠키의 설치·운영 및 거부 서비스를 이용함에 있어 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용 또는 거부 하거나, 쿠키가 저장될 때마다 확인을 거치도록 할 수 있습니다. 쿠키 설치 허용 여부를 지정하는 방법은 다음과 같습니다. Internet Explorer : 웹 브라우저 상단 도구 메뉴 > 인터넷 옵션 > 개인정보 > 개인정보처리 수준 설정Chrome : 웹 브라우저 우측 설정 메뉴 > 도구 > 인터넷 사용기록 삭제 6. 개인정보 보호책임자 및 담당자 안내 고객의 개인정보에 관한 업무를 총괄해서 책임지고, 개인정보와 관련된 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 담당부서를 지정하여 운영하고 있습니다. 회사가 제공하는 서비스를 이용하면서 발생하는 개인정보 보호 관련 문의, 불만, 피해구제 등에 관한 사항은 아래로 연락하여 문의할 수 있습니다. 개인정보 보호책임자 성명: 부창용 이메일: help@clip.style 개인정보 민원처리 담당부서 부서명: (주)쿼키 고객센터 이메일: help@clip.style 기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다. 대검찰청 사이버범죄 수사단 (www.spo.go.kr / 국번없이 1301) 개인정보 침해 신고 센터 (privacy.kisa.or.kr / 국번없이 118) 경찰청 사이버안전국 (http://cyberbureau.police.go.kr / 국번없이 182) 7. 링크사이트 회사는 홈페이지에 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다. 홈페이지에 링크되어 있는 다른 회사의 웹사이트로 옮겨갈 경우 해당 웹사이트의 개인정보처리방침이 적용됩니다. 8. 고지의 의무 이 개인정보 처리방침은 시행일로부터 적용됩니다. 고객의 개인정보 권리에 중요한 변경 사유가 발생하는 경우 최소 14일전에 공지사항을 통하여 고지합니다. 이 외의 다른 변경사항이 발생하는 경우에는 변경사항의 시행 최소 7일 전부터 공지사항을 통해 고지합니다. 현재 개인정보 처리방침 공고일자: 2020년   12월 1일 현재 개인정보 처리방침 시행일자: 2020년   12월 1일   
                    </Text>
                    
                    
                </div>
                <div
                        style={{
                            
                            borderTop:'1px solid rgb(221,221,221)',
                            paddingLeft:'15px',
                            paddingRight:'15px',
                            paddingBottom:'15px'
                        }}
                    >
                   <TouchableOpacity
                        style={{
                            marginTop:'15px',
                            backgroundColor:'rgb(255,123,88)',
                            borderRadius:"10px",
                            height:'40px',
                            textAlign:'center',
                            justifyContent:'center'
                        }}
                        onPress={()=>{
                            props.togglePrivacyPolicyPopUpShow()
                        }}
                    >
                        <Text
                            style={{
                                color:'white'
                            }}
                        >
                            확인
                        </Text>
                    </TouchableOpacity>
                    </div>
                </View>
                {/* <Text>{props.material_num}</Text> */}
            </div>
        </div>
    </div>
        );
    

}
export default PrivacyPolicyPopUp
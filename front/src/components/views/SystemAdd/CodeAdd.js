import React, {useState,useEffect} from 'react'
import { Modal, Select,Input,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { SmallCodeInfo } from '../../../_actions/holiday_action';
import axios from 'axios';

const { Option } = Select;

function CodeAdd(props){
  const dispatch = useDispatch(); //redux
  const [Visible, setVisible] = useState(false); //팝업
  const [SmallCode, setSmallCode] = useState('');
  const [SmallInfo, setSmallInfo] = useState('');
  const [SmallContent, setSmallContent] = useState('');

//팝업 활성
  const showModal = () => {
    setVisible(true);
  };
//state 값
  const handleChangeSmallCode = (e) => {
    setSmallCode(e.currentTarget.value);
  }
  const handleChangeSmallInfo = (e) => {
    setSmallInfo(e.currentTarget.value);
  }
  const handleChangeSmallContent= (e) => {
    setSmallContent(e.currentTarget.value);
  }
  const [SaveCode,setSaveCode] = useState(''); //대코드
   //대코드 종류 선택
   function onChange(value) {
    for(var i=0; i< data.length; i++) {
      if(data[i].LargeInfo === value)  {  
        setSaveCode(data[i].LargeCode);       
      }
    }
  }
   function onBlur() {
     console.log('blur');
   }
   
   function onFocus() {
     console.log('focus');
   }
   
   function onSearch(val) {
     console.log('search:', val);
   }
  //대코드 종류 설정
  const [data, setData] = useState([]);
  const [LargeCode, setLargeCode] = useState([]);//스몰코드 정보 리스트

  useEffect(() => {         
    axios.get('/api/mastercode').then(response => {
      var temp = {};
      for(var i=0; i< response.data.length; i++) {
        temp = {
          LargeCode: response.data[i].LargeCode,
          LargeInfo: response.data[i].LargeInfo,
        };
        setData(data => [...data, temp]);     // 이전값에 temp값 합쳐서 저장
        setLargeCode(DeCode => [...DeCode,response.data[i].LargeInfo]);//라지코드 정보 저장
      }
    });
}, []);

//팝업 취소
  const handleCancel = () => {
    setVisible(false);
  };
//팝업 저장(유저 생성)
  const handleOk = () => {
    setVisible(false);

    let body = {
      SaveCode:SaveCode, //대코드
      SmallCode:SmallCode,
      SmallInfo:SmallInfo,
      SmallContent:SmallContent,
    }

    dispatch(SmallCodeInfo(body))
            .then(response => { 
                if(response.payload.smallcodeSaveSuccess){ 
                  window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
                  alert('Success!',);
                  console.log(response.payload.smallcodeSaveSuccess);
                }
                else {
                  alert('Failed to sign up...');
                }
            }) 
          }

  return (
    <>
      <Button type="primary" onClick={showModal}>추가</Button>
      <Modal
        title="추가"
        visible={Visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      <div>대코드</div>
      <Select showSearch style={{ width: 472 }} placeholder="마스터코드 지정"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
           }
           >
         {LargeCode.map(LargeCode => (
          <Option key={LargeCode}>{LargeCode}</Option>
        ))}
         </Select>
      

      <div>소코드</div>
      <Input 
        placeholder=""
        value={SmallCode}
        onChange={handleChangeSmallCode}
      />

      <div>코드정보</div>
      <Input 
        placeholder=""
        value={SmallInfo}
        onChange={handleChangeSmallInfo}
      />

      <div>비고</div>
      <Input 
        placeholder="NULL가능"
        value={SmallContent}
        onChange={handleChangeSmallContent}
      />

      </Modal>
    </>
  );
}

export default CodeAdd
// import React, {useState,useEffect} from 'react'
// import { Modal, Select,Input } from 'antd';
// import { useDispatch } from 'react-redux';
// import { SmallCodeUpdateConfirm } from '../../_actions/holiday_action';
// import axios from 'axios';

// const { Option } = Select;

// function SmallCodeUpdate(props) {
//   const dispatch = useDispatch(); //redux
//   const [SmallCode, setSmallCode] = useState(props.UpdateSmallCode.smallCode); //스몰 코드 변수
//   const [SmallInfo, setSmallInfo] = useState(props.UpdateSmallCode.smallCodeInfo); //스몰 코드 정보 변수
//   const [SmallContent, setSmallContent] = useState(props.UpdateSmallCode.smallCodeContent); //스몰 코드 비고 변수

// //스몰 코드 변수 설정 기능
//   const handleChangeSmallCode = (e) => {
//     setSmallCode(e.currentTarget.value);
//   }
//   const handleChangeSmallInfo = (e) => {
//     setSmallInfo(e.currentTarget.value);
//   }
//   const handleChangeSmallContent= (e) => {
//     setSmallContent(e.currentTarget.value);
//   }

//   const [SaveCode,setSaveCode] = useState(props.UpdateSmallCode.masterCode); //선택한 대코드 저장

//   function onChange(value) {
//     console.log(value);
//     setSaveCode(value); //대코드
//   }

//   const [LargeCode, setLargeCode] = useState(['']); //대코드 종류 설정

//   useEffect(() => {         
//     axios.get('/api/mastercode').then(response => {
//       setLargeCode(response.data);
//     });
//     }, []);

//   const handleOk = () => {
//     props.handleUpdateOk();

//     let body = {
//       LargeCode:SaveCode,
//       SmallCode:SmallCode,
//       SmallInfo:SmallInfo,
//       SmallContent:SmallContent,
//     }
//     //console.log(body);
//     dispatch(SmallCodeUpdateConfirm(body))
//             .then(response => { 
//                 if(response.payload.smallcodeSuccess){ 
//                   window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
//                   alert('Success!',);
//                   console.log(response.payload.smallcodeSaveSuccess);
//                 }
//                 else {
//                   alert('Failed to sign up...');
//                 }
//             }) 
//           }
//     //console.log(props.UpdateSmallCode);
//   return (
//     <>
//       <Modal
//       title="추가"
//       visible={props.UpdateVisible}
//       onOk={handleOk}
//       onCancel={props.handleUpdateCancel}
//       >
//         <div>대코드</div>
//         <Select 
//           showSearch 
//           style={{ width: 472 }} 
//           placeholder="마스터코드 지정"
//           optionFilterProp="children"
//           onChange={onChange}
//           defaultValue={props.UpdateSmallCode.masterCode}
//           filterOption={(input, option) =>
//           option.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//         >
//           {LargeCode.map(code => (
//             <Option key={code.LargeCode}>{code.LargeInfo}</Option>
//           ))}
//         </Select>
//         <div>소코드</div>
//         <Input 
//           placeholder=""
//           value={SmallCode}
//           onChange={handleChangeSmallCode}
//         />
//         <div>코드정보</div>
//         <Input 
//           placeholder=""
//           value={SmallInfo}
//           onChange={handleChangeSmallInfo}
//         />
//         <div>비고</div>
//         <Input 
//           placeholder="NULL가능"
//           value={SmallContent}
//           onChange={handleChangeSmallContent}
//         />
//       </Modal>
//     </>
//   )
// }

// export default SmallCodeUpdate

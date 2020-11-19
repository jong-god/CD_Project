import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,message,Badge,
  Breadcrumb, Calendar, Modal, Alert,Cascader,Typography} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LiveClock from '../MainPage/LiveClock';
import { useDispatch } from 'react-redux';
import { holidayInfo } from '../../../_actions/holiday_action';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const {Text} = Typography;
const { Header, Content, Sider, Footer } = Layout;
const { Option} = Select;
const { TextArea } = Input;
function MasterHoliday(props) {
  const dispatch = useDispatch(); //redux
  
  //캘린더에 표시
  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 16:
        listData = [
          { type: 'error', content: '회사창립일' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  //캘린더
  const [Date, setDate] = useState('');
  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  const setOnSelect = (value) => {
    //console.log(value.format('L'));
    setDate(...Date, value.format('YYYY-MM-DD'));
    console.log(Date);
  }

  //휴일종류 선택
  function onChange(value) {
    console.log(value);
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

 //휴일 종류 설정
  const [data, setData] = useState([]);
  const [Opt, setOpt] = useState([]);
  
  useEffect(() => {
    axios.get('/api/smallcode').then(response => {
      var temp = {};
      for(var i=0; i< response.data.length; i++) {
        temp = {
          SmallCode: response.data[i].SmallCode,
          SmallInfo: response.data[i].SmallInfo
        };
        setData(data => [...data, temp]);
        setOpt(Opt => [...Opt,response.data[i].SmallInfo]);
      }
    });
}, []);
  //팝업
  const [Visible, setVisible] = useState(false);
  const showModal = (value) => {
    setVisible(true);
  };
 //취소
  const handleCancel = () => {
    setVisible(false);
  };
  //저장
  const handleOk = () => {
    setVisible(false);
    let body = {
      Date:Date, //날짜
      data:data  //휴일종류
      
    }
    dispatch(holidayInfo(body))
            .then(response => { 
                if(response.payload.holidaySaveSuccess){ 
                  window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
                  alert('Success!',);
                  console.log(response.payload.holidaySaveSuccess);
                }
                else {
                  alert('Failed to sign up...');
                }
            }) 
  }
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
        <div>
        <LiveClock></LiveClock>
        </div>
        {/* grid */}
        <Row>
            <Col span={12}><Button block>출근</Button></Col>
            <Col span={12}><Button block>퇴근</Button></Col>
        </Row>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <span>휴일설정</span>
              <Link to="/Masterholiday" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>직원 관리</span>
              <Link to="/manage" />
            </Menu.Item>
            <Menu.Item key="3">
              <span>공통 코드</span>
              <Link to="/code" />
            </Menu.Item>           
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
          <Link  to="/">
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
            </Link>
          </Header>
          <Content>
          <Breadcrumb style = {{background: '#fff', minHeight: 100}}>
              <Breadcrumb.Item>
                <PageHeader
                  className="site-page-header"
                  onBack={() => null}
                  title="대표 휴일 설정"
                  subTitle="휴일설정 페이지">   
                </PageHeader>
              </Breadcrumb.Item>
            </Breadcrumb>     
            <Calendar onPanelChange={onPanelChange} onSelect={setOnSelect} onChange={showModal} dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
           
        <Modal
          title="휴일설정"
          visible={Visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style = {{fontSize: 15,background: '#fff'}}>날짜
          <Alert style={{ background: '#fff'}} message={Date}/>
          </div>
          <div style = {{fontSize: 15,background: '#fff'}}>휴일종류</div>
         
         
          <Select showSearch style={{ width: 472 }} placeholder="휴일 지정"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
           }
           >
         {Opt.map(SmallInfo => (
          <Option key={SmallInfo}>{SmallInfo}</Option>
        ))}
         </Select>
         <div style = {{fontSize: 15,background: '#fff'}}>비고</div>
          <TextArea  rows={8}  />
        </Modal>
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default MasterHoliday

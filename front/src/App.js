import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; //react-router-dom을 가져옴
//페이지 import
import CheckMyPage from './components/views/MyPage/CheckMyPage'
import MyPage from './components/views/MyPage/MyPage'
import MiddlePage from './components/views/MiddlePage/MiddlePage'
import MainPage from './components/views/MainPage/MainPage'
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
// import RegisterPage from './components/views/RegisterPage/RegisterPage';
import OutWork from './components/views/MainPage/OutWork';
import Manage from './components/views/System/Manage';
import Code from './components/views/System/Code';
import Holiday from './components/views/System/Holiday';
import Employee from './components/views/Employee/Employee';
import MasterManage from './components/views/Master/MasterManage';
import MasterHoliday from './components/views/Master/MasterHoliday';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/ckmypage" component={CheckMyPage} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/middle" component={MiddlePage} />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/" component={LoginPage} />
          {/* <Route exact path="/register" component={RegisterPage} /> */}
          <Route exact path="/outWork" component={OutWork} />
          <Route exact path="/manage" component={Manage} />
          <Route exact path="/code" component={Code} />
          <Route exact path="/holiday" component={Holiday} />
          <Route exact path="/employee" component={Employee} />
          <Route exact path="/mastermanage" component={MasterManage} />
          <Route exact path="/masterholiday" component={MasterHoliday} />
        </Switch>
      </div>
    </Router>//router(해당 페이지의 최적의 경로로 넘어갈 수 있게 해주는 기능) 설정
  );
}

export default App;
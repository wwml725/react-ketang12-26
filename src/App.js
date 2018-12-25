import React,{Component} from 'react'
import {BrowserRouter as Router,Route,NavLink,Switch} from "react-router-dom"
import Home from "./containers/Home/index";
import Profile from "./containers/Profile/index";
import Course from "./containers/Course/index";
import "./index.less"

export default class App extends Component{
    render(){
        return (
            <div>
                <Router>

                    <div>
                        <div>
                            <NavLink exact  to="/" activeClassName="selected">
                                <i className="iconfont icon-xingqiu" ></i>
                                <span>首页</span>
                            </NavLink>
                            <NavLink to="/course" activeClassName="selected">
                                <i className="iconfont icon-react"></i>
                                <span>我的课程</span>
                            </NavLink>
                            <NavLink to="/profile"  activeClassName="selected">
                                <i className="iconfont icon-xiaolian"></i>
                                <span>个人中心</span>
                            </NavLink>
                        </div>
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/course" component={Course}></Route>
                        <Route path="/profile" component={Profile}></Route>
                    </div>
                </Router>
            </div>
        )
    }
}
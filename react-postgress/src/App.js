import React from "react";
import User from "./user/User";
import { Menu } from "antd";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import LoginInfo from "./loginInfo/LoginInfo";
import Address from "./address/Address";
import ClientAddress from "./clientAddress/ClientAddress";
import ClientAddressView from "./clienAddressView/ClientAddressView";
import Client from "./client/Client";
import ClientUser from "./clientUserView/ClientUser";
import Manager from "./manager/Manager";
import ProductCategory from "./productCategory/productCategory";
import Product from "./product/Product";
import Comment from "./comment/Comment";

function App() {
  const location = useLocation();
  return (
    <div>
      <Menu
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          bottom: "0",
          width: "256px",
        }}
        selectedKeys={[location.pathname]}
        mode="inline"
      >
        <Menu.Item key="/user">
          <Link to="/user">User</Link>
        </Menu.Item>
        <Menu.Item key="/logininfo">
          <Link to="/logininfo">Login Info</Link>
        </Menu.Item>
        <Menu.Item key="/address">
          <Link to="/address">Address</Link>
        </Menu.Item>
        <Menu.Item key="/clientaddress">
          <Link to="/clientaddress">Client Address</Link>
        </Menu.Item>
        <Menu.Item key="/client">
          <Link to="/client">Client</Link>
        </Menu.Item>
        <Menu.Item key="/manager">
          <Link to="/manager">Manager</Link>
        </Menu.Item>
        <Menu.Item key="/productcategory">
          <Link to="/productcategory">Product Category</Link>
        </Menu.Item>
        <Menu.Item key="/product">
          <Link to="/product">Product</Link>
        </Menu.Item>
        <Menu.Item key="/comment">
          <Link to="/comment">Comment</Link>
        </Menu.Item>
        <Menu.Item key="/clientuser">
          <Link to="/clientuser">Client User View</Link>
        </Menu.Item>
        <Menu.Item key="/clientaddressview">
          <Link to="/clientaddressview">Client Address View</Link>
        </Menu.Item>
      </Menu>
      <div style={{ marginLeft: "300px" }}>
        <Switch>
          <Route exact path="/user">
            <User />
          </Route>
          <Route exact path="/logininfo">
            <LoginInfo />
          </Route>
          <Route exact path="/address">
            <Address />
          </Route>
          <Route exact path="/clientaddress">
            <ClientAddress />
          </Route>
          <Route exact path="/clientaddressview">
            <ClientAddressView />
          </Route>
          <Route exact path="/client">
            <Client />
          </Route>
          <Route exact path="/clientuser">
            <ClientUser />
          </Route>
          <Route exact path="/manager">
            <Manager />
          </Route>
          <Route exact path="/productcategory">
            <ProductCategory />
          </Route>
          <Route exact path="/product">
            <Product />
          </Route>
          <Route exact path="/comment">
            <Comment />
          </Route>
          <Route path="/">
            <Redirect to="/user" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

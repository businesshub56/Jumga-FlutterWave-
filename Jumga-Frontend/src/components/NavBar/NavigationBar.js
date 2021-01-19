import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
// import Login from "../../Pages/Login-Modal/Login";
// import SearchBtn from "../CustomButton/CustomButton";
import SignUpButton from "../CustomButton/CustomButton";
import { connect } from "react-redux";
import { logOut } from "../../actions/AuthAction";
import { filterProduct } from "../../actions/productAction";
import ChangeLocation from "../SelectCountry/ChangeLocation";
import "./Navbar.css";

const NavBar = ({ cart, logOut, filterProduct }) => {
  // const [showNav, setShowNav] = useState(false);
  const history = useHistory();
  const [isCustomer, setIsCustomer] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.token) {
      localStorage.setItem("isloggedIn", "true");
    }
    if (localStorage.userType === "CUSTOMER") {
      setIsCustomer(true);
    }
  }, [isCustomer]);

  // const isLogggedIn =(
  //   <Fragment>
  //     <li className="nav-item">
  //               <Link className="nav-link" to="/">
  //                 {isActive ? "Log out" : <Login />}
  //               </Link>
  //             </li>
  //   </Fragment>
  // )
  // const toggleNav = () => {
  //   setShowNav(!showNav);
  // };
  const onlogOut = async () => {
    // console.log("ljhj");
    localStorage.removeItem("userType");
    localStorage.removeItem("isloggedIn");
    logOut();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      alert("Please enter keyword to search");
    } else {
      filterProduct(search);
      setSearch("");
    }
  };

  const onChanges = (e) => {
    setSearch(e.target.value);
    // console.log(selectedshop);
  };

  return (
    <>
      <div className="text-right">
        <ChangeLocation />
      </div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="nav-container"
        bg="primary"
        sticky="top"
        variant="dark"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <div className="logo">
          <Link to="/">
            {" "}
            <span style={{ color: "#ffb31a", fontSize: "40px" }}>J</span>umga
          </Link>
        </div>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Item>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  onChange={onChanges}
                  name="search"
                  value={search}
                  className="nav-search-input"
                  placeholder="search product"
                />
                {/* <SearchBtn>Search</SearchBtn> */}
                <Button type="submit" className="p-2">
                  Search
                </Button>
              </form>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Item>
              <Link className="nav-link" to="/">
                About us
              </Link>
            </Nav.Item>
            <Nav.Item>
              <SignUpButton
                onClick={() => {
                  history.push(`/merchant-corner`);
                }}
                type="button"
                style={{ borderRadius: "5px" }}
              >
                Sell on{" "}
                <span style={{ color: "#ffb31a", fontSize: "20px" }}>J</span>
                umga
              </SignUpButton>
            </Nav.Item>
            <Nav.Item>
              {localStorage.token ? (
                <Link className="nav-link" to="/">
                  <span onClick={onlogOut}>Log out</span>
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  <span>Login</span>
                </Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {localStorage.token && localStorage.userType === "MERCHANT" ? null : (
            <span className="nav-item mr-auto" style={{ position: "relative" }}>
              <Link className="nav-link" to="/cart">
                <i className="fas fa-shopping-cart fa-2x"></i>

                {cart && (
                  <p
                    className="badge badge-danger"
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "35PX",
                    }}
                  >
                    {cart.length}
                  </p>
                )}
              </Link>
            </span>
          )}
          {/* </Nav.Item> */}
        </Nav>
      </Navbar>
    </>
  );
};
const mapStateToProps = (state) => ({
  isLogin: state.Auth.isAuthenticated,
  user: state.Auth.user,
  cart: state.product.cart,
});

export default connect(mapStateToProps, { logOut, filterProduct })(NavBar);

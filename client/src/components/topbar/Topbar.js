import React, { useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

function Topbar() {
  let [visible, setVisible] = useState(false);
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  let [isOpen, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  console.log('this is user', user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
      <div className="container _custom_container">
        <ul className="_nav_list">
          {user?.email ? (
            <li className="_nav_form_list" onClick={logOut}>
              <Link className="_nav_form_list_link" to="/login">
                LogOut
              </Link>
            </li>
          ) : (
            <li className="_nav_form_list">
              <Link className="_nav_form_list_link" to="/login">
                Log in
              </Link>
            </li>
          )}
        </ul>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {' '}
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
            <li className="nav-item _header_nav_item ">
              <NavLink
                className="nav-link _header_nav_link"
                aria-current="page"
                to="/"
              >
                <BsChatDots size={25} />
                <span className="_counting">2</span>
              </NavLink>
            </li>
          </ul>

          <OutsideClickHandler
            onOutsideClick={() => {
              setIsMenuOpen((isMenuOpen = false));
            }}
          >
            <div className="_header_nav_profile">
              <div className="_header_nav_profile_image">
                <img
                  src={user.image}
                  alt={user.name}
                  className="_nav_profile_img"
                />
              </div>
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="_header_nav_dropdown"
              >
                <p className="_header_nav_para">{user?.email}</p>
                <button
                  id="_profile_drop_show_btn"
                  className="_header_nav_dropdown_btn _dropdown_toggle"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={10}
                    height={6}
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      fill="#112032"
                      d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
                    />
                  </svg>
                </button>
              </div>
              {/* dropdown */}
              {isMenuOpen && (
                <div id="_prfoile_drop" className="_nav_profile_dropdown">
                  <div className="_nav_profile_dropdown_info">
                    <div className="_nav_left">
                      <div className="_nav_profile_dropdown_image">
                        <a href="#0">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="_nav_drop_img"
                          />
                        </a>
                      </div>
                      <div className="_nav_profile_dropdown_info_txt">
                        <h4 className="_nav_dropdown_title">{user.name}</h4>
                        <a href="#0" className="_nav_drop_profile">
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <ul className="_nav_dropdown_list">
                    <li onClick={logOut} className="_nav_dropdown_list_item">
                      <a href="#0" className="_nav_dropdown_link">
                        <div className="_nav_drop_info">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={19}
                              height={19}
                              fill="none"
                              viewBox="0 0 19 19"
                            >
                              <path
                                stroke="#377DFF"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667"
                              />
                            </svg>
                          </span>
                          Log Out
                        </div>
                        <button type="submit" className="_nav_drop_btn_link">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={6}
                            height={10}
                            fill="none"
                            viewBox="0 0 6 10"
                          >
                            <path
                              fill="#112032"
                              d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                              opacity=".5"
                            />
                          </svg>
                        </button>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </nav>
  );
}
export default Topbar;

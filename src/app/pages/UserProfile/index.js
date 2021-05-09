import * as React from 'react';

import { Alert, Button, Divider, Tabs } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { FormWrapper } from 'app/components/Form';
import { UploadImageControl } from 'app/components/Form/FormControls/UploadImageControl';
import { SelectControl } from 'app/components/Form/FormControls/SelectControl';
import { InputTextControl } from 'app/components/Form/FormControls/InputTextControl';
import { InputPasswordControl } from 'app/components/Form/FormControls/InputPasswordControl';
import { SafetyOutlined, UserOutlined } from '@ant-design/icons';
import {
  updateLocalAvatar,
  updateProfileInformation,
  updatePassword,
} from 'store/Action/ProfileAction';
import './index.less';
import axios from 'axios';
import { connect } from 'react-redux';

const BASE_URL = `${process.env.REACT_APP_UNPAID_MODULE_BASE_URL}/profile`;
const BASE_URL_UPLOAD_AVATAR = `${BASE_URL}/uploadAvatar`;

const { TabPane } = Tabs;

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const UserProfile = props => {
  const menuPositionOptions = {
    LEFT: 'left',
    TOP: 'top',
  };

  var getProperMenuPosition = windowSize => {
    if (windowSize >= 950) {
      return menuPositionOptions.LEFT;
    } else {
      return menuPositionOptions.TOP;
    }
  };

  const [windowWidth, setWindowWidth] = React.useState(getWidth());
  const [menuPosition, setMenuPosition] = React.useState(
    getProperMenuPosition(getWidth()),
  );
  const [profile, setProfile] = React.useState(
    JSON.parse(localStorage.getItem('currentUser')),
  );

  React.useEffect(() => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    previewAvatar(user['avatar']);
  }, []);

  React.useEffect(() => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    setProfile(user);
  }, [props.updated_profile]);

  React.useEffect(() => {
    const resizeListener = () => {
      const currentWith = getWidth();
      setWindowWidth(currentWith);
      getProperMenuPosition(currentWith);
      setMenuPosition(getProperMenuPosition(getWidth()));
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [windowWidth]);

  const onSubmit = formData => {
    if (formData && Object.keys(formData).includes('avatar')) {
      delete formData.avatar;
    }
    props.updateProfileInformation(formData);
  };

  const updatePassword = formData => {
    if (formData && Object.keys(formData).includes('avatar')) {
      delete formData.avatar;
    }
    props.updatePassword(formData);
  };

  const updateUserAvatar = file => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user['avatar'] = file.response;
    localStorage.setItem('currentUser', JSON.stringify(user));
    previewAvatar(file.response);
    setProfile(user);
  };

  const previewAvatar = filename => {
    if (filename && filename != '') {
      axios({
        url: `${BASE_URL}/${filename}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob', // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const user = JSON.parse(localStorage.getItem('currentUser'));
        user['avatarPreview'] = url;
        localStorage.setItem('currentUser', JSON.stringify(user));
        setProfile(user);
        props.updateLocalAvatar();
        // Emit a global event here
      });
    }
  };

  return (
    <div style={{ background: '#FFF', padding: '2rem', marginTop: '1rem' }}>
      <Tabs tabPosition={menuPosition}>
        <TabPane tab="Basic Settings" key="user.profile.basic.setting">
          <div className="user-profile-title">
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <UserOutlined />
              &nbsp;&nbsp;
              <span>Personal Information</span>
            </h2>
          </div>
          <Divider dashed></Divider>
          {props.update_profile_alert.active ? (
            <>
              <Alert
                closable
                message={props.update_profile_alert.message}
                type={props.update_profile_alert.type}
                style={{ marginBottom: '1rem' }}
                // onClose={() => props.closeImporterFormAlert()}
                showIcon
              />
            </>
          ) : null}
          <br />
          <FormWrapper
            formWrapperStyle={{ padding: 0 }}
            onSubmit={onSubmit}
            maskable={() => ({ message: '', isMask: false })}
            formEventButtons={submitButton => <></>}
            renderChildControls={e => {
              return (
                <>
                  <div className="user-profile-container">
                    <div className="user-profile-left">
                      <div className="user-profile-avatar-container">
                        <Avatar
                          src={profile.avatarPreview}
                          className="user-profile-avatar"
                        />
                        <UploadImageControl
                          uploadUrl={BASE_URL_UPLOAD_AVATAR}
                          headers={{
                            Authorization: `Bearer ${localStorage.getItem(
                              'token',
                            )}`,
                          }}
                          onChange={updateUserAvatar}
                          name="avatar"
                          buttonText="Change Profile"
                        />
                      </div>
                    </div>
                    <div className="user-profile-right">
                      <InputTextControl
                        defaultValue={profile.name}
                        name="name"
                        label="Name"
                      />
                      <InputTextControl
                        defaultValue={profile.email}
                        name="email"
                        label="Email"
                        onChange={async e => {
                          await setProfile(pre => ({ ...pre, email: e }));
                        }}
                      />
                      <SelectControl
                        name="language"
                        label="Language"
                        defaultValue={profile.language}
                        onChange={async e => {
                          await setProfile(pre => ({ ...pre, language: e }));
                        }}
                        options={[
                          {
                            id: 'en',
                            name: 'English',
                          },
                          {
                            id: 'cat',
                            name: 'Catalan',
                          },
                          {
                            id: 'es',
                            name: 'Spanish',
                          },
                        ]}
                      />
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <Button type="primary" htmlType="submit">
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          />
        </TabPane>
        <TabPane tab="Security Settings" key="user.profile.security.setting">
          <div className="user-profile-title">
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <SafetyOutlined />
              &nbsp;&nbsp; Password Manage
            </h2>
          </div>
          <Divider dashed></Divider>
          // TODO when user change pass recomend this
          {/* {true ? (
            <>
              <Alert
                closable
                message="A new session needed. Please logout and login again."
                type="warning"
                style={{ marginBottom: '1rem' }}
                action={
                  <Button st type="link">
                    Logout
                  </Button>
                }
                // onClose={() => props.closeImporterFormAlert()}
                showIcon
              />
            </>
          ) : null} */}
          <br />
          <FormWrapper
            formWrapperStyle={{ padding: 0 }}
            onSubmit={updatePassword}
            maskable={() => ({ message: '', isMask: false })}
            formEventButtonsInside={submitButton => <></>}
            renderChildControls={e => {
              return (
                <>
                  <div className="user-profile-container">
                    <div className="user-profile-right">
                      <InputPasswordControl
                        name="current_password"
                        validationStatus={() => {
                          if (props.update_password_error.active) {
                            return {
                              validateStatus: 'error',
                              help: props.update_password_error.reason,
                            };
                          }
                        }}
                        onChange={async e => {
                          await setProfile(pre => ({
                            ...pre,
                            current_password: e,
                          }));
                        }}
                        label="Current Password"
                      />
                      <InputPasswordControl
                        onChange={async e => {
                          await setProfile(pre => ({ ...pre, password: e }));
                        }}
                        validationStatus={() => {
                          if (props.update_password_success.active) {
                            return {
                              validateStatus: 'success',
                              help: props.update_password_success.message,
                            };
                          }
                        }}
                        name="password"
                        label="New Password"
                      />
                      <SelectControl
                        name="role"
                        label="Role"
                        defaultValue={profile.role}
                        onChange={async e => {
                          await setProfile(pre => ({ ...pre, role: e }));
                        }}
                        options={[
                          {
                            id: 'SUPER_ADMIN',
                            name: 'Super Admin',
                          },
                          {
                            id: 'ADMIN',
                            name: 'Admin',
                          },
                          {
                            id: 'USER',
                            name: 'User',
                          },
                        ]}
                      />
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <Button type="primary" htmlType="submit">
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ ProfileReducer: profile }) => {
  const {
    local_avatar_updation,
    updated_profile,
    update_profile_error,
    update_password_error,
    update_password_success,
    update_profile_alert,
  } = profile;

  return {
    local_avatar_updation,
    updated_profile,
    update_profile_error,
    update_password_error,
    update_password_success,
    update_profile_alert,
  };
};

export default connect(mapStateToProps, {
  updateLocalAvatar,
  updateProfileInformation,
  updatePassword,
})(UserProfile);

import { useCallback, useMemo, useState } from 'react';

import './style.css';

const apiPath = ''; // http://v296823.hosted-by-vdsina.ru:5000/
const authPath = 'auth/login';
const logoutPath = 'auth/logout';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function getUserId() {
  return getCookie('user_id');
}

const startUserId = getUserId();

function Panel() {
  const [isAuthorized, setIsAuthorized] = useState(!!startUserId);
  const userId = useMemo(getUserId, [isAuthorized]);
  const [isError, setIsError] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = function(event) {
    setLogin(event.target.value);
  };
  const handlePassword = function(event) {
    setPassword(event.target.value);
  };

  const formData = useMemo(() => {
    let fData = new FormData();
    fData.append('login', login);
    fData.append('psw', password);
    return fData;
  }, [login, password]);

  const postAuth = useCallback(() => {
    fetch( apiPath + authPath, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then((data) => {
        console.log(' auth success> ', data);
        setIsAuthorized(true);
        setIsError(false);
      })
      .catch((err) => {
        console.log(' auth error> ', err);
        setIsError(true);
      });
  }, [formData]);

  const handleSendForm = (e) => {
    e.preventDefault();
    postAuth();
  };

  const logout = useCallback(() => {
    fetch( apiPath + logoutPath, {
      method: 'POST',
    })
      .then((data) => {
        console.log(' logout success> ', data);
        setIsAuthorized(false);
        setIsError(false);
      })
      .catch((err) => {
        console.log(' logout error> ', err);
        setIsError(true);
      });
  }, []);

  const [regLogin, setRegLogin] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasEmail, setRegEmail] = useState('');

  const handleRegLogin = function(event) {
    setRegLogin(event.target.value);
  };
  const handleRegPassword = function(event) {
    setRegPassword(event.target.value);
  };
  const handleRegEmail = function(event) {
    setRegEmail(event.target.value);
  };

  const postRegistration = () => {

  };

  const handleRegForm = (e) => {
    e.preventDefault();
    // postAuth();
  };

  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className={'panel' + (isError ? ' panel_error' : '')}>
      <div class="panel__login-block">
        {
          !!isAuthorized && (
            <div className="panel__links">
              UserId: {userId}
              {' :: '}
              <b onClick={logout} className="panel__link">Logout</b>
            </div>
          )
        }
        {
          !isAuthorized && (
            <div className="panel__links">
              <form onSubmit={handleSendForm} className="panel__form">
                <input type="text" placeholder="login" onChange={handleLogin} />
                {' '}
                <input type="password" placeholder="password" onChange={handlePassword} />
                {' '}
                <input type="submit" value="login" onClick={postAuth} />
              </form>
              {' '}
              <b onClick={() => { setShowRegistration(true)}} className="panel__link">Register</b>
            </div>
          )
        }
      </div>
      <div class="panel__control-block">
        {
          !!isAuthorized && (
              <div className="panel__links">
              <b onClick={() => { console.log('click')}} className="panel__link">Select sector</b>
              </div>
            )
          }
      </div>
        {
          !!showRegistration && (
            <div className="popup">
              <form onSubmit={handleRegForm} className="popup__form">
                <label>usename:</label>
                <input type="text" placeholder="login" onChange={handleRegLogin} />
                <br/>
                <label>password:</label>
                <input type="password" placeholder="password" onChange={handleRegPassword} />
                <br/>
                <label>email:</label>
                <input type="text" placeholder="email" onChange={handleRegEmail} />
                <br/>
                <input type="submit" value="Request registration" onClick={postRegistration} />
              </form>
              
              <b onClick={() => { setShowRegistration(false) }} className="panel__link">close</b>
            </div>
          )
        }
    </div>
  );
}

export default Panel;

import { useCallback, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import './style.css';

const apiPath = ''; // http://v296823.hosted-by-vdsina.ru:5000/
const regPath = 'user';
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
        console.log(' auth success?> ', data);
        if (data?.success) {
          setIsAuthorized(true);
          setIsError(false);
        } else {
          // to do warning
          console.log(' auth warning> ', data.error);
          setIsError(true);
        }
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
        if (data?.success) {
          setIsAuthorized(false);
          setIsError(false);
        } else {
          console.log(' logout warning> ', data.error);
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(' logout error> ', err);
        setIsError(true);
      });
  }, []);

  const [regName, setRegName] = useState('');
  const [regLogin, setRegLogin] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const handleRegLogin = function(event) {
    setRegLogin(event.target.value);
  };
  const handleRegPassword = function(event) {
    setRegPassword(event.target.value);
  };
  const handleRegEmail = function(event) {
    setRegEmail(event.target.value);
  };
  const handleRegName = function(event) {
    setRegName(event.target.value);
  };

  const regFormData = useMemo(() => {
    let fData = new FormData();
    fData.append('name', regName);
    fData.append('email', regEmail);
    fData.append('login', regLogin);
    fData.append('psw', regPassword);
    return fData;
  }, [regEmail, regLogin, regName, regPassword]);

  const postRegistration = useCallback(() => {
    fetch( apiPath + regPath, {
      method: 'POST',
      body: regFormData,
    })
      .then(response => response.json())
      .then((data) => {
        console.log(' reg success> ', data);
        if (data?.success) {
          alert('Registration success, you can login now');
          setShowRegistration(false);
          setIsError(false);
        } else {
          console.log(' reg warning> ', data.error);
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(' reg error> ', err);
        setIsError(true);
      });
  }, [regFormData]);

  const handleRegForm = (e) => {
    e.preventDefault();
    postRegistration();
  };

  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className={'panel' + (isError ? ' panel_error' : '')}>
      <div className="panel__login-block">
        {
          !!isAuthorized && (
            <div className="panel__links">
              UserId: {userId}
              {' :: '}
              <Button
                onClick={logout}
                color="secondary"
                variant="outlined"
              >
                Logout
              </Button>
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
                <Button
                  onClick={postAuth}
                  color="primary"
                  variant="outlined"
                >
                  Login
                </Button>
              </form>
              {' '}

              <Button
                onClick={() => { setShowRegistration(true)}}
                color="secondary"
                variant="outlined"
              >
                Register
              </Button>
            </div>
          )
        }
      </div>
      <div className="panel__control-block">
        {
          !!isAuthorized && (
              <div className="panel__links">
                <Button
                  onClick={() => { console.log('click select sector')}}
                  color="secondary"
                  variant="outlined"
                >
                  Select sector
                </Button>

              </div>
            )
          }
      </div>
        {
          !!showRegistration && (
            <Dialog
              open={showRegistration}
              onClose={() => { setShowRegistration(false) }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <form onSubmit={handleRegForm} className="popup__form">
                  <label>Name:</label>
                  <input type="text" placeholder="name" onChange={handleRegName} />
                  <br/>
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

                <Button
                  onClick={() => { setShowRegistration(false) }}
                  color="secondary"
                  variant="outlined"
                >
                  Close
                </Button>
              </DialogContent>

            </Dialog>
          )
        }
    </div>
  );
}

export default Panel;

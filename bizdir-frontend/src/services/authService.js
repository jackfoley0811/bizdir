import jwtDecode from 'jwt-decode';
import axios from 'src/utils/axios';

class AuthService {
  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  handleAuthentication() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return;
    }

    // if (this.isValidToken(accessToken)) {
      // this.setSession(accessToken);
    // } else {
      // this.setSession(null);
    // }
  }
  registerUser = (user) => new Promise((resolve, reject) => {
    console.log(user)
    axios.post('/api/auth/register', user)
      .then((response) => {
        if (response.data.user) {
          this.setSession(response.data);
          resolve(response.data.user);
        } else {
          reject(response.data.non_field_errors);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })
  loginWithEmailAndPassword = (username, password) => new Promise((resolve, reject) => {
    axios.post('/api/auth/login', { username, password })
      .then((response) => {
        if (response.data.user) {
          this.setSession(response.data);
          resolve(response.data.user);
        } else {
          reject(response.data.non_field_errors);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })

  loginInWithToken = () => new Promise((resolve, reject) => {
    axios.get('/api/account/me')
      .then((response) => {
        if (response.data.user) {
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })

  logout = () => {
    this.setSession(null);
  }

  setSession = (user) => {
    if (user) {
      console.log('setsession', user)
      localStorage.setItem('accessToken', user.token.key);
      localStorage.setItem('user', JSON.stringify(user.user));
      axios.defaults.headers.common.Authorization = `Token ${user.token.key}`;
    } else {
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.Authorization;
    }
  }

  getAccessToken = () => localStorage.getItem('accessToken');

  isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  }

  isAuthenticated = () => !!this.getAccessToken()
}

const authService = new AuthService();

export default authService;

export class UserCredentials {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  getData() {
    return {
      username: this.email,
      password: this.password
    };
  }
}

export class User {
  constructor(email, password, firstName, lastName) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getData() {
    return {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    };
  }

  getCreds() {
    return new UserCredentials(this.email, this.password);
  }
}

export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export default class AuthService {
  static async register(user) {
    let response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user.getData())
    });
    return response.ok;
  }

  static async login(creds) {
    let response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds.getData())
    });

    if (response.ok) {
      let token = response.headers.get("Authorization").slice(7);
      AuthService.getStorageBackend().setItem("token", token);
      AuthService.getStorageBackend().setItem("logged-in", true);
      return token;
    } else {
      throw new AuthenticationError("Authentication failed");
    }
  }

  static logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("logged-in");
    sessionStorage.removeItem("logged-in");
  }

  static isUserLoggedIn() {
    return AuthService.getStorageBackend().getItem("token") != null;
  }

  static async verifyUser() {
    const token = AuthService.getStorageBackend().getItem("token");
    if (token != null) {
      let response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: AuthService.getAuthHeader()
      });
      return response.json();
    }
    return false;
  }

  static getToken() {
    if (AuthService.getStorageBackend().getItem("token") == null)
      throw new AuthenticationError("User is not logged in");
    return AuthService.getStorageBackend().getItem("token");
  }

  static getAuthHeader() {
    return { Authorization: "Bearer " + AuthService.getToken() };
  }

  static permanentStorage(enable) {
    localStorage.setItem("remember-me", (!!enable).toString());
  }

  static getStorageBackend() {
    return localStorage.getItem("remember-me") === "true" ? localStorage : sessionStorage;
  }
}

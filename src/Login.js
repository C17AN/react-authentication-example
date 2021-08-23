import { useEffect, useRef, useState } from "react";

const style = {
  container: {
    width: "400px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "1.1rem",
    marginTop: "16px",
    marginBottom: "2px",
  },
  button: {
    marginTop: "12px",
    height: "24px",
  },
  loginInfo: {
    marginTop: "16px",
  },
};

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionLive, setSessionLive] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (currentUser) {
      setInterval(() => setSessionLive((prev) => prev - 1), 1000);
    }
  }, [currentUser]);

  const signUp = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    setIsLoading(true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjkb6Yzy4-rBbRJmiSDTePiyjPoSJQyW8";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          setIsLoggedIn(true);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "회원가입에 실패했습니다.";
            errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // 에러 없을때
      })
      .catch((err) => {
        alert(`에러: ${err.message}`);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    setIsLoading(true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjkb6Yzy4-rBbRJmiSDTePiyjPoSJQyW8";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          setIsLoggedIn(true);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "회원가입에 실패했습니다.";
            errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // 에러 없을때
        setCurrentUser(data.email);
        setSessionLive(data.expiresIn);
        setSessionId(data.idToken.slice(0, 20) + "...");
      })
      .catch((err) => {
        alert(`에러: ${err.message}`);
      });
  };

  return (
    <div className="Login" style={style.container}>
      <form style={style.formContainer}>
        <label htmlFor="id" style={style.label}>
          이메일
        </label>
        <input type="text" name="" id="id" ref={emailInputRef} />
        <label htmlFor="password" style={style.label}>
          패스워드
        </label>
        <input type="password" id="password" ref={passwordInputRef} />
        {!isLoading && (
          <button style={style.button} onClick={signUp}>
            회원 가입
          </button>
        )}
        {!isLoading && (
          <button style={style.button} onClick={signIn}>
            로그인
          </button>
        )}
      </form>
      <div style={style.loginInfo}>
        <div>현재 로그인된 유저 : {currentUser || "null"}</div>
        <div>세션 유효시간 : {sessionLive}</div>
        <div>세션 아이디 : {sessionId || "null"}</div>
      </div>
    </div>
  );
}

export default Login;

import { useRef, useState } from "react";

const style = {
  container: {
    minWidth: "400px",
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
};

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authHandler = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    let url = "";
    setIsLoading(true);

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjkb6Yzy4-rBbRJmiSDTePiyjPoSJQyW8";
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
      AIzaSyDjkb6Yzy4-rBbRJmiSDTePiyjPoSJQyW8`;
    }
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
          setIsLogin(true);
        } else {
          res.json().then((data) => {
            let errorMessage = "회원가입에 실패했습니다.";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
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

  return (
    <div className="App" style={style.container}>
      <form style={style.formContainer} onSubmit={authHandler}>
        <label htmlFor="id" style={style.label}>
          이메일
        </label>
        <input type="text" name="" id="id" ref={emailInputRef} />
        <label htmlFor="password" style={style.label}>
          패스워드
        </label>
        <input type="password" id="password" ref={passwordInputRef} />
        <p>{}</p>
        {!isLoading && <button style={style.button}>회원 가입</button>}
        <button style={style.button}>로그인</button>
      </form>
      <div>현재 로그인된 유저 : {currentUser}</div>
      <div>세션 유효시간 : </div>
    </div>
  );
}

export default App;

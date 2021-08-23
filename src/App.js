const styleSheet = {};

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
  },
};

function App() {
  return (
    <div className="App" style={style.container}>
      <form style={style.formContainer}>
        <label htmlFor="id" style={style.label}>
          이메일
        </label>
        <input type="text" name="" id="id" />
        <label htmlFor="password" style={style.label}>
          패스워드
        </label>
        <input type="password" id="password" />
        <button style={style.button}>로그인</button>
      </form>
    </div>
  );
}

export default App;

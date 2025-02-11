import { FormEvent, useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const fd = new FormData(form);

    const payload = JSON.stringify({
      email: fd.get("email"),
      password: fd.get("password"),
    });

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! ${res.status}`);
      }

      const resJson = await res.json();
      setToken(resJson);
      sessionStorage.setItem("token", resJson);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!token.length && (
        <div className="row m-4">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="mt-2">
              <div>
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
          <div className="col-lg-2"></div>
        </div>
      )}
      {token.length && (
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <h1>Welcome {email}!</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;

import { useState } from "react";
import Router from 'next/router'
import useRequest from "../../hooks/use-request";

const Signup = () => {
  const INITIAL_STATE = { email: "", password: "" };
  const [state, setState] = useState(INITIAL_STATE);
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email: state.email,
      password: state.password,
    },
    onSuccess: () => Router.push('/')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" name="email" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          name="password"
          type="password"
          onChange={handleChange}
        />
      </div>

      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signup;

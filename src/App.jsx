import React from "react";
import "./App.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import Home from "./routes/Home";
import axios from "axios";
import { createHash } from "crypto";
import Login from "./routes/Login";

function App() {
  const [token, setToken] = React.useState();
  const [admincreds, setAdminCreds] = React.useState({
    current_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const [devicecreds, setDevCreds] = React.useState({
    current_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  if (!token) {
    return <Login setToken={setToken} />;
  }
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function clearToken() {
    setToken();
  }
  function changeAdminPass(e) {
    e.preventDefault();
    let testMode = false;
    let domain = testMode ? "localhost" : window.location.hostname;
    // const _password_ = pass;
    let rndInt = randomIntFromInterval(20, 100);
    let salt = makeid(rndInt);
    let da_hash = createHash("sha256")
      .update(admincreds.current_pass)
      .digest("hex");
    let new_pass = createHash("sha256")
      .update(admincreds.new_pass)
      .digest("hex");
    try {
      if (admincreds.new_pass !== admincreds.confirm_pass) {
        alert("New admin password do not match!");
      } else if (admincreds.new_pass === "" || admincreds.new_pass === "") {
        alert("New admin password can't be empty!");
      } else if(admincreds.new_pass.length() <8){
        alert("New admin password length is too short!");
      } else {
        axios
          .post("http://" + domain + ":5670" + `/adminchange/`, {
            lebron: salt + da_hash,
            curry: rndInt,
            np: new_pass,
          })
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
              alert(`Password changed!`);
              clearToken();
            } else if (response.status === 202) {
              alert(`Wrong current password!`);
            } else {
              alert(`server dead yo`);
            }
          })
          .catch((err) => alert(`server dead yo`));
      }
    } catch (err) {
      alert(err);
    }
  }
  function changeDevicePass(e) {
    e.preventDefault();
    let testMode = false;
    let domain = testMode ? "localhost" : window.location.hostname;
    // const _password_ = pass;
    let rndInt = randomIntFromInterval(20, 100);
    let salt = makeid(rndInt);
    let da_hash = createHash("sha256")
      .update(devicecreds.current_pass)
      .digest("hex");
    let new_pass = createHash("sha256")
      .update(devicecreds.new_pass)
      .digest("hex");
    try {
      if (devicecreds.new_pass !== devicecreds.confirm_pass) {
        alert("New device password do not match!");
      } else if (devicecreds.new_pass === "" || devicecreds.new_pass === "") {
        alert("New device password can't be empty!");
      } else if(devicecreds.new_pass.length() < 8){
        alert("New device password is too short!");
      }else {
        axios
          .post("http://" + domain + ":5670" + `/devchange/`, {
            lebron: salt + da_hash,
            curry: rndInt,
            np: new_pass,
          })
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
              alert(`Device password changed!`);
              clearToken();
            } else if (response.status === 202) {
              alert(`Wrong current password!`);
            } else {
              alert(`server dead yo`);
            }
          })
          .catch((err) => alert(`server dead yo`));
      }
    } catch (err) {
      alert(err);
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form>
          <div className="text-center">
            <p style={{ fontWeight: "bold", color: "#03bafc", fontSize: 100 }}>
              Pi-Lock:{" "}
            </p>
            <p
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: 30,
                marginTop: -50,
              }}
            >
              Last Resort | Admin Panel
            </p>
          </div>
          <MDBInput
            className="mb-4"
            type="password"
            id="xdd1"
            label="Current admin password"
            name="pass"
            onChange={(e) =>
              setAdminCreds((prevState) => ({
                ...prevState,
                current_pass: e.target.value,
              }))
            }
            required
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="xdd2"
            label="New admin password (>8 characters)"
            name="pass"
            onChange={(e) =>
              setAdminCreds((prevState) => ({
                ...prevState,
                new_pass: e.target.value,
              }))
            }
            required
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="xdd3"
            label="Confirm password"
            name="pass"
            onChange={(e) =>
              setAdminCreds((prevState) => ({
                ...prevState,
                confirm_pass: e.target.value,
              }))
            }
            required
          />

          <MDBBtn className="mb-4" block onClick={changeAdminPass}>
            Change admin password
          </MDBBtn>
          <p>OR</p>
          <MDBInput
            className="mb-4"
            type="password"
            id="xdd4"
            label="Current device password"
            name="pass"
            onChange={(e) =>
              setDevCreds((prevState) => ({
                ...prevState,
                current_pass: e.target.value,
              }))
            }
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="xdd5"
            label="New device password (>8 characters)"
            name="pass"
            onChange={(e) =>
              setDevCreds((prevState) => ({
                ...prevState,
                new_pass: e.target.value,
              }))
            }
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="xdd6"
            label="Confirm password"
            name="pass"
            onChange={(e) =>
              setDevCreds((prevState) => ({
                ...prevState,
                confirm_pass: e.target.value,
              }))
            }
          />

          <MDBBtn className="mb-4" block onClick={changeDevicePass}>
            Change device password
          </MDBBtn>
          <MDBBtn className="mb-4" block color="danger" onClick={clearToken}>
            Logout
          </MDBBtn>
        </form>
      </div>
    </>
  );
}

export default App;

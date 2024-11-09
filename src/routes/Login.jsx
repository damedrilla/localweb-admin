import React from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { createHash } from "crypto";
import { redirect } from "react-router-dom";
export default function Login({ setToken }) {
  const [pass, setPass] = React.useState("");
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

  function get_da_input(e) {
    e.preventDefault();
    let testMode = false;
    let domain = testMode ? "localhost" : window.location.hostname;
    const _password_ = pass;
    let rndInt = randomIntFromInterval(20, 100);
    let salt = makeid(rndInt);
    let da_hash = createHash("sha256").update(_password_).digest("hex");
    try {
        axios
          .post("http://" + domain + ":5670" + `/loggain/`, {
            lebron: salt + da_hash,
            curry: rndInt,
          })
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
              setToken(response.data.token)
            } else if (response.status === 202) {
              alert(`Wrong password!`);
            } else {
              alert(`server dead yo`);
            }
          })
          .catch((err) => alert(`server dead yo`));
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
        <form onSubmit={get_da_input}>
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
            id="form2Example1"
            label="Password"
            name="pass"
            onChange={(e) => setPass(e.target.value)}
          />

          <MDBBtn className="mb-4" block>
            Login
          </MDBBtn>
        </form>
      </div>
    </>
  );
}

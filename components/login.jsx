// src/Components/Login.js
import React from "react";
import { useSetRecoilState } from "recoil";
import { sessionState } from "@/atoms/files";

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const setSession = useSetRecoilState(sessionState)

  async function LogIn(username, password) {
    //file name ->firstletter+_encoded.txt    //data is encoded text recieved from encode function

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (res.ok) {
        console.log("yeaaaxaaaaaaaaaaaaaaaaaaah")
        console.log(data)
        console.log(data?.Item)
        if (data?.Item) { //email exists
          if (password === data.Item.password) { //password is correct
            console.log("user exists password correct")
            setSession(username)
          } else {
            console.log("user exists password incorrect")
          }
          return
        } else {
          console.log("user does not exist")
        }
      } else {
        return Promise.reject(data)
      }
    } catch (error) {
      console.log(error)
      return
    }


    try {
      const res = await fetch(`/api/signin`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (res.ok) {
        console.log(data)
        setSession(username)
      } else {
        return Promise.reject(data)
      }
    } catch (error) {
      console.log(error)
      return error
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await LogIn(username, password)

    setUsername('');
    setPassword('');
  };
  return (
    <section className="h-full w-full flex justify-center m-20 text-black">
      <div className="w-full ">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <form className="w-full flex flex-col items-center mt-40">
        <div className="md:w-2/3 ">
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            value={username}
            placeholder="Email Address"
            onChange={(event) =>
              setUsername(event.target.value)
            }
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;

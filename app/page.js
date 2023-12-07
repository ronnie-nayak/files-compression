'use client'
import { title, subtitle } from "@/components/primitives";
import DragDropFile from "@/components/filedrop";
import Decode from "@/components/decode";
import Encode from "@/components/encode";
import { useSession } from "next-auth/react";
import React from "react";






export default function Home() {
  const { data: session } = useSession()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')


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
          } else {
            console.log("user exists password incorrect")
          }
          return
        } else {
          console.log("user does not exist")
          return
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
      } else {
        return Promise.reject(data)
      }
    } catch (error) {
      console.log(error)
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await LogIn(username, password)

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {!session?.user ? (
        <section
          className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ scale: 2 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}

        >
          <div
            className="inline-block max-w-lg text-center justify-center"
          >
            <h1
              className={title()}>Huffman</h1>
            <div
              className="mb-4"
              whileHover={{ scale: [null, 1.5, 1.4], marginTop: '20px', marginBottom: '20px' }}
              transition={{ duration: 0.3 }}
            >
              <h1
                className={title({ color: "violet" })}

              >Compression&nbsp;</h1>
            </div>

            <h1 className={title()}>Algorithm&nbsp;</h1>

            <br />
            <h2 className={subtitle({ class: "mt-4" })}>
              Modify files with ease according to your needs.
            </h2>
          </div>

          <div className="flex gap-10">
            <Encode></Encode>
            <Decode></Decode>
          </div>

          <div className="mt-8">
            <DragDropFile></DragDropFile>
          </div>
        </section >
      ) : (
        <div className="text-black">
          <form>
            <input type="text" placeholder="Username" name="username" value={username} required
              onChange={(event) =>
                setUsername(event.target.value)
              }
            />
            <input type="password" placeholder="Password" name="password" value={password} required
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
            <button onClick={handleSubmit} type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

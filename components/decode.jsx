'use client'

import { filesState } from "@/atoms/files";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
export default function Decode() {

  //on clicking decode button this function triggers
  const { data: session } = useSession()
  const files = useRecoilValue(filesState)
  async function downloadFile(fileName, fileData) {
    //file name ->firstletter+_encoded.txt    //data is encoded text recieved from encode function

    try {
      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: JSON.stringify({
          fileName,
          fileData,
          email: session?.user?.email
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

  const decodeFun = () => {
    let uploadedFile = files
    if (uploadedFile === undefined) {
      //if nothing is there in uploadedFile ->result = undefined
      alert("No file uploaded !");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      //will see text file now
      const text = fileLoadedEvent?.target?.result; //will get all the written text in file
      const newProduct = { text: text };
      fetch("/api/v1/yoli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          let { decoded } = data;
          console.log(data);
          console.log(decoded);
          downloadFile(
            uploadedFile?.name?.split(".")[0] + "_decoded.txt",
            decoded,
          ); //triggers function downloadFile
        });
      // let [decoded, tree_structure, info] = coder.decode(text); //trigger decode function in huffman.js and will recieve the returned values from function(decoded text,tree structure,compression ratio)
    };
    fileReader.readAsText(uploadedFile, "UTF-8");
  };
  return (
    <div
    >
      <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={decodeFun}
      >Decode</button>
    </div>
  )
}

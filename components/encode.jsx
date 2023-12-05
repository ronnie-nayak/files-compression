'use client'
import { filesState } from "@/atoms/files";
import { useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";

export default function Encode() {
  const { data: session } = useSession();
  const files = useRecoilValue(filesState)
  async function downloadFile(fileName, fileData) {
    //file name ->firstletter+_encoded.txt    //data is encoded text recieved from encode function

    try {
      const res = await fetch(`/api/bucket`, {
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
      const data = res.json()
      if (res.ok) {
        console.log(data)
      } else {
        return Promise.reject(data)
      }
    } catch (error) {
      console.log(error)
    }

  };
  const encodeFun = () => {
    //on clicking encode button this function is triggered

    const uploadedFile = files; //because we are uploading 1 file we need that first file uploaded by upload.files function
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
      fetch("/api/v1/emojis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          let { encoded } = data;
          console.log(data);
          console.log(encoded);
          downloadFile(
            uploadedFile.name.split(".")[0] + "_encoded.txt",
            encoded,
          ); //triggers function downloadFile
        });
      // let [encoded, tree_structure, info] = coder.encode(text); //trigger encode function in huffman.js and will recieve the returned values from function(encoded text,tree structure,compression ratio)
      //compression ratio
    };
    fileReader.readAsText(uploadedFile, "UTF-8");
  };
  return (
    <div
    >
      <button
        onClick={encodeFun}
      >Encode</button>
    </div>
  )
}

'use client'
import React from "react";
import { useSetRecoilState } from "recoil";
import { filesState } from "@/atoms/files";

export default function FileDrop() {
  const setFiles = useSetRecoilState(filesState)


  function handleChange(e) {
    console.log(e)
    setFiles(e.target.files[0])
  }

  return (
    <form method="post" style={{ display: "inline-block" }} className="text-center">
      <label htmlFor="images" id="dropcontainer" >
        < span className="drop-title text-white" > Drop files here</span >
        <br />
        < input className="mt-5" type="file" id="images" required onChange={handleChange} />
      </label >
    </form>
  )
}

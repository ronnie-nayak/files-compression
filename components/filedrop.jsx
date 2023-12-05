'use client'
import React from "react";
import { useRecoilState } from "recoil";
import { filesState } from "@/atoms/files";

export default function FileDrop() {
  const [dragActive, setDragActive] = React.useState(false);
  const [files, setFiles] = useRecoilState(filesState)
  const dropper = React.useRef(null);

  const dragenter = (e) => {
    e.stopPropagation();
    setDragActive(true)
  }
  const dragleave = (e) => {
    e.stopPropagation();
    setDragActive(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e)
    setFiles(e.dataTransfer.files[0])
    setTimeout(() => {
      console.log(files)
    }, 10000)
  };


  function handleChange(e) {
    console.log(e)
    setFiles(e.target.files[0])
  }
  React.useEffect(() => {
    const a = dropper?.current
    a.addEventListener('dragover', handleDragOver);
    const b = dropper.current
    b.addEventListener('drop', handleDrop);

    return () => {
      a.removeEventListener('dragover', handleDragOver);
      b.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div ref={dropper} onDragEnter={dragenter} onDragLeave={dragleave} >
      <form method="post" style={{ display: "inline-block" }} >
        <label htmlFor="images" className={`drop-container ${dragActive ? "drag-active" : ""}`} id="dropcontainer" >
          < span className="drop-title text-black" > Drop files here</span >
          or
          < input type="file" id="images" required onChange={handleChange} />
        </label >
      </form>
    </div>
  )
}

'use client'
import { title, subtitle } from "@/components/primitives";
import DragDropFile from "@/components/filedrop";
import Decode from "@/components/decode";
import Encode from "@/components/encode";
import React from "react";
import Login from "@/components/login";
import { sessionState } from "@/atoms/files";
import { useRecoilValue } from "recoil";

export default function Home() {
  const session = useRecoilValue(sessionState)
  return (
    <div>

      {session ? (
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
        <Login />
      )}
    </div>
  );
}

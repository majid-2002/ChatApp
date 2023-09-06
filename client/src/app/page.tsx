"use client";

import Image from "next/image";
import React, { useState } from "react";
import Message from "./component/Message";

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    isLogged: false,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-800 w-full">
      {userDetails.isLogged ? (
        <Message userName={userDetails.userName} />
      ) : (
        <form
          className="flex items-center justify-center bg-white rounded-md p-5 sm:w-96 w-full  space-x-3"
        >
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 rounded-md p-2 outline-none text-black w-full"
            onChange={(e) =>
              setUserDetails({ ...userDetails, userName: e.target.value })
            }
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2"
            onClick={(e) => {
              setUserDetails({ ...userDetails, isLogged: true });
            }}
          >
            Login
          </button>
        </form>
      )}
    </main>
  );
}

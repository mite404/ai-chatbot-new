import type { Route } from "./+types/home";
import { authClient } from "../lib/auth-client";
import { SignIn } from "./signin";
import { SignUp } from "./signup";
import { Navigate } from "react-router";
import { useState, useEffect } from "react";

export default function Home() {

  // if session = validated redirect to /chat

  // if session != validated display login/logup

  // if error 



  // if (data) {
  //   return <Navigate to="/chat" />


  return <div>
    <h1>AI Chat Bot</h1>
    <SignIn />
    <SignUp />
  </div>
}

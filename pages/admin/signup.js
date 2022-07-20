import { useRouter } from "next/router";
import { useState,useRef } from "react";
import { useSession } from "next-auth/react";

export default function Signup() {
  const { data: session, status } = useSession("");

  const router = useRouter();
  const [formStatus, setFormStatus] = useState();

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);



  async function submitHandler() {
    event.preventDefault();
    const enteredName = nameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    try {
        const result = await createUser(
          enteredName,
          enteredEmail,
          enteredPassword
        );
        console.log(result);
        setFormStatus(`Sign up Success: ${result.message}`);
        // window.location.href = "/";
        router.replace("/admin/login");
      } catch (error) {
        console.log(error);
        setFormStatus(`Error Occured: ${error.message}`);
      }
  }

  async function createUser(
    name,
    email,
    password,
  ){
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  
    return data;
  }


  if (status === "authenticated") {
    router.replace("/admin");
    return <p>Signed in as {session.user.email}</p>;
  }

  return (
    <div>
    <form onSubmit={submitHandler}>
      <label htmlFor="email">Email</label>
      <input name="email" type="text" placeholder="Email" required ref={emailInputRef} />
      <label htmlFor="name">Name</label>
      <input name="name" type="text" placeholder="Name" required ref={nameInputRef} />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" placeholder="Password" required ref={passwordInputRef}/>
      <input type="submit" value="Sign up"/>
      </form>
    </div>
  );
}

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import styles from "./admin.module.css";

export default function AdminLogin() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [formStatus, setFormStatus] = useState();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  async function submitHandler() {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result.error) {
      setFormStatus(`Log in Success!`);
      router.replace("/admin");
    } else {
      setFormStatus(`Error Occured : ${result.error}`);
    }
  } // end of submitHandler function

  if (status === "authenticated") {
    router.replace("/admin");
    return (
      <div>
        <h1>Log in</h1>
        <div>You are already logged in.</div>
        <div>Now redirect to main page.</div>
      </div>
    );
  }
  return (
    <div className={styles.alert_box}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          ref={emailInputRef}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          ref={passwordInputRef}
        />
          <input type="submit" value="Sign in" />
      </form>
      <Link href="./signup">
        <button>가입하기</button>
      </Link>
    </div>
  );
}

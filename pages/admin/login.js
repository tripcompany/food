import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminLogin(){
    const { data: session } = useSession();

    if (session) {
        return (
          <div>
            Welcome user<br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        );
      }
      return (
        <div>
          Click to sign into your user account <br />
          <button onClick={() => signIn()}>Sign in</button>
          <h2>or</h2>
          <Link href="/admin/signup"><button>Sign up</button></Link>
        </div>
      );
}


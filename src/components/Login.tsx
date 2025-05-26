import { useSession } from "next-auth/react";
import LinkDropdown from "./LinkDropdown";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-end py-4">
      <LinkDropdown session={session} />
    </div>
  );
}
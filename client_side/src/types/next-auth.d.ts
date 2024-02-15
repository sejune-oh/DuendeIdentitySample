import { DefaultSession, DefaultUser } from "next-auth";

interface Session extends DefaultSession {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  id_token?: string;
}

interface authUser extends DefaultUser {
  id_token?: string;
}

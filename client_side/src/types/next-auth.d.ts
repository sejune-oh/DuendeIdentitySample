import { DefaultSession } from "next-auth";

interface Session extends DefaultSession {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
}

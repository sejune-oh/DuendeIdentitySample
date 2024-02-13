import { ILoginInfo } from "@/components/forms/LoginForm";
import { instance } from "./../axios/index";
import { CLIENT_ID, CLIENT_SECRET, IDENTIY_ISSUER, SCOPE } from "@/constants";
import qs from "qs";

const identity_url = IDENTIY_ISSUER;
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const scope = SCOPE;

async function signInROPC(loginInfo: ILoginInfo) {
  try {
    const urlPath = "/connect/token";
    const reqUrl = `${identity_url}${urlPath}`;

    const body = {
      client_id,
      client_secret,
      scope,
      grant_type: "password",
      username: loginInfo.email,
      password: loginInfo.password,
    };

    const res = await instance({
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: reqUrl,
      data: qs.stringify(body),
    });

    if (res.status === 200 && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log("🚀 ~ signInROPC ~ error:", error);
  }
}

// async function signInExternal() {}
// async function getRefreshToken() {}

// const auths = { signInROPC, signInExternal, getRefreshToken };
const auths = { signInROPC };

export default auths;

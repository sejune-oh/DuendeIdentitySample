import { Session } from "@/types/next-auth";
import axios, { AxiosRequestHeaders } from "axios";

export const instance = axios.create({
  timeout: 50000,
  headers: {},
});

export async function setInterseptor(session: Session | null) {
  try {
    instance.interceptors.request.use(
      async (config) => {
        //header 데이터가 없으면 기본 데이터를 넣어준다.
        if (!config.headers) {
          config.headers = {
            ...instance.defaults.headers.common,
          } as AxiosRequestHeaders;
        }

        config.headers["Access-Control-Allow-Origin"] = "*";

        if (session) {
          const { access_token, token_type } = session;

          if (access_token && token_type) {
            config.headers.Authorization = `${token_type} ${access_token}`;
          }
        }

        return config;
      },
      (error) => {
        console.log("[Error]", error);
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  } catch (error: any) {
    return Promise.reject("Auth Error");
  }
}

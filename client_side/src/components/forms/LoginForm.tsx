import Link from "next/link";
import FacebookIcon from "../icon/FacebookIcon";
import GoogleIcon from "../icon/GoogleIcon";
import { FieldValues, useForm } from "react-hook-form";
import { SignInResponse, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

interface Params {}
export interface ILoginInfo {
  email: string;
  password: string;
}

function LoginForms({}: Params): React.ReactNode {
  const [response, setResponse] = useState<SignInResponse | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginInfo>();

  const submitHandler = async (data: ILoginInfo) => {
    try {
      const body = {
        username: data.email,
        password: data.password,
      };

      const res = await signIn("SignWithROPC", body);
      setResponse(res);
    } catch (error) {
      console.log("🚀 ~ submitHandler ~ error:", error);
    }
  };

  const errorHandler = (error: FieldValues) => {
    console.log("🚀 ~ errorHandler ~ error:", error);
  };

  //! useEffect

  return (
    <form
      className="flex flex-col  gap-4 bg-white py-8 px-6 w-[400px] h-[500px]"
      onSubmit={handleSubmit(submitHandler, errorHandler)}
    >
      <div className="">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <p className="text-sm">
          Enter your mobile numbers to create your accont
        </p>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <button className="btn">
          <GoogleIcon />
          <p>Google Sign-in</p>
        </button>
        <button className="btn">
          <FacebookIcon />
          <p>Facebook Sign-in</p>
        </button>
      </div>
      <div className="flex items-center gap-1">
        <div className="border border-[#F6F6F6] w-full h-[1px]"></div>
        <p className="text-sm">OR</p>
        <div className="border border-[#F6F6F6] w-full h-[1px]"></div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <input
          className="py-[8px] px-[10px] border border-[#CFCFCF] w-full rounded-xl"
          type="text"
          placeholder="email"
          defaultValue={"admin"}
          {...register("email", { required: true })}
        ></input>
        <input
          className="py-[8px] px-[10px] border border-[#CFCFCF] w-full rounded-xl"
          type="password"
          placeholder="password"
          defaultValue={"Pa$$word123"}
          {...register("password", { required: true })}
        ></input>
      </div>
      <button
        className="text-white bg-[#333] rounded-lg px-2 py-[10px]"
        type="submit"
        disabled={isSubmitting}
      >
        Continue
      </button>
      <div className="flex justify-center items-center">
        <p className="text-[#BFBFBF] text-sm">
          Don't have an account?{" "}
          <Link className="text-black font-semibold" href={"/"}>
            Sign Up
          </Link>{" "}
          now.
        </p>
      </div>
    </form>
  );
}

export default LoginForms;

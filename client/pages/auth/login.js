import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "@/utils/schemas";
import { useLogin } from "@/hooks/queries/useAuth";
import useStore from "@/store/useStore";

import InputField from "@/components/form/InputField";
import Logo from "@/components/ui/logo/Logo";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";

const LoginPage = () => {
  const setUserEmail = useStore((state) => state.setUserEmail);
  const { mutate, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const [email, password] = watch(["email", "password"]);

  const submiForm = (formData) => {
    setUserEmail(formData.email);
    mutate(formData);
  };

  return (
    <>
      <Head>
        <title>Chekt | Log In</title>
      </Head>
      <div className="flex min-h-screen px-8 py-8 sm:px-3">
        {/* right section */}
        <section className="min-h-full flex-1 lg:hidden"></section>

        {/* left section */}
        <section className="flex min-h-full flex-1 items-center justify-center">
          <div className="bg-colorWhite w-full max-w-[30rem] rounded-md py-8 px-8 ">
            <div className="mb-5 flex justify-center">
              <Logo />
            </div>
            <div className="mb-7 text-base font-medium">
              <p className="mb-[-2px]">Welcome back!</p>
              <p className="text-colorGray">
                Sign in with your credential below
              </p>
            </div>

            {/* form */}
            <form
              className="mb-3 flex flex-col gap-5"
              onSubmit={handleSubmit(submiForm)}
            >
              <div className="">
                <InputField
                  errors={errors}
                  labelText="Email"
                  name={"email"}
                  register={register}
                  value={email}
                />
              </div>
              <div className="">
                <InputField
                  errors={errors}
                  labelText="Password"
                  name={"password"}
                  type={"password"}
                  register={register}
                  value={password}
                  showEye={true}
                />
              </div>
              <div className="flex justify-end">
                <Link href={"/auth/forgotpassword"}>Forgot password?</Link>
              </div>

              <button
                className="text-colorWhite bg-colorPrimary rounded-md py-4  text-center font-semibold"
                type="submit"
              >
                {isLoading ? <LoadingCircle /> : "Sign in"}
              </button>
            </form>

            {/* bottom section */}
            <div className="mb-5 flex items-center gap-4 font-medium">
              <div className="bg-colorGray h-[2px] flex-1"></div>
              <div>Or</div>
              <div className="bg-colorGray h-[2px] flex-1"></div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center font-medium">
              <div>Don't have an account?</div>
              <Link href={"/auth/signup"}>Create an account</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginPage;

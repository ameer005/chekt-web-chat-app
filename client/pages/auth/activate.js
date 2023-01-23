import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaActivateAccount } from "@/utils/schemas";
import useStore from "@/store/useStore";
import {
  useActivateAccount,
  useResendActivatonCode,
} from "@/hooks/queries/useAuth";

import InputField from "@/components/form/InputField";
import Logo from "@/components/ui/logo/Logo";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";
const ActivateAccountPage = () => {
  const userEmail = useStore((state) => state.email);
  const { mutate: activateAccount, isLoading: activateAccountLoading } =
    useActivateAccount();
  const { mutate: resendCode, isLoading: resendCodeLoading } =
    useResendActivatonCode();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schemaActivateAccount),
  });
  const [code] = watch(["code"]);

  useEffect(() => {
    if (!userEmail) router.push("/auth/login");
  }, []);

  const submiForm = (formData) => {
    activateAccount({
      email: userEmail,
      ...formData,
    });
  };

  return (
    <>
      <Head>
        <title>Chekt | Log In</title>
      </Head>
      <div className="flex min-h-screen px-8 py-8">
        {/* right section */}
        <section className="flex-1 min-h-full"></section>

        {/* left section */}
        <section className="flex-1 flex justify-center items-center min-h-full">
          <div className="py-8 px-8 max-w-[30rem] bg-colorWhite w-full rounded-md">
            <div className="flex justify-center mb-5">
              <Logo />
            </div>
            <div className="font-medium mb-7 text-base">
              <p className="mb-[-2px]">Activate your account</p>
              {/* <p className="text-colorGray">
                Sign in with your credential below
              </p> */}
            </div>

            {/* form */}
            <form
              className="flex flex-col gap-5 mb-3"
              onSubmit={handleSubmit(submiForm)}
            >
              <div className="">
                <InputField
                  errors={errors}
                  labelText="OTP"
                  name={"code"}
                  type="text"
                  register={register}
                  value={code}
                />
              </div>

              <button
                className="py-4 text-colorWhite font-semibold text-center  rounded-md bg-colorPrimary"
                type="submit"
              >
                {activateAccountLoading ? <LoadingCircle /> : "Submit"}
              </button>
            </form>

            {/* bottom section */}
            {/* <div className="flex items-center gap-4 font-medium mb-5">
              <div className="flex-1 h-[2px] bg-colorGray"></div>
              <div>Or</div>
              <div className="flex-1 h-[2px] bg-colorGray"></div>
            </div> */}

            <div className="flex flex-col gap-2 items-center font-medium text-center">
              {resendCodeLoading ? (
                <LoadingCircle />
              ) : (
                <>
                  <div>Didn't get the otp?</div>
                  <button onClick={() => resendCode({ email: userEmail })}>
                    resend
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ActivateAccountPage;

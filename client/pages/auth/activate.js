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
import { withPublic } from "@/hooks/routes";
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
      <div className="flex min-h-screen px-8 py-8 sm:px-3">
        {/* right section */}
        <section className="min-h-full flex-1 lg:hidden"></section>

        {/* left section */}
        <section className="flex min-h-full flex-1 items-center justify-center">
          <div className="bg-colorWhite w-full max-w-[30rem] rounded-md py-8 px-8">
            <div className="mb-5 flex justify-center">
              <Logo />
            </div>
            <div className="mb-7 text-base font-medium">
              <p className="mb-[-2px]">Activate your account</p>
            </div>

            {/* form */}
            <form
              className="mb-3 flex flex-col gap-5"
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
                className="text-colorWhite bg-colorPrimary rounded-md py-4  text-center font-semibold"
                type="submit"
              >
                {activateAccountLoading ? <LoadingCircle /> : "Submit"}
              </button>
            </form>

            <div className="flex flex-col items-center gap-2 text-center font-medium">
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

export default withPublic(ActivateAccountPage);

import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidateForgotPassword } from "@/utils/schemas";
import { useValidateForgotPassword } from "@/hooks/queries/useAuth";
import useStore from "@/store/useStore";

import InputField from "@/components/form/InputField";
import Logo from "@/components/ui/logo/Logo";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";

const ChangePasswordPage = () => {
  const userEmail = useStore((state) => state.email);
  const { mutate: changePassword, isLoading: changePasswordLoading } =
    useValidateForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schemaValidateForgotPassword),
  });

  const [code, password] = watch(["code", "password"]);

  const submiForm = (formData) => {
    console.log(formData);
    changePassword({
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
              <p className="mb-[-2px]">Change password</p>
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
                  register={register}
                  value={code}
                />
              </div>
              <div>
                <InputField
                  errors={errors}
                  labelText="New Password"
                  name={"password"}
                  register={register}
                  value={password}
                  type={"password"}
                  showEye={true}
                />
              </div>

              <button
                className="py-4 text-colorWhite font-semibold text-center  rounded-md bg-colorPrimary"
                type="submit"
              >
                {changePasswordLoading ? <LoadingCircle /> : "Submit"}
              </button>
            </form>

            {/* bottom section */}
            {/* <div className="flex items-center gap-4 font-medium mb-5">
              <div className="flex-1 h-[2px] bg-colorGray"></div>
              <div>Or</div>
              <div className="flex-1 h-[2px] bg-colorGray"></div>
            </div> */}

            <div className="flex flex-col gap-2 items-center font-medium text-center">
              <div>Didn't get the otp?</div>
              <button>resend</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChangePasswordPage;

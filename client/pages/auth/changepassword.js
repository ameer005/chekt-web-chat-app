import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidateForgotPassword } from "@/utils/schemas";
import { useValidateForgotPassword } from "@/hooks/queries/useAuth";
import useStore from "@/store/useStore";

import InputField from "@/components/form/InputField";
import Logo from "@/components/ui/logo/Logo";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";
import { withPublic } from "@/hooks/routes";

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
              <p className="mb-[-2px]">Change password</p>
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
                className="text-colorWhite bg-colorPrimary rounded-md py-4  text-center font-semibold"
                type="submit"
              >
                {changePasswordLoading ? <LoadingCircle /> : "Submit"}
              </button>
            </form>

            <div className="flex flex-col items-center gap-2 text-center font-medium">
              <div>Didn't get the otp?</div>
              <button>resend</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default withPublic(ChangePasswordPage);

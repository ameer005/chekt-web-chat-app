import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaForgotPassword } from "@/utils/schemas";

import InputField from "@/components/form/InputField";
import Logo from "@/components/ui/logo/Logo";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schemaForgotPassword),
  });

  const [email] = watch(["email"]);

  const submiForm = (formData) => {
    console.log(formData);
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
              <p className="mb-[-2px]">Forgot password</p>
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
                  labelText="Email"
                  name={"email"}
                  register={register}
                  value={email}
                />
              </div>

              <button
                className="py-4 text-colorWhite font-semibold text-center  rounded-md bg-colorPrimary"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ForgotPasswordPage;

import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaForgotPassword } from "@/utils/schemas";
import useStore from "@/store/useStore";
import { useForgotPassword } from "@/hooks/queries/useAuth";

import InputField from "@/components/form/InputField";
import Logo from "@/components/ui/logo/Logo";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";

const ForgotPasswordPage = () => {
  const setUserEmail = useStore((state) => state.setUserEmail);
  const { mutate, isLoading } = useForgotPassword();

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
          <div className="bg-colorWhite w-full max-w-[30rem] rounded-md py-8 px-8">
            <div className="mb-5 flex justify-center">
              <Logo />
            </div>
            <div className="mb-7 text-base font-medium">
              <p className="mb-[-2px]">Forgot password</p>
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

              <button
                className="text-colorWhite bg-colorPrimary rounded-md py-4  text-center font-semibold"
                type="submit"
              >
                {isLoading ? <LoadingCircle /> : "Submit"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ForgotPasswordPage;

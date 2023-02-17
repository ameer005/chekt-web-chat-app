import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignup } from "@/utils/schemas";
import { useSignup } from "@/hooks/queries/useAuth";
import useStore from "@/store/useStore";

import InputField from "@/components/form/InputField";
import Logo from "@/components/ui/logo/Logo";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";
import { withPublic } from "@/hooks/routes";

const signup = () => {
  const setUserEmail = useStore((state) => state.setUserEmail);
  const { mutate, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });

  const [email, password, name, username] = watch([
    "email",
    "password",
    "name",
    "username",
  ]);

  const submiForm = (formData) => {
    setUserEmail(formData.email);
    mutate(formData);
  };

  return (
    <>
      <Head>
        <title>Chekt | Sign Up</title>
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
              <p className="mb-[-2px]">Register for an account</p>
              <p className="text-colorGray">Simply fill out the form below</p>
            </div>

            {/* form */}
            <form
              className="mb-3 flex flex-col gap-5"
              onSubmit={handleSubmit(submiForm)}
            >
              <div>
                <InputField
                  errors={errors}
                  labelText="Name"
                  name={"name"}
                  register={register}
                  value={name}
                />
              </div>
              <div>
                <InputField
                  errors={errors}
                  labelText="Username"
                  name={"username"}
                  register={register}
                  value={username}
                />
              </div>
              <div>
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
                  register={register}
                  value={password}
                  type="password"
                  showEye={true}
                />
              </div>

              <button
                className="text-colorWhite bg-colorPrimary rounded-md py-4  text-center font-semibold"
                type="submit"
              >
                {isLoading ? <LoadingCircle /> : "Create an account"}
              </button>
            </form>

            {/* bottom section */}
            <div className="mb-5 flex items-center gap-4 font-medium">
              <div className="bg-colorGray h-[2px] flex-1"></div>
              <div>Or</div>
              <div className="bg-colorGray h-[2px] flex-1"></div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center font-medium">
              <div>Already have an account?</div>
              <Link href={"/auth/login"}>Sign In here</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default withPublic(signup);

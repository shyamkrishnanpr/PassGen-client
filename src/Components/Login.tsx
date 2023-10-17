import { useFormik } from "formik";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../Utils/LoginValidation";
import { message } from "antd";
import { loginApi } from "../Services/service";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await loginApi(values);
        console.log(response);
        if (response.data) {
          localStorage.setItem("UserToken", JSON.stringify(response.data));
          message.success("logged in successfully.");
          navigate("/");
        } else {
          message.error("Network error");
        }
      } catch (error: any) {
        message.error(error.response?.data.error);
      }
    },
  });

  return (
    <>
      <div>
        <section>
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto ">
            <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-md dark:border dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
                </h1>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <InputField
                    labelText="Your email"
                    inputType="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    messageType="error"
                    isMessage={true}
                    placeHolder="name@company.com"
                    message={formik.errors.email}
                  />

                  <InputField
                    labelText="Password"
                    inputType="password"
                    name="password"
                    isMessage={true}
                    messageType="error"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder="••••••••"
                    message={formik.errors.password}
                  />

                  <button
                    type="submit"
                    className="bg-[#4f46e5] hover:bg-[#6f69f0] text-white font-semibold py-2 px-4 rounded-full shadow-md w-full"
                  >
                    Sign in
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      to={"/signUp"}
                      className="font-medium text-blue-500 hover:underline dark:text-primary-500"
                    >
                      SIGN UP
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;

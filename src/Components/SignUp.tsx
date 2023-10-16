
import {Link, useNavigate} from 'react-router-dom'
import InputField from "./InputField"
import {useFormik} from 'formik'
import { signUpSchema } from '../Utils/SignupValidation'
import { signUpApi } from '../Services/service'
import {message} from 'antd'


const SignUp = () => {

  const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            userName:"",
            email:"",
            password:""

        },
        validationSchema:signUpSchema,
        onSubmit:async(values)=>{
            console.log(values)
            try {
                const responce = await signUpApi(values)
                console.log(responce)
                if(responce.data){
                  localStorage.setItem('UserToken', JSON.stringify(responce.data));
                  message.success('logged in successfully.');
                  navigate('/');
                }else{
                  message.error("Network error")
                }
            } catch (error:any) {
              message.error(error.response.data.error)
            }
        }
    });

  
  return (
    <>
      <section>
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto">
            <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-md dark:border dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign Up
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <InputField
                    labelText="User Name"
                    inputType="text"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder="David john"
                    isMessage={true}
                    messageType="error"
                    message={formik.errors.userName}
                  />
                  <InputField
                    labelText="Your email"
                    inputType="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder="name@company.com"
                    isMessage={true}
                    messageType="error"
                    message={formik.errors.email}
                  />
                  <InputField
                    labelText="Password"
                    inputType="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder="••••••••"
                    isMessage={true}
                    messageType="error"
                    message={formik.errors.password}
                  />
                  <button
                    type="submit"
                    className="bg-[#4f46e5] hover:bg-[#6f69f0] text-white font-semibold py-2 px-4 rounded-full shadow-md w-full"
                  >
                    
                      "Sign up"
                
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="font-medium text-blue-500 hover:underline dark:text-primary-500"
                    >
                      LOGIN
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default SignUp

import { useForm } from 'react-hook-form';
import { loginApi } from '../../services/auth.service';
import { useAuth } from '../../hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { decodeJwtToken } from '../../utils/sessionStorage';

function LoginComponent({ setToken }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { isAuthenticated, setIsAuthenticated, setUserData } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const token = await loginApi(data.email, data.password);
      const decoded = decodeJwtToken(token.data);
      setUserData(decoded);
      setIsAuthenticated(true);
      setToken(token.data);
      navigate('/');
    } catch (e) {
      // show alert to user
      console.log(e);
    }
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://uploads-ssl.webflow.com/5e589a8b7bb9af87ad968338/613f82a2bceafc58516997ab_ArkusNexus_iso.png"
            alt="ArkusNexus"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to your account {isAuthenticated || 'HOOO'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                placeholder="email"
                {...register('email', {
                  required: 'A valid email is required',
                  pattern: emailRegex,
                })}
                className="relative block w-full rounded-t-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>{errors.email && <span>A valid email is required</span>}</div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                placeholder="password"
                type="password"
                className="relative block w-full rounded-b-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('password', { required: true, minLength: 8 })}
              />
            </div>
            <div>
              {errors.password && (
                <span>Password is required, 8 characters minimum</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;

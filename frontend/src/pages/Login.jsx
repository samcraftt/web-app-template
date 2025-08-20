import { auth } from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.login(formData);
      navigate('/');
    } catch(error) {
      const message = error.response?.data?.error || 'Log in failed, please try again.';
      toast.error(message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              className="font-medium text-blue-600 hover:text-blue-500"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={login}>
          <div className="space-y-4">
            <Input
              id="email"
              label="Email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
              type="email"
              value={formData.email}
            />
            <Input
              id="password"
              label="Password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              type="password"
              value={formData.password}
            />
          </div>
          <Button
            className="w-full"
            disabled={loading}
            type="submit"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

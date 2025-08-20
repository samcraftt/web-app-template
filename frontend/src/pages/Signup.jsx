import { auth } from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const passwordRequirements = {
  hasEightChars: { regex: /.{8,}/, text: 'At least 8 characters' },
  hasUpperCase: { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  hasLowerCase: { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  hasNumber: { regex: /[0-9]/, text: 'At least 1 number' },
  hasSpecialChar: { regex: /[!@#$%^&*(),.?":{}|<>]/, text: 'At least 1 special character' },
  passwordsMatch: { text: 'Passwords match'}
};

const getPasswordSecurity = (password, confirmPassword) => {
  const results = {};
  Object.keys(passwordRequirements).forEach(requirement => {
    if (passwordRequirements[requirement].regex) results[requirement] = passwordRequirements[requirement].regex.test(password);
  });
  results.passwordsMatch = password === confirmPassword;
  return results;
};

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordSecurity, setPasswordSecurity] = useState({
    hasEightChars: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordSecurity(getPasswordSecurity(password, confirmPassword));
    }
  };

  const isPasswordSecure = () => {
    return Object.values(passwordSecurity).every(Boolean);
  };

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      await auth.signup(signupData);
      toast.success('Account created! Please check your email to verify your account.');
    } catch (error) {
      const message = error.response?.data?.error || 'Sign up failed, please try again.';
      toast.error(message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a
              className="font-medium text-blue-600 hover:text-blue-500"
              href="/login"
            >
              Log in
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={signup}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="firstName"
                label="First name"
                name="firstName"
                onChange={handleChange}
                placeholder="First name"
                required
                type="text"
                value={formData.firstName}
              />

              <Input
                id="lastName"
                label="Last name"
                name="lastName"
                onChange={handleChange}
                placeholder="Last name"
                required
                type="text"
                value={formData.lastName}
              />
            </div>

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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

              <Input
                id="confirmPassword"
                label="Confirm password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm password"
                type="password"
                value={formData.confirmPassword}
              />
            </div>

            <div className="mt-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(passwordRequirements).map(([key, { text }]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <span className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                      passwordSecurity[key] ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {passwordSecurity[key] ? '✓' : '○'}
                    </span>
                    <span className={`${passwordSecurity[key] ? 'text-green-600' : 'text-gray-600'} text-xs`}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            disabled={loading || !isPasswordSecure()}
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import { auth } from '../api';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch user
  useEffect(() => {
    const checkAuth = async () => {
      const user = await auth.checkAuth();
      if (user) setUser(user);
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await auth.logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user ? `Welcome, ${user.firstName}!` : 'Welcome!'}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {user ? `You are logged in as ${user.email}` : 'You are not logged in'}
              </p>
            </div>
            {user ? (
              <Button
                onClick={logout}
                variant="secondary"
              >
                Log out
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="secondary"
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

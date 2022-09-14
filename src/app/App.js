import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import UsersPage from '../pages/UsersPage';
import LikedPostsPage from '../pages/LikedPostsPage';
import { NoMatch } from '../pages/NoMatch';
import { Layout } from '../components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <PrivateRoute>
              <HomePage/>
            </PrivateRoute>}/>
          <Route path=":id" element={
            <PrivateRoute>
              <ProfilePage/>
            </PrivateRoute>}/>
          <Route path="users" element={
            <PrivateRoute>
              <UsersPage/>
            </PrivateRoute>}/>
            <Route path="liked" element={
            <PrivateRoute>
              <LikedPostsPage/>
            </PrivateRoute>}/>
        </Route>
        <Route path="*" element={
          <PrivateRoute>
            <NoMatch/>
          </PrivateRoute>}/>
      </Routes>
    </main>
  );
}

export default App;

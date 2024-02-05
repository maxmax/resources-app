import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Users from './containers/Users';
import User from './containers/Users/User';
import Resources from './containers/Resources';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Resources />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </AppLayout>
  );
}

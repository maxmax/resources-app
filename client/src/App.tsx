import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Users from '@/containers/Users';
import User from '@/containers/Users/User';
import Gantt from '@/containers/Gantt';
import Resources from '@/containers/Resources';
import Resource from '@/containers/Resources/Resource';
import Tasks from '@/containers/Tasks';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Gantt />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:id" element={<Resource />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </AppLayout>
  );
}

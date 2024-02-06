import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Gantt from '@/containers/Gantt';
import { Users, User } from '@/containers/Users';
import { Resources, Resource } from '@/containers/Resources';
import { Tasks, Task } from '@/containers/Tasks';

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
        <Route path="/tasks/:id" element={<Task />} />
      </Routes>
    </AppLayout>
  );
}

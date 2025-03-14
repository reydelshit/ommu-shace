import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';

import EventFormContainer from '@/components/EventFormContainer';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/(authenticated)/Dashboard';
import ViewEvent from '@/pages/(authenticated)/ViewEvent';

const RoutesContainer = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create/event" element={<EventFormContainer />} />
          <Route path="/event/:eventId" element={<ViewEvent />} />
        </Route>

        <Route
          path="/*"
          element={
            <div className="flex w-full justify-center items-center h-full">
              <h1 className="text-4xl">404 - Not Found</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default RoutesContainer;

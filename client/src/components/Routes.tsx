import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';

import EventFormContainer from '@/components/EventFormContainer';
import Dashboard from '@/pages/(authenticated)/Dashboard';
import ManageEvent from '@/pages/(authenticated)/ManageEvent';
import Profile from '@/pages/(authenticated)/Profile';
import Settings from '@/pages/(authenticated)/Settings';
import ViewEvent from '@/pages/(authenticated)/ViewEvent';
import YourEvents from '@/pages/(authenticated)/YourEvents';
import LandingPage from '@/pages/LandingPage';
import FormContainer from './FormContainer';
import Collaborator from '@/pages/Collaborator';
import PricingTiers from '@/pages/Pricing';

const RoutesContainer = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collab" element={<Collaborator />} />
        <Route path="/pricing" element={<PricingTiers />} />

        <Route
          path="/login"
          element={
            <div className="w-full h-full flex justify-center items-center">
              <div className="">
                <FormContainer />
              </div>
            </div>
          }
        />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create/event" element={<EventFormContainer />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/your-event" element={<YourEvents />} />
          <Route path="/manage-event/:eventId" element={<ManageEvent />} />
        </Route>

        <Route path="/event/:eventId" element={<ViewEvent />} />

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

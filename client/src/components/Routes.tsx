import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';

import EventFormContainer from '@/components/EventFormContainer';
import Dashboard from '@/pages/(authenticated)/Dashboard';
import Profile from '@/pages/(authenticated)/Profile';
import ViewEvent from '@/pages/(authenticated)/ViewEvent';
import YourEvents from '@/pages/(authenticated)/YourEvents';
import LandingPage from '@/pages/LandingPage';
import YourEventsView from '@/pages/(authenticated)/YourEventsView';
import { GRID_LAYOUTS, useLayoutStore } from '@/store/useLayoutStore';

const RoutesContainer = () => {
  const { layout } = useLayoutStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create/event" element={<EventFormContainer />} />
          <Route path="/event/:eventId" element={<ViewEvent />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/your-event" element={<YourEvents GRID_LAYOUT={GRID_LAYOUTS[layout]} />} />
          <Route path="/your-event/:eventId" element={<YourEventsView />} />
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

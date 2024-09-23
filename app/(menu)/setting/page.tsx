import FontSlider from '@/components/FontSlider';
import ModeToggle from '@/components/ModeToggle';
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react';

const SettingPage = () => {
  return (
    <ProtectedRoute allowedRoles={["Student", "Admin", "HeadAdmin", "SuperAdmin"]}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          
          {/* Mode Toggle (Dark/Light Mode) */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg text-gray-700 dark:text-gray-300">Dark Mode</span>
            <ModeToggle />
          </div>

          <FontSlider />

          {/* Additional settings or components can be added here */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
            Customize your settings here.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SettingPage;

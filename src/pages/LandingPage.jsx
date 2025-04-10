import { useEffect } from "react";
import { Link } from "react-router";

const LandingPage = ({ history }) => {
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/blogs");
  //   }
  // }, [history]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">AttendTrack</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="#features" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Features
              </a>
              <a href="#benefits" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Benefits
              </a>
              <a href="#pricing" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Pricing
              </a>
              <a href="#contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Contact
              </a>
            </div>
            <div className="flex items-center">
              <button className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Sign in
              </button>
              <button className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 hover:border-blue-600">
                Try for free
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div className="relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div>
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl">
                  <span className="block">Simplify Attendance</span>
                  <span className="block text-blue-600">Management Today</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  A modern solution for tracking attendance, managing schedules, and optimizing workforce productivity.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#demo" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                      Request Demo
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden lg:mx-0 shadow-xl">
                <img src="/api/placeholder/600/400" alt="Dashboard preview" className="w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

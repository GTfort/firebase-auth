"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/sign-in");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  if (!user || !userSession) {
    router.push("/sign-up");
    return null;
  }

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen flex flex-col"
          : "bg-white text-black min-h-screen flex flex-col"
      }
    >
      <div className="flex justify-between items-center p-6 bg-indigo-600 text-white">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="py-2 px-4 bg-indigo-800 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-4">Welcome to your dashboard!</h2>
        <p className="mb-4">
          Here you can manage your account, view analytics, and customize your
          settings. Enjoy your stay!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p>View detailed analytics of your account activity.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Settings</h3>
            <p>Customize your account settings and preferences.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Profile</h3>
            <p>View and edit your profile information.</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-800 text-center">
        <button
          onClick={handleSignOut}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 inline-flex items-center"
        >
          <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

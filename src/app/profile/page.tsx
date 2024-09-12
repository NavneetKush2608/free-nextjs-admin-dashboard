"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { FiShare2, FiMapPin, FiCalendar, FiUser, FiHeart, FiActivity, FiLogOut, FiEdit2 } from 'react-icons/fi';
import useColorMode from "@/hooks/useColorMode";
import { auth, db } from "@/components/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const [colorMode] = useColorMode();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userRef = doc(db, "users", authUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const birthDate = new Date(data.dob);
          const today = new Date();
          let calculatedAge = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
          }
          setUserData({
            ...data,
            age: calculatedAge,
            lastActive: today.toLocaleDateString(),
          });
        }
      } else {
        setUser(null);
        setUserData(null);
        router.push("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className={`mx-auto max-w-4xl ${colorMode === 'dark' ? 'dark:bg-gray-900 dark:text-white' : ''}`}>
        <Breadcrumb pageName="Profile" />
        
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="relative h-64 bg-gradient-to-r from-green-400 to-blue-500">
            <div className="absolute top-0 right-0 p-4 flex space-x-2">
              <button
                className="rounded-full bg-white p-3 text-green-600 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 group relative"
                aria-label="Edit Profile"
              >
                <FiEdit2 size={24} />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Edit Profile
                </span>
              </button>
              <button
                className="rounded-full bg-white p-3 text-green-600 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 group relative"
                aria-label="Share Profile"
              >
                <FiShare2 size={24} />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Share Profile
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="rounded-full bg-white p-3 text-red-600 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group relative"
                aria-label="Logout"
              >
                <FiLogOut size={24} />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Logout
                </span>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-end p-6">
              <div className="flex items-center space-x-5">
                <Image
                  src={userData.avatar || "/default-avatar.png"}
                  alt={userData.name}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full border-4 border-white bg-white object-cover shadow-lg"
                />
                <div className="text-white">
                  <h1 className="text-4xl font-bold">{userData.name}</h1>
                  <p className="text-xl">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                <dl className="space-y-6">
                  <div className="flex items-center">
                    <FiUser className="mr-3 text-green-500" size={24} />
                    <dt className="text-sm font-medium text-gray-500 w-24">Age:</dt>
                    <dd className="text-lg text-gray-900">{userData.age}</dd>
                  </div>
                  <div className="flex items-center">
                    <FiUser className="mr-3 text-green-500" size={24} />
                    <dt className="text-sm font-medium text-gray-500 w-24">Gender:</dt>
                    <dd className="text-lg text-gray-900">{userData.gender}</dd>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-3 text-green-500" size={24} />
                    <dt className="text-sm font-medium text-gray-500 w-24">Location:</dt>
                    <dd className="text-lg text-gray-900">{userData.defaultLocation}</dd>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-3 text-green-500" size={24} />
                    <dt className="text-sm font-medium text-gray-500 w-24">Birthdate:</dt>
                    <dd className="text-lg text-gray-900">{new Date(userData.dob).toLocaleDateString()}</dd>
                  </div>
                </dl>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-6">Share AirWatch</h2>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Image
                    src="/path/to/qr-code.png" // Replace with actual QR code image
                    alt="AirWatch QR Code"
                    width={200}
                    height={200}
                    className="rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600">Scan this QR code to join AirWatch</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Information</h2>
                <dl className="space-y-6">
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <FiHeart className="mr-3 text-green-500" size={24} />
                      Interests
                    </dt>
                    <dd className="text-lg text-gray-900">
                      {userData.interests && userData.interests.length > 0 ? (
                        userData.interests.slice(0, 5).map((interest: string, index: number) => (
                          <span key={index} className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span>No interests specified</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <FiCalendar className="mr-3 text-green-500" size={24} />
                      Joined AirWatch
                    </dt>
                    <dd className="text-lg text-gray-900">{new Date(userData.joinedDate).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <FiActivity className="mr-3 text-green-500" size={24} />
                      Last Active
                    </dt>
                    <dd className="text-lg text-gray-900">{userData.lastActive}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { FiShare2, FiMapPin, FiCalendar, FiUser, FiMail, FiHeart, FiActivity } from 'react-icons/fi';

export const metadata: Metadata = {
  title: "Profile | AirWatch",
  description: "View and edit your AirWatch profile",
};

const Profile = () => {
  // Dummy user data (replace with actual user data fetching logic)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    gender: "Male",
    location: "New York, USA",
    avatar: "/path/to/avatar.jpg", // Replace with actual path
    birthdate: "1993-05-15",
    interests: ["Air Quality", "Climate Change", "Sustainability"],
    joinDate: "2022-01-01",
    lastActive: "2023-04-15",
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-4xl">
        <Breadcrumb pageName="Profile" />
        
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="relative h-64 bg-gradient-to-r from-green-400 to-blue-500">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
              <div className="flex items-center space-x-5">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full border-4 border-white bg-white object-cover shadow-lg"
                />
                <div className="text-white">
                  <h1 className="text-4xl font-bold">{user.name}</h1>
                  <p className="text-xl">{user.email}</p>
                </div>
              </div>
              <button className="rounded-full bg-white p-3 text-green-600 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <FiShare2 size={28} />
              </button>
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
                    <dd className="text-lg text-gray-900">{user.age}</dd>
                  </div>
                  <div className="flex items-center">
                    <FiUser className="mr-3 text-green-500" size={24} />
                    <dt className="text-sm font-medium text-gray-500 w-24">Gender:</dt>
                    <dd className="text-lg text-gray-900">{user.gender}</dd>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-3 text-green-500" size={24} />
                    <dt className="text-sm font-medium text-gray-500 w-24">Location:</dt>
                    <dd className="text-lg text-gray-900">{user.location}</dd>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-3 text-green-500" size={24} />
                    <dt className="text-sm font-medium text-gray-500 w-24">Birthdate:</dt>
                    <dd className="text-lg text-gray-900">{user.birthdate}</dd>
                  </div>
                </dl>
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
                      {user.interests.map((interest, index) => (
                        <span key={index} className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                          {interest}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <FiCalendar className="mr-3 text-green-500" size={24} />
                      Joined AirWatch
                    </dt>
                    <dd className="text-lg text-gray-900">{user.joinDate}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <FiActivity className="mr-3 text-green-500" size={24} />
                      Last Active
                    </dt>
                    <dd className="text-lg text-gray-900">{user.lastActive}</dd>
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
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-6">
            <Link
              href="/profile/edit"
              className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;

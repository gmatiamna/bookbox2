
import React from 'react';
import { useGetProfileQuery, useGetUserPointsQuery } from "../slices/userApi"
import Nav from '../components/nav';

function Profile() {
  const { data: user, isLoading: loadingProfile } = useGetProfileQuery();
  const { data: pointsData, isLoading: loadingPoints } = useGetUserPointsQuery();

  if (loadingProfile || loadingPoints) return <div className="p-4 text-center">Loading...</div>;

  const {
    nom,
    email,
    d_ness,
    date_inscription,
    genre_prefere,
    photo_profil,
  } = user || {};

  const totalPoints = pointsData?.totalPoints || 0;

  return (
    <div> 
        <Nav/>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-20">
      <div className="flex items-center gap-4">
        <img
          src={photo_profil.includes('http') ? photo_profil : `/uploads/${photo_profil}`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-[#724521]"
        />
        <div>
          <h2 className="text-2xl font-bold text-[#724521]">{nom}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Date of Birth</p>
          <p className="font-medium">{new Date(d_ness).toLocaleDateString()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Joined</p>
          <p className="font-medium">{new Date(date_inscription).toLocaleDateString()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Preferred Genres</p>
          <p className="font-medium">{genre_prefere?.join(', ') || 'None selected'}</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl shadow-sm border border-yellow-300">
          <p className="text-sm text-yellow-800">Points Balance</p>
          <p className="text-xl font-bold text-yellow-700">{totalPoints} pts</p>
        </div>
      </div>
    </div></div>
    
  );
}

export default Profile;

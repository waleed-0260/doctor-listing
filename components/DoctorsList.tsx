"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  city: string;
}

interface DoctorsListProps {
  users: Doctor[];
}

const DoctorsList: React.FC<DoctorsListProps> = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState<Doctor[]>(users);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtering the doctors based on their specialty and city
  useEffect(() => {
    let filtered = users;

    if (selectedCity) {
      filtered = filtered.filter((user) => user.city.toLowerCase() === selectedCity.toLowerCase());
    }
    if (selectedSpecialty) {
      filtered = filtered.filter((user) => user.specialty.toLowerCase() === selectedSpecialty.toLowerCase());
    }
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [selectedCity, selectedSpecialty, searchQuery, users]);

  return (
    <div className="flex flex-col items-center justify-center my-5 w-full">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name..."
        className="mb-4 px-4 py-2 border rounded-lg w-80 shadow"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filter Controls */}
      <div className="flex space-x-4 mb-5">
        {/* City Filter */}
        <select
          className="px-4 py-2 border rounded-lg bg-white shadow"
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
        >
          <option value="">Filter by City</option>
          {[...new Set(users.map((user) => user.city))].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Specialty Filter */}
        <select
          className="px-4 py-2 border rounded-lg bg-white shadow"
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          value={selectedSpecialty}
        >
          <option value="">Filter by Specialty</option>
          {[...new Set(users.map((user) => user.specialty))].map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors List */}
      {filteredUsers.length > 0 ? (
        filteredUsers.map((item) => (
          <Link
            href={`/doctors/${item._id}`}
            key={item._id}
            className="w-[90%] flex items-center justify-between h-16 border-4 border-[#b6c2b9] bg-[#e4ede6] rounded-lg mb-3 px-4"
          >
            <div className="w-1/3 text-left font-semibold">{item.name}</div>
            <div className="w-1/3 text-left">{item.specialty}</div>
            <div className="w-1/3 text-left">{item.city}</div>
          </Link>
        ))
      ) : (
        <p className="text-gray-500">No doctors found.</p>
      )}
    </div>
  );
};

export default DoctorsList;

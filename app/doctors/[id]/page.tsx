"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const DoctorDetails = () => {
  const { id } = useParams(); // Get doctor ID from the URL
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/users/mongoose/${id}`);
        const data = await res.json();
        setDoctor(data.doctor);
        // console.log("doctor", data)
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!doctor) return <p className="text-center mt-10 text-red-500">Doctor not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Doctor Image */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
        <Image
          src={doctor.photo}
          alt={doctor.name}
          width={200}
          height={200}
          className="rounded-full border-4 border-gray-300 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-lg text-gray-600 mt-1">{doctor.specialty}</p>
          <p className="text-gray-500">{doctor.city}</p>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="mt-6 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-700">About</h3>
        <p className="text-gray-600 mt-2">{doctor.description}</p>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div>
            <h4 className="font-semibold text-gray-700">Office Location</h4>
            <p className="text-gray-600">{doctor.officeLocation}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Contact Info</h4>
            <p className="text-gray-600">{doctor.contactInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;

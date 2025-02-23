import React from 'react'
import { useEffect, useState } from "react";


const fetchDoctorById = async (id: string) => {
    try {
      const res = await fetch(`/api/users/mongoose/${id}`);
      if (!res.ok) throw new Error("Failed to fetch doctor");
      const data = await res.json();
      return data.doctor;
    } catch (error) {
      console.error("Error fetching doctor:", error);
      return null;
    }
  };
  


const SingleDoctor = () => {
    const [doctor, setDoctor] = useState<any>(null);

    useEffect(() => {
      const getDoctor = async () => {
        const data = await fetchDoctorById(id);
        setDoctor(data);
      };
      getDoctor();
    }, [id]);
  
    if (!doctor) return <p>Loading...</p>;
  return (
    <div>SingleDoctor</div>
  )
}

export default SingleDoctor
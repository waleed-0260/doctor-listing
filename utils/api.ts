export const fetchDoctorById = async (id: string) => {
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
  
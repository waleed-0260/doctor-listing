export const getDoctors = async () => {
    try {
      const res = await fetch(`/api/users/mongoose`, {
        cache: "no-store", // Ensure fresh data on every request
      });
  
      if (!res.ok) throw new Error("Failed to fetch doctors");
  
      const data = await res.json();
      return data.users;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  };
  
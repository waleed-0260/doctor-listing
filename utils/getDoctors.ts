export const getDoctors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/mongoose`);
  
      if (!res.ok) throw new Error("Failed to fetch doctors");
  
      const data = await res.json();
      return data.users;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  };
  
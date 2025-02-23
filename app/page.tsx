import DoctorsList from "@/components/DoctorsList";
import UserForm from "@/components/UserForm";
import Image from "next/image";
import { getDoctors } from "@/utils/getDoctors";

export default async function Home() {
  const users = await getDoctors();
  return (
    <>
    <DoctorsList users={users}/>
    </>
  );
}

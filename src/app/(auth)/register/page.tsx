import Register from "@/app/(auth)/register/components/Register";
import axios from "axios";

async function getProfile() {
  return axios.get("https://randomuser.me/api/0.4/?lego");
}

export default async function RegisterPage() {
  const profile = await getProfile();

  return <Register profile={profile.data} />;
}

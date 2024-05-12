import { Chip, Container } from "@mui/material";
import { HomePageStyled } from "@/app/(application)/page.styled";
import { Navbar } from "@/app/(application)/components/Navbar/Navbar";
import { api } from "@/constants/api";
import { GET_TOKEN } from "@/actions/token.actions";
import { redirect } from "next/navigation";
import { Fab } from "@/app/(application)/components/Fab/Fab";

async function getUser() {
  const token = await GET_TOKEN();

  if (!token) return redirect("/login");

  const user = await api.get<User>("/user/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return user;
}

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <Navbar user={user.data} />
      <Container maxWidth={false}>
        <HomePageStyled>
          <Chip label="Select a chat to start messageing" />
        </HomePageStyled>
      </Container>
      <Fab />
    </>
  );
}

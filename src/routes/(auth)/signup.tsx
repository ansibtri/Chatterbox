import { SignUp } from "@clerk/clerk-react";
import { Container } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Container sx={{
        padding: "80px"
      }}>
      <SignUp />
      </Container>
    </>
  );
}

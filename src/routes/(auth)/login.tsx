import { SignIn } from "@clerk/clerk-react";
import { Container } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          aligItems: "center",
        }}
      >
        <SignIn />
      </Container>
    </>
  );
}

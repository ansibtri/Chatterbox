import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Container, Grid2, Box, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { CustomLink } from "../shared/CustomLink";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const line1 = "A simple chat application";
  const line2 =
    "Chatterbox is a simple chat application built with Clerk, React,and TanStack.";
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <>
      <Container>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100%",
                flexDirection: "column",
                color: "white",
              }}
            >
              <motion.h2
                initial={{ transform: "translateY(-40px)", opacity: 0 }}
                animate={{ opacity: 1, transform: "translate(0)" }}
                transition={{ duration: 1 }}
              >
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{ textAlign: "left" }}
                >
                  {" "}
                  Welcome to
                </Typography>
              </motion.h2>
              <motion.h2
                initial={{ transform: "translateY(-40px)", opacity: 0 }}
                animate={{ opacity: 1, transform: "translate(0)" }}
                transition={{ duration: 1 }}
              >
                <Typography variant="h1" gutterBottom>
                  {" "}
                  Chatterbox
                </Typography>
              </motion.h2>

              <motion.h3
                className="load-screen--message"
                variants={sentence}
                initial="hidden"
                animate="visible"
              >
                {line1.split("").map((char, index) => {
                  return (
                    <motion.span key={char + "-" + index} variants={letter}>
                      {char}
                    </motion.span>
                  );
                })}
                <br />

                {line2.split("").map((char, index) => {
                  return (
                    <motion.span key={char + "-" + index} variants={letter}>
                      {char}
                    </motion.span>
                  );
                })}
              </motion.h3>
            </Box>

            <CustomLink
              to="/signup"
              color="inherit"
              sx={{
                marginTop: "16px",
                backgroundColor: "white",
                color: "black",
                transition: "transform 0.3s",
                transform: "scale(1)",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  transform: "scale(1.1)",
                },
              }}
              endIcon={<Send />}
            >
              Get Started
            </CustomLink>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <motion.div
              initial={{ transform: "translateX(100px)", opacity: 0 }}
              animate={{ opacity: 1, transform: "translate(0)" }}
              transition={{ duration: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img src="/32438.png" alt="chat" style={{ width: "100%" }} />
              </Box>
            </motion.div>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

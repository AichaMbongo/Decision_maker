import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Stack,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  Theme,
} from "@mui/material";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import BasicTextField from "../components/input-field";
import TextArea from "../components/TextArea";
import emailjs from "emailjs-com";
import { useTheme } from "@mui/material/styles";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fields = [
    {
      id: "name",
      label: "Name",
      variant: "outlined" as const,
      value: formData.name,
      onChange: handleChange,
      name: "name",
    },
    {
      id: "email",
      label: "Email",
      variant: "outlined" as const,
      value: formData.email,
      onChange: handleChange,
      name: "email",
    },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_z2h0kre",
        "template_s8oxbyc",
        e.currentTarget,
        "4lAxf2SoQmDnKjzUl"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message Sent Successfully");
        },
        (error) => {
          console.log(error.text);
          alert("Message Failed to Send");
        }
      );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ paddingY: 2 }}>
        <Stack sx={{ margin: isMobile ? "2vh 1vw" : "2vh 30px" }}>
          <BackButton />
        </Stack>

        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          textAlign="center"
          justifyContent="center"
          sx={{
            marginBottom: isMobile ? "50px" : "154px",
            padding: isMobile ? 2 : 3,
            marginTop: "10px",
          }}
        >
          <Box
            className="stack-container"
            sx={{ width: isMobile ? "90%" : "auto", maxWidth: "600px" }}
          >
            <Stack sx={{ p: isMobile ? 1 : 2 }} gap={9} direction="column">
              <Typography variant="h3" align="center">
                Contact Us
              </Typography>
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <BasicTextField fields={fields} />
                <Box
                  sx={{
                    height: isMobile ? "120px" : "200px",
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "10px",
                    padding: 2,
                  }}
                >
                  <TextArea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ height: "100%", width: "100%" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                    marginTop: "5vh",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: isMobile ? "80%" : "40vh", maxWidth: "300px" }}
                  >
                    Contact Support
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export default ContactUs;

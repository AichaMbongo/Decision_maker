
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Stack,
  Typography,
  Button,
  Box,
  Paper,
  useMediaQuery,
} from "@mui/material";
import emailjs from "emailjs-com";
import BackButton from "../components/BackButton";
import InputField from "../components/contact-input";
import TextArea from "../components/TextArea";
import Layout from "../components/Layout";
import theme from "../theme/theme";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const fields = [
    {
      id: "name",
      label: "Name",
      variant: "outlined" as const,
      defaultValue: "",
    },
    {
      id: "email",
      label: "Email",
      variant: "outlined" as const,
      defaultValue: "",
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
      <Stack sx={{ margin: "2vh" }}>
        <Box sx={{ marginLeft: "30px" }}>
          <BackButton />
        </Box>
      </Stack>

      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        sx={{ marginBottom: "154px", padding: 3, marginTop: "10px" }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 2, width: "100%", maxWidth: "600px" }}
        >
          <Typography variant="h3" align="center">
            Contact Us
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {fields.map((field) => (
                <InputField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  variant={field.variant}
                  value={formData[field.id as keyof FormData]}
                  onChange={handleChange}
                />
              ))}
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 2, width: "60ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: isMobile || isTablet ? "100%" : "50vh" }}
                >
                  Contact Support
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Stack>
    </Layout>
  );
};

export default ContactUs;

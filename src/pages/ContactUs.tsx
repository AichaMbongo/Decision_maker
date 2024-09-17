import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Stack, Typography, Button, Box, useMediaQuery } from '@mui/material';
import emailjs from 'emailjs-com';
import BackButton from '../components/BackButton';
import InputField from '../components/contact-input';
import TextArea from '../components/TextArea';
import Layout from '../components/Layout';
import theme from '../theme/theme';
import { Link } from 'react-router-dom';

interface FormData {
  from_name: string;  // Updated to match EmailJS placeholder
  from_email: string;  // Updated to match EmailJS placeholder
  new_message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    from_email: '',
    new_message: '',
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const fields = [
    { id: 'from_name', label: 'Name', variant: 'outlined' as const },  // Updated
    { id: 'from_email', label: 'Email', variant: 'outlined' as const },  // Updated
    { id: 'new_message', label: 'Message', variant: 'outlined' as const },  // Updated
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    emailjs.sendForm('service_z2h0kre', 'template_s8oxbyc', e.currentTarget, '4lAxf2SoQmDnKjzUl')
      .then((result) => {
        console.log(e.currentTarget);
        alert('Message Sent Successfully');
      }, (error) => {
        console.log(error.text);
        alert('Message Failed to Send');
      });

    // Clear the form
    setFormData({
      from_name: '',
      from_email: '',
      new_message: '',
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
        <Box sx={{ width: "100%", maxWidth: "600px", padding: 2 }}>
        <Typography variant="h3" align="center">
  Contact Us or{" "}
  <Button
    variant="contained"
    color="primary"
    href="https://forms.gle/e61tREbBSLFEW9AP6"
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      marginLeft: 2,
      textTransform: 'none',
    }}
  >
    Click to Fill in Our Feedback Form
  </Button>
</Typography>
          <Typography variant="h6" align="center" sx={{ mt: 2, mb: 4, color: 'text.secondary' }}>
  We’d love to hear from you! Whether you have feedback, questions, or just want to say hello, feel free to reach out to us. 
</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <form onSubmit={handleSubmit} style={{ width: "100%" }} noValidate autoComplete="off">
              {fields.map((field) => (
                <InputField
                  key={field.id}
                  id={field.id}
                  name={field.id} // Ensure name matches EmailJS template
                  label={field.label}
                  variant={field.variant}
                  value={formData[field.id as keyof FormData]}
                  onChange={handleChange}
                />
              ))}
              {/* <TextArea
                name="new_message"  // This should match the placeholder in your EmailJS template
                value={formData.new_message}
                onChange={handleChange}
              /> */}

              <Box sx={{ "& > :not(style)": { m: 2, width: "60ch" } }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: isMobile || isTablet ? "100%" : "50vh" }}
                >
                  Send
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Stack>
    </Layout>
  );
};

export default ContactUs;

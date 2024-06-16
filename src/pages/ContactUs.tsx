import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import BackButton from '../components/BackButton';
import { Stack, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Footer from '../components/Footer';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import InputField from '../components/contact-input';
import CustomButton from '../components/Button';
import TextArea from '../components/TextArea';
import DropArea from '../components/DropArea';
import Layout from '../components/Layout';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const fields = [
    { id: 'name', label: 'Name', variant: 'outlined' as const, defaultValue: '' },
    { id: 'email', label: 'Email', variant: 'outlined' as const, defaultValue: '' },
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
        console.log(result.text);
        alert('Message Sent Successfully');
      }, (error) => {
        console.log(error.text);
        alert('Message Failed to Send');
      });

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <Layout>
      <Stack style={{margin:'2vh'}}>
        <div style={{ marginLeft: '30px' }}> <BackButton /></div>
      </Stack>

      <Stack direction="column" spacing={2} alignItems="center" textAlign="center" justifyContent="center" style={{ marginBottom: '154px', padding: 3, marginTop: '10px' }}>
        <Box className="stack-container">
          <Stack sx={{ p: 2 }} gap={9} direction="column">
            <div><Typography variant='h3' align="center">Contact Us</Typography></div>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit}>
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
              <Box sx={{ marginRight: '0px', height: '200px', width: '690px', marginTop: '5px', marginBottom: '10px', padding: 2 }}>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center',  marginBottom: '20px', marginTop:'5vh' }}>
                <Button type="submit" variant="contained" style={{ width: '40vh' }}>Contact Support</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Stack>
    </Layout>
  );
};

export default ContactUs;

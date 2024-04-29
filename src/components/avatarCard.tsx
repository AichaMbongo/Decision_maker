import * as React from 'react';
import { Avatar, Button, Card, CardContent, Typography} from '@mui/material';

interface Profile {
    name: string;
    role: string;
    avatarUrl: string;
    profileUrl: string;
}

interface Props{
    profile: Profile;
}

const ProfileCard:React.FC<Props> = ({ profile }) => {
    return (
        <Card>
            <CardContent>
            <Avatar alt={profile.name} src={profile.avatarUrl} />
            <Typography variant="body1">{profile.role}</Typography>
            <Button variant="outlined" href="{profile.profileUrl}" target="_blank" rel="noopener noreferrer">
          {profile.name}
        </Button> 
        </CardContent>      
         </Card>
    )
}

export default ProfileCard;

// how to use in <code>const profile = {
//     name: 'John Doe',
//     role: 'Software Engineer',
//     avatarUrl: 'https://example.com/avatar.jpg',
//     profileUrl: 'https://example.com/profile', // Add profileUrl property
//   };
  
//   // Render the ProfileCard component with the profile object
//   <ProfileCard profile={profile} />;
//   </code>
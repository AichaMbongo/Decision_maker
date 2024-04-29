import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}



const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface MyComponentProps {
  title: string;
  description: string;
  image: string;
  collapsible?: boolean;
}

const defaultProps: Partial<MyComponentProps> = {
  collapsible: true,
}


const collapsible = []


export default function PostCard(props: MyComponentProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 405 }}>

      <CardMedia
        component="img"
        height="324"
        sx= {{
          padding: '3%'
        }}
        image={props.image}
 
      />

      <CardContent sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h4" sx={{
   
          textAlign: 'center'
        }} >
                  {props.title}        
        </Typography>



        <CardActions disableSpacing>
        
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
      </CardActions>
      </CardContent>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            {props.description}
        </CardContent>
      </Collapse>



    </Card>
  );
}

PostCard.defaultProps = defaultProps

// using the component 
{/* <PostCard title= "AHP" description ="Lorem  lorem kdsiofeuh hdadide fdiahhdiua
hjabfdhjab casifdaicb usabhsa cb usabhcdbkshjaibc hjbua cbdbjauba au iadiubadab
 hbyua dhaanm cai iuabiyaabiualbyera vytyaui" image='public/postcard.jpg'/> */}
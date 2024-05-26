import React from 'react'
import BackButton from '../components/BackButton';
import { Stack, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from '../components/Layout';
import { NavLink } from 'react-router-dom';
import CustomButton from '../components/Button';
import { useBreadcrumbs } from '../context/BreadcrumbsProvider';

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }


const handleClick = () => {
    console.log("Button is Clicked");
}


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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




function DecisionModel() {
    const [expanded, setExpanded] = React.useState(false);

    const [expanded2, setExpanded2] = React.useState(false);

    const [expanded3, setExpanded3] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleExpandClick2 = () => {
        setExpanded2(!expanded2);
    };

    const handleExpandClick3 = () => {
        setExpanded3(!expanded3);
    };

    const models = [
        {
            modelname: 'Analytical Hierachial Process',
            desc: 'This is the AHP Model',
            modelimg: "../balance.jpg",
            expanded: expanded,
            expandclick: handleExpandClick

        },
        {
            modelname: 'Forced Choice',
            desc: 'This is the Forced Choice Model',
            modelimg: "../yes-no.jpg",
            expanded: expanded2,
            expandclick: handleExpandClick2
        },
        {
            modelname: 'Multi-criteria Analysis',
            desc: 'This is the Multi-criteria Analysis Model',
            modelimg: "../mcda-dm.png",
            expanded: expanded3,
            expandclick: handleExpandClick3
        }
    ]
    

    const { handleNavigation } = useBreadcrumbs();
  const EnterNewCriteria = () => {
    handleNavigation('/newCriteria', 'New Criteria');
  };
  
    return (
        < Layout>
            <Stack sx={{ p: 2 }} gap={9} direction="column">

                <div role="presentation" onClick={handleClick} style={{ marginLeft: '90px' }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            Decision
                        </Link>

                        <Link
                            underline="hover"
                            color="inherit"
                            href="/decisionModel"
                        >
                            Decision Model
                        </Link>
                    </Breadcrumbs>
                </div>
            </Stack>
            <Stack>
                <div style={{ marginLeft: '30px' }}> <BackButton /></div>
            </Stack>
            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
                <Typography variant='h3' align="center">Pick a decision model</Typography>
                <PsychologyAltIcon style={{ fontSize: '56px', padding: '2' }} />
            </Stack>
            <Stack sx={{ p: 1 }} gap={4} direction="column">
                <Grid alignItems="center" justifyContent="center" container padding={4} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {models.map((model, index) => (
                        <Grid item xs={3} key={index} >
                            <Item>
                                <Card sx={{ maxWidth: 405 }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        sx={{
                                            padding: '3%'
                                        }}
                                        //image={require(`${model.modelimg}`)}
                                    />
                                    <CardContent sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Typography variant="subtitle1" sx={{

                                            textAlign: 'center'
                                        }} >
                                            {model.modelname}
                                        </Typography>
                                        <CardActions disableSpacing>
                                            <ExpandMore
                                                 expand={model.expanded}
                                                 onClick={model.expandclick}
                                                 aria-expanded={model.expanded}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </ExpandMore>
                                        </CardActions>
                                    </CardContent>
                                    <Collapse in={model.expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            {model.desc}
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </Item>
                        </Grid>
                    ))}


                </Grid>
            </Stack>
            <Stack sx={{ p: 1 }} gap={6} direction="row" alignItems="center" justifyContent="center" style={{ marginBottom: '30px' }}>

                <NavLink to="/NewDecision" style={{ textDecoration: 'none', color: 'inherit' }}>

                    <CustomButton onClick={handleClick} startIcon={<ArrowBackIosIcon />}>
                        Back to new decision
                    </CustomButton>
                </NavLink>
                <NavLink to="/newCriteria" style={{ textDecoration: 'none', color: 'inherit' }}>

                    <CustomButton onClick={EnterNewCriteria} endIcon={<ArrowForwardIosIcon />}>
                        Enter Criteria
                    </CustomButton>
                </NavLink>
            </Stack>
        </Layout>
        // </ThemeProvider>
    )
}

export default DecisionModel
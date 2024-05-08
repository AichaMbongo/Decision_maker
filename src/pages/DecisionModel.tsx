import React, { useState } from 'react'
import Header from '../components/Header'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import BackButton from '../components/BackButton';
import { Button, Stack, Typography } from '@mui/material';
import Footer from '../components/Footer';
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
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Layout from '../components/Layout';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
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


function DecisionModel(){
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

    return (
            < Layout>
            <Stack sx={{ p: 2 }} gap={9} direction="column">
                <div> <Header /></div>
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
                <Typography variant='h4' align="center">Pick a decision model</Typography>
                <PsychologyAltIcon style={{ fontSize: '56px', padding: '2' }} />
            </Stack>
            <Stack sx={{ p: 1 }} gap={4} direction="column">
                <Grid alignItems="center" justifyContent="center" container padding={4} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={3}>
                        <Item>
                            <Card sx={{ maxWidth: 405 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    sx={{
                                        padding: '3%'
                                    }}
                                    image={''}
                                />
                                <CardContent sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <Typography variant="h5" sx={{

                                        textAlign: 'center'
                                    }} >
                                        Forced Choice
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
                                        This is the Forced Choice Model
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                        <Card sx={{ maxWidth: 405 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    sx={{
                                        padding: '3%'
                                    }}
                                    image={''}
                                />
                                <CardContent sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <Typography variant="h5" sx={{

                                        textAlign: 'center'
                                    }} >
                                       Multi-criteria Analysis
                                    </Typography>
                                    <CardActions disableSpacing>
                                        <ExpandMore
                                            expand={expanded2}
                                            onClick={handleExpandClick2}
                                            aria-expanded={expanded2}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                </CardContent>
                                <Collapse in={expanded2} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        This is the Multi-criteria Analysis Model.
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                        <Card sx={{ maxWidth: 405 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    sx={{
                                        padding: '3%'
                                    }}
                                    image={''}
                                />
                                <CardContent sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <Typography variant="h5" sx={{

                                        textAlign: 'center'
                                    }} >
                                       AHP
                                    </Typography>
                                    <CardActions disableSpacing>
                                        <ExpandMore
                                            expand={expanded3}
                                            onClick={handleExpandClick3}
                                            aria-expanded={expanded3}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                </CardContent>
                                <Collapse in={expanded3} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        This is the Analytical Hierachial Process Model.
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Item>
                    </Grid>
                </Grid>
            </Stack>
            <Stack sx={{ p: 1 }} gap={6} direction="row" alignItems="center" justifyContent="center" style={{ marginBottom: '30px' }}>
                <Button sx={{ width: '200px' }} variant="contained"><ArrowBackIosIcon style={{ marginRight: '3px' }} />Back to Homepage</Button>
                <Button sx={{ width: '200px' }} variant="contained">Enter Criteria<ArrowForwardIosIcon style={{ marginLeft: '4px' }} /></Button>
            </Stack>
            </Layout>
        // </ThemeProvider>
    )
}

export default DecisionModel
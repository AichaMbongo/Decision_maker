
import React from 'react'
import {Link, Typography} from '@mui/material'

import Breadcrumbs from '@mui/material/Breadcrumbs';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const BreadCrumbs_component = () => {
    return (
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
                <Typography color="text.primary">AHP Model</Typography>
                <Typography color="text.primary">New Criteria</Typography>
            </Breadcrumbs>
        </div>
    )
}

export default BreadCrumbs_component
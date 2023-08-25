import React, { FC } from 'react'
import { Box, Stack, Typography } from '@mui/material'

import {Logo} from '../../assets/icons/Logo'
import HeaderProfile from './HeaderProfile'

interface Props {
    height?: number | string,
}

const Header: FC<Props> = ({height = 64}) => {
    return(
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={2} sx={{
            position: 'sticky',
            zIndex: 'modal',
            top: 0,
            paddingX: 3,
            width: `calc(1 - ${3 * 16}px)`,
            height,
            backgroundColor: 'white',
        }}>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center'
            }}>
                <Logo />
                <Typography variant='h3'>MeetsOne</Typography>
            </Box>
            <HeaderProfile />
        </Stack>
    )
}

export default Header

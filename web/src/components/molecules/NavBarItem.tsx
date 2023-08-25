import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import {SvgIconComponent} from '@mui/icons-material'

interface Props {
    label: string,
    Icon: SvgIconComponent
    active?: boolean,
    width?: number | string,
    height?: number | string,
    paddingX?: number | string,
    gap?: number,
}

const NavBarItem: FC<Props> = ({
    label,
    Icon,
    active = false,
    width = 200,
    height = 40,
    paddingX = 2,
    gap = 1
    }) => {

    const backgroundColor = active ? 'primary.100' : 'primary.700'
    const textColor = active?  'dark': 'white'

    return(
        <Box sx={{
            display: "flex",
            alignItems: "center",
            width,
            height,
            backgroundColor,
            ":hover": {
                backgroundColor: 'primary.100',
                "> div > span": {
                    color: 'dark',
                },
                "> div > svg": {
                    color: 'dark',
                },
            }
        }}>
            <Box sx={{
            display: "flex",
            alignItems: "center",
            paddingX,
            gap,
        }}>

            <Icon htmlColor={textColor} />
            <Typography variant='label1r' color={textColor}>{label}</Typography>
            </Box>
        </Box>
    )
}

export default NavBarItem

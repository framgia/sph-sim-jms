"use client"

import React, { FC } from 'react'
import { Menu } from '@mui/icons-material'
import { Box, ButtonBase } from '@mui/material'

import NavBarItem from '../molecules/NavBarItem'
import { Menus } from '@/utils/constants/navbarMenu'

interface Props {
    expanded?: boolean,
    width?: number |string,
    height?: number | string,
    paddingY?: number |string,
    rowGap?: number |string,
    handleToggle: () => void
}

const NavBar: FC<Props> = ({
    expanded = true,
    width = 200,
    paddingY = 2,
    rowGap = 2,
    handleToggle
    }) => {

    return(
        <Box sx={{
            position: 'fixed',
            zIndex: 'modal',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: expanded ? width : 66,
            minWidth:  expanded ? width : 66,
            height: `calc(100vh - 64px - ${paddingY as number *16}px)`,
            paddingY,
            margin: 0,
            rowGap,
            overflow: 'hidden',
            backgroundColor: 'primary.700',
            transition: 'all 0.3s'
        }}>
            <Box sx={{
                alignSelf: 'flex-end',
                paddingX: 2,
            }}>
                <ButtonBase onClick={handleToggle}>
                    <Menu htmlColor='white' />
                </ButtonBase>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: expanded ? 1 : 0,
                visibility: expanded ? "visible" : "hidden",
                transition: 'all 0.3s',
            }}>
                {Menus.map((item, index) => (
                    <ButtonBase key={index} disableRipple>
                        <NavBarItem label={item.name} Icon={item.Icon} linkTo={item.href}/>
                    </ButtonBase>
                )
                )}
            </Box>
        </Box>
    )
}

export default NavBar

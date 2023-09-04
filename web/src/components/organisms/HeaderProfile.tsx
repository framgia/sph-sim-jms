'use client'

import React, { FC } from 'react'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {Create, Logout, ArrowDropDown} from '@mui/icons-material'
import { Box, Typography, Paper, Button, Stack, Avatar, Popper, Grow, IconButton } from '@mui/material'

interface Props {
    name?: string,
    email?: string,
    avatar?: string,
}

const HeaderProfile: FC<Props> = ({
    name = "John Doe",
    email = "johndoe@sun-asterisk.com"
}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
        ) {
        return;
        }

        setOpen(false);
    };

    return(
        <Box>
            <Box
                ref={anchorRef}
                sx={{
                    display: 'flex',
                    gap: 1,
                }}
            >
                <Avatar />
                <IconButton
                    onClick={handleToggle}
                    ref={anchorRef}
                    aria-label='profile-dropdown'
                >
                    <ArrowDropDown />
                </IconButton>
            </Box>

            <Popper
                anchorEl={anchorRef.current}
                open={open}
                placement='bottom-end'
                role={undefined}
                transition
                sx={{zIndex: 'modal'}}
            >
                {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: 'right top',
                    }}
                >
                    <Paper sx={{
                        display: "block",
                        alignItems: "center",
                        flexDirection: 'column',
                        width: "217px",
                        height: "142px",
                        marginTop: 1,
                        backgroundColor: 'white',
                        boxSizing: 'border-box'
                    }}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <IconButton sx={{
                                    position: 'absolute',
                                    marginTop: 1,
                                    marginRight: 1,
                                    alignSelf: 'flex-end',
                                }}>
                                    <Create fontSize='small' />
                                </IconButton>
                                <Stack sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 1,
                                    height: '86px',
                                    boxSizing: 'border-box',
                                    padding: 1,
                                    borderTopLeftRadius: 4,
                                    borderTopRightRadius: 4,
                                    backgroundColor: 'primary.100'
                                }}>
                                    <Typography variant='label1b'>{name}</Typography>
                                    <Typography variant='label3r'>{email}</Typography>
                                </Stack>
                                <Box sx={{
                                    display: 'flex',
                                    height: '56px',
                                    width: 1,
                                }}>
                                    <Button variant='text' size='small' startIcon={<Logout />} fullWidth>
                                        Logout
                                    </Button>
                                </Box>
                            </Box>
                        </ClickAwayListener>
                    </Paper>
                </Grow>)}
            </Popper>
        </Box>
    )
}

export default HeaderProfile

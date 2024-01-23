import { useState } from "react";
import { AppBar, Divider, Fade, IconButton, ListItemIcon, Menu, MenuItem, MenuList } from "@mui/material";
import { ContentCopy, ContentCut, ContentPaste, FileDownload, FileUpload, HelpCenter, MoreVert, Redo, Undo } from "@mui/icons-material";

import TextEdit from "../textEdit/textEdit";
import GuardianLogo from '../../assets/images/logo/guardian-logo-solid.svg?react';

const Header = () => {
    const [headerMenu, setHeaderMenu] = useState(null);

    const onCloseMenu = () => setHeaderMenu(null);

    return (
        <>
            <AppBar className='actions-panel__header' elevation={0}>
                <GuardianLogo className='actions-panel__header-logo' />
                <TextEdit 
                    className='actions-panel__header-text-edit'
                    tooltip='Edit job name'
                    value='Untitled Job' 
                />
                <IconButton 
                    className='actions-panel__header-more' 
                    disableRipple
                    onClick={(e) => setHeaderMenu(e.currentTarget)}
                >
                    <MoreVert/>
                </IconButton>
            </AppBar>
            <Menu
                anchorEl={headerMenu}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                className='actions-panel__header-menu'
                onClose={onCloseMenu}
                onClick={onCloseMenu}
                open={Boolean(headerMenu)}
                TransitionComponent={Fade}
            >
                <MenuList sx={{minWidth: '200px'}}>
                    <MenuItem>
                        <ListItemIcon>
                            <Undo fontSize='small' />
                        </ListItemIcon>
                        Undo
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Redo fontSize='small' />
                        </ListItemIcon>
                        Redo
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCut fontSize='small' />
                        </ListItemIcon>
                        Cut
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCopy fontSize='small' />
                        </ListItemIcon>
                        Copy
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentPaste fontSize='small' />
                        </ListItemIcon>
                        Paste
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <FileDownload fontSize='small' />
                        </ListItemIcon>
                        Import
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <FileUpload fontSize='small' />
                        </ListItemIcon>
                        Export
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <HelpCenter fontSize='small' />
                        </ListItemIcon>
                        Help
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}

export default Header;

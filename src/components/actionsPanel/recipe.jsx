import { Add, MoreVert, Save } from "@mui/icons-material";
import { Fade, FormControl, FormControlLabel, IconButton, ListItemIcon, Menu, MenuItem, MenuList, Stack, Switch, TextField } from "@mui/material";
import { useState } from "react";

const Recipe = () => {
    const [recipeMenu, setRecipeMenu] = useState(null);
    const onCloseMenu = () => setRecipeMenu(null);

    return (
        <div className="recipe">
            <p>Recipe 
                <IconButton
                    className='recipe__more' 
                    disableRipple
                    onClick={(e) => setRecipeMenu(e.currentTarget)}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    anchorEl={recipeMenu}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    className='recipe__menu'
                    onClose={onCloseMenu}
                    onClick={onCloseMenu}
                    open={Boolean(recipeMenu)}
                    TransitionComponent={Fade}
                >
                    <MenuList sx={{minWidth: '200px'}}>
                        <MenuItem>
                            <ListItemIcon>
                                <Add fontSize='small' />
                            </ListItemIcon>
                            New
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Add fontSize='small' />
                            </ListItemIcon>
                            Open
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Save fontSize='small' />
                            </ListItemIcon>
                            Save
                        </MenuItem>
                    </MenuList>
                </Menu>
            </p>
            <Stack spacing={1}>
                <TextField size='small' label='Gallons per acre' variant='filled' />
                <TextField size='small' label='Width' variant='filled' />
                <TextField size='small' label='Offset' variant='filled' />
                <TextField size='small' label='Overlap' variant='filled' />
                <FormControl fullWidth>
                    <FormControlLabel
                        value="true"
                        control={
                            <Switch />
                        }
                        label="Dynamic Spray"
                    />
                </FormControl>
            </Stack>
        </div>
    )
}

export default Recipe;

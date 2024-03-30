import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from '@mui/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledButtonOutlined = withStyles({
    root: {
        border: '0.5px solid rgba(120, 144, 156, 0.5)',
        '&:hover': {
            borderColor: '#7766aa',
        },
    }
})(Button);

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(3),
        minWidth: '250px',
        border: '1px solid rgba(96,125,139,0.5)',
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            margin: "5px",
            '& .MuiSvgIcon-root': {
                marginRight: theme.spacing(1.5),
            },
            '&:hover': {
                backgroundColor: '#7766aa',
                color:'#fff',
                borderRadius: "5px"
            },
        },
    },
}));

export default function CustomizedMenus(props) {
    const [selectedItem, setSelectedItem] = React.useState(props.menuOptions[0]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const menuClick = (event) => {
        props.parentCallBack(event.target.innerText);
        setSelectedItem(event.target.innerText);
        handleClose();
    };
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:"center"}}>
            <StyledButtonOutlined
                disableRipple
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                color='secondary'
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                sx={{color: '#fff',mb:3, fontWeight: 500, border: 1 }}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {selectedItem}
            </StyledButtonOutlined>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    props.menuOptions.map(child =>
                        < MenuItem onClick={menuClick} key={child} disableRipple>
                            {child}
                        </MenuItem>

                    )}
            </StyledMenu>
        </div >
    );
}
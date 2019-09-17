import React, { Component } from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton, Slider, ClickAwayListener } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import MediaQuery from 'react-responsive';

const styles = {
  line: {
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    borderRightStyle: 'solid',
    borderWidth: 1
  },
  menuButton: {
    position: 'absolute',
    right: 15
  }
}

function Header(props) {
  var openMenu;

  return (
    <div>
    <AppBar position="static">
        <Toolbar >
          <Typography variant="h6" > SORTING VISUALIZER </Typography>
          <div style={styles.line}></div>
          <MediaQuery minWidth={1000}>
            <Typography style={{flexGrow: 1}} variant="h6" >
              <HeaderButtons history={props.history}/>
            </Typography>
          </MediaQuery> 
          <MediaQuery maxWidth={1000}>        
            <IconButton onClick={(e) => openMenu(e)} edge="start" style={styles.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </MediaQuery>
          <MenuDropdown onMenuClick={(e) => {openMenu = e;}} history={props.history}/>
        </Toolbar>
    </AppBar>
    </div>
  );
}

function MenuDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
      setAnchorEl(event.currentTarget);
  }

  function handleClose(event) {
      setAnchorEl(null);
  }
  props.onMenuClick(handleClick);
  return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => {handleClose(e); props.history.push('bubble-sort')}}>BUBBLE SORT</MenuItem>
        <MenuItem onClick={(e) => {handleClose(e); props.history.push('insertion-sort')}}>INSERTION SORT</MenuItem>
        <MenuItem onClick={(e) => {handleClose(e); props.history.push('selection-sort')}}>SELECTION SORT</MenuItem>
        <MenuItem onClick={(e) => {handleClose(e); props.history.push('merge-sort')}}>MERGE SORT</MenuItem>
        <MenuItem onClick={(e) => {handleClose(e); props.history.push('quick-sort')}}>QUICK SORT</MenuItem>

      </Menu>
  );
}

function HeaderButtons(props) {
  return (
      <div>
        <Button color="inherit" onClick={() => props.history.push('bubble-sort')}>BUBBLE SORT</Button>
        <Button color="inherit" onClick={() => props.history.push('insertion-sort')}>INSERTION SORT</Button>
        <Button color="inherit" onClick={() => props.history.push('selection-sort')}>SELECTION SORT</Button>
        <Button color="inherit" onClick={() => props.history.push('merge-sort')}>MERGE SORT</Button>
        <Button color="inherit" onClick={() => props.history.push('quick-sort')}>QUICK SORT</Button>
      </div>
  );
}


export default Header;
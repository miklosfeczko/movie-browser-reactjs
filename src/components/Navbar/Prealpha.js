import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Navbar from './Navbar'
import './Prealpha.scss'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

return (
    <div className={classes.root} id="appbar__tweak">
      <AppBar position="static" style={{backgroundColor: '#546e7a'}}>
        <Toolbar style={{padding: '0'}}>
            <Navbar />   
        </Toolbar>
      </AppBar>
    </div>
  );
}
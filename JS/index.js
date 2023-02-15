import React from "react";
import ReactDOM from 'react-dom/client';
import StopIcon from '@material-ui/icons/Stop';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function SvgIconsColor() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon style={{ color: green[500] }} />
    </div>
  );
}
console.log('succesful load index.js')

const root = ReactDOM.createRoot(document.getElementById('source_tips'));
root.render(
  <React.StrictMode>
    <SvgIconsColor />
  </React.StrictMode>
);

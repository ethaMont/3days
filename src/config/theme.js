import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import {
  teal100,
  teal300,
  teal500,
  teal700,
  tealA200,
  darkBlack,
  white,
  lightBlack,
} from 'material-ui/lib/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: lightBlack,
    accent1Color: tealA200,
    accent2Color: teal100,
    accent3Color: teal500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: teal300,
    disabledColor: teal100,
    pickerHeaderColor: teal500,
  },
  appBar: {
    height: 50,
  },
});

export default muiTheme;

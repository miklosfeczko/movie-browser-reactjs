import {Rating} from '@material-ui/lab/';
import { withStyles } from '@material-ui/core/styles';

// RATING STYLES
export const StyledRating = withStyles({
    iconFilled: {
      color: '#37474f',
    },
    iconHover: {
      color: '#ff3d47',
    },
    iconEmpty: {
      color: '#9e9e9e'
    }
})(Rating);
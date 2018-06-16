import Grid from '@material-ui/core/Grid';
import * as React from 'react';

// JSS & Typescrpt helpers used in Material
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from '@material-ui/core/styles/withStyles';

const styles: StyleRulesCallback = theme => ({
  container: {
    margin: 'auto',
    maxWidth: '60%',
    
  },
  gridItem: {
    backgroundColor: 'blue',
    color: 'red',
    padding: 8
  }
});

// define the State
interface IState {
  open: boolean;
}

// namespace used to import props with styles
/* tslint:disable:no-namespace */
export namespace CreateMetaData {
  export interface IProps {
    classes: any;
  }
}

// main class
class CreateMetaData extends React.Component<WithStyles<any>, IState> {
  public state = {
    open: true
  };

  public render() {
    // assign this.props.classes to classes
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid className={classes.grid} container={true} spacing={24}>
          <Grid item={true} xs={12} className={classes.gridItem}>
            <div>Grid Item 1</div>
          </Grid>
          <Grid item={true} xs={12} className={classes.gridItem}>
            <div>Grid Item 2</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// export withStyles
export default withStyles(styles)<CreateMetaData.IProps>(CreateMetaData);

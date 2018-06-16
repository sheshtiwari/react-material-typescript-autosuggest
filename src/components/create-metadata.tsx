import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import withStyles, {
  StyleRulesCallback,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import * as React from 'react';
const styles: StyleRulesCallback = theme => ({
  container: {
    background: '#fff',
    fontFamily: 'Roboto',
    margin: 'auto',
    maxWidth: '60%'
  },
  form: {
    padding: 14
  },
  gridItem: {
    color: '#b6b6b6',
    padding: 8
  },
  header: {
    background: '#13354E',
    color: '#6393cb',
    display: 'flex',
    fontSize: 24,
    lineHeight: '24px',
    padding: 7,
    verticalAlign: 'middle'
  }
});

// define the State
interface IState {
  form: {
    schema: any;
    name: string;
    open: boolean;
  };
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
  public state: IState = {
    form: {
      name: 'hat',
      open: true,
      schema: ''
    }
  };

  public handleFormChange = (event: any) => {
    const form = Object.assign({}, this.state.form);
    if (form.hasOwnProperty(event.target.name)) {
      form[event.target.name] = event.target.value;
      this.setState({ form });
    }
  };

  public render() {
    // assign this.props.classes to classes
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div style={{ marginLeft: 7 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#6393cb"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
            </svg>
          </div>
          <div style={{ marginLeft: 7 }}>Create Metadata</div>
        </div>
        <form className={classes.form} autoComplete="off">
          <Grid className={classes.grid} container={true} spacing={24}>
            <Grid item={true} xs={12} className={classes.gridItem}>
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="schema">Schema</InputLabel>
                  <Select
                    value={this.state.form.schema}
                    onChange={this.handleFormChange}
                    inputProps={{
                      id: 'schema',
                      name: 'schema'
                    }}
                    style={{ width: 87 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Thing</MenuItem>
                    <MenuItem value={20}>Person</MenuItem>
                    <MenuItem value={30}>Place</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item={true} xs={12} className={classes.gridItem}>
              <div>Grid Item 2</div>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

// export withStyles
export default withStyles(styles)<CreateMetaData.IProps>(CreateMetaData);

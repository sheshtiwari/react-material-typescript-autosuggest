import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import withStyles, {
  StyleRulesCallback,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import IThing from '../models/thing';

import * as React from 'react';
import SearchItem from './search-item';

const styles: StyleRulesCallback = theme => ({
  buttonCancel: {
    background: '#CCCCD1',
    color: '#fff'
  },
  buttonSubmit: {
    background: '#008347',
    color: '#fff'
  },
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

interface IState {
  form: IThing;
  errors: object;
}

/* tslint:disable:no-namespace */
export namespace CreateMetaData {
  export interface IProps {
    classes: any;
  }
}

class CreateMetaData extends React.Component<WithStyles<any>, IState> {
  public state: IState = {
    errors: {},
    form: {
      additionalType: '',
      alternateName: '',
      description: '',
      image: '',
      name: '',
      sameAs: '',
      type: "thing",
      url: ''
    }
  };

  public handleFormChange = (event: any) => {
    const form = Object.assign({}, this.state.form);
    if (form.hasOwnProperty(event.target.name)) {
      form[event.target.name] = event.target.value;
      this.setState({ form });
    }
  };
  public cancel = (e: any) => {
    const form = Object.assign({}, this.state.form);
    const errors = Object.assign({}, this.state.errors);
    Object.keys(errors).forEach(error => {
      errors[error] = false;
    });
    Object.keys(form).forEach(item => {
      form[item] = '';
    });
    this.setState({ form, errors });
    e.preventDefault();
  };

  public handleSubmit = (event: any) => {
    let valid = true;
    const form = Object.assign({}, this.state.form);
    const errors = Object.assign({}, this.state.errors);
    Object.keys(errors).forEach(error => {
      errors[error] = form[error][error] === '';
      if (errors[error]) {
        valid = false;
      }
    });
    this.setState({ errors });
    if (valid) {
      alert(JSON.stringify(form));
    }
    event.preventDefault();
    return false;
  };

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div style={{ marginLeft: 0 }}>
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

        <form
          className={classes.form}
          autoComplete="off"
          noValidate={true}
          onSubmit={this.handleSubmit}
        >
          <Grid className={classes.grid} container={true} spacing={24}>
            <Grid item={true} xs={12} className={classes.gridItem}>
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="schema">Schema</InputLabel>
                  <Select
                    value={this.state.form.type}
                    onChange={this.handleFormChange}
                    inputProps={{
                      id: 'type',
                      name: 'type'
                    }}
                    style={{ width: 87 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="thing">Thing</MenuItem>
                    <MenuItem value="person">Person</MenuItem>
                    <MenuItem value="place">Place</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item={true} xs={12} className={classes.gridItem}>
              <div>
                <SearchItem
                  textFieldValue={this.state.form.name || ''}
                  handleInputChange={this.handleFormChange}
                />
              </div>
            </Grid>
            <Grid item={true} xs={12} className={classes.griditem}>
              <TextField
                style={{ width: '80%' }}
                id="description"
                name="description"
                className={classes.textfield}
                label="Description"
                onChange={this.handleFormChange}
                value={this.state.form.description}
              />
            </Grid>
            <Grid item={true} xs={6} className={classes.griditem}>
              <TextField
                id="image"
                name="image"
                className={classes.textfield}
                label="Image"
                onChange={this.handleFormChange}
                value={this.state.form.image}
              />
            </Grid>
            <Grid item={true} xs={6} className={classes.griditem}>
              <TextField
                id="sameAs"
                name="sameAs"
                className={classes.textfield}
                label="Same As"
                onChange={this.handleFormChange}
                value={this.state.form.sameAs}
              />
            </Grid>
            <Grid item={true} xs={6} className={classes.griditem}>
              <TextField
                id="alternateName"
                name="alternateName"
                className={classes.textfield}
                label="Alternate Name"
                onChange={this.handleFormChange}
                value={this.state.form.alternateName}
              />
            </Grid>
            <Grid item={true} xs={6} className={classes.griditem}>
              <TextField
                id="url"
                name="url"
                className={classes.textfield}
                label="URL"
                onChange={this.handleFormChange}
                value={this.state.form.url}
              />
            </Grid>
            <Grid
              item={true}
              xs={12}
              className={classes.griditem}
              style={{ textAlign: 'right' }}
            >
              <Button onClick={this.cancel} className={classes.buttonCancel}>
                CANCEL
              </Button>&nbsp;&nbsp;
              <Button className={classes.buttonSubmit} type="submit">
                SAVE
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

// export withStyles
export default withStyles(styles)<CreateMetaData.IProps>(CreateMetaData);

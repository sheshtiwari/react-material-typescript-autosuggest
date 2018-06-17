import * as React from 'react';

import { StyleRulesCallback, TextField } from '@material-ui/core/';

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import * as Autosuggest from 'react-autosuggest';

/* tslint:disable:no-require-imports */
/* tslint:disable:no-var-requires */
const match = require('autosuggest-highlight/match');
const parse = require('autosuggest-highlight/parse');

const suggestions = [{}];
const styles: StyleRulesCallback = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  formControl: {
    background: 'red'
  },
  input: {
    fontSize: 14,
    maxWidth: 368,
    width: 112
  },
  inputLabel: {
    color: '#8d97a5',
    fontSize: 12
  },
  menuItem: {
    fontFamily: 'Roboto',
    fontSize: 14,
    height: 16
  },

  selectEmpty: {
    background: '#fff',
    marginTop: theme.spacing.unit * 2
  },

  suggestion: {
    display: 'block'
  },
  suggestionsContainerOpen: {
    left: 0,
    marginTop: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  suggestionsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
});

function renderSuggestion(
  suggestion: any,
  { query, isHighlighted }: { query: any; isHighlighted: boolean }
) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part: any, index: any) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}
function getSuggestionValue(suggestion: any) {
  return suggestion.label;
}

function renderSuggestionsContainer(options: any) {
  const { children } = options;
  return (
    <Paper {...options.containerProps} square={true}>
      {children}
    </Paper>
  );
}

function getSuggestions(value: any) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter((suggestion: any) => {
        const keep =
          count < 5 &&
          suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }
        return keep;
      });
}

function escapeRegexCharacters(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface IState {
  isLoading: boolean;
  suggestions: object[];
  value: string;
  securitiesJson: string;
}

interface IMatchingSuggestion {
  label: string;
}

/* tslint:disable:no-namespace */
export namespace SearchItem {
  /* tslint:disable:interface-name */
  export interface IProps {
    handleInputChange: any;
    classes: any;
    textFieldValue: string;
  }
}

class SearchItem extends React.Component<WithStyles<any> & SearchItem.IProps> {
  public state = {
    isLoading: false,
    securitiesJson: '',
    suggestions,
    value: ''
  };
  public lastRequestId: any;

  constructor(props: SearchItem.IProps) {
    super(props);
  }
  public renderInput = (inputProps: any) => {
    const { classes, ref, ...other } = inputProps;

    return (
      <div>
        <TextField
          style={{ width: '80%' }}
          id="itemDescription"
          name="itemDescription"
          label="Search"
          value={this.props.textFieldValue}
          InputProps={{
            classes: {
              input: classes.input
            },
            disableUnderline: false,
            inputRef: ref,
            onChange: this.handleChange,
            ...other
          }}
        />
      </div>
    );
  };

  public handleChange = (event: any, newVal: any) => {
    /* tslint:disable:no-console */
    const newValue = newVal.newValue;
    this.setState({
      value: newValue
    });
    // this.props.handleInputChange(event);
  };

  public getMatchingItems(value: any) {
    const matchingSuggestions: IMatchingSuggestion[] = [
      { label: 'Alpha Go' },
      { label: 'Boris Johnson' },
      { label: 'Carl Marks' },
      { label: 'Delphi' },
      { label: 'Estonia' },
      { label: 'Franklin, VA' },
      { label: 'Gomez' },
      { label: 'Homer' },
      { label: 'Inglewood, CO' },
      { label: 'Jefferies LTD' }
    ];

    // Place fecth() here

    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return matchingSuggestions.filter(matchingSuggestion =>
      regex.test(matchingSuggestion.label)
    );
  }

  public loadSuggestions(value: any) {
    // Cancel the previous request
    if (this.lastRequestId !== undefined) {
      clearTimeout(this.lastRequestId);
    }

    this.setState({
      isLoading: true
    });

    // Fake request
    this.lastRequestId = setTimeout(() => {
      this.setState({
        isLoading: false,
        suggestions: this.getMatchingItems(value)
      });
    }, 1);
  }

  // todo: test TS newVal swap
  public onSuggestionsFetchRequested = ({ value }: { value: any }) => {
    this.loadSuggestions(value);
  };
  // onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
  // onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
  public handleSuggestionsFetchRequested = ({ value }: { value: any }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  public handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  public render() {
    const { classes } = this.props;
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestion: classes.suggestion,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          onBlur: this.props.handleInputChange,
          onChange: this.handleChange,
          value: this.state.value
        }}
      />
    );
  }
}
/* tslint:disable:no-string-literal */
SearchItem['propTypes'] = {
  classes: PropTypes.object.isRequired
};

// export withStyles
export default withStyles(styles)<SearchItem.IProps>(SearchItem);

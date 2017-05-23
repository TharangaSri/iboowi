import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

export default class VirtualizedSelectInput extends Component {

  render() {

    return (
      <div>
        <VirtualizedSelect
          {...this.props}
          //async
          //loadOptions={this._loadOptions}
          //className="form-control"
          minimumInput={1}
          matchPos={'start'}
          options={this.props.options}
          value={this.props.input.value}
          onChange={(value) => this.props.input.onChange(value.value)}
          onBlur={() => this.props.input.onBlur(this.props.input.value)}
        />
        {this.props.meta.touched && this.props.meta.error &&
          <small className="text-danger">{this.props.meta.error}</small>
        }
      </div>
    )

  }

  _loadOptions(input, callback) {
    setTimeout(function () {
      callback(null, {
        options: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' }
        ],
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      });
    }, 500);
  }

}




/*export default (props) => (
  <div>
    <VirtualizedSelect
      {...props}
      async={true}
      loadOptions={this._loadOptions('a')}
      minimumInput={1}
      matchPos={'start'}
      //options={props.options}
      value={props.input.value}
      onChange={(value) => props.input.onChange(value.value)}
      onBlur={() => props.input.onBlur(props.input.value)}
    />
    {props.meta.touched && props.meta.error &&
      <small className="text-danger">{props.meta.error}</small>
    }
  </div>
);

 _loadOptions (input) {
    return fetch(`https://api.github.com/search/users?q=${input}`)
      .then((response) => response.json())
      .then((json) => {
        const githubUsers = json.items

        this.setState({ githubUsers })

        return { options: githubUsers }
      })
  };*/



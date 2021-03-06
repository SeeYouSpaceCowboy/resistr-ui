import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { Form } from 'formsy-react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { grey500 } from 'material-ui/styles/colors'

import {FormsySelect } from 'formsy-material-ui/lib'

import ActionIcon from './ActionIcon'

const styles = {
  officialInfo: {
    fontSize: '14px',
    fontWeight: 500,
    color: grey500
  },
  actionsSelectIcons: {
    position: 'relative', 
    top: '6px'
  },
  actionsSelectText: {
    position: 'relative', 
    left: '10px'
  }
}

class LogActionModal extends Component {

  constructor (props) {
    super(props)

    this.state = {
      form: {},
      canSubmit: false
    }
  }

  setForm = (form) => {
    this.setState({
      form: form
    })
  }

  submit = () => {
    this.props.handleSubmit(
      this.state.form,
      this.props.official,
      this.props.userActionDisplaySettings
    )
  }

  handleValid = () => {
    this.setState({
      canSubmit: true
    })
  }

  handleInvalid = () => {
    this.setState({
      canSubmit: false
    })
  }

  cancelButton = () => {
    return (
      <FlatButton label="Cancel" onTouchTap={this.props.handleCancel} />
    )
  }

  submitButton = () => {
    return (
      <FlatButton
          label="Submit"
          onTouchTap={this.submit}
          disabled={!this.state || !this.state.canSubmit}
      />
    )
  }

  actionsForSelect = () => {
    return (
      this.props.actionList.map((action) => {
        return (
          <MenuItem
            key={action.id}
            value={action.id}
            primaryText={
              <div style={{}} >
                <ActionIcon iconName={action.iconName} style={styles.actionsSelectIcons} />
                <span style={styles.actionsSelectText}>{action.name}</span>
              </div>
            }
          />
        )
      })
    )
  }

  issuesForSelect = () => {
    return (
      this.props.issueList.map((issue) => {
        return (
          <MenuItem
              key={issue.id}
              value={issue.id}
              primaryText={issue.name}
          />
        )
      })
    )
  }

  render () {
    if (!this.props.official) {
      return null
    }

    return (
      <div ref="logActionModal">
        <Dialog
            title={
              <div>
                LOG ACTION
                <div style={styles.officialInfo}>
                  {this.props.official.name}, {this.props.official.office.name}
                </div>
              </div>
            }
            actions={[this.cancelButton(), this.submitButton()]}
            modal={false}
            open={this.props.isOpen}
            autoScrollBodyContent={true}
            onRequestClose={this.props.handleCancel}
        >

        <Form
            onValid={this.handleValid}
            onInvalid={this.handleInvalid}
            onValidSubmit={() => {}}
            onInvalidSubmit={() => {}}
            validationErrors={{}}
            onChange={this.setForm}
        >
          <FormsySelect
              floatingLabelText="Action"
              name="actionId"
              required
          >
            {this.actionsForSelect()}
          </FormsySelect><br />
          <FormsySelect
              floatingLabelText="Issue"
              name="issueId"
              required
          >
            {this.issuesForSelect()}
          </FormsySelect>

        </Form>
        </Dialog>
      </div>
    )
  }
}

export default LogActionModal

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    loading: false,
    errorMessage: ""
  };

  onSubmit = async e => {
    e.preventDefault();
    const { address } = this.props || {};
    const { value } = this.state;
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether")
      });
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  onValueChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value, loading, errorMessage } = this.state;
    return (
      <Form onSubmit={this.onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input label="ether" labelPosition="right" value={value} onChange={this.onValueChange} />
          <Message error header="Oops!" content={errorMessage} />
        </Form.Field>
        <Button primary loading={loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;

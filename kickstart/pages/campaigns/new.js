/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false
  };

  onInputChange = e => {
    this.setState({ minimumContribution: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { minimumContribution } = this.state;
    try {
      this.setState({ loading: true, errorMessage: "" });
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0]
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { minimumContribution, errorMessage, loading } = this.state;
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label htmlFor="inputComponent">Minimum Contribution</label>
            <Input label="wei" labelPosition="right" id="inputComponent" value={minimumContribution} onChange={this.onInputChange} />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button primary content="Create" loading={loading} />
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;

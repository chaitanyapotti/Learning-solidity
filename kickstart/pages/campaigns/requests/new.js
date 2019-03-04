/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: ""
  };

  static async getInitialProps(props) {
    const { address } = props.query || {};
    return { address };
  }

  descriptionChange = e => this.setState({ description: e.target.value });

  valueChange = e => this.setState({ value: e.target.value });

  recipientChange = e => this.setState({ recipient: e.target.value });

  onSubmit = async e => {
    e.preventDefault();
    const { address } = this.props || {};
    const { description, value, recipient } = this.state;
    try {
      this.setState({ loading: true, errorMessage: "" });
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(web3.utils.toWei(value, "ether"), recipient, description).send({
        from: accounts[0]
      });
      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { value, description, recipient, loading, errorMessage } = this.state;
    const { address } = this.props || {};
    return (
      <Layout>
        <Link route={`/campaigns/${address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input value={description} onChange={this.descriptionChange} />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input value={value} onChange={this.valueChange} />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input value={recipient} onChange={this.recipientChange} />
          </Form.Field>
          <Message content={errorMessage} error header="Oops!" />
          <Button content="Create!" primary loading={loading} />
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;

import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class RequestRow extends Component {
  onApprove = async () => {
    const { address, id } = this.props || {};
    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/campaigns/${address}/requests`);
    } catch (error) {
      console.log(error);
    }
  };

  onFinalize = async () => {
    const { address, id } = this.props || {};
    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/campaigns/${address}/requests`);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { request, id, approversCount } = this.props || {};
    const { description, value, recipient, approvalCount, complete } = request;
    const readyToFinalize = approvalCount > approversCount / 2;
    const { Row, Cell } = Table;
    return (
      <Row disabled={complete} positive={readyToFinalize && !complete}>
        <Cell>{id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{`${approvalCount}/${approversCount}`}</Cell>
        <Cell>
          {!complete && (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {!complete && (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;

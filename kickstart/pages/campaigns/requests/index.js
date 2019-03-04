/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query || {};
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const promiseArray = [];
    for (let index = 0; index < requestCount; index += 1) {
      promiseArray.push(campaign.methods.requests(index).call());
    }
    const requests = await Promise.all(promiseArray);
    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    const { requests, address, approversCount } = this.props || {};
    console.log(requests);
    return requests.map((request, index) => {
      // eslint-disable-next-line react/no-array-index-key
      return <RequestRow key={index} id={index} request={request} address={address} approversCount={approversCount} />;
    });
  }

  render() {
    const { address, requestCount } = this.props || {};
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: "10px" }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;

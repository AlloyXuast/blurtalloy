import React from 'react';
import { connect } from 'react-redux';
import { api } from '@blurtfoundation/blurtjs';

import Author from './AuthorSimple';
import LoadingIndicator from './LoadingIndicator'
import Voter from './Voter';

class WitnessVoters extends React.Component {
  constructor(props) {
    super(props);
    // this._isMounted = false;
    this.state = {
      voters: undefined, votersLoaded: false, witnesses: undefined, witnessesLoaded: undefined, isAWitness: false, witnessProps: undefined
    };
  }

  componentWillMount() {
    this.loadWitnesses();
    this.checkWitness();
  }

  shouldComponentUpdate(np, ns) {
    const { author, username, account } = this.props;
    const { votersLoaded, witnessesLoaded, isAWitness, witnessProps } = this.state;
    return (np.author !== author || np.username !== username || np.account !== account || votersLoaded !== ns.votersLoaded || witnessesLoaded !== ns.witnessesLoaded
      || witnessProps !== ns.witnessProps || isAWitness !== ns.isAWitness);
  }

  checkWitness = async () => {
    const { author } = this.props;

    const loadWitnessVoters = async (witProps) => {
      const { author } = this.props;
      const batchSize = 1000;
      const params = { start: [author, ""], limit: batchSize, order: "by_witness_account" };

      api.call('database_api.list_witness_votes', params, (err, res) => {
        if (res) {
          let newVoters = res.votes;

          newVoters = newVoters.filter((voter) => voter.witness === author);
          this.setState({ voters: newVoters || [], votersLoaded: true, witnessProps: witProps, isAWitness: true });
        } else {
          this.setState({ voters: [], votersLoaded: true, witnessProps: {}, isAWitness: false });
        }
      });
    }
    api.getWitnessByAccount(author, (err, result) => {
      if (result) {
        console.log(result);
        loadWitnessVoters(result);
      } else {
        this.setState({ witnessProps: [], isAWitness: false })
      }
    });
  }

  loadWitnesses = async () => {
    const { author } = this.props;
    const params = { start: [author, ""], limit: 30, order: "by_account_witness" };
    api.call('database_api.list_witness_votes', params, (err, res) => {
      if (res) {
        let selectedWitnesses = res.votes;
        selectedWitnesses = selectedWitnesses.filter((voter) => voter.account === author);
        this.setState({ witnesses: selectedWitnesses || [], witnessesLoaded: true })
      } else {
        this.setState({ witnesses: [], witnessesLoaded: true })
      }
    });
  }

  render() {
    const {
      voters, votersLoaded, witnesses, witnessesLoaded, isAWitness, witnessProps
    } = this.state;
    const { author } = this.props;

    return (
      <div>
        {!witnessesLoaded ? (
          <center>
            <LoadingIndicator type="circle" />
          </center>
        ) : (
          <div className="row">
            <div className="columns small-12 large-12">
              <h3>Witnesses voted by {author} ({witnesses.length})</h3>
              <hr />
              <div className="row">
                {witnesses.map((voter, index) => {
                  return (
                    <div className="column small-6 large-4" key={`Witness-${index}`}>
                      <Author author={voter.witness} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
        <br />
        {isAWitness && votersLoaded && (
          <div className="row">
            <div className="columns">
              <h3>@{author} Witness Info</h3>
              <table className="hover stack">
                <tbody>
                  <tr>
                    <td><b>Witness Since</b></td>
                    <td>{new Date(witnessProps.created).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td><b>Approved Power</b></td>
                    <td>{(witnessProps.votes / (100000 * 100000)).toFixed() / 100 + 'M'}</td>
                  </tr>
                  <tr>
                    <td><b>Account Creation Fee</b></td>
                    <td>{witnessProps.props.account_creation_fee}</td>
                  </tr>
                  <tr>
                    <td><b>Operation Flat Fee</b></td>
                    <td>{witnessProps.props.operation_flat_fee}</td>
                  </tr>
                  <tr>
                    <td><b>Proposal Fee</b></td>
                    <td>{witnessProps.props.proposal_fee}</td>
                  </tr>
                  <tr>
                    <td><b>BW KB Fee</b></td>
                    <td>{witnessProps.props.bandwidth_kbytes_fee}</td>
                  </tr>
                  <tr>
                    <td><b>Version</b></td>
                    <td>{witnessProps.running_version}</td>
                  </tr>
                  <tr>
                    <td><b>HF Vote Version</b></td>
                    <td>{witnessProps.hardfork_version_vote}</td>
                  </tr>
                  <tr>
                    <td><b>Signing Key(Public)</b></td>
                    <td>{witnessProps.signing_key}</td>
                  </tr>
                  <tr>
                    <td><b>Missed Blocks</b></td>
                    <td>{witnessProps.total_missed}</td>
                  </tr>
                  {witnessProps.url && (
                    <tr>
                      <td><b>Witness Intro Post/Profile</b></td>
                      <td><a href={witnessProps.url}>Link</a></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <br />
        {isAWitness && votersLoaded ? (
          <span>
            {!votersLoaded ? (
              <center>
                <LoadingIndicator type="circle" />
              </center>
            ) : (
              <div className="row">
                <div className="columns large-12 small-12">
                  <h3>Voters for Witness {author} ({voters.length})</h3>
                  <hr />
                  <div className="row">
                    {voters.map((voter) => {
                      return (
                        <div className="column small-6 large-4">
                          <Voter info={voter} author={voter.account} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </span>
        ) : null}
      </div>
    )
  }
}

export default connect((state, ownProps) => {
  const { author } = ownProps;
  const username = state.user.getIn(['current', 'username']);
  const account = state.global.getIn(['accounts', author]);
  return {
    author,
    username,
    account,
  };
})(WitnessVoters);
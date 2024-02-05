import React from 'react';
import PropTypes from 'prop-types';
import tt from 'counterpart';
import classnames from 'classnames';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';
import { looksPhishyDomain } from 'app/utils/Phishing';
import { connect } from 'react-redux';

class SanitizedLink extends React.Component {
    static propTypes = {
        url: PropTypes.string,
        text: PropTypes.string,
    };

    constructor() {
        super();
        // this.shouldComponentUpdate = shouldComponentUpdate(
        //     this,
        //     'SanitizedLink'
        // );
        this.state = {
            revealPhishyLink: false,
        };
    }

    onRevealPhishyLink = (e) => {
        e.preventDefault();
        this.setState({ revealPhishyLink: true });
    };

    render() {
        const { text, url, phishy_domains } = this.props;

        const isPhishy = looksPhishyDomain(phishy_domains, url);

        const classes = classnames({
            SanitizedLink: true,
            'SanitizedLink--phishyLink': isPhishy,
        });

        if (!isPhishy) {
            return (
                <a
                    className={classes}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {text}
                </a>
            );
        }

        if (this.state.revealPhishyLink) {
            return (
                <span
                    className={classes}
                    title={tt('sanitizedlink_jsx.phishylink_caution')}
                >
                    {text}
                </span>
            );
        }

        return (
            <span className={classes}>
                <span className="phishylink-caution">
                    {tt('sanitizedlink_jsx.phishylink_caution')}
                </span>
                <span
                    className="phishylink-reveal-link"
                    role="button"
                    onClick={this.onRevealPhishyLink}
                >
                    {tt('sanitizedlink_jsx.phishylink_reveal')}
                </span>
            </span>
        );
    }
}

export default connect((state, props) => {
    const phishy_domains =
        state.global.getIn(['phishy_domains']) == undefined
            ? []
            : state.global.getIn(['phishy_domains']);
    return {
        ...props,
        phishy_domains,
    };
})(SanitizedLink);

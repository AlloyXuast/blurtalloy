import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';
import { imageProxy } from 'app/utils/ProxifyUrl';

export const SIZE_SMALL = '64x64';
export const SIZE_MED = '128x128';
export const SIZE_LARGE = '512x512';

const sizeList = [SIZE_SMALL, SIZE_MED, SIZE_LARGE];

export const avatarSize = {
    small: SIZE_SMALL,
    medium: SIZE_MED,
    large: SIZE_LARGE,
};

class Userpic extends Component {
    shouldComponentUpdate = shouldComponentUpdate(this, 'Userpic');

    render() {
        if (this.props.hide) return null;

        const { account, size } = this.props;
        const url = imageProxy() + `profileimage/${account}${size ? size : '/avatar'}`;
        const style = { backgroundImage: `url(${url})` };
        return <div className="Userpic" style={style} />;
    }
}

Userpic.propTypes = {
    account: PropTypes.string.isRequired,
};

export default connect((state, ownProps) => {
    const { account, size, hideIfDefault } = ownProps;
    let hide = false;
    if (hideIfDefault) {
        const url = state.userProfiles.getIn(['profiles', account, 'metadata', 'profile', 'profile_image'], null);
        hide = !url || !/^(https?:)\/\//.test(url);
    }
    return {
        account,
        size: size && sizeList.indexOf(size) > -1 ? '/' + size : '',
        hide,
    };
})(Userpic);

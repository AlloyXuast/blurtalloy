/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import TimeAgoWrapper from 'app/components/elements/TimeAgoWrapper'
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga'
import * as globalActions from 'app/redux/GlobalReducer';
import Callout from 'app/components/elements/Callout'
import Icon from 'app/components/elements/Icon'
import Userpic from 'app/components/elements/Userpic'
import tt from 'counterpart'
import classNames from 'classnames'
import ClaimBox from '../elements/ClaimBox'

const notificationsIcon = (type) => {
  const types = {
    reply: 'chatbox',
    reply_post: 'chatbox',
    reply_comment: 'chatbox',
    follow: 'voters',
    set_label: 'pencil2',
    set_role: 'pencil2',
    error: 'cog',
    reblog: 'reblog',
    mention: 'chatboxes',
    transfer: 'transfer',
    witness_vote: 'witness',
    vote: 'heart'
  }

  let icon = 'chain'
  if (type in types) {
    icon = types[type]
  } else {
    console.error('no icon for type: ', type)
  }

  return <Icon size="1x" name={icon} />
}

let notificationFilter = 'all'

const notificationFilterToTypes = {
  replies: ['reply_comment', 'reply'],
  follows: ['follow'],
  upvotes: ['vote'],
  reblogs: ['reblog'],
  mentions: ['mention']
}

const highlightText = (text, highlight) => {
  if (!highlight) return text
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
  return (
    <span>
      {' '}
      {parts.map((part, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { fontWeight: 'bold' }
              : {}
          }
        >
          {part}
        </span>
      ))}{' '}
    </span>
  )
}

class NotificationsList extends React.Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            type: PropTypes.string,
            score: PropTypes.number,
            date: PropTypes.date,
            msg: PropTypes.string,
            url: PropTypes.url,
        })
    ),
    isLastPage: PropTypes.bool,
    username: PropTypes.string.isRequired,
    markAsRead: PropTypes.func.isRequired,
    unreadNotifications: PropTypes.number,
    notificationActionPending: PropTypes.bool,
    lastRead: PropTypes.string.isRequired,
  };

  static defaultProps = {
      notifications: [],
      unreadNotifications: 0,
      notificationActionPending: false,
      isLastPage: false,
  };

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  componentWillMount() {
    const { username, getAccountNotifications } = this.props
    if (username) {
      getAccountNotifications(username)
    }
  }

  componentDidUpdate(prevProps) {
    const { username, getAccountNotifications } = this.props
    if (prevProps.username !== username) {
      getAccountNotifications(username)
    }
    this.applyFilter()
  }

  // eslint-disable-next-line no-undef
  onClickMarkAsRead = (e) => {
    e.preventDefault();
    const { username, markAsRead } = this.props;
    markAsRead(username, new Date().toISOString().slice(0, 19));
};

  // eslint-disable-next-line no-undef
  applyFilter = () => {
    const notificationElements =
      document.getElementsByClassName('notification__item')

    let visibleCount = 0
    for (let ni = 0; ni < notificationElements.length; ni += 1) {
      const notificationElement = notificationElements[ni]

      if (notificationFilter === 'all') {
        notificationElement.classList.remove('hide')

        visibleCount += 1
        if (visibleCount % 2 === 0) {
          notificationElement.classList.add('even')
        } else {
          notificationElement.classList.remove('even')
        }
      } else if (Object.prototype.hasOwnProperty.call(notificationFilterToTypes, notificationFilter)) {
        const notificationTypes = notificationFilterToTypes[notificationFilter];
        let matchType = false;

        for (let ti = 0; ti < notificationTypes.length; ti += 1) {
          const notificationType = notificationTypes[ti]
          if (
            notificationElement.classList.contains(
              `notification__${notificationType}`
            )
          ) {
            matchType = true
          }
        }

        if (matchType === false) {
          notificationElement.classList.add('hide')
        } else {
          notificationElement.classList.remove('hide')
          visibleCount += 1
        }

        if (visibleCount % 2 === 0) {
          notificationElement.classList.add('even')
        } else {
          notificationElement.classList.remove('even')
        }
      }
    }
  }

  // eslint-disable-next-line no-undef
  onClickFilter = (e) => {
    e.preventDefault()
    const { target } = e

    const filterElements = document.getElementsByClassName('notification__filter');

    // reset
    for (let fi = 0; fi < filterElements.length; fi += 1) {
      const filterElement = filterElements[fi]
      filterElement.classList.remove('selected')
    }

    target.classList.add('selected')
    notificationFilter = target.dataset.type
    this.applyFilter()

    target.blur()
  }

  onClickLoadMore = e => {
    e.preventDefault();
    const { username, notifications, getAccountNotifications } = this.props;
    const lastId = notifications.slice(-1)[0].id;
    getAccountNotifications(username, lastId);
  };

  render() {
    const {
      notifications,
      unreadNotifications,
      isOwnAccount,
      accountName,
      isLastPage,
      notificationActionPending,
      lastRead,
    } = this.props;

    // eslint-disable-next-line consistent-return
    const renderItem = (item) => {
      const unRead = Date.parse(`${lastRead}Z`) <= Date.parse(`${item.date}Z`);
      const usernamePattern = /\B@[a-z0-9.-]+/gi;
      const mentions = item.msg.match(usernamePattern);
      const participants = mentions
          ? mentions.map((m) => (
              <a key={m} href={'/' + m}>
                  <Userpic account={m.substring(1)} />
              </a>
            ))
          : null;

      if (item.date === '1970-01-01T00:00:00') {
          return null;
      }

      return (
          <div key={item.id} className={`notification__item flex-body notification__${item.type}`}>
              <div className="notification__score">
                  <div className="notification__score_bar" style={{ width: `${item.score}%` }} />
              </div>
              <div className="flex-row">{mentions && participants && participants[0]}</div>
              <div className="flex-column">
                  <div className="notification__message">
                      <a href={`/${item.url}`}>{highlightText(item.msg, mentions ? mentions[0] : null)}</a>
                  </div>
                  <div className="flex-row">
                      <div className="notification__icon">{notificationsIcon(item.type)}</div>
                      <div className="notification__date">
                          <TimeAgoWrapper date={item.date + 'Z'} />
                      </div>
                  </div>
              </div>
              {unRead && <span className="notification__unread">&bull;</span>}
          </div>
      );
  };

    return (
      <div id="notifications" className="NotificationsContainer">
        {isOwnAccount && (
          <div className="row">
            <div className="columns">
              <ClaimBox accountName={accountName} />
            </div>
          </div>
        )}
        <div className="row">
          <div className="columns">

            {notifications && notifications.length > 0 && unreadNotifications !== 0 && !notificationActionPending && (
              <center>
                  <br />
                  <a href="#" onClick={this.onClickMarkAsRead}>
                      <strong>{tt('notificationsList_jsx.mark_all_as_read')}</strong>
                  </a>
                  <br />
              </center>
            )}

            <center>
              <div className="notification__filter_select">
                <a
                  className={classNames('notification__filter', {
                    selected: notificationFilter === 'all'
                  })}
                  role="link"
                  data-type="all"
                  tabIndex={0}
                  onClick={this.onClickFilter}
                >
                  {tt('notificationsList_jsx.all')}
                </a>
                <a
                  className={classNames('notification__filter', {
                    selected: notificationFilter === 'replies'
                  })}
                  role="link"
                  data-type="replies"
                  tabIndex={0}
                  onClick={this.onClickFilter}
                >
                  {tt('notificationsList_jsx.replies')}
                </a>
                <a
                  className={classNames('notification__filter', {
                    selected: notificationFilter === 'mentions'
                  })}
                  role="link"
                  data-type="mentions"
                  tabIndex={0}
                  onClick={this.onClickFilter}
                >
                  {tt('notificationsList_jsx.mentions')}
                </a>
                <a
                  className={classNames('notification__filter', {
                    selected: notificationFilter === 'follows'
                  })}
                  role="link"
                  data-type="follows"
                  tabIndex={0}
                  onClick={this.onClickFilter}
                >
                  {tt('notificationsList_jsx.follows')}
                </a>
                <a
                  className={classNames('notification__filter', {
                    selected: notificationFilter === 'upvotes'
                  })}
                  role="link"
                  data-type="upvotes"
                  tabIndex={0}
                  onClick={this.onClickFilter}
                >
                  {tt('notificationsList_jsx.upvotes')}
                </a>
                <a
                  className={classNames('notification__filter', {
                    selected: notificationFilter === 'reblogs'
                  })}
                  role="link"
                  data-type="reblogs"
                  tabIndex={0}
                  onClick={this.onClickFilter}
                >
                  {tt('notificationsList_jsx.reblogs')}
                </a>
              </div>
            </center>

            {notifications && notifications.length > 0 && (
              <div style={{ lineHeight: '1rem' }}>{notifications.map((item) => renderItem(item))}</div>
            )}

            {!notifications && !notificationActionPending && process.env.BROWSER && (
                <Callout>Welcome! You do not have any notifications yet.</Callout>
            )}

            {(notificationActionPending || !process.env.BROWSER) && (
                <center>
                    <LoadingIndicator type="circle" />
                </center>
            )}

            {!notificationActionPending && notifications && !isLastPage && (
                <center>
                    <br />
                    <a href="#" onClick={this.onClickLoadMore}>
                        <strong>{tt('notificationsList_jsx.load_more')}</strong>
                    </a>
                </center>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    const accountName = props.username
    const isOwnAccount =
      state.user.getIn(['current', 'username'], '') == accountName
    const notifications = state.global.getIn(['notifications', accountName, 'notifications'], List()).toJS();
    const unreadNotifications = state.global.getIn(
      ['notifications', accountName, 'unreadNotifications', 'unread'],
      0
    );
    const lastRead = state.global.getIn(['notifications', accountName, 'unreadNotifications', 'lastread'], '');
    const isNotificationsLastPage = state.global.getIn(['notifications', accountName, 'isLastPage'], null);
    return {
      ...props,
      isOwnAccount,
      accountName,
      unreadNotifications,
      notificationActionPending: state.global.getIn([
          'notifications',
          'loading',
      ]),
      lastRead,
      notifications,
      isLastPage: isNotificationsLastPage,    }
  },
  (dispatch) => ({
    getAccountNotifications: (username, last_id) => {
      const query = {
          account: username,
          limit: 50,
      };
      if (last_id) {
          query.last_id = last_id;
      }
      return dispatch(fetchDataSagaActions.getAccountNotifications(query));
    },
    markAsRead: (username, timeNow) => {
      const successCallback = (user, time) => {
        setTimeout(() => {
            dispatch(
                globalActions.receiveUnreadNotifications({
                    name: user,
                    unreadNotifications: {
                        lastread: time,
                        unread: 0,
                    },
                })
            );
            dispatch(globalActions.notificationsLoading(false));
        }, 6000);
      };

      return dispatch(
          fetchDataSagaActions.markNotificationsAsRead({
              username,
              timeNow,
              successCallback,
          })
      );
},
  })
)(NotificationsList)

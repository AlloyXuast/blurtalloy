/* global $STM_Config */
import React from 'react';
import tt from 'counterpart';
import { Link } from 'react-router';

const SidebarLinks = ({ username }) => {

    const userLinks = [
        { text: tt('g.my_feed'), link: `/@${username}/feed` , type:'link'},
        { text: tt('g.my_blog'), link: `/@${username}` , type:'link'},
        { text: tt('g.my_notifications'), link: `/@${username}/notifications` , type:'link'},
        { text: tt('g.my_wallet'), link: `${$STM_Config.wallet_url}/@` + username + '' , type:'href'},
        { text: tt('g.my_explorer'), link: 'https://blocks.blurtwallet.com/#/@' + username , type:'href'},
    ]

    return (<div className="c-sidebar__module">
        <div className="c-sidebar__header">
            <h3 className="c-sidebar__h3">{tt('g.links')}</h3>
        </div>
        <div className="c-sidebar__content">
            <ul className="c-sidebar__list">
                {username && (userLinks.map((element, index) => (
                    <li className="c-sidebar__list-item" key={`${element.text}-${index}`} >
                        {element.type === 'link'
                            ? (<Link className="c-sidebar__link" to={element.link}>
                                {element.text}
                            </Link>)
                            : (<a className="c-sidebar__link" href={element.link}>
                                {element.text}
                        </a>)}
                </li>)))}
            </ul>
        </div>
    </div>)
};

export default SidebarLinks;

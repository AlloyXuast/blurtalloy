import React from 'react';
import { Link } from 'react-router';
import { filterTags } from 'app/utils/StateFunctions';
import DropdownMenu from 'app/components/elements/DropdownMenu';

export default ({ post, horizontal, single }) => {
    let sort_order = 'hot';
    const sort_list = ['trending','hot','created','muted','payout'];
    if (process.env.BROWSER && sort_list.indexOf(window.last_sort_order) !== -1) {
        sort_order = window.last_sort_order;
    }

    if (single) {
        const name = (post.community_title) ? post.community_title : post.category
        return (
            <Link to={`/${sort_order}/${post.category}`}>{!post.community_title && "# "}{name}</Link>
        );
    }

    const json = post.json_metadata;
    let tags = [];

    try {
        if (typeof json === 'object') {
            tags = json.tags || [];
        } else {
            tags = (json && JSON.parse(json).tags) || [];
        }
        if (typeof tags === 'string') tags = tags.split(' ');
        if (!Array.isArray(tags)) {
            tags = [];
        }
    } catch (e) {
        tags = [];
    }

    // Category should always be first.
    tags.unshift(post.category);

    tags = filterTags(tags);

    if (horizontal) {
        // show it as a dropdown in Preview
        const list = tags.map((tag, idx) => (
            <Link to={`/${sort_order}/${tag}`} key={idx}>
                {' '}
                {tag}{' '}
            </Link>
        ));
        return <div className="TagList__horizontal">{list}</div>;
    }
    if (tags.length == 1) {
        return <Link to={`/${sort_order}/${tags[0]}`}>{tags[0]}</Link>;
    }
    const list = tags.map((tag) => {
        return { value: tag, link: `/${sort_order}/${tag}` };
    });
    return (
        <DropdownMenu
            selected={' ' + tags[0]}
            className="TagList"
            items={list}
            el="div"
        />
    );
};

import React from "react";

const List = props => {
  let url = props.post.data.url;
  let title = props.post.data.title;

  const replaceAmpersand = url => {
    if (url.indexOf("&") > 1) {
      url = url.replace("&amp;", "&");
    }

    return url;
  };

  url = replaceAmpersand(url);
  title = replaceAmpersand(title);

  return (
    <div className="titles">
      {title}
      <button>
        <a href={url}>Link</a>
      </button>
    </div>
  );
};

export default List;

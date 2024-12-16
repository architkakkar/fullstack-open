import PropTypes from "prop-types";

import Part from "./Part";

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

Content.propTypes = {
  parts: PropTypes.array,
};

export default Content;

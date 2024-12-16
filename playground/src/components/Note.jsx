import PropTypes from "prop-types";

const Note = ({ note }) => {
  console.log(note);  
  return <li>{note.content}</li>;
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
};

export default Note;

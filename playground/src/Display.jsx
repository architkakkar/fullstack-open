import PropTypes from 'prop-types';

const Display = ({ counter }) => <div>{counter}</div>

Display.propTypes = {
    counter: PropTypes.number.isRequired,
}

export default Display;
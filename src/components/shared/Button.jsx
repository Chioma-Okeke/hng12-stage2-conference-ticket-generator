import PropTypes from "prop-types";

function Button({ children, className, onClick }) {
    return (
        <button onClick={onClick} className={`px-6 py-3 ${className}`}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;

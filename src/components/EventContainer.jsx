import PropTypes from "prop-types";

function EventContainer({ children, stepCounter, currentSection }) {
    let className;

    switch (stepCounter) {
        case 1:
            className =
                "mt-[18px] md:mt-[46px] mb-[42px] md:mb-[112px] bg-[#08252B] md:bg-[#041E23]";
            break;

        case 2:
            className =
                "mt-[18px] md:mt-[46px] mb-[40px] md:mb-[112px] bg-[#041E23]";
            break;

        case 3:
            className =
                "mt-[58px] md:mt-[46px] mb-[40px] md:mb-[112px] bg-[#041E23]";
            break;

        default:
            break;
    }

    return (
        <div
            className={`flex flex-col gap-8 p-6 md:p-12 rounded-[40px] border border-[#0E464F] max-w-[700px] mx-auto ${className}`}
        >
            <div>
                <div>
                    <div
                        tabIndex={0}
                        aria-label={`${currentSection}. Form progress step ${stepCounter} of 3`}
                        className="text-white relative flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between md:items-center"
                    >
                        <h1
                            className="text-[32px] font-jeju"
                            aria-label={`${currentSection}. Form progress step ${stepCounter} of 3`}
                        >
                            {currentSection}
                        </h1>
                        <p className="font-roboto" aria-hidden="true">
                            Step <span aria-hidden="true">{stepCounter}</span>/3
                        </p>
                    </div>
                    <div className="w-full bg-[#0E464F] rounded-full h-1 mt-3">
                        <div className="bg-[#24A0B5] rounded-full h-full w-[80%] md:w-[40%]"></div>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}

EventContainer.propTypes = {
    children: PropTypes.element,
    stepCounter: PropTypes.number,
    currentSection: PropTypes.string,
};

export default EventContainer;

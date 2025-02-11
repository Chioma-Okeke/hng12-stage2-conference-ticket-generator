import PropTypes from "prop-types"

function EventContainer({children, stepCounter}) {
    return (
        <div className="flex flex-col mb-12 gap-8 p-6 lg:p-12 rounded-[40px] border border-[#0E464F] bg-[#08252B] lg:bg-[#041E23] max-w-[700px] mx-auto">
            <div>
                <div>
                    <div className="text-white relative flex flex-col lg:flex-row gap-3 lg:gap-0 lg:justify-between lg:items-center">
                        <h1 className="text-[32px] font-jeju">Ticket Selection</h1>
                        <p className="font-roboto">
                            Step <span>{stepCounter}</span>/3
                        </p>
                    </div>
                    <div className="w-full bg-[#0E464F] rounded-full h-1 mt-3">
                        <div className="bg-[#24A0B5] rounded-full h-full w-[80%] md:w-[40%]"></div>
                    </div>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

EventContainer.propTypes = {
    children: PropTypes.element,
    stepCounter: PropTypes.number,
}

export default EventContainer;

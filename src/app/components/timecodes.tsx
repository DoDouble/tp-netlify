type timeCodeProps = {
    _key: string;
    details: string;
    time: string;
}

type timeCodesProps = {
    timecodes: timeCodeProps[];
}

const Timecodes = ( props: timeCodesProps ) => {
    const {timecodes} = props;
    return <div>
        <div className="overflow-hidden">
            <h3 className="fadeSlideUp">Timecodes:</h3>
        </div>
        {timecodes.map((code: timeCodeProps) => (
            <div
                key={`tc_${code?.time.replace(':', '_')}`}
                id={`tc_${code?.time.replace(':', '_')}`}
                className="timecode"
                data-time={code?.time}
            >
                {code?.time} -&nbsp;
                <span className="timecode_details">{code?.details}</span>
            </div>
        ))}
    </div>
};

export default Timecodes;
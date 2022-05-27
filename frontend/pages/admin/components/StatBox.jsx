const StatBox = props => {
    const title = props.children;
    const { count } = props;
    return (
        <>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="stats-fun-fact-box">
                    <span className="sub-title">{title}</span>
                    <h3>{count}</h3>
                </div>
            </div>
        </>
    )
}

export default StatBox;
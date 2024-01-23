import './infoBlock.scss';

const InfoBlock = (props) => {
    const {
        icon,
        title,
        unit,
        value
    } = props;

    return (
        <div className="info-block">
            <div className="inof-block__content">
                <div className="info-block__title"><div className="info-block__icon">{icon}</div> {title}</div>
                <div className="info-block__value">{value}<span className='info-block__unit'>{unit}</span></div>
            </div>
        </div>
    )
}

export default InfoBlock;

const durationFormat = (duration) => {
    const timeFormat = (time) => (time < 10 ? `0${time}` : time);

    const minutes = timeFormat(Math.trunc(duration / 60));
    const seconds = timeFormat(Math.trunc(duration - minutes * 60));

    return `${minutes} : ${seconds}`;
};

export default durationFormat;

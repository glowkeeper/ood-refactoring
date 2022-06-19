const convertToSeconds = (time) => {
    const [hours, minutes] = time.split(':')
    return Number(hours) * 60 * 60 + Number(minutes) * 60
}

module.exports = convertToSeconds
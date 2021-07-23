module.exports.Service = () => ({
    serverDate: () => (new Date()),
    currentTime: () => (new Date().getTime()),
    addSeconds: (time, seconds) => (time + Number(seconds) * 1000)
});

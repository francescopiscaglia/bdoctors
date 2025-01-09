const handler500 = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500: server error');
}

module.exports = handler500;
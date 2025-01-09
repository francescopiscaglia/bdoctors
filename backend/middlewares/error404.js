const handler404 = (req, res, next) => {
    res.status(404).send('404: page not found');
}

module.exports = handler404;
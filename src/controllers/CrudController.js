//================================================================================
// GENERIC CONTROLLER METHODS
//================================================================================
exports.getCrudObjects = async (req, res, entity) => {
    try {
        res.send("Trezorly API is running...");
    } catch (err) {
        res.status().json({
            message: err.message || err,
        });
    }
};
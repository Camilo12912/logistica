const exito = (req, res, data, status = 200) => {
    res.status(status).json({
        error: false,
        status,
        body: data
    });
};

const error = (req, res, err, mensaje = "Error interno", status = 500) => {
    console.error("❌ Error:", err);
    res.status(status).json({
        error: true,
        status,
        message: mensaje
    });
};

export default { exito, error };

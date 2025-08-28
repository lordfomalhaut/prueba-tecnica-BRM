const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError
} = require('sequelize');

module.exports = (err, req, res, _next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err);

  if (err instanceof UniqueConstraintError || err?.parent?.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      message: 'Recurso duplicado',
      errors: (err.errors || []).map(e => ({
        field: e.path,
        value: e.value,
        message: e.message || 'Ya existe un registro con ese valor'
      }))
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: 'Validación',
      errors: err.errors.map(e => ({ field: e.path, message: e.message }))
    });
  }

  if (
    err instanceof ForeignKeyConstraintError ||
    ['ER_ROW_IS_REFERENCED', 'ER_ROW_IS_REFERENCED_2'].includes(err?.parent?.code)
  ) {
    return res.status(409).json({
      message: 'Operación no permitida por referencias',
      details: err.parent?.sqlMessage || 'El registro está referenciado por otros datos'
    });
  }

  if (err instanceof DatabaseError && err?.parent?.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
    return res.status(400).json({
      message: 'Validación (CHECK)',
      details: err.parent?.sqlMessage
    });
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message, details: err.details });
  }

  return res.status(500).json({ message: 'Error interno' });
};

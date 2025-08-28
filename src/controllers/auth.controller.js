const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role, Log } = require('../../models');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'Cliente' } = req.body;

    const roleRow = await Role.findOne({ where: { name: role } });
    if (!roleRow) return res.status(400).json({ message: 'Rol inválido' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email ya existe' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, roleId: roleRow.id });

    await Log.create({ userId: user.id, action: 'USER_REGISTER', description: email });

    res.status(201).json({ id: user.id, name, email, role });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: Role });
    if (!user) return res.status(401).json({ message: 'Credenciales' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Credenciales' });

    const payload = { id: user.id, email: user.email, role: user.Role?.name || 'Cliente' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1d' });

    await Log.create({ userId: user.id, action: 'LOGIN_OK', description: email });

    res.json({ token, user: payload });
  } catch (e) { next(e); }
};

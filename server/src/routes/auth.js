const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

const accountRules = body('account')
  .isLength({ min: 6, max: 20 })
  .withMessage('账号长度需 6-20 位')
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage('账号仅支持字母、数字、下划线');

const passwordRules = body('password')
  .isLength({ min: 8, max: 32 })
  .withMessage('密码长度需 8-32 位')
  .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
  .withMessage('密码必须包含字母和数字');

router.post('/register', [accountRules, passwordRules], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { account, password, nickname = '' } = req.body;

  db.get('SELECT id FROM users WHERE account = ?', [account], async (err, row) => {
    if (err) return res.status(500).json({ message: '服务异常，请稍后重试' });
    if (row) return res.status(409).json({ message: '账号已存在' });

    const passwordHash = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users(account, password_hash, nickname) VALUES (?, ?, ?)',
      [account, passwordHash, nickname],
      function onInsert(insertErr) {
        if (insertErr) return res.status(500).json({ message: '注册失败，请重试' });
        return res.status(201).json({ message: '注册成功', userId: this.lastID });
      }
    );
  });
});

router.post('/login', [accountRules, passwordRules], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { account, password } = req.body;
  db.get('SELECT * FROM users WHERE account = ?', [account], async (err, user) => {
    if (err) return res.status(500).json({ message: '服务异常，请稍后重试' });
    if (!user) return res.status(401).json({ message: '账号或密码错误' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: '账号或密码错误' });

    const token = jwt.sign(
      { id: user.id, account: user.account, nickname: user.nickname },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: '登录成功',
      token,
      user: { id: user.id, account: user.account, nickname: user.nickname },
    });
  });
});

router.get('/profile', auth, (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;

import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
   const { authorization } = req.headers

   if (!authorization) return res.sendStatus(401).json({ message: 'Unauthorized' })

   const token = authorization.split(' ')[1]
   jwt.verify(token, 'access-token-secret', (err, user) => {
      if (err) return res.sendStatus(403).json({ message: 'Failed to authenticate' })

      req.user = user
      next()
   })
}

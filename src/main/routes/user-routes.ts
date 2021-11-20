import { Router } from 'express'

export default (router: Router): void => {
  router.post('/create', (req, res) => {
    res.json({ ok: 'ok' })
  })
}

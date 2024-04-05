import User from '#models/user'
import { BasePolicy, allowGuest } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class SocietyPolicy extends BasePolicy {
  async before(user: User | null) {
    /**
     * Always allow an admin user without performing any check
     */
    if (user && user.isAdmin) {
      return true
    }
  }

  viewList(): AuthorizerResponse {
    return false
  }

  @allowGuest()
  view() {
    return true
  }

  create(user: User, userPass: number | undefined): AuthorizerResponse {
    return user.id === userPass || userPass === undefined
  }

  update(): AuthorizerResponse {
    return false
  }

  delete(): AuthorizerResponse {
    return false
  }
}

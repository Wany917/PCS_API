import User from '#models/user'
import { BasePolicy, allowGuest } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  async before(user: User | null, action: string, ...params: any[]) {
    /**
     * Always allow an admin user without performing any check
     */

    if (user && user?.$extras.isAdmin) {
      return true
    }
  }
  
  viewList() : AuthorizerResponse {
    return false
  }

  @allowGuest()
  view() {
    return true
  }

  create() {
    return false
  }

  update(user: User,  userPass: number | undefined) : AuthorizerResponse {
    return user.id === userPass || userPass === undefined
  }

  delete() : AuthorizerResponse {
    return false
  }
}
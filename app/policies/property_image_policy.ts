import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Property from '#models/property'

export default class PropertyImagePolicy extends BasePolicy {
  async before(user: User | null) {
    /**
     * Always allow an admin user without performing any check
     */
    if (user && user.isAdmin) {
      return true
    }
  }

  create(user: User, property: Property) : AuthorizerResponse {
    return user.id === property?.userId || user?.society?.id === property?.societyId
  }

  destroy(user: User, property: Property) : AuthorizerResponse {
    return user.id === property?.userId || user?.society?.id === property?.societyId
  }
}

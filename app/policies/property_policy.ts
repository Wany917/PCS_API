import User from '#models/user'
import Property from '#models/property'
import { BasePolicy, allowGuest } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class PropertyPolicy extends BasePolicy {
  async before(user: User | null) {
    /**
     * Always allow an admin user without performing any check
     */
    if (user && user.isAdmin) {
      return true
    }
  }

  /**
   * Every guest user can view a property
   */
  @allowGuest()
  view() {
    return true
  }

  /**
   * Every logged-in user can add a property
   */
  create(
    user: User,
    userPass: number | undefined
  ): AuthorizerResponse {
    return (
      user.id === userPass || userPass === undefined
    )
  }

  /**
   * Only the owner can update the property
   */
  update(
    user: User,
    userPass: number | undefined,
    societyPass: number | undefined,
    property: Property
  ): AuthorizerResponse {
    return (
      (user.id === property?.userId || user?.society?.id === property?.societyId) &&
      (user.id === userPass || userPass === undefined) &&
      (user?.society?.id === societyPass || societyPass === undefined)
    )
  }

  /**
   * Only the owner can delete the property
   */
  delete(user: User, property: Property): AuthorizerResponse {
    return user.id === property?.userId || user?.society?.id === property?.societyId
  }
}

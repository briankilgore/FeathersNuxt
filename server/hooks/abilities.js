const { AbilityBuilder, Ability } = require('casl')

function defineAbilitiesFor(user) {
  const { rules, can } = AbilityBuilder.extract()

  if (user) {
    can(['read', 'update'], 'users', { _id: user._id })
  }
  
  return new Ability(rules)
}

module.exports = function authorize() {
}

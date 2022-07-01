export default function headerReducer(state, action) {
  switch (action.type) {
    case 'updateHeaderayar':
      state[0].header = 'ayar'
          return [...state]
      case 'updateHeadertalep':
      state[0].header = 'talep'
      return [...state]
      case 'updateHeaderhome':
      state[0].header = 'home'
      return [...state]
    default:
      return state
  }
}
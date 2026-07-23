const getDisplayName = (email: string) => {
  return email.split("@")[0]
}

const getUserInitials = (email: string) => {
  return email.slice(0, 2).toUpperCase()
}

const formatUtils = {
  getDisplayName,
  getUserInitials
}

export default formatUtils

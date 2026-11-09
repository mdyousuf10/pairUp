const authMiddleware = (req, res, next) => {
    console.log("Authenticating user...")
    next()
}
export default authMiddleware
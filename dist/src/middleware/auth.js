import { auth as betterAuth } from '../lib/auth';
export var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "STUDENT";
    UserRole["TUTOR"] = "TUTOR";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (UserRole = {}));
// declare global {
//     namespace Express {
//         interface Request {
//             user?: {
//                 id: string;
//                 email: string;
//                 name: string;
//                 role: string;
//                 // emailVerified: boolean;
//             }
//         }
//     }
// }
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            // get user session
            const session = await betterAuth.api.getSession({
                headers: req.headers
            });
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized!"
                });
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role,
                // emailVerified: session.user.emailVerified
            };
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! You don't have permission to access this resources!"
                });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map
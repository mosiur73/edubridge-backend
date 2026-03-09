"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
async function seedAdmin() {
    try {
        console.log('******Admin sending started');
        const adminDate = {
            name: "Admin",
            email: "admin@gmail.com",
            role: auth_1.UserRole.ADMIN,
            password: "admin12345",
        };
        //check user exist on db or not
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: {
                email: adminDate.email
            }
        });
        if (existingUser) {
            throw new Error("user Already exist");
        }
        const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminDate)
        });
        console.log("******admin created");
        if (signUpAdmin.ok) {
            await prisma_1.prisma.user.update({
                where: { email: adminDate.email },
                data: {
                    emailVerified: true,
                    role: auth_1.UserRole.ADMIN
                }
            });
            console.log("email verification & role updated");
        }
        console.log("**** sucess*****");
    }
    catch (error) {
        console.error(error);
    }
}
seedAdmin();

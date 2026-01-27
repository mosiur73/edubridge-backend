import { email } from "better-auth/*"
import { prisma } from "../lib/prisma"
import { UserRole } from "../middleware/auth"



async function seedAdmin() {
    try {
        console.log('******Admin sending started');
        const adminDate={
            name: "Admin",
            email:"admin2@gmail.com",
            role:UserRole.ADMIN,
            password:"admin12345",
         
        }

        //check user exist on db or not
        const existingUser = await prisma.user.findUnique({
            where:{
                email:adminDate.email
            }
        })
        if(existingUser){
            throw new Error("user Already exist")
        }
        const signUpAdmin= await  fetch("http://localhost:5000/api/auth/sign-up/email",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(adminDate)
        })
         console.log("******admin created");
        if(signUpAdmin.ok){
            await prisma.user.update({
                where:{
                    email:adminDate.email
                },
                data:{
                    emailVerified:true
                }
            })
            console.log( "email verification updated");
        }
        console.log("**** sucess*****");
        
    } catch (error) {
        console.error(error)
        
    }
}
seedAdmin()


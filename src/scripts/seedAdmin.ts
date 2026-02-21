
// import { prisma } from "../lib/prisma"
// import { UserRole } from "../middleware/auth"



// async function seedAdmin() {
//     try {
//         console.log('******Admin sending started');
//         const adminDate={
//             name: "Admin",
//             email:"admin2@gmail.com",
//             role:UserRole.ADMIN,
//             password:"admin12345",
         
//         }

//         //check user exist on db or not
//         const existingUser = await prisma.user.findUnique({
//             where:{
//                 email:adminDate.email
//             }
//         })
//         if(existingUser){
//             throw new Error("user Already exist")
//         }
//         const signUpAdmin= await  fetch("http://localhost:5000/api/auth/sign-up/email",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(adminDate)
//         })
//          console.log("******admin created");
//         if(signUpAdmin.ok){
//             await prisma.user.update({
//                 where:{
//                     email:adminDate.email
//                 },
//                 data:{
//                     emailVerified:true
//                 }
//             })
//             console.log( "email verification updated");
//         }
//         console.log("**** sucess*****");
        
//     } catch (error) {
//         console.error(error)
        
//     }
// }
// seedAdmin()






import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    console.log("******Admin seeding started");

    const adminData = {
      name: "Admin",
      email: "admin2@gmail.com",
      role: UserRole.ADMIN,
      password: "admin12345",
    };

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      console.log("⚠️ User already exists. Updating role to ADMIN...");
      
      await prisma.user.update({
        where: { email: adminData.email },
        data: {
          role: "ADMIN",
          emailVerified: true,
        },
      });

      console.log("✅ Admin role updated successfully");
      console.log("📧 Email:", adminData.email);
      console.log("🔑 Password:", adminData.password);
      return;
    }

    // Sign up via Better Auth
    console.log("Creating admin via Better Auth...");
    const signUpRes = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }
    );

    if (!signUpRes.ok) {
      const errorText = await signUpRes.text();
      console.error("❌ Signup failed:", errorText);
      throw new Error(`Signup failed: ${errorText}`);
    }

    console.log("✅ Admin user created");

    // Update role and email verification
    console.log("Updating role to ADMIN and verifying email...");
    await prisma.user.update({
      where: { email: adminData.email },
      data: {
        role: "ADMIN", // এখানে string হিসেবে "ADMIN" use করো
        emailVerified: true,
      },
    });

    console.log("✅ Admin setup completed successfully!");
    console.log("📧 Email:", adminData.email);
    console.log("🔑 Password:", adminData.password);

  } catch (error: any) {
    console.error("❌ Error seeding admin:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
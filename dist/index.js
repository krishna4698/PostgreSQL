import express from 'express';
import { Client } from "pg";
const app = express();
app.use(express.json());
const pgClient = new Client('postgresql://neondb_owner:npg_lYhqNCgO4o8k@ep-blue-bird-ad4gqzti-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
await pgClient.connect();
app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const country = req.body.country;
    const street = req.body.street;
    const city = req.body.city;
    try {
        // const insertquery=`insert into users(id, name) values('${id}', '${name}');`
        const insertquery = `insert into users(username, email, password) values($1, $2, $3) RETURNING id;`;
        const response = await pgClient.query(insertquery, [username, email, password]);
        // console.log(response);
        const user_id = response.rows[0].id;
        console.log(user_id);
        const addressquery = `insert into addresses(user_id, city, country, street) values($1, $2, $3, $4);`;
        const addressqueryresponse = await pgClient.query(addressquery, [user_id, city, country, street]);
        res.json({
            message: "hello"
        });
    }
    catch (error) {
        res.json(error);
    }
});
app.listen(3000);
// import { PrismaClient } from "@prisma/client";
// const client = new PrismaClient();
// app.get('/user/', async (req,res)=>{
//     const user=await client.user.findMany();
//     res.json({
//         user
//     })
// })
// app.get('/todo/:id',async (req,res)=>{
//     const id=req.params.id;
//     const user=await client.user.findMany({
//         where:{
//             id:Number(id),
//         },
//         include:{
//             todos:true
//         }
//     })
//     res.json({
//         user
//     })
// })
// async function main() {
// const user= await client.user.findFirst({
//     where:{
//         id:1
//     },
//     include:{
//         todos:true
//     }
// })
// console.log(user);
// }
// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await client.$disconnect();
//   });
//# sourceMappingURL=index.js.map
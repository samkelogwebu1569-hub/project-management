import "dotenv/config";

import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Project-Management" });



const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async ({ event}) => {
        const {data} = event
        await Prisma.user.create({
            data: {
                id: data.id,
                email: data.email_addresses[0].email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
            }
        })
    }
)

//Inngest function to delete user from database

const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},
    async ({ event}) => {
        const {data} = event
        await Prisma.user.delete({
            where: {
                id: data.id,
            }  
        })
    }
)


//Inngest function to update user in database

const syncUserUpdate = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.updated'},
    async ({ event}) => {
        const {data} = event
        await Prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                email: data.email_addresses[0].email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
                
            }
        })
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdate
];
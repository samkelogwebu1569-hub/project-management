import prisma from "../configs/prisma.js";
// Get all workspaces for a user
export const getWorkspaces = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const workspaces = await prisma.workspace.findMany({
            where: {
                members: {
                    some: {
                        userId
                    }
                },
                include: {
                    members: { include: { user: true } },
                    projects: {
                        include: {
                            tasks: { include: { assignee: true, comments: { include: { user: true } } } },
                            members: { include: { user: true } }
                        }
                    }
                },
                owner: true
            }
        });
        res.json(workspaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
// Add member to workspace
export const addMember = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const { email, role, workspaceId, message } = req.body;

        //check if user is owner of workspace
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!workspaceId) {
            return res.status(400).json({ message: 'Misisng required parameters' });
        }
        if (!role) {
            return res.status(400).json({ message: 'Misisng required parameters' });
        }
        if (!["ADMIN", "MEMBER"].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        //fetch workspace
        const worksppace = await prisma.workspace.findUnique({
            where: {
                id:
                    workspaceId
            }, include: { members: true }
        });
        if (!worksppace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
        //check creator has admin role
        if (!workspace.members.find((memeber) => memeber.userId === userId && member.role === "ADMIN")) {
            return res.status(401).json({ message: "You do not have admin priviledges" })
        }
        //check if user is already a memeber
        const existingMember = workspace.members.find((memeber) => memeber.userId === user.id);
        if (existingMember) {
            return res.status(400).json({ message: "User is already a member of this workspace" })
        }
        const member = await prisma.workspaceMember.create({
            data: {
                userId: user.id,
                workspaceId: workspaceId,
                role: role,
                message: message
            }
        })
        res.json({ member, message: "Member added successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
const z = require("zod");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
// *** Update Route ***

const updateSchema = z.object({
    username: z.string().email().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .optional(),
})

exports.updateCredentials = async (req, res) => {
    const { success } = updateSchema.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    if (req.body.password) {
        // If pass is being updated - hash it before saving
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully"
    })
};

// *** Search Route ***

exports.searchFriend = async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{ firstName: { $regex: filter, $options: "i" } }, { lastName: { $regex: filter, $options: "i" } }],
    });
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
};

// get current user 
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            currentUser: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
import asyncHandler from "express-async-handler";

const createQuesionnaire = asyncHandler(async (req, res) => {
  const { title, description, isReversible, questions, isOnePage } = req.body;

  // const user = await User.findOne({ email });

  if (req.body) {
    // tslint:disable-next-line:no-console
    console.log(title);
    // tslint:disable-next-line:no-console
    console.log(description);
    // tslint:disable-next-line:no-console
    console.log(isReversible);
    // tslint:disable-next-line:no-console
    console.log(questions);
    // tslint:disable-next-line:no-console
    console.log(isOnePage);
    //   res.json({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     isAdmin: user.isAdmin,
    //     token: generateToken(user._id),
    //   });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { createQuesionnaire};
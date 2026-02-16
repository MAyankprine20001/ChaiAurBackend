import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  //get user data
  const { fullName, email, password, userName } = req.body;
  console.log(fullName, email, password, userName);

  // if ([
  //     fullName,email,password,userName
  // ].some((field) => field?.trim === ""){
  //     throw new ApiError(400, "All fields are required")
  // }
  // )

  const ExistedUser = User.findOne({
    $or: [{ email }, { userName }],
  });
  if (ExistedUser) {
    throw new ApiError(409, "User already exists with this email or username");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const cover = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar image");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    userName: userName.toLowerCase(),
    avatar: avatar.url,
    coverImage: cover?.url || "",
  });
  const createdUser = await user
    .findById(user._id)
    .select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
    }
    
    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

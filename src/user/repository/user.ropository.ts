import { CreateUserDto } from "../dto/createUser.dto";
import { UserResponseDto } from "../dto/userResponse.dto";

export interface UserRepository {
    createUser(userDto: CreateUserDto): Promise<UserResponseDto>
    findUserWithPwd(email: string): Promise<UserResponseDto & { password: string } | null>
}
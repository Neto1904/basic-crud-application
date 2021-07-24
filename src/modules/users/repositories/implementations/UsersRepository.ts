import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    let user = new User();
    user = {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
      ...user,
    };
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    return null;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null;
  }

  turnAdmin(receivedUser: User): User {
    const index = this.users.findIndex((user) => user.id === receivedUser.id);
    this.users[index] = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };
    return this.users[index];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

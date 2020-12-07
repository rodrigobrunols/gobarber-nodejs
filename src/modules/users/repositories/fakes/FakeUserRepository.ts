import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository{

  private  usersRepository : User[] = [];

  public async save(user: User): Promise<User> {
    const index = this.usersRepository.findIndex(findUser => findUser.id === user.id);

    this.usersRepository[index] = user;

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User>{
    const user = new User();

    Object.assign(user, {id: uuid()}, userData);

    this.usersRepository.push(user);

    return user;
  }

  public async findByEmail(email:string):Promise<User | undefined> {

    const findByEmail = this.usersRepository.find(
      findUser => findUser.email === email);

      return findByEmail;
  }


   public async findById(id: string): Promise <User | undefined> {
    const findById = this.usersRepository.find(
      findUser => findUser.id === id);

      return findById;
  }

}
export default FakeUsersRepository;

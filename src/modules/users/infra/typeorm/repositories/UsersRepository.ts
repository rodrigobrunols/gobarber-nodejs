import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository} from 'typeorm'
import User from '../entities/User';

class UsersRepository implements IUsersRepository{


  constructor(private ormRepository = getRepository(User)){}

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async create(userData: ICreateUserDTO): Promise<User>{

    const user = await this.ormRepository.create(userData);

    this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email:string):Promise<User | undefined> {

    const findUser = await this.ormRepository.findOne({
        where: {email}
      });

      return findUser || undefined;
  }


   public async findById(id: string): Promise <User | undefined> {

    return  await this.ormRepository.findOne(id) || undefined;
  }

}
export default UsersRepository;

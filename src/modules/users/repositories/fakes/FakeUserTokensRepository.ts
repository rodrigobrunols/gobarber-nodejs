import { uuid } from 'uuidv4';
import IUserTokensRepository from '../IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {

  private  userTokenRepository : UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign({
        id:uuid(),
        token: uuid(),
        user_id
    });

    this.userTokenRepository.push(userToken);

    return userToken;
  }



}
export default FakeUserTokensRepository;

import { UserDocument } from '../../interfaces/user.interface';

declare global {
    namespace Express {
      //interface User extends UserDocument {}
    }
  }
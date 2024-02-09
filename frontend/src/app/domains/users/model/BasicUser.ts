import IBasicUser from '@users/interface/IBasicUser';

export default class BasicUser implements IBasicUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  constructor(props: IBasicUser) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.password = props.password;
    this.email = props.email;
  }
}

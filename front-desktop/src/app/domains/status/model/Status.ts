import Card from '../../card/model/Card';

export default class Status {
  cards?: Array<Card>;
  constructor(public id: number, public name: string) {}
}

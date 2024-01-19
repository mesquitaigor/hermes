import Card from '../../tasks/model/Card';

export default class Status {
  cards?: Card[];
  constructor(public id: number, public name: string) {}
}

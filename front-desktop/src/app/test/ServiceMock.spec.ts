export default abstract class ServiceMock<T> {
  abstract build(): jasmine.SpyObj<T>;
  createSpyObj<K extends keyof T>(
    name: string,
    methods: Array<K>
  ): jasmine.SpyObj<T> {
    return jasmine.createSpyObj(name, methods);
  }
}

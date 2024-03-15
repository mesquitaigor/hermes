import UuidGenerator from './UuidGenerator';

describe(UuidGenerator.name, () => {
  it('should generate a UUID', () => {
    expect(typeof UuidGenerator.generate() == 'string').toBeTrue()
  })
})
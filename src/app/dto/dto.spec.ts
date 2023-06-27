import { Dto } from './dto';

describe('Dto', () => {
  it('should create an instance', () => {
    expect(new Dto(0, new Map())).toBeTruthy();
  });
});

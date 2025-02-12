import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // ! search
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm || '';

    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map((filed) => ({
        [filed]: { $regex: searchTerm, $options: 'i' },
      })),
    });

    return this;
  }

  // ! filter
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'field'];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }
  // ! sort
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  // ! paginate
  paginate() {
    const limit = Number(this?.query?.limit) || 0;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit || 0;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // ! fields
  fields() {
    const field =
      (this?.query?.field as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(field);

    return this;
  }
}

export default QueryBuilder;

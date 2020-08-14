export class Question  {
  _id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  positiveVotes: number;
  negativeVotes: number;
  createdDate: Date;
}

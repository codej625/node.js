type CatType = {
  id: string;
  name: string;
  age: number;
  species: string;
  isCute: boolean;
  friends: string;
}

export const Cat: CatType[] = [
  {
    id: '1',
    name: 'Whiskers',
    age: 3,
    species: 'Persian',
    isCute: true,
    friends: 'Fluffy, Snowball'
  },
  {
    id: '2',
    name: 'Mittens',
    age: 5,
    species: 'Siamese',
    isCute: true,
    friends: 'Shadow'
  },
  {
    id: '3',
    name: 'Fluffy',
    age: 2,
    species: 'Maine Coon',
    isCute: true,
    friends: 'Whiskers, Mittens'
  },
  {
    id: '4',
    name: 'Shadow',
    age: 4,
    species: 'Bengal',
    isCute: false,
    friends: 'Mittens, Snowball'
  },
  {
    id: '5',
    name: 'Snowball',
    age: 1,
    species: 'Ragdoll',
    isCute: true,
    friends: 'Whiskers, Shadow'
  }
];
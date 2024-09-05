export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  directorId: number;
  releaseDate: Date;
  coverImage: string;
}

export interface Director {
  id: number;
  name: string;
}
